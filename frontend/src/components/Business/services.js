import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "./card";
import { useBusinessStore } from '../../store';

export default function Services() {
    const [services, setServices] = useState([]);
    const { businessId } = useBusinessStore();

    console.log(businessId);
    useEffect(() => {
        async function loadData() {
            const response = await fetch('http://localhost:4000/business/myservices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: businessId
                })
            });

            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        }
        loadData();
    }, [services.length]);

    return (
        <div className={`w-full flex flex-row flex-wrap mx-10 py-6 justify-start items-start text-3xl text-gray-400 ${services.length ? "" : "bg-slate-200"}`}>
            {services.length > 0 ? (
                services.map((service) => (
                    <Link key={service._id} to={`/business/myservices/${service._id}`} className="basis-1/4 cursor-pointer">
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
    );
};