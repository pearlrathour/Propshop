import React, { useState } from "react";
import Sidebar from './sidebar';

export default function ServiceProfile() {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="h-screen w-full flex flex-row justify-between">
                <div className="h-screen w-[30%] flex flex-col justify-start">
                    <div className="h-[65%] object-cover overflow-hidden">
                        <img className="h-full w-full" src="https://www.instyle.com/thmb/okuYAdKVwA8NVR2qU1EvynFDIhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/358032313_672917074874413_1182875844247783602_n-b92f5d3e0fd74464abc182925b423811.jpg" alt="" />
                    </div>
                    <div className="flex flex-col justify-start bg-slate-200 space-y-1 px-4 py-8">
                        <div className="flex flex-col items-center">
                            <div className="text-xl font-semibold">Business Name</div>
                            <div className="">Best hdgkjd klsdjhjgd dkjsdjgd djkh</div>
                        </div>
                        <div className="flex flex-row text-base space-x-2 pt-6">
                            <div>Contact No :</div>
                            <div>8978687897</div>
                        </div>
                        <div className="flex flex-row text-base space-x-2">
                            <div>Email Address :</div>
                            <div>8978687897</div>
                        </div>
                        <div className="flex flex-row text-base space-x-2">
                            <div>Location :</div>
                            <div>House NO 99 Ward no 10 Hamirpur HP </div>
                        </div>
                    </div>
                </div>
                <div className="h-[70%] w-[50%] my-[3.5%] mx-[10%] flex flex-row overflow-hidden bg-slate-200 border border-gray-300 shadow-xl rounded-lg">
                    <div className="w-full border-r border-gray-400">
                        <div className="h-[75%] object-cover overflow-hidden">
                            <img className="h-full w-full" src="https://www.instyle.com/thmb/okuYAdKVwA8NVR2qU1EvynFDIhs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/358032313_672917074874413_1182875844247783602_n-b92f5d3e0fd74464abc182925b423811.jpg" alt="" />
                        </div>
                        <div className="flex flex-col border justify-between text-xl font-light px-4 py-4">
                            <div className="flex flex-row justify-between text-lg">
                                <div>SERVICE TITLE</div>
                                <div>Rs 500</div>
                            </div>
                            <div className="text-base text-gray-700">description</div>
                        </div>

                    </div>
                    <div className="p-6 w-full">
                        <form action="" className="flex flex-col justify-between">
                            <div class="h-full grid grid-rows-10 grid-cols-2 gap-3">
                                <div className="flex flex-row space-x-2">
                                    <input id="remember" type="radio" value="" className="w-4 h-4" />
                                    <label for="remember" class="text-sm font-medium text-gray-900">11:30 - 12.00</label>
                                </div>
                            </div>
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-3.5 py-1.5 my-4">Book Slot</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};