const User = require("../models/user");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, contactno, password } = req.body;
    console.log(req.body);
    const user = new User({ username, email, contactno});
    await User.register(user, password);
    return {success: true};
  } 
  catch (e) {
    console.log(e)
    // req.flash("error", e.message);
    return {success: false}
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
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo;
    res.json({ success: true, id, redirectUrl });
  }
  catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// module.exports.singout = (req, res) => {
//   req.logout(function(err) {
//     if (err)
//       return next(err);
//   req.flash("success", "Goodbye!");
//   res.redirect("/propshop");
//   });
// };
