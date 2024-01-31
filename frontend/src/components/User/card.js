import React from "react";
import { MapPinIcon } from '@heroicons/react/24/solid';

export default function Card(props) {
    const { name = "Service Name", businessId = {}, image= "https://www.artisticmoods.com/wp-content/uploads/tropicalia_by_mathiole-d31lvne.jpg", price = "", description=""} = props.service;
    const { username = "Businessname", location="Loc"} = businessId;

    return (
        <div className="p-4 transform duration-500">
            <div className="flex flex-col bg-indigo-50 rounded-sm shadow-md mx-auto transform hover:-translate-y-1 duration-300 hover:shadow-xl">
                <div className="overflow-hidden h-2/3">
                    <img className="w-full object-fill rounded-t-sm transform hover:scale-110 duration-200" style={{ height: "20pc" }} src={image} alt="" />
                </div>
                <div className="text-xl font-semibold text-gray-700 px-3 pt-3">{name}</div>
                <div className="flex flex-row justify-between px-3 py-2">
                    <div>{businessId.username}</div>
                    <div className="flex flex-col text-base font-semibold text-gray-500 px-3">Rs.{price}</div>
                </div>
                <div className="flex flex-row justify-start items-center mt-auto border-t border-gray-200 px-3 py-2 text-base font-normal text-gray-700">
                    <MapPinIcon className="h-7 w-5 text-blue-600" />
                    <div>{businessId.location}</div>
                </div>
            </div>
        </div >
    );
};