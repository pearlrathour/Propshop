const Business = require("../models/business");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, contactno, location, image, description, password } = req.body;
    const business = new Business({ username, email, contactno, location, image, description });
    console.log(req.body);
    await Business.register(business, password);
    return { success: true };
  }
  catch (e) {
    console.log(e);
    // req.flash("error", e.message);
    res.redirect("/business/signup");
  }
};

module.exports.signin = (req, res) => {
  console.log("Welcome");
  console.log(req.session.returnTo);
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};