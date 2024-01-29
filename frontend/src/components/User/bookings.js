import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store';
import { ClockIcon, MapPinIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function Bookings() {
    const [appointments, setAppointments] = useState([]);
    const { userId } = useUserStore();

    useEffect(() => {
        async function loadAppointments() {
            const response = await fetch('http://localhost:4000/user/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId
                })
            });

            const j = await response.json();
            console.log(j)
            if (j.success) {
                setAppointments(j.data);
            }
        }
        loadAppointments();
    }, [appointments.length]);
    console.log(appointments);

    const handleDelete = async (appointmentId, serviceId, date, timeslot, e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/user/cancelappointment", {
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

            <div className="w-full grid grid-cols-3 gap-6 justify-between items-start transform duration-500">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <Link to={`/user/services/${appointment.serviceId}`} key={appointment._id} className="flex flex-row h-full bg-red-50/20 bg-opacity-60 border rounded-sm shadow-md transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
                            <div className="h-full w-[75%] relative">
                                <img className="h-full w-full object-cover" src={appointment.image} alt="" />
                                <form action="post" className="absolute top-0 right-0 p-3">
                                    <button type="submit" className="flex flex-row justify-around" onClick={(e) => handleDelete(appointment.appointmentId, appointment.serviceId, appointment.date, appointment.timeslot, e)}>
                                        <TrashIcon className="h-5 w-6 hover:h-6 text-gray-800" />
                                    </button>
                                </form>
                            </div>
                            <div className="w-full flex flex-col justify-between">
                                <div className="flex flex-col gap-y-4">
                                    <div className="px-3 py-3 shadow-md">
                                        <div className="text-gray-700 text-base font-semibold">{appointment.businessname}</div>
                                        <div className="flex flex-row w-full justify-between pt-1">
                                            <div>{appointment.name}</div>
                                            <div>Rs.{appointment.price}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row mx-8 py-0.5 justify-around items-center border border-gray-200 rounded-lg">
                                        <ClockIcon className="h-5 w-5" />
                                        <div>{appointment.timeslot.startTime} to {appointment.timeslot.endTime}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start px-2 py-2 border-t border-gray-200">
                                    <MapPinIcon className="h-5 w-6" />
                                    <div className="text-sm tracking-tight">{appointment.location}</div>
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