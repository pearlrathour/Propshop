import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useBusinessStore } from '../../store';
import { Squares2X2Icon, SquaresPlusIcon, ChevronDownIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';
import '../../index.css';

export default function Sidebar() {
    let navigate = useNavigate();
    const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const { businessId, clearBusiness } = useBusinessStore();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [infoUpdatedrawer, setinfoUpdateDrawer] = useState(false);
    const [profile, setProfile] = useState([]);
    const [dateSlot, setDateSlot] = useState({ startDate: '', endDate: '' });
    const [timeSlots, setTimeSlots] = useState([{ startTime: '', endTime: '' }]);

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!isSortDropdownOpen);
    };

    const toggleSearchDropdown = () => {
        setSearchDropdownOpen(!isSearchDropdownOpen);
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleinfoUpdateDrawer = () => {
        setinfoUpdateDrawer(!infoUpdatedrawer);
    };

    useEffect(() => {
        async function loadInfo() {
            const res = await fetch("http://localhost:4000/business/info", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    businessId: businessId
                })
            });
            const data = await res.json();
            setProfile(data);
        }
        loadInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/business/addservice", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: businessId,
                name: e.target.elements.name.value,
                image: e.target.elements.image.value,
                price: e.target.elements.price.value,
                description: e.target.elements.description.value
            })
        });
        setDrawerOpen(!drawerOpen);
    };

    const handleDateChange = (field, value) => {
        const updatedDateSlot = { ...dateSlot };
        updatedDateSlot[field] = value;
        setDateSlot(updatedDateSlot);
    };

    const addTimeSlot = () => {
        if (timeSlots.length === 0)
            setTimeSlots([...timeSlots, { startTime: '', endTime: '' }])
        else {
            const s = timeSlots[timeSlots.length - 1].startTime;
            const e = timeSlots[timeSlots.length - 1].endTime;
            if (s !== "" && e != "")
                setTimeSlots([...timeSlots, { startTime: '', endTime: '' }])
            else
                alert("Please select start and end time of slot")
        }
    };

    const handleTimeChange = (index, field, value) => {
        const updatedTimeSlots = [...timeSlots];
        updatedTimeSlots[index][field] = value;
        setTimeSlots(updatedTimeSlots);
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/business/signout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const j = await response.json();
        if (j.success) {
            clearBusiness();
            console.log(businessId);
            navigate("/");
        }
        else {
            alert("Unable to Logout!!!");
        }
    };

    const handleSetting = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/business/updateinfo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: businessId,
                username: e.target.elements.username.value,
                email: e.target.elements.email.value,
                contactno: e.target.elements.contactno.value,
                location: e.target.elements.location.value,
                image: e.target.elements.image.value,
                description: e.target.elements.description.value
            })
        });
        const j = await response.json();
        if (j.success) {
            handleinfoUpdateDrawer();
            window.location.reload();
        }
    };

    return (
        <div className="h-screen w-[18%]">
            {/* <div className="xl:hidden flex justify-between h-screen w-full p-6 items-center ">
                <div className="flex justify-between  items-center space-x-3">
                    <img className="w-11 h-11 mr-2" src={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"} alt="" />
                    <p className="text-2xl leading-6 text-white">Propshop</p>
                </div>
                <div aria-label="toggler" className="flex justify-center items-center">
                    <button aria-label="open" id="open" onclick="showNav(true)" className="hidden focus:outline-none focus:ring-2">
                        <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4 12H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4 18H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button aria-label="close" id="close" onclick="showNav(true)" className=" focus:outline-none focus:ring-2">
                        <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M6 6L18 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div> */}

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
                                <Link to="/business/myservices" className="text-lg">My Services</Link>
                            </button>
                            <button className={`flex jusitfy-start items-center w-full space-x-5 font-medium text-lg hover:text-white ${drawerOpen ? "text-white" : "text-gray-300"}`} type="button" onClick={handleDrawerToggle} data-drawer-target="drawer-form" data-drawer-show="drawer-form" aria-controls="drawer-form">
                                <SquaresPlusIcon className="h-6 w-6" />
                                <p>Add Service</p>
                            </button>
                            <div id="drawer-form" className={`fixed top-0 right-0 z-40 h-screen w-[27%] p-4 overflow-y-auto transition-transform ${drawerOpen ? "translate-x-0" : "translate-x-full"} bg-gray-200 w-1/3`} tabIndex="-1" aria-labelledby="drawer-form-label" >
                                <h5 id="drawer-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-700 uppercase">
                                    <CalendarDaysIcon className="h-5 w-5 mr-2" />
                                    New Service
                                </h5>
                                <button type="button" onClick={handleDrawerToggle} data-drawer-target="drawer-form" data-drawer-show="drawer-form" aria-controls="drawer-form" className="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 absolute top-3 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                    <XMarkIcon />
                                </button>

                                <form className="space-y-2" method="post" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Service Name" required />
                                    </div>
                                    <div>
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Image</label>
                                        <input type="text" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="Image URL" required />
                                    </div>
                                    <div>
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                                        <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Price (Rs.)" required />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                        <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  " placeholder="Write event description..."></textarea>
                                    </div>
                                    <div className="text-sm font-medium text-white mb-2">
                                        <div className="text-sm font-medium text-gray-700 mb-2">Date</div>
                                        <div className="flex flex-row items-center justify-between py-1">
                                            <input type="date" id="startdate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " value={dateSlot.startDate} onChange={(e) => handleDateChange('startDate', e.target.value)} required />
                                            <div className="px-4 text-sm font-medium text-gray-700">to</div>
                                            <input type="date" id="enddate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " value={dateSlot.endDate} onChange={(e) => handleDateChange('endDate', e.target.value)} required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Time Slots</div>
                                        {timeSlots.map((slot, index) => (
                                            <div key={index} className="flex flex-row items-center justify-between py-1">
                                                <input type="time" id={`starttime-${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " value={slot.startTime} onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)} required />
                                                <div className="px-4 text-sm font-medium text-gray-700">to</div>
                                                <input type="time" id={`endtime-${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " value={slot.endTime} onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)} required />
                                            </div>
                                        ))}
                                        <button type="button" onClick={addTimeSlot} className="text-blue-500 hover:underline cursor-pointer focus:outline-none mt-2">
                                            Add Time Slot
                                        </button>
                                    </div>
                                    <button type="submit" className="text-white justify-center flex items-center bg-blue-600 hover:bg-blue-700 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Add Service
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="px-[9%] py-2.5 relative border-gray-500 border-b">
                            <button className={`flex justify-between items-center w-full font-medium text-lg ${isSortDropdownOpen ? "text-white" : "text-gray-300"}
    `} type="button" id="SortDropdownButton" onClick={toggleSortDropdown} >
                                <div>Sort By</div>
                                <ChevronDownIcon className="h-6 w-6" />
                            </button>
                            {isSortDropdownOpen && (
                                <div id="sortdropdown" className="relative my-2 right-0 z-10 w-50 origin-top-right rounded-md bg-slate-700 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div class="py-1" role="none">
                                        <a href="#" class="text-gray-400 hover:text-gray-800 hover:bg-gray-50  block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Price(Low to High)</a>
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
                                <div id="searchdropdown" className="relative my-2 right-0 z-10 w-50 origin-top-right rounded-md bg-slate-600/50 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                    <div className="flex justify-between px-[2%] py-3 items-center space-x-3  text-gray-300 border-b border-gray-400">
                        <div className="h-8 w-8 rounded-md shadow-gray-700 overflow-hidden">
                            <img className="w-full h-full object-cover" src={profile.image} alt="" />
                        </div>
                        <div className="text-base font-semibold">Business Name</div>
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
                                    <input type="text" id="username" defaultValue={profile.username} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Name" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" defaultValue={profile.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Email Address" required />
                                </div>
                                <div>
                                    <label htmlFor="contactno" className="block mb-2 text-sm font-medium text-gray-700">Contact Number</label>
                                    <input type="text" id="contactno" defaultValue={profile.contactno} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Contact Number" required />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                                    <input type="text" id="location" defaultValue={profile.location} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Location" required />
                                </div>
                                <div>
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Image URL</label>
                                    <input type="text" name="image" id="image" defaultValue={profile.image} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="Image URL" required />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                    <textarea id="description" defaultValue={profile.description} rows="5" className="block p-3 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  " placeholder="Description"></textarea>
                                </div>
                                <button type="submit" className="text-white justify-center flex items-center bg-blue-600 hover:bg-blue-700 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Update Details
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className=" px-[5%] py-2 items-center text-base font-medium text-gray-300 hover:text-rose-400 cursor-pointer">
                        <form onSubmit={handleLogout}>
                            <button type="submit" className="flex justify-start space-x-7 ">
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