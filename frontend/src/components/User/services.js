import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useFilterStore } from '../../store';
import Sidebar from '../User/sidebar';
// import Loader from '../Loader';
import Card from "./card";

export default function Services() {
    // const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const { sortBy, searchBy } = useFilterStore();

    useEffect(() => {
        async function loadServices() {
            const sortByFilter = sortBy ? `${searchBy ? '&' : '?'}sortBy=${sortBy}` : '';
            const searchByFilter = searchBy ? `${sortBy ? '&' : '?'}searchBy=${searchBy}` : '';
            const response = await fetch(`https://propshop-api.onrender.com/user/services${sortByFilter}${searchByFilter}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const j = await response.json();
            if (j.success) {
                setServices(j.data);
                // setLoading(false);
            }
        }
        loadServices();
    }, [sortBy, searchBy]);

    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="w-full flex flex-row flex-wrap ml-[16%] px-[1%] py-[1%] justify-start items-start transform duration-500">
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
                        </div>
                    )}
                </div>
        </div>
    );
};