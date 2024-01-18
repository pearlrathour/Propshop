const User = require("../models/user");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, contactno, password } = req.body;
    const user = new User({ username, email, contactno});
    const registeredUser = await User.register(user, password);
    const id = registeredUser._id;
    res.json({success: true, id, username, email, contactno});
  }
  catch (e) {
    console.log(e);
    res.json({success: false});
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
    const username= user.username;
    const contactno= user.contactno;
    res.json({ success: true, id, username, email, contactno});
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