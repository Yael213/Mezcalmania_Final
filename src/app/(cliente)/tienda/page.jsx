'use client'

import Card from '../Components/Card'
import React, { useEffect, useState, useMemo } from 'react'

const ITEMS_PER_PAGE = 6

const DropdownMenu = ({ selectedOption, setSelectedOption }) => {
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
        <option value="precio-asc">Precio [menor a mayor]</option>
        <option value="precio-desc">Precio [mayor a menor]</option>
      </select>
    </div>
  )
}

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex justify-center gap-2 py-10">
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1
        const isActive = page === currentPage
        return (
          <button
            key={page}
            onClick={() => handleClick(page)}
            className={`w-14 h-14 rounded-lg font-roboto font-semibold text-lg 
              ${
                isActive
                  ? 'bg-data-cherry-500 text-white'
                  : 'border-2 border-data-cherry-500 text-white'
              }`}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}

export default function Tienda() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOption, setSelectedOption] = useState('nombre-asc')

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await fetch('/api/products')
    const data = await response.json()
    setProducts(data.data)
  }

  // Ordenar productos según el criterio seleccionado
    const sortedProducts = useMemo(() => {
    // 1. Filtrar los productos activos
    const filtered = products.filter((product) => product.activo === true)

    // 2. Ordenar según la opción seleccionada
    const sorted = [...filtered]
    switch (selectedOption) {
      case 'nombre-asc':
        sorted.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      case 'nombre-desc':
        sorted.sort((a, b) => b.nombre.localeCompare(a.nombre))
        break
      case 'precio-asc':
        sorted.sort((a, b) => a.precio - b.precio)
        break
      case 'precio-desc':
        sorted.sort((a, b) => b.precio - a.precio)
        break
      default:
        break
    }

    return sorted
  }, [products, selectedOption])


  // Paginación
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Resetear a página 1 si se cambia la opción de orden
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedOption])

  return (
    <div className="bg-deep-violet min-h-full text-productos-violet text-3xl">
      <div className="px-2 py-10 flex items-center justify-around">
        <h1 className="text-white font-roboto font-bold"> Productos </h1>
        <DropdownMenu
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div className="flex justify-around pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-20 gap-x-10 px-10">
          {paginatedProducts.map((product) => (
            <Card mezcal={product} key={product.id} />
          ))}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
