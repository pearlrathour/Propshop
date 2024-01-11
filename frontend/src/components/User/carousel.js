import { useState, useEffect } from "react";
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    const previousSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 2000);

        return () => clearInterval(intervalId);
    }, [current]);

    const slides = [
        "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
        "https://wallpapercave.com/wp/wp3386769.jpg",
        "https://wallpaperaccess.com/full/809523.jpg",
        "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
        "https://wallpapercave.com/wp/wp12396581.jpg",
        "https://wallpapercave.com/wp/wp11784737.jpg",
        "https://wallpapercave.com/wp/wp12412919.jpg",
        "https://wallpapercave.com/wp/wp5502431.jpg",
        "https://wallpapercave.com/wp/wp7495679.jpg",
    ];

    return (
        <div className="overflow-hidden relative">
            <div className={`flex transition ease-out duration-40`} style={{ transform: `translateX(-${current * 100}%)` }}>
                {slides.map((s, index) => (
                    <img key={index} src={s} alt={`Slide ${index + 1}`} />
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
