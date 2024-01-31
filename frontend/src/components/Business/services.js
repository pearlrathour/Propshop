import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { useBusinessStore, useFilterStore } from '../../store';

export default function Services() {
    const [services, setServices] = useState([]);
    const { sortBy, searchBy }= useFilterStore();
    const { businessId } = useBusinessStore();

    useEffect(() => {
        async function loadData() {
            const sortByFilter= sortBy? `${searchBy?'&':'?'}sortBy=${sortBy}` : '';
            const searchByFilter= searchBy? `${sortBy?'&':'?'}searchBy=${searchBy}` : '';
            const response = await fetch(`https://propshop-api.onrender.com/business/myservices${sortByFilter}${searchByFilter}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: businessId
                })
            });

            const j = await response.json();
            if (j.success) {
                setServices(j.data);
            }
        }
        loadData();
    }, [sortBy,searchBy]);

    return (
        <div className={`flex flex-row flex-wrap py-6 justify-start items-start text-3xl text-gray-400 ${services.length ? "" : "bg-teal-50"}`}>
            {services.length > 0 ? (
                services.map((service) => (
                    <Link key={service._id} to={`/business/myservices/${service._id}`} className="basis-1/4 cursor-pointer">
                        <Card service={service} />
                    </Link>
                ))
            ) : (
                <div className="h-full w-full flex flex-col justify-start items-center py-[21.4%] text-center text-gray-500">
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