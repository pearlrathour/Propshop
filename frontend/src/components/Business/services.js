import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./card";
import { useBusinessStore } from '../../store';

export default function Services() {
    const [services, setServices] = useState([]);
    const { businessId } = useBusinessStore();

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
    }, [businessId]);

    return (
        <div className="flex flex-row flex-wrap px-10 justify-start items-start text-3xl text-gray-400">
            {services.map((service) => (
                <Link key={service._id} to={`/business/myservices/${service._id}`} className="basis-1/4 cursor-pointer">
                    <Card service={service} />
                </Link>
            ))}
        </div>
    );
};