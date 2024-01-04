import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useBusinessStore } from '../../store';
import Sidebar from '../sidebar';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Card() {
    const { id } = useParams();
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [service, setService] = useState([]);
    const { businessId } = useBusinessStore();
    let navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            const response = await fetch(`http://localhost:4000/business/myservices/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    businessId: businessId,
                    serviceId: id
                })
            });
            if (response.ok) {
                const data = await response.json();
                setService(data);
            }
        }
        loadData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/business/deleteservice", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                businessId: businessId,
                serviceId: id
            })
        });
        const j = await response.json();
        if (j.success) {
            navigate("/business/myservices");
        }
    };

    // const handleDrawerToggle = () => {
    //     setDrawerOpen(!drawerOpen);
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     fetch("http://localhost:4000/business/addservice", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             id: businessId,
    //             name: e.target.elements.name.value,
    //             image: e.target.elements.image.value,
    //             price: e.target.elements.price.value,
    //             description: e.target.elements.description.value,
    //             date: dateSlot,
    //             timeslots: timeSlots,
    //         })
    //     });
    //     setDrawerOpen(!drawerOpen);
    //};

    // const handleDateChange = (field, value) => {
    //     const updatedDateSlot = { ...dateSlot };
    //     updatedDateSlot[field]= value;
    //     setDateSlot(updatedDateSlot);
    //   };

    //   const addTimeSlot = () => {
    //     if(timeSlots.length===0)
    //       setTimeSlots([...timeSlots, { startTime: '', endTime: '' }])
    //     else{
    //       const s = timeSlots[timeSlots.length-1].startTime;
    //       const e= timeSlots[timeSlots.length-1].endTime;
    //       if(s!=="" && e!="")
    //         setTimeSlots([...timeSlots, { startTime: '', endTime: '' }])
    //       else
    //         alert("Please select start and end time of slot")
    //     }
    //   };

    //   const handleTimeChange = (index, field, value) => {
    //     const updatedTimeSlots = [...timeSlots];
    //     updatedTimeSlots[index][field] = value;
    //     setTimeSlots(updatedTimeSlots);
    //   };

    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="h-screen w-full flex flex-row justify-start">
                <div className="h-screen w-4/12 bg-slate-200 flex flex-col">
                    <div className="h-[75%] object-cover overflow-hidden">
                        <img className="h-full w-full" src={service.image} alt="" />
                    </div>
                    <div className="px-8 pt-3 pb-2 text-gray-800 bg-slate-100 ">
                        <div className="flex flex-row justify-between">
                            <div className="font-semibold text-lg">{service.name}</div>
                            <div className="text-lg">{`Rs ${service.price}`}</div>
                        </div>
                        <div className="py-1">{service.description}</div>
                        <div className="py-2 text-sm text-center font-medium bg-slate-200 text-gray-800">{`${service.date?.startDate ?? ''} to ${service.date?.endDate ?? ''}`}</div>
                    </div>
                    <div className="px-8 py-2 flex flex-row justify-between text-gray-900">
                        <button className="px-5 py-1.5 rounded-md bg-emerald-400 hover:bg-emerald-500  hover:text-gray-100">Edit</button>
                        <form onSubmit={handleSubmit}>
                            <button type="submit" className="px-5 py-1.5 rounded-md bg-red-300 hover:bg-red-500 hover:text-gray-100">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-start space-x-60 py-6 px-16">
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-600 uppercase bg-green-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Booked Slot
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Booked By
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {service && service.timeslots && service.timeslots.map((timeslot, index) => (
                                    <tr key={index} className="bg-transparent text-gray-600 hover:bg-green-50">
                                        <th scope="row" className="px-6 py-4">
                                            {/* {`${timeslot.starttime?.starttime ?? ''} - ${timeslot.endtime?.endtime ?? ''}`} */}
                                            start-end
                                        </th>
                                        <td className="px-6 py-4">
                                            <button onClick={() => setIsProfileVisible(!isProfileVisible)} data-ripple-dark="true" data-popover-target="profile-info-popover" className="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                                Username
                                            </button>
                                            <div className={`absolute max-w-[24rem] ${isProfileVisible ? 'visible' : 'invisible'} whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`} data-popover="profile-info-popover">
                                                <div className="mb-2 flex items-center justify-between gap-2">
                                                    <UserCircleIcon className="relative inline-block h-11 w-11 rounded-full object-cover object-center" />
                                                    <div className="block font-sans text-sm font-normal leading-normal text-gray-700">
                                                        <div>
                                                            Phone no
                                                        </div>
                                                        <div>
                                                            Email Address
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <link rel="stylesheet" href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css" />
                                            <script type="module" src="https://unpkg.com/@material-tailwind/html@latest/scripts/popover.js" />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-600 uppercase bg-red-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Empty Slot
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-transparent text-gray-600 hover:bg-red-50">
                                    <th scope="row" className="px-6 py-4">
                                        11:00 - 11:30
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <div id="drawer-form" className={`fixed top-0 left-0 z-40 h-screen w-[27%] p-4 overflow-y-auto transition-transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"} bg-gray-200 w-1/3`} tabIndex="-1" aria-labelledby="drawer-form-label" >
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
                        <button type="button" onClick={addTimeSlot} className="text-blue-500 hover:underline cursor-pointer focus:outline-none">
                            Add Time Slot
                        </button>
                    </div>
                    <button type="submit" className="text-white justify-center flex items-center bg-blue-600 hover:bg-blue-700 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Add Service</button>
                </form>
            </div> */}
        </div >
    );
};