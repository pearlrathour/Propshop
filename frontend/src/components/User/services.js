import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../User/sidebar';
import Card from "./card";

export default function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        async function loadServices() {
            const response = await fetch('http://localhost:4000/user/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const j = await response.json();
            if (j.success) {
                setServices(j.data);
            }
        }
        loadServices();
    }, []);

    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="w-full flex flex-row flex-wrap px-[1%] py-[1%] justify-start items-start transform duration-500">
                {services.length > 0 ? (
                    services.map((service) => (
                        <Link key={service._id} to={`/user/services/${service._id}`} className="basis-1/4 cursor-pointer">
                            <Card service={service} />
                        </Link>
                    ))
                ) : (
                    <div className="h-screen w-full flex flex-col justify-start items-center py-[15%] text-center text-gray-500">
                        <div className="flex flex-row py-4">
                            <div className="text-3xl pr-4">: )</div>
                            <div>No services found.</div>
                        </div>
                        <div className="text-xl font-medium pl-9">Add your first service now!</div>
                    </div>
                )}
            </div>
        </div>
    );
};