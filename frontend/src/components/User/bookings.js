import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store';
import { ClockIcon, MapPinIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function Bookings() {
    const [appointments, setAppointments] = useState([]);
    const { userId } = useUserStore();

    useEffect(() => {
        async function loadAppointments() {
            const response = await fetch('https://propshop-api.onrender.com/user/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId
                })
            });

            const j = await response.json();
            if (j.success) {
                setAppointments(j.data);
            }
        }
        loadAppointments();
    }, [appointments.length]);

    const handleDelete = async (appointmentId, serviceId, date, timeslot, e) => {
        e.preventDefault();

        const response = await fetch('https://propshop-api.onrender.com/user/cancelappointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                appointmentId: appointmentId,
                serviceId: serviceId,
                date: date,
                timeslot: timeslot
            })
        });
        const j = await response.json();
        if (j.success) {
            window.location.reload();
        }
    };

    return (
        <div className="px-[2%] flex flex-col justify-start items-center">
            <div className="text-lg font-semibold pt-10 pb-6">
                Pending Appointments
            </div>

            <div className="w-full grid grid-cols-4 gap-8 justify-between items-start transform duration-500">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <Link to={`/user/services/${appointment.serviceId}`} key={appointment._id} className="flex flex-col h-[60%] bg-red-50/20 bg-opacity-60 border rounded-sm shadow-md transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
                            <div className="h-full w-full relative">
                                <img className="h-full w-full object-fill" src={appointment.image} alt="" />
                                <form action="post" className="absolute top-0 right-0 p-3">
                                    <button type="submit" className="flex flex-row justify-around" onClick={(e) => handleDelete(appointment.appointmentId, appointment.serviceId, appointment.date, appointment.timeslot, e)}>
                                        <TrashIcon className="h-5 w-6 hover:h-6 text-gray-800 hover:text-red-700" />
                                    </button>
                                </form>
                            </div>
                            <div className="w-full flex flex-col justify-between bg-blue-50">
                                <div className="flex flex-col gap-y-1">
                                    <div className="px-5 pt-3">
                                        <div className="text-gray-700 text-lg font-semibold">{appointment.businessname}</div>
                                        {/* <div className="flex flex-row w-full justify-between pt-1">
                                            <div>{appointment.name}</div>
                                            <div>Rs.{appointment.price}</div>
                                        </div> */}
                                    </div>
                                    <div className="flex flex-col items-stretch mx-3 pb-3">
                                        {/* <div className="flex flex-row items-start px-6 pb-1">
                                            <MapPinIcon className="h-5 w-6" />
                                            <div className="text-sm text-center tracking-tight">{appointment.location}</div>
                                        </div> */}
                                        <div className="flex flex-row items-start py-1.5 bg-white justify-around border border-gray-250 rounded-lg">
                                            <ClockIcon className="h-5 w-5"/>
                                            <div>{appointment.date}</div>
                                            <div>{appointment.timeslot.startTime} to {appointment.timeslot.endTime}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex flex-row w-full justify-center text-gray-600">
                        <div className="text-3xl pr-4">: )</div>
                        <div className="py-2 text-lg">No appointments found.</div>
                    </div>
                )}
            </div>
        </div>
    );
};