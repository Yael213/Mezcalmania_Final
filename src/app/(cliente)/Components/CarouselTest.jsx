'use client'
import React, { useState, useEffect } from 'react'
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import Image from 'next/image'

const CarouselTest = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  useEffect(() => {
    const intervalId = setInterval(nextImage, 6000)
    return () => clearInterval(intervalId)
  }, [currentImageIndex])

  return (
    <div className="">
      <div className="py-8 sm:py-16 md:py-18 lg:py-28 xl:py-60">
        <Image
          src={images[currentImageIndex]}
          alt="Carousel Image"
          sizes="100%"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div
        className="absolute inset-y-0 left-0 z-10 flex items-center justify-center w-10 md:w-24"
      >
        <button class="p-0 w-8 h-8 md:w-14 md:h-14 bg-data-cherry-900 rounded-full hover:bg-data-cherry-950 active:shadow-lg mouse shadow transition ease-in duration-100 focus:outline-none flex justify-center items-center"
        onClick={prevImage}>
          <CgChevronLeft className='text-3xl md:text-5xl' color='#ffffff'/>
        </button>
      </div>

      <div
        className="absolute inset-y-0 right-0 z-10 flex items-center justify-center w-10 md:w-24 "
      >
        <button class="p-0 w-8 h-8 md:w-14 md:h-14 bg-data-cherry-900 rounded-full hover:bg-data-cherry-950 active:shadow-lg mouse shadow transition ease-in duration-100 focus:outline-none flex items-center"
        onClick={nextImage}>
          <CgChevronRight className='text-3xl md:text-5xl' color='#ffffff'/>
        </button>
        
        
      </div>
    </div>
  )
}

export default CarouselTest
