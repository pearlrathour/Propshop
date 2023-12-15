import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Signin from './screens/Signin'
import UserSignup from './screens/UserSignup';

export default function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signin" element={<Signin />} />
            <Route exact path="/usersignup" element={<UserSignup />} />
          </Routes>
      </Router>
    </div>
  );
};