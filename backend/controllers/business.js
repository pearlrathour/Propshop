const Business = require("../models/business");
const Service = require("../models/service");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, contactno, location, image, description, password } = req.body;
    const business = new Business({ username, email, contactno, location, image, description });
    const registeredBusiness = await Business.register(business, password);
    const id = registeredBusiness._id;
    res.json({success: true,id});
  }
  catch (e) {
    console.log(e);
    res.json({success: false});
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const business = await Business.findOne({ email });

    if (!business)
      return res.json({ success: false, message: 'Incorrect email' });

    const authenticated = await new Promise((resolve) => {
      business.authenticate(password, (err, authenticated) => {
        if (err) {
          console.error('Error during authentication:', err);
          resolve(false);
        }

        resolve(authenticated);
      });
    });

    if (!authenticated)
      return res.json({ success: false, message: 'Incorrect password' });

    const id = business._id;
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.json({ success: true, id, redirectUrl });
  }
  catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports.signout = (req, res) => {
  req.logout(function (err) {
    if (err) { 
      console.log(err);
      res.json({ success: false }); 
    }
    res.json({ success: true });
  });
};

module.exports.createService = async (req, res) => {
  const { id, name, image, price, description, date, timeslots } = req.body;
  const business = await Business.findById(id);
  const service = new Service({ name, image, price, description, date, timeslots });
  business.services.push(service);
  await service.save();
  await business.save();
};

module.exports.fetchService = async (req, res) => {
  const { id } = req.body;
  const business = await Business.findById(id).populate('services');
  res.json(business.services);
};

module.exports.fetchServiceProfile = async (req, res) => {
  const { businessId, serviceId } = req.body;
  const service = await Service.findById(serviceId);
  res.json(service);
};

module.exports.removeService = async (req, res) => {
  const { businessId, serviceId } = req.body;

  try {
    await Service.findOneAndDelete({ _id: serviceId });
    await Business.findByIdAndUpdate(businessId, { $pull: { services: serviceId } });

    res.json({ success: true });
  }
  catch (error) {
    res.json({ success: false });
  }
};

module.exports.updateService = async (req, res) => {
  console.log("bjkb")
  const { name, image, price, description, date, timeslots, businessId, serviceId } = req.body;
  try {
    await Service.findOneAndUpdate({ _id: serviceId }, { $set: { name: name, image: image, price: price, description: description, date: date, timeslots: timeslots } });

    res.json({ success: true });
  }
  catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};