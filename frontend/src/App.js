import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './screens/Main';
import UserSignin from './screens/User/Signin';
import BusinessSignin from './screens/Business/Signin'
import UserSignup from './screens/User/Signup';
import BusinessSignup from './screens/Business/Signup';
import BusinessHome from './screens/Business/Home';
import UserHome from './screens/User/Home';
import ServiceProfile from './components/Business/serviceprofile';
// import Bookings from './components/bookings'
import Service from './components/User/service'

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
            {/* <Route exact path="/user/bookings" element={<Bookings />} /> */}
            {/* <Route exact path="/user/filter" element={<Filter />} /> */}
            <Route exact path="/user/service" element={<Service />} />
          </Routes>
      </Router>
    </div>
  );
};