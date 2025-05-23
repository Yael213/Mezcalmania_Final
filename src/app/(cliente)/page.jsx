'use client'

import Image from 'next/image'
import CarouselTest from './Components/CarouselTest'
import Carrucel from './Components/Carrucel'
import Card2 from './Components/Card2'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Hero = () => {
  return (
    <header className="text-white text-center z-50">
      <div className="flex justify-center items-center relative bg-data-cherry-800">
      <Carrucel/>
        <div className="absolute top-1/4 left-0 w-full h-full flex justify-center items-center font-outfit">
          <Link href={'/nosotras'}>
            <button className='relative inline-block px-2 py-0 pb-1 md:px-8 md:py-3 font-medium group z-10'>
              <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 bg-white drop-shadow-lg group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
              <span className='absolute inset-0 w-full h-full bg-[#D2004C] border-2 border-[#D2004C] group-hover:border-white group-hover:bg-white'></span>
              <span className="relative text-white font-outfit text-xm md:text-2xl group-hover:text-[#D2004C]">NOSOTRAS</span>
            </button>
          </Link>
          
        </div>
      </div>
    </header>
  )
}

const CarouselTestMezcaleras = ({ images }) => {
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
    const intervalId = setInterval(nextImage, 2000)
    return () => clearInterval(intervalId)
  }, [currentImageIndex])

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center w-full h-full p-10 pb-20 bg-data-cherry-850 pt-20 ">
      <div className="absolute h-96 w-96 sm:left-52 bottom-40">
        <Image
          src={images[currentImageIndex].pathCintillo}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="absolute h-96 w-96 sm:right-52 top-40">
        <Image
          src={images[currentImageIndex].pathCintillo}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div
        className={`${images[currentImageIndex].color} md:w-2/3 md:h-3/4 relative flex md:flex-row flex-col justify-between p-8 py-12`}
      >
        <div
          className=" inset-y-0 left-0 z-10 flex items-center justify-center w-10 md:w-16 "
          onClick={prevImage}
        >
          <button className="text-white">&#8249;</button>
        </div>

        <a href="/nosotras">
          <div className="md:flex">
            <div className="w-full p-4 px-14 font-outfit font-semibold text-2xl">
              <p className="">
                Sumérgete en las historias de nuestras talentosas mezcaleras y
                su pasión por el arte ancestral del mezcal
              </p>
              <h1 className="h-1/3 align-bottom text-data-yellow-200 text-2xl">
                {images[currentImageIndex].name}
              </h1>
            </div>
            <div className="bg-white w-auto h-64 md:w-1/2 relative">
              <Image
                src={images[currentImageIndex].path}
                alt="delia image"
                sizes="100%"
                layout="fill"
                objectFit="contain"
                className="h-full"
              />
            </div>
          </div>
        </a>

        <div
          className=" inset-y-0 right-0 z-10 flex items-center justify-center w-10 md:w-16 "
          onClick={nextImage}
        >
          <button className="text-white">&#8250;</button>
        </div>
      </div>
    </div>
  )
}

const Information = () => {
  return (
    <div className="relative flex flex-col md:flex-row justify-center bg-data-cherry-850 md:h-[44rem]">
      <div className="relative w-full h-[28rem] md:w-3/5 md:h-full lg:w-full flex justify-center ">
        <div className="relative w-5/6 h-full">
          <Image
            src="/Images/delia.png"
            alt="Delia"
            sizes="100%"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="md:relative w-full md:w-3/5 font-outfit text-data-yellow-300 pt-3 px-10 flex flex-col justify-center">
        <div className="z-20">
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-data-yellow -mt-6 text-center">
            NUESTRO MEZCAL
          </h1>
          <p className="leading-loose text-white font-semibold mt-4 p-4 text-2xl md:text-2xl xl:text-3xl text-center">
            Descubre la esencia de Michoacán en cada sorbo de nuestros mezcales.
            Elaborados con pasión por mujeres Michoacanas, cada botella es un
            tributo a la rica tradición de los sabores y aromas de Michoacán
          </p>
        </div>
        <div className="z-10">
          <div className="hidden md:flex absolute top-[-5.8rem] md:top-0 right-0 h-2/5 w-2/5 ">
            <Image
              src="/Images/maguey_arriba.png"
              alt="Maguey superior"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="hidden md:flex absolute bottom-[-5.8rem] md:bottom-0 right-0 h-2/5 w-2/5">
            <Image
              src="/Images/maguey_abajo.png"
              alt="Maguey inferior"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Divider = () => {
  return (
    <div className="">
      <img
        src="Images/pattern.jpg"
        alt="Divider"
        className="w-full h-[3rem] object-cover"
      />
    </div>
  )
}

const Products = () => {
  return (
    <div className="bg-white">
      <div className="flex md:flex-row flex-col justify-between font-roboto items-center pt-18 pb-8 mx-14">
        <p className="font-bungee text-[#A21037] text-3xl md:text-4xl lg:text-5xl py-7">
          NUESTROS PRODUCTOS
        </p>
        <Link href={'/tienda'}>
          <button className="flex h-10 text-data-cherry-860 hover:bg-data-cherry-860 hover:text-white font-outfit font-extrabold border-2 border-data-cherry-860 px-2 items-center transition duration-400">
            VER TODOS NUESTROS PRODUCTOS
          </button>
        </Link>
      </div>

      <div className="flex justify-around pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-y-10 gap-x-10 md:gap-x-3 lg:gap-x-10 xl:gap-x-28 ">
          <Card2 foto="/Images/Mezcales/MujeresMezcaleras.png" color="bg-[#BC372E] hover:bg-[#9C2922]" id={33} />
          <Card2 foto="/Images/Mezcales/459.png" color="bg-[#2D0B0B] hover:bg-[#3F1616]" id={34} />
          <Card2 foto="/Images/Mezcales/Mata.png" color="bg-[#BC372E] hover:bg-[#9C2922]" id={36} />
        </div>
      </div>

      <div className="relative h-screen ">
        <Image
          src={'/Images/lineas2.svg'}
          alt="Lineas coloridas"
          layout="fill"
          objectFit="cover"
        />

        <div className="bg-data-cherry-400 flex lg:flex-row flex-col absolute pb-6 lg:-top-12 lg:m-36 h-3/4 m-8 ">
          <div className="lg:w-1/2 w-full h-full pt-6 relative">
            <div className="bg-white text-black relative left-[12%] top-[12%]  h-3/4 w-3/4">
              <Image
                src="/Images/agaves.png"
                alt="Agaves"
                className="z- p-4"
                fill={true}
              />
            </div>
          </div>
          <div className="align-middle items-center flex flex-col px-4 lg:px-0 lg:pr-6 justify-center lg:w-1/2  font-outfit text-center ">
            <h1 className="text-[#A33B57] font-bold lg:text-2xl xl:text-3xl">
              LAS MUJERES EN LA ELABORACIÓN DEL{' '}
              <span className="text-white">MEZCAL</span>
            </h1>
            <p className=" py-4 md:text-base lg:text-xl xl:text-2xl font-outfit text-white ">
              Descubre el alma femenina detrás del mezcal Michoacano.
              Acompañanos en un viaje a través de la historia y la tradición de
              las mujeres mezcaleras de Michoacán. ¡Conoce a nuestras
              integrantes!
            </p>
            <Link href='/nosotras'>
              <button className='relative inline-block w-32 md:w-24 lg:w-52 h-7 lg:h-12 font-medium group'>
                  <span className='absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-2 translate-y-1.5 bg-white group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                  <span className='absolute inset-0 w-full h-full bg-[#A33B57] border-2 border-[#A33B57] group-hover:border-white group-hover:bg-white'></span>
                  <span className="relative text-white text-sm lg:text-base font-outfit group-hover:text-[#A33B57]">NUESTRA HISTORIA</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div name="home">
      <div className="bg-white h-[5rem] text-data-cherry-500 text-center flex justify-center font-bungee text-xl md:text-4xl lg:text-5xl 2xl:text-6xl  items-center">
        <h1>MUJERES MEZCALERAS DE MICHOACÁN</h1>
      </div>
      <Divider />
      <Hero />
      <Divider />
      <Information />
      <Products />
      <CarouselTestMezcaleras
        images={[
          {
            name: 'DELIA GARCIA',
            path: '/Images/Fotos/DELIA_GARCIA.jpg',
            pathCintillo: '/Images/Carrucel/DELIA_GARCIA.png',
            color: 'bg-[#3E5A51]',
          },
          {
            name: 'ARGENTINA',
            path: '/Images/Fotos/ARGENTINA.jpg',
            pathCintillo: '/Images/Carrucel/ARGENTINA.png',
            color: 'bg-[#782323]',
          },
          {
            name: 'ALONDRA',
            path: '/Images/Fotos/ALONDRA.jpg',
            pathCintillo: '/Images/Carrucel/ALONDRA.png',
            color: 'bg-[#7B4295]',
          },
          {
            name: 'ZAIRA',
            path: '/Images/Fotos/ZAIRA.jpg',
            pathCintillo: '/Images/Carrucel/ZAIRA.png',
            color: 'bg-[#A37F00]',
          },
          {
            name: 'ESTRELLA',
            path: '/Images/Fotos/ESTRELLA.jpg',
            pathCintillo: '/Images/Carrucel/ESTRELLA.png',
            color: 'bg-[#4E2424]',
          },
          {
            name: 'YUNUEN',
            path: '/Images/Fotos/YUNUEN.jpg',
            pathCintillo: '/Images/Carrucel/YUNUEN.png',
            color: 'bg-[#664433]',
          },
          {
            name: 'IRMA ROMERO',
            path: '/Images/Fotos/IRMA_ROMERO.jpg',
            pathCintillo: '/Images/Carrucel/IRMA_ROMERO.png',
            color: 'bg-[#AF9092]',
          },
          {
            name: 'ROCIO',
            path: '/Images/Fotos/ROCIO.jpg',
            pathCintillo: '/Images/Carrucel/ROCIO.png',
            color: 'bg-[#C63F11]',
          },
        ]}
      />
    </div>
  )
}
