'use client'

import React, { useState, useEffect } from 'react'
import InsertarMezcalera from '../Components/InsertarMezcalera'
import Card from '../Components/Card'

async function loadMiembros() {
  const response = await fetch('/api/members')
  const data = await response.json()
  console.log(data)
  return data
}

export default function Nosotras() {
  const [asociadas, setAsociadas] = useState([])
  const [isClicked, setIsClicked] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const data = await loadMiembros()
      setAsociadas(data)
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
          <h1 className="font-bold p-8 text-black text-4xl">Mezcaleras</h1>
          <button
            className="bg-[#7F0147] hover:bg-[#551538] justify-center items-center rounded-xl text-white py-3 px-12  font-bold flex"
            onClick={() => setShowModal(true)}
          >
            Agregar Mezcalera
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
            <p>Miembros registradas: {asociadas.length}</p>
          </div>
        </div>

        <div className="flex flex-col">
          {asociadas.map((asociada) =>
            asociada.alta === isClicked ? (
              <div key={asociada.id} className="">
                <Card asociada={asociada} />
              </div>
            ) : (
              console.log('asdasdasd')
            )
          )}
        </div>

        {/*<div className='flex items-center justify-between p-10 w-auto'>
          <Card foto="ALONDRA.jpg" id={1} />
          <Card foto="ARGENTINA.jpg" id={2} />
          <Card foto="DELIA_GARCIA.jpg" id={3} />
          <Card foto="ESTRELLA.jpg" id={3} />
        </div>*/}

        <div className="text-black flex p-2 justify-center py-5 px-10 items-center">
          <div className="font-semibold">
            <p>Miembros: {asociadas.length}</p>
          </div>
          {/*<div className='flex items-center '>
            <p className='px-2'>Mostrar</p>
            <div className='border-2 rounded-md border-data-cherry-500 p-2 font-bold text-gray-400'>
              <p className='flex items-center justify-center'>6 <MdKeyboardArrowDown size={17}/></p>
            </div>
            <p className='px-2 font-semibold'>Mostrando 1 - 8 de 18</p>
          </div>
          <div className='flex'>
            <div className='border-2 flex items-center border-data-cherry-500 p-2 rounded-md mx-2'>
              Filtro
              <CiFilter size={17}/>
            </div>
            <div className='flex items-center border-2 border-data-cherry-500 p-2 rounded-md '>
              <IoSearchSharp size={17}/>
              Buscar Miembro
            </div>
          </div>*/}
        </div>
        <InsertarMezcalera
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />
      </div>
    </div>
  )
}
