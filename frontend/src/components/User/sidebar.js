import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo2.png';
import { useUserStore, useFilterStore} from '../../store';
import { CalendarDaysIcon, MagnifyingGlassIcon, ChevronDownIcon, UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import '.././../index.css';

export default function Sidebar() {
    let navigate = useNavigate();
    const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [infoUpdatedrawer, setinfoUpdateDrawer] = useState(false);
    const { userId, userName, email, contactNo, setUser, clearUser } = useUserStore();
    const { sortBy, searchBy, setsortBy, setsearchBy } = useFilterStore();
    const [searchName, setSearchName] = useState("");
    const url= window.location.href;

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!isSortDropdownOpen);
    };

    const handleSortBy = async (sortFilter) => {
        setsortBy(sortFilter);
        const sortByFilter = sortBy ? `?sortBy=${sortBy}` : '';
        navigate(`/user/services${sortByFilter}`);
    };

    const handleSearchBy = async () => {
        setsearchBy(searchName);
        const searchFilter = searchBy ? `?searchBy=${searchName}` : '';
        navigate(`/user/services${searchFilter}`);
    };

    const handleinfoUpdateDrawer = () => {
        setinfoUpdateDrawer(!infoUpdatedrawer);
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        const response = await fetch('https://propshop-api.onrender.com/user/signout', {
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

    const handleSetting = async (e) => {
        e.preventDefault();

        const response = await fetch('https://propshop-api.onrender.com/user/updateinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userId,
                username: e.target.elements.username.value,
                email: e.target.elements.email.value,
                contactno: e.target.elements.contactno.value
            })
        });
        const j = await response.json();
        if (j.success) {
            setUser(userId, j.username, j.email, j.contactno);
            handleinfoUpdateDrawer();
            window.location.reload();
        }
    };

    return (
        <div className="fixed h-screen z-40">
            <div className="flex flex-col justify-between items-start h-full sm:w-64 bg-sky-900">
                <div>
                    <div className="flex justify-start py-6 px-3 items-center space-x-3">
                        <img className="w-11 h-11" src={logo} alt="" />
                        <p className="text-3xl font-semibold text-sky-100 tracking-tight">PROPSHOP</p>
                    </div>
                    <div className="px-3 w-full">
                        <div className="pl-[7%] flex flex-col justify-start items-center w-full border-gray-400 border-b space-y-2.5 pb-3">
                            <button className={`flex jusitfy-start items-center space-x-5 w-full font-medium hover:text-white ${url.includes("myapppointments") ? 'text-white' : 'text-gray-300'}`}>
                                <CalendarDaysIcon className="h-6 w-6" />
                                <Link to="/user/myapppointments" className="text-lg">Appointments</Link>
                            </button>
                            <Link to="/user/services" className={`flex jusitfy-start items-center w-full space-x-5 font-medium text-lg text-gray-300 hover:text-white ${url.includes("services") ? 'text-white' : 'text-gray-300'}`} type="button">
                                <MagnifyingGlassIcon className="h-6 w-6" />
                                <p>Services</p>
                            </Link>
                        </div>

                        {((url.includes('services')) && !url.includes('services/')) ?
                            (<div>
                                <div className="px-[9%] py-2.5 relative border-gray-400 border-b">
                                    <button className={`flex justify-between items-center w-full font-medium text-lg ${isSortDropdownOpen ? "text-white" : "text-gray-300"}
    `} type="button" id="SortDropdownButton" onClick={toggleSortDropdown}>
                                        <div>Sort By</div>
                                        <ChevronDownIcon className="h-6 w-6" />
                                    </button>
                                    {isSortDropdownOpen && (
                                        <div id="sortdropdown" className="relative my-2 right-0 z-10 w-50 origin-top-right rounded-md bg-sky-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1" role="none">
                                                <button className="text-gray-300 w-full hover:text-gray-800 hover:bg-sky-50 block px-4 py-2 text-sm" onClick={() => handleSortBy("priceASC")} role="menuitem" tabindex="-1" id="menu-item-1">Price(Low to High)</button>
                                                <button className="text-gray-300 w-full hover:text-gray-800 hover:bg-blue-50 block px-4 py-2 text-sm" onClick={() => handleSortBy("priceDSC")} role="menuitem" tabindex="-1" id="menu-item-2">Price(High to Low)</button>
                                                <button className="text-gray-300 w-full hover:text-gray-800 hover:bg-sky-50 block px-4 py-2 text-sm" onClick={() => handleSortBy("Date")} role="menuitem" tabindex="-1" id="menu-item-2">Date</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="px-[8%] py-2.5 relative flex flex-col justify-start items-center border-gray-400 border-b">
                                    {/* <div className="font-medium text-lg w-full text-gray-300" type="button" id="SearchDropdownButton" onClick={toggleSearchDropdown}>
                                        Search
                                    </div> */}
                                    <div className="flex flex-row w-full justify-between items-center rounded-md bg-gray-300 my-1">
                                        <input type="text" className="w-[82%] bg-gray-100 rounded-l-md text-gray-400 hover:text-gray-800 hover:bg-gray-50 focus:outline-none block px-4 py-2 text-sm" placeholder="Search" onChange={(e) => setSearchName(e.target.value)} role="menuitem" tabindex="-1" id="menu-item-1" />
                                        <button onClick={() => handleSearchBy()} className="mr-1">
                                            <MagnifyingGlassIcon className="h-6 w-6 text-black" />
                                        </button>
                                    </div>
                                </div>
                            </div>)
                        : (<div></div>)}
                    </div>
                </div>
                <div className="w-full px-3">
                    <div className="flex justify-between px-[2%] py-3 items-start space-x-3 text-gray-300 border-b border-gray-400">
                        <UserCircleIcon className="h-8 w-7" />
                        <div className="flex flex-col w-[60%] items-start">
                            <div className="text-sm font-semibold">{userName}</div>
                            <div className="text-xs font-thin leading-tight tracking-tight text-gray-400">{email}</div>
                        </div>
                        <button className="cursor-pointer" type="button" onClick={handleinfoUpdateDrawer} data-drawer-target="drawer-info-update" data-drawer-show="drawer-info-update" aria-controls="drawer-info-update">
                            <Cog6ToothIcon className="h-7 w-7 gear-rotate" />
                        </button>

                        <div id="drawer-info-update" className={`fixed top-0 right-0 z-40 h-screen w-[27%] p-4 overflow-y-auto transition-transform ${infoUpdatedrawer ? "translate-x-0" : "translate-x-full"} bg-gray-200 w-1/3`} tabIndex="-1" aria-labelledby="drawer-form-label" >
                            <h5 id="drawer-info-label" className="inline-flex items-center mb-6 text-base font-semibold text-gray-700 uppercase">
                                <CalendarDaysIcon className="h-5 w-5 mr-2" />
                                Upadte Information
                            </h5>
                            <button type="button" onClick={handleinfoUpdateDrawer} data-drawer-target="drawer-info-update" data-drawer-show="drawer-info-update" aria-controls="drawer-info-update" className="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 absolute top-3 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                <XMarkIcon />
                            </button>

                            <form className="space-y-3" method="post" onSubmit={handleSetting}>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" id="username" defaultValue={userName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Name" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" defaultValue={email} className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 " placeholder="Email Address" disabled />
                                </div>
                                <div>
                                    <label htmlFor="contactno" className="block mb-2 text-sm font-medium text-gray-700">Contact Number</label>
                                    <input type="text" id="contactno" defaultValue={contactNo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Contact Number" required />
                                </div>
                                <button type="submit" className="text-white justify-center flex items-center bg-sky-700 hover:bg-sky-800 w-full font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">
                                    Update Details
                                </button>
                            </form>
                        </div>
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