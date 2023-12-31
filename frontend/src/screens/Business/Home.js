import React from "react";
import Sidebar from '../../components/sidebar';
import Services from "../../components/Business/services";
import Servicedrawer from "../../components/Business/servicedrawer";

export default function Home() {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="h-screen w-full flex flex-col justify-start items-center">
                <Servicedrawer />
                <Services />
            </div>
        </div>
    );
};