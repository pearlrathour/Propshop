import React from "react";

export default function Card() {
    return (
        <section className="container px-10 grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-10 transform duration-500">
            <article className="h-[55%] flex flex-col shadow-md mx-auto max-w-sm transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
                <div className="overflow-hidden h-2/3">
                    <img className="w-full h-auto transform hover:scale-110 duration-200" src="https://www.artisticmoods.com/wp-content/uploads/tropicalia_by_mathiole-d31lvne.jpg" alt="" />
                </div>
                <div className="flex flex-col p-3">
                    <div className="flex flex-row  justify-between text-xl font-semibold text-gray-700">
                        <div>Sevice Title</div>
                        <div>Rs 300</div>
                    </div>
                </div>
                <p className="text-base font-light leading-relaxed text-gray-400 px-3 pb-2">Description</p>
                <div className="flex flex-row justify-between items-center px-3 text-base font-normal text-gray-700">
                    <div>
                        6 Booked slots
                    </div>
                    <div>
                        5 Empty Slots
                    </div>
                </div>
            </article>
        </section >
    );
};