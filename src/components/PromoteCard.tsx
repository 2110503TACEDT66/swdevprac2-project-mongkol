"use client"
import { useState, useEffect } from "react";

export default function PromoteCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideImages = [
        "/img/cover.png",
        "/img/cover2.png",
        "/img/cover3.png",
        // Add more image paths as needed
    ];

    const text = [
        "Accessible Care: Our dental clinic offers hassle-free booking options and convenient locations, ensuring you can prioritize your oral health without disrupting your busy schedule. With streamlined appointment scheduling, you can easily book your visit and receive quality dental care when you need it most.",
        "Expertise and Excellence: With a team of experienced dentists and cutting-edge technology, we deliver personalized and high-quality dental services tailored to your individual needs. From routine check-ups to advanced procedures, we prioritize your comfort and satisfaction, providing comprehensive care to maintain your oral health.",
        "Safety Assurance: Your safety is our utmost priority. We strictly adhere to sterilization protocols and follow the latest guidelines to maintain a clean and sanitized environment in our clinic. Rest assured, from the moment you step in, you'll receive exceptional dental care in a safe and hygienic setting, ensuring your peace of mind throughout your visit."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
        }, 3000); // Auto-slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200 flex flex-row relative overflow-hidden">
            {/* Slideshow images */}
            {slideImages.map((image, index) => {
                const position = index === currentIndex ? "0%" : index === (currentIndex + 1) % slideImages.length ? "-100%" : "100%";
                const opacity = index === currentIndex ? 1 : 0;
                return (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="absolute top-0 h-full transition-all duration-1000"
                        style={{ right: position, opacity }}
                    />
                );
            })}
            {/* Text content */}
            <div className="m-5 text-black z-10">
                <p className="mb-4">Why Booking with Us ??</p>
                <p className="text-lg font-serif italic drop-shadow-lg">{text[currentIndex]}</p>
            </div>
        </div>
    );
}
