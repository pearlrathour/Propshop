import React from "react";
import Sidebar from '../../components/User/sidebar';
import Carousel from "../../components/User/carousel";
import Bookings from "../../components/User/bookings";

export default function Home() {
    return (
        <div className="w-screen flex flex-row">
            <Sidebar />
            <div className="w-full flex flex-col justify-start items-center ml-[16.6%]">
                {/* <Carousel/> */}
                <Bookings/>
            </div>
        </div>
    );
};
