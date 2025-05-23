'use client'

import Card from '../Components/Card'
import React, { useEffect, useState } from 'react'

const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="font-roboto font-semibold text-white relative ml-4">
      <label htmlFor="sort-by" className=" text-2xl px-2">
        ORDENAR POR
      </label>
      <select
        id="sort-by"
        value={selectedOption}
        onChange={handleOptionChange}
        className="bg-data-cherry-500 text-2xl p-3 rounded-lg w-56 md:w-72"
      >
        <option value="nombre-asc">Nombre [A-Z]</option>
        <option value="nombre-desc">Nombre [Z-A]</option>
      </select>
    </div>
  )
}

const Pagination = () => {
  return (
    <div className="flex justify-start pl-40">
      <div className=" flex justify-center items-center bg-data-cherry-500 text-white font-roboto font-semibold text-lg w-14 h-14 rounded-lg">
        <p>1</p>
      </div>
      <div className="flex justify-center items-center border-2 border-data-cherry-500 text-white font-roboto font-semibold text-lg w-14 h-14 rounded-lg">
        <p>2</p>
      </div>
      <div className="flex justify-center items-center border-2 border-data-cherry-500 text-white font-roboto font-semibold text-lg w-14 h-14 rounded-lg">
        <p>3</p>
      </div>
      <div className="flex justify-center items-center border-2 border-data-cherry-500 text-white font-roboto font-semibold text-lg w-14 h-14 rounded-lg">
        <p>4</p>
      </div>
      <div className="flex justify-center items-center border-2 border-data-cherry-500 text-white font-roboto font-semibold text-lg w-14 h-14 rounded-lg">
        <p>5</p>
      </div>
    </div>
  )
}

export default function Tienda() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await fetch('/api/products')
    const data = await response.json()
    setProducts(data.data)
  }

  return (
    <div className="bg-deep-violet min h-full text-productos-violet text-3xl">
      <div className="px-2 py-10 flex items-center justify-around ">
        <h1 className="text-white font-roboto font-bold"> Productos </h1>
        <DropdownMenu />
      </div>
      <div className="flex justify-around pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-20 gap-x-10 px-10">
          {products.map((product) => (
            <Card mezcal={product} key={product.id} />
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  )
}
