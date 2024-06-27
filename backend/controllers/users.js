const User = require("../models/user");
const Business = require("../models/business");
const { Service } = require("../models/service");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, contactno, password } = req.body;
    const user = new User({ username, email, contactno });
    const registeredUser = await User.register(user, password);
    const id = registeredUser._id;
    res.json({ success: true, id, username, email, contactno });
  }
  catch (e) {
    console.log(e);
    res.json({ success: false, message: "User Signup Error"});
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.json({ success: false, message: 'Incorrect email' });

    const authenticated = await new Promise((resolve) => {
      user.authenticate(password, (err, authenticated) => {
        if (err) {
          console.error('Error during authentication:', err);
          resolve(false);
        }

        resolve(authenticated);
      });
    });

    if (!authenticated)
      return res.json({ success: false, message: 'Incorrect password' });

    const id = user._id;
    const username = user.username;
    const contactno = user.contactno;
    res.json({ success: true, id, username, email, contactno });
  }
  catch (error) {
    console.log(error);
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

module.exports.updateInfo = async (req, res) => {
  const { id, username, email, contactno } = req.body;
  try {
    await User.findOneAndUpdate({ _id: id }, { $set: { username: username, email: email, contactno: contactno } });
    res.json({ success: true, username: username, email: email, contactno: contactno });
  }
  catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports.fetchServices = async (req, res) => {
  const { id } = req.body;
  const { searchBy, sortBy } = req.query;
  let services;

  if (sortBy || searchBy) {
    if (sortBy) {
      if (sortBy === 'priceASC') {
        services = await Service.find({}, 'id name image price businessId')
          .populate('businessId', ['username', 'location'])
          .sort({ price: 1 });
      }
      else if (sortBy === 'priceDSC') {
        services = await Service.find({}, 'id name image price businessId')
          .populate('businessId', ['username', 'location'])
          .sort({ price: -1 });
      }
      else {
        services = await Service.find({}, 'id name image price businessId')
          .populate('businessId', ['username', 'location'])
          .sort({ date: 1 });
      }
    }
    if (searchBy) {
      services = await Service.find({ name: { $regex: new RegExp(searchBy, 'i') } }).populate(
        'businessId',
        ['username', 'location']
      );
    }
  }
  else {
    services = await Service.find({}, 'id name image price timeslots businessId').populate('businessId', 'username location');
  }

  const currentDate = new Date().toISOString().split("T")[0];
  const currTime = new Date();
  const currentTime = `${currTime.getHours()}:${currTime.getMinutes()}`;

  services.forEach(service => {
    const filteredTimeslots= service.timeslots.filter((d)=>{
      if( d.date < currentDate) return 0;
      else if (d.date > currentDate) return 1;
      else {
        let filteredTime = d.timeslot.filter((slot) => {
          return slot.endTime >= currentTime && slot.bookedBy==null;
        });
        d.timeslot = filteredTime;
        return filteredTime.length>0;
      }
    });
    service.timeslots= filteredTimeslots;
  });
  
  services= services.filter((s)=>{
    return s.timeslots.length>0;
  });

  res.json({ success: true, data: services });
};

module.exports.fetchServiceProfile = async (req, res) => {
  const { serviceId } = req.body;
  const service = await Service.findById(serviceId);
  const id = service.businessId;
  const business = await Business.findById(id).select('image username description contactno email location');

  const currentDate = new Date().toISOString().split("T")[0];
  const currTime = new Date();
  const currentTime = `${currTime.getHours()}:${currTime.getMinutes()}`;

  const filteredDateTime= service.timeslots.filter((d)=>{
    if(d.date >= currentDate) return 1;
  });
  
  service.timeslots= filteredDateTime;
  service.date.startDate= (service.date.startDate>=currentDate? service.date.startDate : curentDate);

  res.json({ success: true, servicedata: service, businessdata: business });
};


module.exports.booking = async (req, res) => {
  try {
    const { userId, serviceId, date, timeslot } = req.body;
    const user = await User.findById(userId);
    user.appointments.push({
      serviceId: serviceId,
      date: date,
      timeslot: {
        startTime: timeslot.startTime,
        endTime: timeslot.endTime,
      },
    });
    await user.save();

    const service = await Service.findById(serviceId);
    const timeslots = service.timeslots;

    for (let i = 0; i < timeslots.length; i++) {
      if (timeslots[i].date === date) {
        const slot = timeslots[i].timeslot;

        for (let i = 0; i < slot.length; i++) {
          if (slot[i].startTime === timeslot.startTime && slot[i].endTime === timeslot.endTime) {
            slot[i].bookedBy = userId;
          }
        }
      }
    }
    await service.save();

    res.json({ success: true });
  }
  catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports.fetchAppointments = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    const ap = user.appointments;

    const appointment = [];
    for (let i = 0; i < ap.length; i++) {
      const service = await Service.findById(ap[i].serviceId).select('_id name businessId image price');
      const business = await Business.findById(service.businessId).select('username location');

      const obj = {
        serviceId: service._id,
        image: service.image,
        name: service.name,
        businessname: business.username,
        price: service.price,
        appointmentId: ap[i]._id,
        date: ap[i].date,
        timeslot: ap[i].timeslot,
        location: business.location
      }
      appointment.push(obj);
    }
    
    const currentDate = new Date().toISOString().split("T")[0];
    const currTime = new Date();
    const currentTime = `${currTime.getHours()}:${currTime.getMinutes()}`;
  
    let filteredApp= appointment.filter((app)=>{
      if(app.date>currentDate) return 1;
      return app.date==currentDate && app.timeslot.endTime>=currentTime;
    });
    
    res.json({ success: true, data: filteredApp });
  }
  catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports.cancelAppointment = async (req, res) => {
  const { userId, appointmentId, serviceId, date, timeslot } = req.body;

  try {
    const ap = await User.findByIdAndUpdate(userId, { $pull: { appointments: { _id: appointmentId } } }, { new: true });
    const service = await Service.findByIdAndUpdate(serviceId);
    const timeslots = service.timeslots;

    for (let i = 0; i < timeslots.length; i++) {
      if (timeslots[i].date === date) {
        const slots = timeslots[i].timeslot;
        for (let j = 0; j < slots.length; j++) {
          if (slots[j].startTime === timeslot.startTime && slots[j].endTime === timeslot.endTime) {
            slots[j].bookedBy = null;
            break;
          }
        }
      }
    }
    await service.save();
    res.json({ success: true });
  }
  catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};