'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import UpdateMezcal from '../Components/UpdateMezcal'
import dynamic from 'next/dynamic'

const HiddenPage = dynamic(() => import('../Components/UpdateMezcal'), {
  ssr: false,
})

const CardProducto = ({ mezcal }) => {
  const precio = parseInt(mezcal.precio)
  const arreglo = mezcal
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    setShowModal(!showModal)
  }

  return (
    <div>
      <table className="table-fixed w-full border-2 border-data-cherry-500 rounded-3xl">
        <thead className="bg-data-cherry-500 text-xl font-light">
          <tr className="text-white">
            <th className="w-1/3">Nombre del producto</th>
            <th className="w-14"></th>
            <th className="w-1/6">Precio</th>
            <th>Estado</th>
            <th>Inventario</th>
            <th>ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            key={mezcal.id}
            className="text-xl text-center text-black font-semibold font-roboto border-b-2 border-data-cherry-500"
          >
            <td>{mezcal.nombre}</td>
            <td className="relative border-2 p-8 border-data-cherry-500">
              <Image
                src={mezcal.imagen}
                alt={mezcal.nombre}
                layout="fill"
                objectFit="contain"
              />
            </td>
            <td>
              <p className="text-center">
                $
                {mezcal.precio.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
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
        </tbody>
      </table>
    </div>
  )
}

export default CardProducto
