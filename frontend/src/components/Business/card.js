import React from "react";

export default function Card(props) {
    const { name = "Create a Service Now", image = "https://www.artisticmoods.com/wp-content/uploads/tropicalia_by_mathiole-d31lvne.jpg", price = "", description = "" } = props.service;
    return (
        <div className="p-4 transform duration-500">
            <div className="flex flex-col shadow-md mx-auto transform hover:-translate-y-1 duration-300 hover:shadow-xl">
                <div className="overflow-hidden h-2/3">
                    <img className="w-full object-fill transform hover:scale-110 duration-200" style={{ height: "20pc" }} src={image} alt="" />
                </div>
                <div className="flex flex-col text-xl font-semibold text-gray-700 px-3 pt-3">{name}</div>
                <div className="flex flex-col text-base font-semibold text-gray-500 px-3 pb-3">{`Rs ${price}`}</div>
            </div>
        </div >
    );
};