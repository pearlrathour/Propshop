import React from "react";
import { Link } from 'react-router-dom';
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/solid';

export default function Bookings() {
    return (
        <div className="my-10 px-20 flex flex-col justify-start items-center">
            <div className="text-lg font-medium py-6">
                Pending Appointments
            </div>
            <div className="grid grid-cols-3 grid-rows-1 gap-10 ">
                <Link to="/business/service" className="flex flex-row h-full w-full bg-red-50/20 bg-opacity-60 border rounded-sm shadow-md transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
                    <div>
                        <img className="h-full w-full object-cover rounded-sm" src="https://www.instyle.com/thmb/okuYAdKVwA8NVR2qU1EvynFDIhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/358032313_672917074874413_1182875844247783602_n-b92f5d3e0fd74464abc182925b423811.jpg" alt="" />
                    </div>
                    <div>
                        <div className="flex flex-col shadow-md px-2 py-3">
                            <div className="text-gray-700 font-medium">Business Name</div>
                            <div className="flex flex-row w-48 justify-between">
                                <div>Service name</div>
                                <div>Rs 600</div>
                            </div>
                        </div>
                        <div className="flex flex-row mx-6 my-3 justify-center items-center border rounded-lg bg-white">
                            <ClockIcon className="h-5 w-5"/>
                            <div>11:00 to 11:30</div>
                        </div>
                        <div className="flex flex-row px-2 items-start">
                            <MapPinIcon className="h-6 w-6" />
                            <div className="text-sm">Ward no 7, Near Gandhi Chowk Hamiprur HP</div>
                        </div>
                    </div>
                </Link>
                <Link to="/business/service" className="flex flex-row h-full w-full bg-red-50/20 bg-opacity-60 border rounded-sm shadow-md transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
                    <div>
                        <img className="h-full w-full object-cover rounded-sm" src="https://www.instyle.com/thmb/okuYAdKVwA8NVR2qU1EvynFDIhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/358032313_672917074874413_1182875844247783602_n-b92f5d3e0fd74464abc182925b423811.jpg" alt="" />
                    </div>
                    <div>
                        <div className="flex flex-col shadow-md px-2 py-3">
                            <div className="text-gray-700 font-medium">Business Name</div>
                            <div className="flex flex-row w-48 justify-between">
                                <div>Service name</div>
                                <div>Rs 600</div>
                            </div>
                        </div>
                        <div className="flex flex-row mx-6 my-3 justify-center items-center border rounded-lg bg-white">
                            <ClockIcon className="h-5 w-5"/>
                            <div>11:00 to 11:30</div>
                        </div>
                        <div className="flex flex-row px-2 items-start">
                            <MapPinIcon className="h-6 w-6" />
                            <div className="text-sm">Ward no 7, Near Gandhi Chowk Hamiprur HP</div>
                        </div>
                    </div>
                </Link>
                <Link to="/business/service" className="flex flex-row h-full w-full bg-red-50/20 bg-opacity-60 border rounded-sm shadow-md transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
                    <div>
                        <img className="h-full w-full object-cover rounded-sm" src="https://www.instyle.com/thmb/okuYAdKVwA8NVR2qU1EvynFDIhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/358032313_672917074874413_1182875844247783602_n-b92f5d3e0fd74464abc182925b423811.jpg" alt="" />
                    </div>
                    <div>
                        <div className="flex flex-col shadow-md px-2 py-3">
                            <div className="text-gray-700 font-medium">Business Name</div>
                            <div className="flex flex-row w-48 justify-between">
                                <div>Service name</div>
                                <div>Rs 600</div>
                            </div>
                        </div>
                        <div className="flex flex-row mx-6 my-3 justify-center items-center border rounded-lg bg-white">
                            <ClockIcon className="h-5 w-5"/>
                            <div>11:00 to 11:30</div>
                        </div>
                        <div className="flex flex-row px-2 items-start">
                            <MapPinIcon className="h-6 w-6" />
                            <div className="text-sm">Ward no 7, Near Gandhi Chowk Hamiprur HP</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};