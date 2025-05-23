'use client'

import UpdateMezcalera from './UpdateMezcalera'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { ImInstagram } from 'react-icons/im'
import { TfiWorld } from 'react-icons/tfi'
import Link from 'next/link'

import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

async function loadMarcas() {
  const response = await fetch('/api/brands/')
  const data = await response.json()
  return data
}

async function loadMarcasAsociadas(id) {
  const response = await fetch('/api/brandsMembers/' + id)
  const data = await response.json()
  return data
}

export default function Card({ asociada }) {
  const [marcas, setMarcas] = useState([])
  const [marcasAsociadas, setMarcasAsociadas] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isClicked, setIsClicked] = useState({})
  const arreglo = asociada

  useEffect(() => {
    async function fetchData() {
      const data = await loadMarcas()
      setMarcas(data)
      const dataMarca = await loadMarcasAsociadas(asociada.id)
      setMarcasAsociadas(dataMarca)
    }
    fetchData()
  }, [asociada.id])

  const handleButtonClickDelete = async (marcaId) => {
    const res = await fetch('/api/brandsMembers', {
      method: 'DELETE',
      body: JSON.stringify({
        asociadaId: asociada.id,
        marcaId: marcaId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      const data = await res.json()
      console.log('Registro deleted:', data)
      window.location.reload()
    } else {
      console.error('Error updating member')
    }
  }

  const handleButtonClickAdd = async (marcaId) => {
    const res = await fetch('/api/brandsMembers', {
      method: 'POST',
      body: JSON.stringify({
        asociadaId: asociada.id,
        marcaId: marcaId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      const data = await res.json()
      console.log('Registro created:', data)
      window.location.reload()
    } else {
      console.error('Error updating member')
    }
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 px-8 gap-16 justify-between w-full py-4">
        <div className="bg-[#FBFBFB] rounded-3xl drop-shadow-lg">
          <div className="mx-20">
            <div className="h-[440px] p-10">
              <Image
                src={asociada.imagen}
                alt={asociada.nombre}
                layout="fill"
                className="p-2 rounded-3xl object-cover"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className="text-center text-5xl font-bung text-data-yellow-300 ">
              {asociada.nombre}
            </h1>
            <h1 className="text-center text-xl pt-4 font-bung text-data-cherry-500">
              {asociada.puesto}
            </h1>
          </div>
          <div className="pb-4">
            <h1 className="text-center font-acueductos tracking-tighter text-base text-slate-900">
              {asociada.biografia}
            </h1>
          </div>
          <button
            className="px-6 py-2 w-full h-10 bg-data-cherry-500 hover:bg-data-cherry-400 rounded-3xl text-white font-outfit transform"
            onClick={() => setShowModal(true)}
          >
            Editar informacion
          </button>
        </div>
      </div>
      <h1 className="text-center text-2xl py-9 text-data-cherry-400 font-bung">
        AÑADIR O QUITAR MARCA
      </h1>
      <div className="flex justify-center pb-12">
        <div className="w-full max-w-sm sm:max-w-screen-sm md:max-w-screen-lg">
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            scrollbar={{
              hide: true,
            }}
            modules={[Scrollbar]}
            className="mySwiper"
          >
            {marcas.length > 0 ? (
              marcas.map((marca) => (
                <SwiperSlide key={marca.id}>
                  <div className="flex justify-center items-center p-4">
                    <div className="grid grid-cols-1 items-center md:grid-cols-2 w-full bg-white drop-shadow-lg rounded-xl">
                      <img
                        src={marca.imagen}
                        alt="Carousel Image"
                        className="p-2 sm:p-3 w-full rounded-xl"
                      />
                      <div className="h-full grid grid-cols-1 place-content-between">
                        <h1 className="text-black place-self-center text-sm sm:text-xl md:text-sm lg:text-xl px-1 pb-1 sm:pb-2 md:pt-2 text-center lg:pt-1 font-bung">
                          {marca.nombre}
                        </h1>
                        <div className="p-3">
                          {marcasAsociadas.some(
                            (ma) => ma.marcaId === marca.id
                          ) ? (
                            <button
                              onClick={() => handleButtonClickDelete(marca.id)}
                              className="px-6 py-2 w-full h-10 bg-gray-400 hover:bg-gray-500 rounded-3xl text-white font-outfit transform"
                            >
                              Quitar marca
                            </button>
                          ) : (
                            <button
                              onClick={() => handleButtonClickAdd(marca.id)}
                              className="px-6 py-2 w-full h-10 bg-[#57aa37] hover:bg-[#294e1a] rounded-3xl text-white font-outfit transform"
                            >
                              Añadir marca
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <h1 className="drop-shadow-md text-center font-jom text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                No hay marcas registradas
              </h1>
            )}
          </Swiper>
        </div>
      </div>

      <UpdateMezcalera
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        info={arreglo}
      />
    </div>
  )
}
