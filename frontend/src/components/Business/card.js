import React from "react";

export default function Card() {
    return (
        <section className="transform duration-500">
            <article className="h-[55%] flex flex-col shadow-md mx-auto transform hover:-translate-y-1 duration-300 hover:shadow-xl">
                <div className="overflow-hidden h-2/3">
                    <img className="w-full h-auto transform hover:scale-110 duration-200" src="https://www.artisticmoods.com/wp-content/uploads/tropicalia_by_mathiole-d31lvne.jpg" alt="" />
                </div>
                <div className="flex flex-col p-3">
                    <div className="flex flex-row  justify-between text-xl font-semibold text-gray-700">
                        <div>Sevice Title</div>
                        <div>Rs 300</div>
                    </div>
                </div>
                <p className="text-base font-light leading-relaxed text-gray-400 px-3 pb-2">Description opwdisuyd djfghjx edgx cdjchjwe cdhgghjdc dchjdkcjkbdc chdcjkdc vndklvdjkfvb dhdjkdkld fnewklfhf csdckjbcc cjkdcbdb</p>
                <div className="flex flex-row justify-between items-center px-3 pb-4 text-base font-normal text-gray-700">
                    <div className="text-green-500">
                        6 Booked slots
                    </div>
                    <div className="text-red-500">
                        5 Empty Slots
                    </div>
                </div>
            </article>
        </section >
    );
};