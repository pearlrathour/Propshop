import React from "react";
import Sidebar from '../../components/sidebar';
import ServiceCard from "../../components/servicecard";

export default function Home() {
    return (
        <div className="flex flex-row">
            <Sidebar/>
            <div className="h-screen w-full flex flex-col justify-start items-center">
                <ServiceCard/>
            </div>
        </div>
    );
};