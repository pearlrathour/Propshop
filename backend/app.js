const express = require("express");
const bodyParser= require('body-parser');
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const {PORT, DB_URL} = require('./config');
const User = require("./models/user");
const users = require('./controllers/users');
const userRoutes = require("./routes/users");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "../frontend/build")));

const sessionConfig = {
  secret: "Our Lil secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(process.env.DB_URL)
  .then(() => {console.log("Conn succ")})
  .catch((err) => console.log("No conn", err));


app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// app.get("/usersignup", (req,res)=>{
//   console.log("123");
// });

// app.post("/usersignup", users.usersignup);

app.listen(process.env.Port, function () {
  console.log("Server started on port 4000")
});