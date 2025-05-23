'use client'

import React, { useState, useEffect } from 'react'
import InsertarMarca from '../Components/InsertarMarca'
import CardMarca from '../Components/CardMarca'

async function loadMarcas() {
  const response = await fetch('/api/brands')
  const data = await response.json()
  console.log(data)
  return data
}

export default function Marcas() {
  const [marcas, setMarcas] = useState([])
  const [isClicked, setIsClicked] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const data = await loadMarcas()
      setMarcas(data)
    }
    fetchData()
  })

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <div className="font-roboto w-full min-h-screen bg-[#E1DDDD]">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mx-10">
          <h1 className="font-bold p-8 text-black text-4xl">Marcas</h1>
          <button
            className="bg-[#7F0147] hover:bg-[#551538] justify-center items-center rounded-xl text-white py-3 px-12  font-bold flex"
            onClick={() => setShowModal(true)}
          >
            Agregar Marca
          </button>
        </div>
      </div>
      <div className="bg-[#FBFBFB] m-5 rounded-3xl">
        <div className="flex justify-between pt-10 px-10">
          <button
            onClick={handleClick}
            className={`${
              isClicked
                ? 'bg-data-cherry-500 text-white'
                : 'bg-data-cherry-860 text-white'
            } rounded-xl w-1/6 p-2 text-center  transition-colors duration-100`}
          >
            {isClicked ? 'Activas' : 'De baja'}
          </button>
          <div className="text-black font-semibold">
            <p>Marcas registradas: {marcas.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 m-5">
          {marcas.map((marca) =>
            marca.activa === isClicked ? (
              <div key={marca.id} className="">
                <CardMarca marca={marca} />
              </div>
            ) : (
              console.log('asdasdasd')
            )
          )}
        </div>
      </div>
      <InsertarMarca
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  )
}
