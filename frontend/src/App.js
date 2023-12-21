import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './screens/Main';
import BusinessHome from './screens/Businesses/Home';
import UserSignin from './screens/Users/Signin';
import BusinessSignin from './screens/Businesses/Signin'
import UserSignup from './screens/Users/Signup';
import BusinessSignup from './screens/Businesses/Signup';

export default function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/business/home" element={<BusinessHome />} />
            <Route exact path="/user/signin" element={<UserSignin />} />
            <Route exact path="/business/signin" element={<BusinessSignin />} />
            <Route exact path="/user/signup" element={<UserSignup />} />
            <Route exact path="/business/signup" element={<BusinessSignup />} />
          </Routes>
      </Router>
    </div>
  );
};