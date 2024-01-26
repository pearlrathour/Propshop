import React from "react";
import Sidebar from '../../components/Business/sidebar';
import Services from "../../components/Business/services";

export default function Home() {
    return (
        <div className="flex flex-row w-screen">
            <Sidebar/>
            <div className="w-full ml-[16.5%]" >
                <Services />
            </div>
        </div>
    );
};