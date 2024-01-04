import React from "react";
import { Link } from 'react-router-dom';
import mainbg from "../assets/images/mainbg.jpg";

export default function Main() {
    return (
        <div id="main" name="main" className="h-screen w-full" style={{ backgroundImage: `url(${mainbg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <div id="navbar" className="sticky top-0 backdrop-filter backdrop-blur-2xl bg-opacity-30 z-10">
                <nav className="bg-black-800">
                    <div className="mx-auto max-w-full px-16">
                        <div className="relative flex h-20 items-center justify-between">
                            <div className="flex flex-row mx-20">
                                <img className="w-11 h-11 mr-2" src={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"} alt="" />
                                <div className="text-4xl font-bold text-blue-600 hover:text-blue-700 hidden sm:inline"><Link to="/main" rel="noreferrer">Propshop</Link></div>
                            </div>

                            <div className="absolute inset-y-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:block cursor-pointer">
                                <div className="flex space-x-4 text-base font-semibold text-gray-200">
                                    <Link to="/user/signup" className=" hover:text-white hover:underline hover:underline-offset-8 px-3 py-2">User Signup</Link>
                                    <Link to="/business/signup" className=" hover:text-white hover:underline hover:underline-offset-8 px-3 py-2">Salon Signup</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className='w-full flex flex-row items-center justify-center h-full backdrop-filter backdrop-blur-2xl'>
                <div className="flex flex-col items-center justify-center h-full text-gray-900">
                    <div className="text-3xl text-center font-bold py-4">Welcome to Propshop</div>
                    <div className="text-xl w-1/3">dwjkjkdddndn scjncd xml;mcx mxl;amcas cnjnc cnklclk sndknk ncmncm . sbdhgdnm dhjkf wdhioqwjdklw dhwqidqwjdk Djadklakld djadkjkld djakjaklfj mfnjfkqlf dnkdklkdl</div>
                    {/* <div className='justify-center py-6'>
                        <Link to="/home" rel="noopener noreferrer">
                            <button className="text-sm font-medium text-gray-900 hover:text-white dark:text-white">
                                <div className="px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-gray-100 hover:text-white">
                                    Explore salons
                                </div>
                            </button>
                        </Link>
                    </div> */}
                </div>
            </div>
        </div>
    );
};