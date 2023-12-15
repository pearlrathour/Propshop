import React from "react";
import {Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <Link to="/signin" className="text-gray-900 hover:bg-cyan-500 hover:text-white rounded-md px-3 py-2" >Signin</Link>
            <Link to="/usersignup" className="text-gray-900 hover:bg-cyan-500 hover:text-white rounded-md px-3 py-2" >Signup</Link>
        </div>
    );
};