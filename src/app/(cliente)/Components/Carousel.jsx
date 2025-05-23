'use client'
import React, { useState } from 'react';

const Carousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
            <div className='flex relative bg-lime-600'>
                <img className="w-screen object-cover h-[44rem]" src={images[currentImageIndex]} alt="Carousel Image" />
                <div className="absolute inset-y-0 left-0 z-10 flex items-center justify-center w-10 md:w-16 bg-black bg-opacity-50"  onClick={prevImage}>
                    <button className="text-white font-bold text-[70px]">&#8249;</button>
                </div>
                <div className="absolute inset-y-0 right-0 z-10 flex items-center justify-center w-10 md:w-16 bg-black bg-opacity-50" onClick={nextImage}>
                    <button className="text-white font-bold text-[70px]" >&#8250;</button>
                </div>
            </div>
        
    );
};

export default Carousel;
