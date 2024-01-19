import { useState, useEffect } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel() {
    const [services, setServices] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        async function loadServices() {
            const response = await fetch('http://localhost:4000/user/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const j = await response.json();
            if (j.success) {
                setServices(j.data);
            }
        }
        loadServices();
    }, []);

    const itemsPerPage = 4;
    const totalPages = Math.ceil(services.length / itemsPerPage);

    const previousSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(intervalId);
    }, [current]);

    const slides = Array.from({ length: totalPages }, (_, index) =>
        services.slice(index * itemsPerPage, (index + 1) * itemsPerPage)
    );

    return (
        <div className="overflow-hidden relative h-[50%] bg-green-100">
            <div className={`flex flex-row h-full transition ease-out duration-40`} style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="flex h-full w-full">
                        {slide.map((s, innerIndex) => (
                            <div key={innerIndex} className="h-full w-[25%] border border-gray-400 shadow-xl">
                                <img className="h-full w-full object-cover" src={s.image} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
                <button onClick={previousSlide}>
                    <BsFillArrowLeftCircleFill />
                </button>
                <button onClick={nextSlide}>
                    <BsFillArrowRightCircleFill />
                </button>
            </div>

            {/* <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
                {slides.map((s, i) => (
                    <div
                        onClick={() => {
                            setCurrent(i);
                        }}
                        key={"circle" + i}
                        className={`rounded-full w-5 h-5 cursor-pointer  ${i === current ? "bg-white" : "bg-gray-500"}`}
                    ></div>
                ))}
            </div> */}
        </div>
    );
}
