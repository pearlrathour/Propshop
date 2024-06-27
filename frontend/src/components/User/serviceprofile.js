import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../store';
import Sidebar from './sidebar';
// import loader from '../../assets/loaders/loader1.gif';

export default function ServiceProfile() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const { userId } = useUserStore();
    const [service, setService] = useState([]);
    const [business, setBusiness] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlot, settimeSlot] = useState({ startTime: '', endTime: '', bookedBy: ''});

    async function loadService() {
        const response = await fetch(`http://localhost:4000/user/services/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serviceId: id
            })
        });
        const j = await response.json();
        if (j.success) {
            let servicedata = await j.servicedata;
            setService(servicedata);
            let businessdata = await j.businessdata;
            setBusiness(businessdata);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadService();
    }, []);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeSlot = (slot) => {
        settimeSlot({
            startTime: slot.startTime,
            endTime: slot.endTime,
            bookedBy: id
        });
    };

    useEffect(() => { }, [timeSlot]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/user/bookappointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                serviceId: id,
                date: selectedDate,
                timeslot: timeSlot
            })
        });
        const j = await response.json();
        if (j.success) {
            window.location.reload();
        }
    };

    if (loading) {
        return (
            <div className='w-full'>
                Loading...
            </div>
        )
    }

    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="h-screen w-full flex flex-row justify-between ml-[16.6%]">
                <div className="h-screen w-[33%] flex flex-col justify-start">
                    <div className="h-[65%] object-cover overflow-hidden">
                        <img className="h-full w-full" src={business.image} alt="" />
                    </div>
                    <div className="flex flex-col h-[35%] justify-start bg-indigo-50 space-y-2 p-6">
                        <div className="flex flex-col items-center">
                            <div className="text-xl font-semibold">{business.username}</div>
                            <div className="">{business.description}</div>
                        </div>
                        <div className="flex flex-row text-base space-x-2 pt-6">
                            <div>Contact No :</div>
                            <div>{business.contactno}</div>
                        </div>
                        <div className="flex flex-row text-base space-x-2">
                            <div>Email Address :</div>
                            <div>{business.email}</div>
                        </div>
                        <div className="flex flex-row text-base space-x-2">
                            <div>Location :</div>
                            <div>{business.location}</div>
                        </div>
                    </div>
                </div>
                <div className="h-[70%] w-[50%] my-[3%] mx-[10%] flex flex-row overflow-hidden bg-indigo-50 border border-gray-300 shadow-xl rounded-lg">
                    <div className="w-full border-r border-gray-300">
                        <div className="h-[75%] object-cover overflow-hidden">
                            <img className="h-full w-full" src={service.image} alt="" />
                        </div>
                        <div className="flex flex-col justify-between text-xl font-light px-4 py-4">
                            <div className="flex flex-row justify-between text-lg">
                                <div>{service.name}</div>
                                <div>Rs {service.price}</div>
                            </div>
                            <div className="text-base text-gray-700">{service.description}</div>
                        </div>
                    </div>
                    <div className="p-6 w-full">
                        <form action="" className="flex flex-col h-full justify-between" onSubmit={handleSubmit}>
                            <input type="date" id="date" name="date" min={service.date.startDate} max={service.date.endDate} className="border border-gray-300 rounded-lg p-2 text-gray-700" onChange={handleDateChange} />

                            {selectedDate && (
                                <div className="h-full flex flex-col space-y-4 py-6">
                                    {service.timeslots[0].timeslot?.map((slot) => (
                                        <div key={slot._id} className="flex flex-row space-x-2">
                                            <input type="radio" id={slot._id} name="timeslot" value={slot._id} className="w-4 h-4" onChange={() => handleTimeSlot(slot)} disabled={slot.bookedBy !== null}/>
                                            <label for={slot._id} className={`text-sm font-medium ${slot.bookedBy !== null ? 'text-gray-500' : 'text-gray-800'}`}>
                                                {`${slot.startTime} - ${slot.endTime}`}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button type="submit" className="text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm w-full px-3.5 py-1.5 my-4">
                                Book Slot
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};