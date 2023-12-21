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
