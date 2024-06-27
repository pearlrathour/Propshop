import React from "react";
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo2.png";

export default function Main() {
    return (
        <div id="main" name="main" className="fixed h-screen w-full bg-slate-100">
            <div id="navbar" className="flex flex-col justify-start">
                <div className="mx-auto w-full px-16">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="flex flex-row mx-20">
                            <img className="w-11 h-11 mr-2" src={logo} alt="" />
                            <div className="text-4xl leading-tight tracking-tight font-bold text-sky-800 hidden sm:inline">PROPSHOP</div>
                        </div>

                        <div className="absolute inset-y-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:block cursor-pointer">
                            <div className="flex space-x-10 text-base font-semibold text-sky-800/90">
                                <Link to="/user/signup" className="px-3 py-2 rounded-lg shadow-lg hover:bg-sky-50/50 hover:text-sky-800 hover:shadow-xl">User Signup</Link>
                                <Link to="/business/signup" className="px-3 py-2 rounded-lg shadow-lg hover:bg-sky-50/50 hover:text-sky-800 hover:shadow-xl">Business Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-row items-center justify-center h-full backdrop-filter backdrop-blur-2xl'>
                    <div className="flex flex-col items-center justify-start mt-[13%] h-full">
                        <div className="text-3xl text-center font-bold py-4">Welcome to Propshop</div>
                        <div className="text-lg text-gray-900 w-[100%]">Simplify Your Appointments, Streamline Your Services</div>
                        <div className="text-base text-center text-sky-700 italic w-[100%]">Explore Propshop for Effortless Booking Experiences!</div>
                    </div>
                </div>
            </div>
        </div>
    );
};