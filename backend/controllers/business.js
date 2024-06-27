const { query } = require("express");
const Business = require("../models/business");
const { Service, TimeSlot, Slot } = require("../models/service");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, contactno, location, image, description, password } = req.body;
    const business = new Business({ username, email, contactno, location, image, description });
    const registeredBusiness = await Business.register(business, password);
    const id = registeredBusiness._id;
    res.json({ success: true, id, username, email, contactno, location, image, description });
  }
  catch (e) {
    console.log(e);
    res.json({ success: false, message: "Business Signup Error"});
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
    const username = business.username;
    const contactno = business.contactno;
    const location = business.location;
    const image = business.image;
    const description = business.description;
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.json({ success: true, id, username, email, contactno, location, image, description, redirectUrl });
  }
  catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports.signout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      res.json({ success: false});
    }
    res.json({ success: true });
  });
};

module.exports.fetchInfo = async (req, res) => {
  const { businessId } = req.body;
  const business = await Business.findById(businessId);
  res.json(business);
};

module.exports.updateInfo = async (req, res) => {
  const { id, username, email, contactno, location, image, description } = req.body;
  try {
    await Business.findOneAndUpdate({ _id: id }, { $set: { username: username, email: email, contactno: contactno, location: location, image: image, description: description } });
    res.json({ success: true, id, username, email, contactno, location, image, description });
  }
  catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports.createService = async (req, res) => {
  const { id, name, image, price, description, date, timeslots } = req.body;
  console.log(req.body)
  try {
    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    const slots = [];
    const startDate = new Date(date.startDate);
    const endDate = new Date(date.endDate);

    if(startDate>endDate){
        return res.json({ success: false, message: "Invalid Date Slot" });
    }

    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const formattedDate = currentDate.toISOString().split('T')[0];

      const obj = {
        date: formattedDate,
        timeslot: timeslots
      };
      slots.push(obj);
    }
    const service = new Service({ name, image, price, description, date, timeslots: slots, businessId: id });
    business.services.push(service);
    await service.save();
    await business.save();
    res.json({ success: true });
  }
  catch(e){
    res.json({success: false, message: "Error creating service"});
  }
};

module.exports.fetchService = async (req, res) => {
  const { id } = req.body;
  const { searchBy, sortBy } = req.query;
  let business;
  if (sortBy || searchBy) {
    if (sortBy) {
      if (sortBy === 'priceASC') {
        business = await Business.findById(id).populate({
          path: 'services',
          options: { sort: { price: 1 } }
        });
      }
      else if (sortBy === 'priceDSC') {
        business = await Business.findById(id).populate({
          path: 'services',
          options: { sort: { price: -1 } }
        });
      }
      else {
        business = await Business.findById(id).populate({
          path: 'services',
          options: { sort: { date: 1 } }
        });
      }
    }
    if (searchBy) {
      business = await Business.findById(id).populate({
        path: 'services',
        match: { name: { $regex: new RegExp(searchBy, 'i') } }, //case sen
      });
    }
  }
  else {
    business = await Business.findById(id).populate('services');
  }

  const currentDate = new Date().toISOString().split("T")[0];
  const currTime = new Date();
  const currentTime = `${currTime.getHours()}:${currTime.getMinutes()}`;
  
  business.services.forEach(service => {
    const filteredTimeslots= service.timeslots.filter((d)=>{
      if( d.date < currentDate) return 0;
      else if (d.date > currentDate) return 1;
      else {
        let filteredTime = d.timeslot.filter((slot) => {
          return slot.endTime >= currentTime;
        });
        d.timeslot = filteredTime;
        return filteredTime.length>0;
      }
    });
    service.timeslots= filteredTimeslots;
  });
  
  business.services= business.services.filter((s)=>{
    return s.timeslots.length>0;
  });
  
  res.json({ success: true, data: business.services});
};

module.exports.fetchServiceProfile = async (req, res) => {
  const { businessId, serviceId } = req.body;
  const service = await Service.findById(serviceId);
  let currdate= new Date().toISOString().split("T")[0];

  for(let i=0; i<service.timeslots.length; i++){
    let slot = service.timeslots[i].timeslot;
    for (let j = 0; j < slot.length; j++) {
      await Service.populate(slot[j], { path: 'bookedBy', select: 'username email contactno' });
    }
  }

  const currentDate = new Date().toISOString().split("T")[0];
  const currTime = new Date();
  const currentTime = `${currTime.getHours()}:${currTime.getMinutes()}`;
  
  const filteredDateTime= service.timeslots.filter((d)=>{
    if( d.date < currentDate) return 0;
    else if(d.date > currentDate) return 1;
    else {
      let filteredTime = d.timeslot.filter((slot) => {
        return slot.endTime >= currentTime;
      });
      d.timeslot = filteredTime;
      return 1;
    }
  });
  
  service.timeslots= filteredDateTime;
  res.json({ success: true, data: service });
};

exports.fetchUserInfo = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  console.log(user);
  res.json({ success: true, data: user });
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
  const { name, image, price, description, date, timeslots, serviceId } = req.body;

  try {
    const startDate = new Date(date.startDate);
    const endDate = new Date(date.endDate);
    const service = await Service.findById(serviceId);
    const slots = service.timeslots;
    let dbtimeslot;

    for (let slot of slots) {
      dbtimeslot = slot.timeslot;
      for (let timeslot of timeslots) {
        if (timeslot._id === undefined) {
          const obj = {
            startTime: timeslot.startTime,
            endTime: timeslot.endTime,
            bookedBy: timeslot.bookedBy
          }
          dbtimeslot.push(obj);
        }
      }
    }

    await Service.findByIdAndUpdate({ _id: serviceId }, { $set: { name: name, image: image, price: price, description: description, timeslots: slots } });

    res.json({ success: true });
  }
  catch (error) {
    res.json({ success: false });
  }
};