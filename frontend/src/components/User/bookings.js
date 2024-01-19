import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useUserStore } from '../../store';

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
            if (j.success) {
                setAppointments(j.data);
            }
        }
        loadAppointments();
    }, [appointments.length]);

    return (
        <div className="px-20 flex flex-col justify-start items-center">
            <div className="text-lg font-semibold pt-10 pb-6">
                Pending Appointments
            </div>

            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <Link to={`/user/myapppointments/${appointment.id}`} className="flex flex-row h-full w-full bg-red-50/20 bg-opacity-60 border rounded-sm shadow-md transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
                        <div>
                            <img className="h-full w-full object-cover rounded-sm" src="https://www.instyle.com/thmb/okuYAdKVwA8NVR2qU1EvynFDIhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/358032313_672917074874413_1182875844247783602_n-b92f5d3e0fd74464abc182925b423811.jpg" alt="" />
                        </div>
                        <div>
                            <div className="flex flex-col shadow-md px-2 py-3">
                                <div className="text-gray-700 font-medium">{appointment.name}</div>
                                <div className="flex flex-row w-48 justify-between">
                                    <div>{appointment.business}</div>
                                    <div>{appointment.price}</div>
                                </div>
                            </div>
                            <div className="flex flex-row mx-6 my-3 justify-center items-center border rounded-lg bg-white">
                                <ClockIcon className="h-5 w-5" />
                                <div>{appointment.starttime} to {appointment.endtime}</div>
                            </div>
                            <div className="flex flex-row px-2 items-start">
                                <MapPinIcon className="h-6 w-6" />
                                <div className="text-sm">{appointment.loaction}</div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="flex flex-row text-gray-600">
                    <div className="text-3xl pr-4">: )</div>
                    <div className="py-2 text-lg">No appointmens found.</div>
                </div>
            )}

            {/* <div className="grid grid-cols-3 grid-rows-1 gap-10 ">
                
            </div> */}
        </div>
    );
};