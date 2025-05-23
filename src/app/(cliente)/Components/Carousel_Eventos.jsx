'use client'
import React, { useState, useEffect } from 'react';
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = ({ images, texts, resumen}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // siguinte imagen
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    //anterior imagen
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Cambio de imagen automática
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // 5 segundos

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className='relative w-full'>


            {/* Mueestra la imagen con flechas desiguinte y anterior */}
            <div className='relative h-[30rem] md:h-[44rem] lg:h-[44rem] object-cover'>
                
                <AnimatePresence>
                    <motion.img
                        key={currentImageIndex}
                        className="w-full object-cover h-[30rem] md:h-[44rem] lg:h-[44rem]"
                        src={images[currentImageIndex]}
                        alt="Carousel Image"
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                </AnimatePresence>

                <div className="absolute inset-y-0 left-0 z-10 flex items-center justify-center w-10 md:w-16 lg:w-20 " onClick={prevImage}>
                    <button class="p-0 w-8 h-8 md:w-14 md:h-14 bg-data-cherry-900 rounded-full hover:bg-data-cherry-950 active:shadow-lg mouse shadow transition ease-in duration-100 focus:outline-none flex justify-center items-center"
                    onClick={prevImage}>
                        <CgChevronLeft className='text-3xl md:text-5xl' color='#ffffff'/>
                    </button>
                </div>
                <div className="absolute inset-y-0 right-0 z-10 flex items-center justify-center w-10 md:w-16 lg:w-20" onClick={nextImage}>
                    <button class="p-0 w-8 h-8 md:w-14 md:h-14 bg-data-cherry-900 rounded-full hover:bg-data-cherry-950 active:shadow-lg mouse shadow transition ease-in duration-100 focus:outline-none flex items-center"
                    onClick={nextImage}>
                    <CgChevronRight className='text-3xl md:text-5xl' color='#ffffff'/>
                    </button>
                </div>
            </div>

            {/* Mestras los texto a medidad cambian las imagenes */}
            <motion.div 
                className="relative text-center bottom-0 bg-[#FCF4D7] text-black font-bold p-4 w-full"
                initial={{ x: 300, opacity: 0 }}  // Cambiado a opacity: 0
                animate={{ x: 0, opacity: 1 }}    // Cambiado a opacity: 1
                exit={{ x: -300, opacity: 0 }}    // Cambiado a opacity: 0
                transition={{ duration: 1 }}
            >
                <h1 className='text-[#732963] capitalize text-4xl'>
                    {texts[currentImageIndex]}
                </h1>           
                <br/> 
                <p className='text-2xl'>
                    {resumen[currentImageIndex]}
                </p>
            </motion.div>

        </div>
    );
};

export default Carousel;