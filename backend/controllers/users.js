const User = require("../models/user");

// module.exports.renderUserSignup = (req, res) => {
//   console.log("sdhjk")
//   res.render("usersignup");
// };

module.exports.usersignup = async (req, res) => {
  try {
    const { username, email, contactno, password } = req.body;
    const user = new User({ username, email, contactno});
    await User.register(user, password);
    res.redirect("/");
  } 
  catch (e) {
    console.log(e)
    // req.flash("error", e.message);
    res.redirect("/usersignup");
  }
};

// module.exports.renderSignin = (req, res) => {
//   res.render("users/signin");
// };

module.exports.signin = (req, res) => {
  console.log("Welcome");
  console.log(req.session.returnTo);
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

// module.exports.singout = (req, res) => {
//   req.logout(function(err) {
//     if (err)
//       return next(err);
//   req.flash("success", "Goodbye!");
//   res.redirect("/propshop");
//   });
// };
