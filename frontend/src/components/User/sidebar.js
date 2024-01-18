import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';
import { Squares2X2Icon, SquaresPlusIcon, ChevronDownIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import '.././../index.css';

export default function Sidebar() {
    let navigate = useNavigate();
    const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const { userId, userName, email, contactNo, clearUser } = useUserStore();

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!isSortDropdownOpen);
    };

    const toggleSearchDropdown = () => {
        setSearchDropdownOpen(!isSearchDropdownOpen);
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/user/signout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const j = await response.json();
        if (j.success) {
            clearUser();
            navigate("/");
        }
        else {
            alert("Unable to Logout!!!");
        }
    };

    return (
        <div className="h-screen w-[18%]">
            <div className="flex flex-col justify-between items-start h-full sm:w-64 bg-slate-800">
                <div>
                    <div className="xl:flex justify-start p-6 items-center space-x-3">
                        <img className="w-11 h-11" src={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"} alt="" />
                        <p className="text-3xl font-semibold leading-6 text-blue-600 hover:text-blue-700">Propshop</p>
                    </div>
                    <div className="px-3 w-full">
                        <div className="pl-[7%] flex flex-col justify-start items-center w-full border-gray-500 border-b space-y-2.5 pb-3">
                            <button className="flex jusitfy-start items-center space-x-5 w-full text-gray-300 hover:text-white font-medium">
                                <Squares2X2Icon className="h-6 w-6" />
                                <Link to="/business/myservices" className="text-lg">Appointments</Link>
                            </button>
                            <button className="flex jusitfy-start items-center w-full space-x-5 font-medium text-lg text-gray-300 hover:text-white" type="button">
                                <SquaresPlusIcon className="h-6 w-6" />
                                <p>Appointments</p>
                            </button>
                        </div>
                        <div className="px-[9%] py-2.5 relative border-gray-500 border-b">
                            <button className={`flex justify-between items-center w-full font-medium text-lg ${isSortDropdownOpen ? "text-white" : "text-gray-300"}
    `} type="button" id="SortDropdownButton" onClick={toggleSortDropdown} >
                                <div>Sort By</div>
                                <ChevronDownIcon className="h-6 w-6" />
                            </button>
                            {isSortDropdownOpen && (
                                <div id="sortdropdown" className="relative my-2 right-0 z-10 w-50 origin-top-right rounded-md bg-slate-600/50 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div class="py-1" role="none">
                                        <a href="#" class="text-gray-400 hover:text-gray-800 hover:bg-gray-50 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Price(Low to High)</a>
                                        <a href="#" class="text-gray-400 hover:text-gray-800 hover:bg-gray-50 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Date</a>
                                        <a href="#" class="text-gray-400 hover:text-gray-800 hover:bg-gray-50 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Booked Slots</a>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="px-[9%] py-2.5 relative border-gray-500 border-b">
                            <button className={`font-medium text-lg flex justify-between items-center w-full space-x-5 ${isSearchDropdownOpen ? "text-white" : "text-gray-300"}`} type="button" id="SearchDropdownButton" onClick={toggleSearchDropdown}>
                                <div>Search</div>
                                <ChevronDownIcon className="h-6 w-6" />
                            </button>
                            {isSearchDropdownOpen && (
                                <div id="searchdropdown" className="relative my-2 right-0 z-10 w-5+0 origin-top-right rounded-md bg-slate-600/50 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div class="py-1" role="none">
                                        <a href="#" class="text-gray-400 hover:text-gray-800 hover:bg-gray-50 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Name</a>
                                        <a href="#" class="text-gray-400 hover:text-gray-800 hover:bg-gray-50 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Price</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full px-3">
                    <div className="flex justify-between px-[2%] py-3 items-start space-x-3 text-gray-300 border-b border-gray-400">
                        <UserCircleIcon className="h-8 w-7"/>
                        <div className="flex flex-col items-start">
                            <div className="text-sm font-semibold">{userName}</div>
                            <div className="text-xs font-thin leading-tight tracking-tight text-gray-400">{email}</div>
                        </div>
                        <Cog6ToothIcon className="h-8 w-7 gear-rotate" />
                    </div>
                    <div className="px-[3%] py-2 items-center text-base font-medium text-gray-300 hover:text-rose-400 cursor-pointer">
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="flex justify-start space-x-4">
                                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                                <div>Logout</div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};