import React, { useState } from "react";
import Sidebar from '../../components/User/sidebar';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Card() {
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="h-screen w-full flex flex-row justify-start">
                <div className="h-screen w-4/12 flex flex-col">
                    <div className="h-5/6 object-cover overflow-hidden">
                        <img className="h-full w-full" src="https://www.instyle.com/thmb/okuYAdKVwA8NVR2qU1EvynFDIhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/358032313_672917074874413_1182875844247783602_n-b92f5d3e0fd74464abc182925b423811.jpg" alt="" />
                    </div>
                    <div className="flex flex-row justify-between bg-slate-200 text-xl font-light px-8 py-12">
                        <div>SERVICE TITLE</div>
                        <div>Rs 500</div>
                    </div>
                </div>

                <div className="flex flex-row justify-between items-start space-x-60 py-6 px-16">
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-600 uppercase bg-green-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Booked Slot
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Booked By
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-transparent text-gray-600 hover:bg-green-50">
                                    <th scope="row" className="px-6 py-4">
                                        11:00 - 11:30
                                    </th>
                                    <td className="px-6 py-4">
                                        <button onClick={() => setIsProfileVisible(!isProfileVisible)} data-ripple-dark="true" data-popover-target="profile-info-popover" className="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                            Username
                                        </button>
                                        <div className={`absolute max-w-[24rem] ${isProfileVisible ? 'visible' : 'invisible'} whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none`} data-popover="profile-info-popover">
                                            <div className="mb-2 flex items-center justify-between gap-2">
                                                <UserCircleIcon className="relative inline-block h-11 w-11 rounded-full object-cover object-center" />
                                                <div className="block font-sans text-sm font-normal leading-normal text-gray-700">
                                                    <div>
                                                        Phone no
                                                    </div>
                                                    <div>
                                                        Email Address
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <link rel="stylesheet" href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css" />
                                        <script type="module" src="https://unpkg.com/@material-tailwind/html@latest/scripts/popover.js" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-600 uppercase bg-red-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Booked Slot
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-transparent text-gray-600 hover:bg-red-50">
                                    <th scope="row" className="px-6 py-4">
                                        11:00 - 11:30
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};