import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './screens/Main';
import BusinessSignin from './screens/Business/Signin';
import BusinessSignup from './screens/Business/Signup';
import BusinessHome from './screens/Business/Home';
import ServiceProfile from './components/Business/serviceprofile';
import UserSignin from './screens/User/Signin';
import UserSignup from './screens/User/Signup';
import UserHome from './screens/User/Home';
import Service from './components/User/serviceprofile'
import Services from './components/User/services'

export default function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/business/signin" element={<BusinessSignin />} />
            <Route exact path="/business/signup" element={<BusinessSignup />} />
            <Route exact path="/business/myservices" element={<BusinessHome />} />
            <Route exact path="/business/myservices/:id" element={<ServiceProfile />} />
        
            <Route exact path="/user/signup" element={<UserSignup />} />
            <Route exact path="/user/signin" element={<UserSignin />} />
            <Route exact path="/user/myapppointments" element={<UserHome />} />
            <Route exact path="/user/services" element={<Services />} />
            <Route exact path="/user/services/:id" element={<Service />} />
          </Routes>
      </Router>
    </div>
  );
};