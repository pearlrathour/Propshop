import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useBusinessStore, useFilterStore } from '../../store';
import logo from '../../assets/images/logo2.png';
import { Squares2X2Icon, PlusIcon, ChevronDownIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, CalendarDaysIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import '../../index.css';

export default function Sidebar() {
    let navigate = useNavigate();
    const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const { businessId, businessName, businessEmail, businessContactNo, Location, Description, Image, setBusiness, clearBusiness } = useBusinessStore();
    const { sortBy, searchBy, setsortBy, setsearchBy } = useFilterStore();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [infoUpdatedrawer, setinfoUpdateDrawer] = useState(false);
    const [dateSlot, setDateSlot] = useState({ startDate: '', endDate: '' });
    const [timeSlots, setTimeSlots] = useState([{ startTime: '', endTime: '', bookedBy: null }]);
    const [searchName, setSearchName] = useState("");
    const [url, setUrl] = useState(window.location.href);
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://propshop-api.onrender.com/business/addservice", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: businessId,
                name: e.target.elements.name.value,
                image: e.target.elements.image.value,
                price: e.target.elements.price.value,
                description: e.target.elements.description.value,
                date: dateSlot,
                timeslots: timeSlots
            })
        });
        const j = await response.json();
        if (j.success) {
            handleDrawerToggle();
            window.location.reload();
        }
        else{
            alert(j.message);
        }
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
            if (s !=="" && e !== "")
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

    const handleSortBy = async (sortFilter) => {
        setsortBy(sortFilter);
        const sortByFilter = sortBy ? `?sortBy=${sortBy}` : '';
        navigate(`/business/myservices${sortByFilter}`);
    };

    const handleSearchBy = async () => {
        setsearchBy(searchName);
        const searchFilter = searchBy ? `?searchBy=${searchName}` : '';
        navigate(`/business/myservices${searchFilter}`);
    };

    const handleLogout = async (e) => {
        e.preventDefault();

        const response = await fetch('https://propshop-api.onrender.com/business/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const j = await response.json();
        if (j.success) {
            clearBusiness();
            navigate("/");
            setUrl(window.location.href);
        }
        else {
            alert("Unable to Logout!!!");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await fetch('https://propshop-api.onrender.com/business/updateinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: businessId,
                username: e.target.elements.username.value,
                email: businessEmail,
                contactno: e.target.elements.contactno.value,
                location: e.target.elements.location.value,
                image: e.target.elements.image.value,
                description: e.target.elements.description.value
            })
        });
        const j = await response.json();
        if (j.success) {
            setBusiness(businessId, j.username, j.email, j.contactno, j.location, j.image, j.description);
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
                        <p className="text-3xl font-bold tracking-tight leading-6 text-sky-100">PROPSHOP</p>
                    </div>
                    <div className="px-3 w-full">
                        <div className="pl-[7%] flex flex-col justify-start items-center w-full border-gray-400 border-b space-y-2.5 pb-3">
                            <button className="flex jusitfy-start items-center space-x-5 w-full text-white font-medium">
                                <Squares2X2Icon className="h-6 w-6" />
                                <Link to="/business/myservices" className="text-lg">My Services</Link>
                            </button>
                            <button className={`flex jusitfy-start items-center w-full space-x-5 font-medium text-lg hover:text-white ${drawerOpen ? "text-white" : "text-gray-300"}`} type="button" onClick={handleDrawerToggle} data-drawer-target="drawer-form" data-drawer-show="drawer-form" aria-controls="drawer-form">
                                <PlusIcon className="h-6 w-6" />
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
                                        <button type="button" onClick={addTimeSlot} className="text-sky-700 hover:underline cursor-pointer focus:outline-none mt-2">
                                            Add Time Slot
                                        </button>
                                    </div>
                                    <button type="submit" className="text-white justify-center flex items-center bg-sky-700 hover:bg-sky-900 w-full focus:ring-4 focus:ring-sky-900 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                                        Add Service
                                    </button>
                                </form>
                            </div>
                        </div>

                        {(url.includes('/myservices/') && !url.endsWith('/:id')) ? null :
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
                                                <button className="text-gray-300 w-full hover:text-gray-800 hover:bg-blue-50 block px-4 py-2 text-sm" onClick={() => handleSortBy("priceASC")} role="menuitem" tabindex="-1" id="menu-item-1">Price(Low to High)</button>
                                                <button className="text-gray-300 w-full hover:text-gray-800 hover:bg-blue-50 block px-4 py-2 text-sm" onClick={() => handleSortBy("priceDSC")} role="menuitem" tabindex="-1" id="menu-item-2">Price(High to Low)</button>
                                                <button className="text-gray-300 w-full hover:text-gray-800 hover:bg-blue-50 block px-4 py-2 text-sm" onClick={() => handleSortBy("Date")} role="menuitem" tabindex="-1" id="menu-item-2">Date</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="px-[8%] py-2.5 relative flex flex-col justify-start items-center border-gray-400 border-b">
                                    <div className="font-medium text-lg w-full text-gray-300" type="button" id="SearchDropdownButton" onClick={toggleSearchDropdown}>
                                        Search
                                    </div>
                                    <div className="flex flex-row w-full justify-between items-center rounded-md bg-gray-300 my-1">
                                        <input type="text" className="w-[82%] bg-gray-100 rounded-l-md text-gray-400 hover:text-gray-800 hover:bg-gray-50 focus:outline-none block px-4 py-2 text-sm" placeholder="Service Name" onChange={(e) => setSearchName(e.target.value)} role="menuitem" tabindex="-1" id="menu-item-1" />
                                        <button onClick={() => handleSearchBy()} className="mr-1">
                                            <MagnifyingGlassIcon className="h-6 w-6 text-black" />
                                        </button>
                                    </div>
                                </div>
                            </div>)}

                    </div>
                </div>
                <div className="w-full px-3">
                    <div className="flex justify-between px-[2%] py-3 items-center space-x-3  text-gray-300 border-b border-gray-400">
                        <div className="h-8 w-8 rounded-md shadow-gray-700 overflow-hidden">
                            <img className="w-full h-full object-cover" src={Image} alt="" />
                        </div>
                        <div className="text-base font-semibold text-white">{businessName}</div>
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

                            <form className="space-y-3" method="post" onSubmit={handleUpdate}>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" id="username" defaultValue={businessName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Name" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" id="email" defaultValue={businessEmail} className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5" placeholder="Email Address" disabled />
                                </div>
                                <div>
                                    <label htmlFor="contactno" className="block mb-2 text-sm font-medium text-gray-700">Contact Number</label>
                                    <input type="text" id="contactno" defaultValue={businessContactNo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Contact Number" required />
                                </div>
                                <div>
                                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">Location</label>
                                    <input type="text" id="location" defaultValue={Location} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Location" required />
                                </div>
                                <div>
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Image URL</label>
                                    <input type="text" name="image" id="image" defaultValue={Image} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="Image URL" required />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                    <textarea id="description" defaultValue={Description} rows="5" className="block p-3 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  " placeholder="Description"></textarea>
                                </div>
                                <button type="submit" className="text-white justify-center flex items-center bg-sky-700 hover:bg-sky-800 w-full focus:ring-4 focus:ring-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
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
        </div >
    );
};