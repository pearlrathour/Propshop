import React from "react";

export default function Card(props) {
    const { name = "Create a Service Now", image = "https://www.artisticmoods.com/wp-content/uploads/tropicalia_by_mathiole-d31lvne.jpg", price = "", date = {} } = props.service;
    console.log("O",props);
    return (
        <div className="p-4 transform duration-500">
            <div className="flex flex-col bg-teal-50 shadow-md mx-auto transform hover:-translate-y-1 duration-300 rounded-sm hover:shadow-xl">
                <div className="overflow-hidden h-2/3 rounded-t-sm">
                    <img className="w-full object-fill transform hover:scale-110 duration-200" style={{ height: "20pc" }} src={image} alt="" />
                </div>
                <div className="flex flex-col text-lg text-center font-semibold text-gray-700 px-3 pt-3">{name}</div>
                <div className="flex flex-col text-base text-center font-semibold text-gray-500 pb-2">{`Rs ${price}`}</div>
                <div className="text-sm text-center tracking-wide text-gray-500 border-t border-gray-200 py-1.5">{date.startDate} to {date.endDate}</div>
            </div>
        </div >
    );
};