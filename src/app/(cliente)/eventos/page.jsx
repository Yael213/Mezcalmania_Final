'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Carousel from '../Components/Carousel_Eventos'
import './evento.css'

const Separardor = () => {
  return (
    <div className=" relative">
      <img
        alt="Separador"
        src="/Images/pattern.jpg"
        className="w-full h-[20px] object-cover"
      />
    </div>
  )
}

const Visitanos = () => {
  return (
    <div className="relative w-full h-auto overflow-hidden">
      {/* Seccion con imagen */}
      <img
        alt="Paisaje Mezcal"
        src="paisaje-mezcal.jpg"
        className="w-full h-auto object-cover border-t-0 mx-auto"
      />

      {/* Div superpuesto con texto */}
      <div className="absolute inset-0 bg-[#370D23] bg-opacity-50 flex flex-col justify-center items-center text-white">
        <h1 className="font-bold uppercase text-3xl md:text-5xl lg:text-6xl p-auto">
          Conoce Nuestras Instalaciones
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl p-6">
          Revisa Nuestras Ubicaciones
        </p>
        {/* Seccion de texto conocer */}
        <div className="flex justify-center">
          <a
            href="../conocenos"
            className="py-2 px-4 bg-yellow-400 hover:bg-emerald-500 hover:text-white text-[#572626] font-semibold uppercase rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out border-collapse group hover:animate-bounce"
          >
            Conocenos
          </a>
        </div>
        <div className="w-full h-4"></div>
      </div>
    </div>
  )
}

const customText = 'Texto personalizado para el carousel'

export default function Eventos() {
  const [titulos, setTitulos] = useState([])
  const [resumenes, setResumenes] = useState([])
  const [imagenesPath, setImagenesPath] = useState([])

  useEffect(() => {
    async function fetchEventos() {
      const response = await fetch('/api/eventos')
      const data = await response.json()
      llenarArrays(data)
    }
    fetchEventos()
  }, [])

  function llenarArrays(eventos) {
    const nuevosTitulos = []
    const nuevosResumenes = []
    const nuevosImagenesPath = []

    eventos.forEach((evento) => {
      nuevosTitulos.push(evento.titulo)
      nuevosResumenes.push(evento.resumen)
      nuevosImagenesPath.push(evento.imagenPath)
    })

    setTitulos(nuevosTitulos)
    setResumenes(nuevosResumenes)
    setImagenesPath(nuevosImagenesPath)
  }

  console.log('Titulos updated:', titulos)
  console.log('Reumenes updated:', resumenes)
  console.log('Imagenes updated:', imagenesPath)

  return (
    <div className="relative bg-[#370D23] min h-max text-white text-3xl font-acueducto">
      <div className="relative w-full h-28">
        <img
          alt="barril"
          src="barril.JPG"
          className="w-full h-28 object-cover"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center py-5">
          <span className="text-white text-[200%] sm:text-[150%] md:text-[175%] lg:text-[200%] xl:text-[250%] font-bold">
            Nuestros Eventos
          </span>
        </div>
      </div>

      <Separardor />

      <div className="relative">
        <Carousel images={imagenesPath} texts={titulos} resumen={resumenes} />
      </div>

      <Separardor />

      <Visitanos />

      <Separardor />
    </div>
  )
}
