'use client'

import React, { useEffect, useState } from 'react'
import UpdateMezcal from '../Components/UpdateMezcal'
import Image from 'next/image'
import CardProducto from '../Components/CardProducto'
import RowProducto from '../Components/RowProducto'
import InsertarProducto from '../Components/InsertarProducto'

export default function Productos() {
  const [showModal, setShowModal] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [products, setProducts] = useState([])
  const [showModal2, setShowModal2] = useState(false)
  const [selectedMezcal, setSelectedMezcal] = useState(null)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  return (
    <div className="font-roboto w-full min-h-screen bg-[#E1DDDD]">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mx-10">
          <h1 className="font-bold p-8 text-black text-4xl">Productos</h1>
          <button
            className="bg-[#7F0147] hover:bg-[#551538] justify-center items-center rounded-xl text-white py-3 px-12 font-bold flex"
            onClick={() => setShowModal(true)}
          >
            Agregar producto
          </button>
        </div>
      </div>

      <div className=" bg-[#FBFBFB] mx-10 p-10 rounded-3xl">
        <table className="table-fixed w-full border-2  border-data-cherry-500 rounded-3xl">
          <thead className="bg-data-cherry-500 text-xl font-light">
            <tr className="">
              <th className="w-1/3"> Nombre del productos </th>
              <th className="w-14"> </th>
              <th className="w-1/6"> Precio </th>
              <th> Estado </th>
              <th> Inventario </th>
              <th> ID </th>
              <th> Acciones </th>
            </tr>
          </thead>
          <tbody>
            {products.map((mezcal) => (
              <RowProducto mezcal={mezcal} key={mezcal.id} />
            ))}
          </tbody>
        </table>
      </div>

      <InsertarProducto
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  )
}
