import React, { useState } from "react";
import Swipe from "react-easy-swipe";

export default function Carousel() {
    const CarouselData = [
        {   
            index: 1,
            image:
                "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
            index: 2,
            image:
                "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
        },
        {
            index:3,
            image:
                "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        },
        {   
            index: 4,
            image:
                "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
        },
        {
            index: 5,
            image:
                "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        },
    ];
    
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSwipe = (direction) => {
        if (direction === "left") {
          setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? CarouselData.length - 1 : prevSlide - 1
          );
        } else if (direction === "right") {
          setCurrentSlide((prevSlide) =>
            prevSlide === CarouselData.length - 1 ? 0 : prevSlide + 1
          );
        }
      };

    return (
        <div className="w-full shadow-2xl">
            <Swipe onSwipeLeft={() => handleSwipe("left")} onSwipeRight={() => handleSwipe("right")}>
                <div className="max-w-lg h-60 flex overflow-hidden relative">
                    {CarouselData.map((slide, index) => (
                        <img
                            key={index}
                            src={slide.image}
                            alt="This is a carousel slide"
                            className={index === currentSlide ? "block w-full h-auto object-cover" : "hidden"}
                        />
                    ))}
                </div>
            </Swipe>
        </div>
    );
};