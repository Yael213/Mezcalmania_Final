'use client'
import React from 'react'
import { useState } from 'react'
import UpdateMezcal from '../Components/UpdateMezcal'
import Image from 'next/image'

const RowProducto = ({ mezcal }) => {
  const arreglo = mezcal
  const [showModal, setShowModal] = useState(false)

  return (
    <tr className="text-xl text-center text-slate-900 font-semibold font-roboto border-b-2 border-data-cherry-500">
      <td>{mezcal.nombre}</td>
      <td className="relative border-2 p-8 border-data-cherry-500">
        <Image
          src={mezcal.imagen}
          alt={mezcal.nombre}
          sizes="90%"
          layout="fill"
          objectFit="contain"
        />
      </td>
      <td>
        <p className="text-center">
          $
          {mezcal.precio !== undefined
            ? mezcal.precio.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : 'N/A'}
        </p>
      </td>
      <td className="flex justify-center items-center">
        {mezcal.activo ? (
          <div className="p-2 mt-6 w-5 h-5 border-2 bg-data-cherry-500"></div>
        ) : (
          <div className="p-2 mt-6 w-5 h-5 border-2 border-data-cherry-500"></div>
        )}
      </td>
      <td>{mezcal.cantidad}</td>
      <td className="text-center">{mezcal.id}</td>
      <td>
        <button
          className="text-center h-10 w-10 pb-3 hover:bg-gray-300"
          onClick={() => setShowModal(true)}
        >
          ...
        </button>
        <UpdateMezcal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          info={arreglo}
        />
      </td>
    </tr>
  )
}

export default RowProducto
