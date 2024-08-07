import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useBusinessStore } from '../../store';
import Sidebar from '../../components/Business/sidebar';
import { UserCircleIcon, CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function ServiceProfile() {
    const { id } = useParams();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isProfileVisible, setIsProfileVisible] = useState({});
    const [service, setService] = useState([]);
    // const [userInfo, setUserInfo] = useState({});
    const [dateSlot, setDateSlot] = useState({ startDate: '', endDate: '' });
    const [timeSlots, setTimeSlots] = useState([{ startTime: '', endTime: '', bookedBy: null}]);
    const { businessId } = useBusinessStore();
    let navigate = useNavigate();

    const toggleVisibility= (s)=>{
        const newVisibilityString= JSON.stringify(isProfileVisible);
        const newVisibility= JSON.parse(newVisibilityString);
        if(newVisibility.hasOwnProperty(s)){
            delete newVisibility[s];
        }
        else{
            newVisibility[s]= true;
        }
        setIsProfileVisible(newVisibility);
    }

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    async function loadData() {
        const response = await fetch('https://propshop-api.onrender.com/business/myservices/${id}?sortBy=', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                businessId: businessId,
                serviceId: id
            })
        });
        const j = await response.json();
        if (j.success) {
            let data = await j.data;
            setDateSlot(data.date);
            setTimeSlots(data.timeslots.length >0 ? data.timeslots[0].timeslot : []);
            setService(data);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        const response = await fetch('https://propshop-api.onrender.com/business/deleteservice', {
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

    const handleUpdate = async (e) => {
        e.preventDefault();

        const response = await fetch('https://propshop-api.onrender.com/business/updateservice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: e.target.elements.name.value,
                image: e.target.elements.image.value,
                price: e.target.elements.price.value,
                description: e.target.elements.description.value,
                date: dateSlot,
                timeslots: timeSlots,
                serviceId: id
            })
        });
        const j = await response.json();
        if (j.success) {
            handleDrawerToggle();
            window.location.reload();
        }
    };

    const handleDateChange = (field, value) => {
        const updatedDateSlot = { ...dateSlot };
        updatedDateSlot[field] = value;
        setDateSlot(updatedDateSlot);
    };

    const addTimeSlot = () => {
        if (timeSlots.length === 0)
            setTimeSlots([...timeSlots, { startTime: '', endTime: '', bookedBy: null}])
        else {
            const s = timeSlots[timeSlots.length - 1].startTime;
            const e = timeSlots[timeSlots.length - 1].endTime;
            if (s !== "" && e !== "")
                setTimeSlots([...timeSlots, { startTime: '', endTime: '', bookedBy: null}])
            else
                alert("Please select start and end time of slot")
        }
    };

    const handleTimeChange = (index, field, value) => {
        const updatedTimeSlots = [...timeSlots];
        updatedTimeSlots[index][field] = value;
        setTimeSlots(updatedTimeSlots);
    };

    // const handleUserInfo = async (userId, e) => {
    //     e.preventDefault();

    //     const response = await fetch("https://propshop-api.onrender.com/business/userinfo", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             id: userId
    //         })
    //     });
    //     const j = await response.json();
    //     if (j.success) {
    //         setUserInfo(j.data);
    //     }
    // };

    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="w-full flex flex-row ml-[16.6%]">
                <div className="fixed h-screen w-[28%] bg-slate-200 flex flex-col">
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
                        <button className="px-5 py-1.5 rounded-md bg-green-400/90 hover:bg-green-500  hover:text-gray-100" type="button" onClick={handleDrawerToggle} data-drawer-target="drawer-form" data-drawer-show="drawer-form" aria-controls="drawer-form">
                            Edit
                        </button>

                        <div id="drawer-form" className={`fixed top-0 right-0 z-40 h-screen w-[23%] p-6 overflow-y-auto transition-transform ${drawerOpen ? "translate-x-0" : "translate-x-full"} bg-gray-200 w-[30%]`} tabIndex="-1" aria-labelledby="drawer-form-label" >
                            <h5 id="drawer-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-700 uppercase">
                                <CalendarDaysIcon className="h-5 w-5 mr-2" />
                                New Service
                            </h5>
                            <button type="button" onClick={handleDrawerToggle} data-drawer-target="drawer-form" data-drawer-show="drawer-form" aria-controls="drawer-form" className="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 absolute top-3 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                                <XMarkIcon />
                            </button>

                            {service && (
                                <form className="space-y-2" method="post" onSubmit={handleUpdate}>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" id="name" defaultValue={service.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Service Name" required />
                                    </div>
                                    <div>
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Image</label>
                                        <input type="text" name="image" id="image" defaultValue={service.image} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 " placeholder="Image URL" required />
                                    </div>
                                    <div>
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                                        <input type="number" id="price" defaultValue={service.price} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Price (Rs.)" required />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                        <textarea id="description" rows="4" defaultValue={service.description} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  " placeholder="Write event description..."></textarea>
                                    </div>
                                    <div className="text-sm font-medium text-white mb-2">
                                        <div className="text-sm font-medium text-gray-700 mb-2">Date</div>
                                        <div className="flex flex-row items-center justify-between py-1">
                                            <input type="date" id="startdate" defaultValue={dateSlot.startDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " onChange={(e) => handleDateChange('startDate', e.target.value)} disabled />
                                            <div className="px-4 text-sm font-medium text-gray-700">to</div>
                                            <input type="date" id="enddate" defaultValue={dateSlot.endDate} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " onChange={(e) => handleDateChange('endDate', e.target.value)} disabled />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Time Slots</div>
                                        {timeSlots.map((slot, index) => (
                                            <div key={index} className="flex flex-row items-center justify-between py-1">
                                                <input type="time" id={`starttime-${index}`} defaultValue={slot.startTime} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)} required />
                                                <div className="px-4 text-sm font-medium text-gray-700">to</div>
                                                <input type="time" id={`endtime-${index}`} defaultValue={slot.endTime} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)} required />
                                            </div>
                                        ))}
                                        <button type="button" onClick={addTimeSlot} className="text-sky-700 text-base hover:underline cursor-pointer focus:outline-none">
                                            Add Time Slot
                                        </button>
                                    </div>
                                    <button type="submit" className="text-white justify-center flex items-center bg-sky-700 hover:bg-sky-800 w-full focus:ring-4 focus:ring-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                                        Update Service</button>
                                </form>
                            )}
                        </div>
                        <form onSubmit={handleDelete}>
                            <button type="submit" className="px-5 py-1.5 rounded-md bg-red-400 hover:bg-red-500 hover:text-gray-100">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>

                <div className="overflow-x-auto w-[40%] rounded-lg shadow-md ml-[45%] my-[3%]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-600 uppercase bg-blue-200">
                            <tr>
                                <th scope="col" className="py-3 text-center">
                                    Date
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    Time slot
                                </th>
                                <th scope="col" className="py-3 text-center">
                                    Booked By
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {service && service.timeslots && service.timeslots.map((slot, index) => (
                                slot.timeslot.map((time, timeIndex) => (
                                    <tr key={`${index}-${timeIndex}`} className="bg-transparent text-gray-600 hover:bg-blue-50">
                                        {timeIndex === 0 ? (
                                            <th scope="row" className="px-6 py-4 text-center font-medium">
                                                {slot.date}
                                            </th>
                                        ) : (
                                            <th scope="row" className="px-6 py-4"></th>
                                        )}
                                        <th scope="row" className="px-6 py-4 text-center font-light">
                                            <span>
                                                {time.startTime} - {time.endTime}
                                            </span>
                                        </th>
                                        <td className="px-6 py-4 text-center">
                                            {time.bookedBy ? (
                                                <div>
                                                    <button onClick={() => toggleVisibility(`${index}-${timeIndex}`)} data-ripple-dark="true" data-popover-target="profile-info-popover" className="middle none center rounded-lg py-3 px-6 font-sans text-sm font-semibold text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                                        {time.bookedBy.username}
                                                    </button>
                                                    <div className={`absolute max-w-[24rem] ${isProfileVisible[`${index}-${timeIndex}`] ? 'visible' : 'invisible'} whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`} data-popover="profile-info-popover">
                                                        <div className="mb-2 flex items-center justify-between gap-2">
                                                            <UserCircleIcon className="relative inline-block h-11 w-11 rounded-full object-cover object-center" />
                                                            <div className="block font-sans text-sm font-normal leading-normal text-gray-700">
                                                                <div>
                                                                    {time.bookedBy.email}
                                                                </div>
                                                                <div>
                                                                    {time.bookedBy.contactno}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center">-</div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};