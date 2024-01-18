import React from "react";
import Sidebar from '../../components/User/sidebar';
import Carousel from "../../components/User/carousel";
import Bookings from "../../components/User/bookings";

export default function Home() {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="h-screen w-full flex flex-col justify-start items-center">
                <Carousel/>
                <Bookings/>
            </div>
        </div>
    );
};
