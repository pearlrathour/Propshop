import React from "react";

export default function Card(props) {
    const { name = "Create a Service Now", image = "https://www.artisticmoods.com/wp-content/uploads/tropicalia_by_mathiole-d31lvne.jpg", price = "", description = "" } = props.service;
    return (
        <section className="p-4 transform duration-500">
            <article className="flex flex-col bg-green-800 shadow-md mx-auto transform hover:-translate-y-1 duration-300 hover:shadow-xl">
                <div className="overflow-hidden h-2/3">
                    <img className="w-full object-fill transform hover:scale-110 duration-200" style={{ height: "20pc" }} src={image} alt="" />
                </div>
                <div className="flex flex-col text-xl font-semibold text-gray-700 px-3 pt-3">{name}</div>
                <div className="flex flex-col text-base font-semibold text-gray-500 px-3">{`Rs ${price}`}</div>
                <div className="flex flex-row justify-between items-center px-3 pb-4 text-base font-normal text-gray-700">
                    <div className="text-green-500">
                        6 Booked slots
                    </div>
                    <div className="text-red-500">
                        5 Empty slots
                    </div>
                </div>
            </article>
        </section >
    );
};