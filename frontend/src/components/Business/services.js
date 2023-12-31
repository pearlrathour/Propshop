import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./card";

export default function Services() {
    let data = [];

    useEffect(() => {
        async function loadData() {
            data = await fetch("http://localhost:4000/business/myservices");
        }
    },[]);
    
    return (
        <div className="flex flex-row flex-wrap px-10 justify-start items-start gap-x-[7%] text-3xl bg-red-500 text-gray-400 my-[2%]">
            <Link to="/business/service/${id}" className="basis-1/4 cursor-pointer bg-gray-500">
                <Card />
            </Link>
        </div>
    );
};