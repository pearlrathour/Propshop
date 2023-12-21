const Salon = require("../models/salon");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, contactno, location, image, description, password } = req.body;
    const salon = new Salon({ username, email, contactno, location, image, description });
    console.log(req.body);
    await Salon.register(salon, password);
    return { success: true };
  }
  catch (e) {
    console.log(e);
    // req.flash("error", e.message);
    res.redirect("/salonsignup");
  }
};

module.exports.signin = (req, res) => {
  console.log("Welcome");
  console.log(req.session.returnTo);
  const redirectUrl = req.session.returnTo || "/home";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};