'use client'

import MezcamigaRigth from '../Components/MezcamigaRigth'
import MezcamigaLeft from '../Components/MezcamigaLeft'
import React, { useState, useEffect } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { ImInstagram } from 'react-icons/im'
import { TfiWorld } from 'react-icons/tfi'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

async function loadMarcas(id) {
  const response = await fetch('/api/brands/' + parseInt(id))
  const data = await response.json()
  return data
}

export default function LeftorRight({ asociada }) {
  const [marcas, setMarcas] = useState([])

  useEffect(() => {
    async function fetchData() {
      const data = await loadMarcas(asociada.id)
      setMarcas(data)
    }
    fetchData()
  }, [asociada.id])

  return (
    <div className="flex flex-col items-center justify-center text-white text-3xl">
      <MezcamigaLeft asociada={asociada} />
      <div className="w-full max-w-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <Swiper
          spaceBetween={0}
          slidesPerView={2}
          centeredSlides={true}
          pagination={{ clickable: true }}
        >
          {marcas.length > 0 ? (
            marcas.map((marca) => (
              <SwiperSlide key={marca.marca.id}>
                <div className="flex justify-center items-center p-4">
                  <div className="grid grid-cols-1 items-center md:grid-cols-2 w-full bg-white rounded-xl">
                    <img
                      src={marca.marca.imagen}
                      alt="Carousel Image"
                      className="p-2 sm:p-3 w-full rounded-3xl"
                    />
                    <div className="h-full grid grid-cols-1 place-content-between">
                      <h1 className="text-black place-self-center text-sm sm:text-xl md:text-sm lg:text-xl xl:text-2xl px-1 pb-1 sm:pb-2 md:pt-2 text-center lg:pt-1 font-bung">
                        {marca.marca.nombre}
                      </h1>
                      <h1 className="font-roboto place-self-center hidden md:flex text-center font-light text-[#424242] pr-2 leading-tight text-xm lg:text-sm xl:text-base">
                        {marca.marca.descripcion}
                      </h1>
                      <div className="flex justify-center items-center pb-3">
                        <Link href={marca.marca.facebook}>
                          <div className="px-3 icono-marcasR2">
                            <FaFacebook
                              className="text-xl sm:text-2xl lg:text-4xl"
                              color="#000"
                            />
                          </div>
                        </Link>
                        <Link href={marca.marca.instagram}>
                          <div className="px-3 icono-marcasR2">
                            <ImInstagram
                              className="text-xl sm:text-2xl lg:text-4xl"
                              color="#000"
                            />
                          </div>
                        </Link>
                        <Link href={marca.marca.web}>
                          <div className="px-3 icono-marcasR2">
                            <TfiWorld
                              className="text-2xl sm:text-3xl lg:text-4xl"
                              color="#000"
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <h1 className="drop-shadow-md text-center font-jom text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              No posee marcas registradas
            </h1>
          )}
        </Swiper>
      </div>
    </div>
  )
}
