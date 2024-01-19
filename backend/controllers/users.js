const User = require("../models/user");
const Service = require("../models/service");

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
    res.json({ success: false });
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
    await User.findOneAndUpdate({ _id: id }, { $set: { username: username, email: email, contactno: contactno} });
    res.json({ success: true, username: username, email: email, contactno: contactno});
  }
  catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

module.exports.fetchServices = async (req, res) => {
  try {
    const services = await Service.find({}, 'id name image price');
    res.json({ success: true, data: services });
  }
  catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

module.exports.fetchAppointments = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id).populate('appointments');
    console.log(user);
    res.json({ success: true, data: user.appointments });
  }
  catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};