'use client'

import Image from 'next/image'
import Card from '../../Components/Card'
import ButtonComprar from '../../Components/ButtonComprar'
import magueyIcon from '/public/maguey.svg'
import tiempoIcon from '/public/botellaTiempo.svg'
import { useState, useEffect } from 'react'
import { Port_Lligat_Sans } from 'next/font/google'
import { IoReturnUpBack } from 'react-icons/io5'

const Foto = ({ src, alt }) => {
  return (
    <div className="relative flex items-center justify-center w-full md:h-[75vh] h-96 ">
      <Image src={src} alt={alt} layout="fill" objectFit="contain" />
    </div>
  )
}

const NumberInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value)
    setInputValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="flex items-center">
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        className="border-2 border-data-cherry-500 text-white rounded-md p-2 w-24 text-center bg-data-cherry-800"
        min={1}
      />
    </div>
  )
}

const Separator = () => {
  return (
    <div className="flex items-center w-full bg-data-cherry-500">
      <hr className="h-1 w-full rounded-full border-0 " />
    </div>
  )
}

const ProductosRelacionados = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const response = await fetch('/api/products?quantity=3')
    const data = await response.json()
    setProducts(data.data)
  }

  return (
    <div className="flex justify-around">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-20 gap-x-10 ">
        {products.map((product) => (
          <Card mezcal={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default function DetalleProducto({ params }) {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [valueNumberInput, setValueNumberInput] = useState(1)

  const idProducto = parseInt(params.idProducto)
  console.log(idProducto)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/products/id?id=` + idProducto)
        const data = await response.json()
        console.log(data)
        setProduct(data.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.idProducto])

  const handleCantidadChange = (newCantidad) => {
    setValueNumberInput(newCantidad)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>Error al cargar el producto</div>
  }

  return (
    <div className="bg-deep-violet min h-full text-productos-violet text-3xl font-bold font-roboto ">
      <div className="md:flex flex-initial h-max ">
        <div className="md:w-1/2  h-full ">
          <div className="relative m-5 ">
            <div className="absolute right-1/4 bottom-1/2 -full w-1/2 h-1/2  bg-data-cherry-888  blur-[90rem] opacity-30"></div>
            <div className="absolute right-1/4 top-1/2 rounded-full w-1/2 h-1/2  bg-data-cherry-500 blur-[90rem] opacity-30"></div>
            <Foto className="px-20 " src={product.imagen} alt="as" />
          </div>
          <div className="text-white text-2xl flex flex-col ">
            <div className="flex align-middle  justify-center">
              <Image src={magueyIcon}></Image>
              <p className="pl-2">{product.agave}</p>
            </div>
            <div className="flex align-middle justify-center">
              <Image src={tiempoIcon}></Image>
              <p className="pl-2">14 a 16 años</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 h-full p-6 ">
          <div className="grid md:justify-items-end text-white text-xl">
            {product.presentacion} / {product.riquezaAlcoholica}°
          </div>
          <div className="text-data-pink-200 w-2/3 py-2">{product.nombre}</div>
          <div className="flex flex-row  justify-between items-center py-4 ">
            <div className="text-data-yellow-200 py-2 ">
              $
              {product.precio !== undefined
                ? product.precio.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : 'N/A'}
            </div>
            <div className="flex items-center py-4">
              <div className="py-2 px-10">
                <NumberInput value={1} onChange={handleCantidadChange} />
              </div>
              <div className=" w-full">
                <ButtonComprar mezcal={product} cantidad={valueNumberInput} />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Separator />
          </div>
          <div className="flex justify-start text-white py-10 text-2xl font-medium">
            <p className="leading-8">
              <div className="flex">
                <h1 className="font-normal">Clase: </h1>
                <p className="font-bold text-gray-400"> {product.clase}</p>
              </div>
              <br />
              <div className="flex">
                <h1 className="font-normal">Maguey: </h1>
                <p className="font-bold text-gray-400"> {product.agave}</p>
              </div>
              <br />
              <div className="flex">
                <h1 className="font-normal">Cocimiento: </h1>
                <p className="font-bold text-gray-400"> {product.cocimiento}</p>
              </div>
              <br />
              <div className="flex">
                <h1 className="font-normal">Molienda: </h1>
                <p className="font-bold text-gray-400"> {product.molienda}</p>
              </div>
              <br />
              <div className="flex">
                <h1 className="font-normal">Fermentación: </h1>
                <p className="font-bold text-gray-400">
                  {' '}
                  {product.fermentacion}
                </p>
              </div>
              <br />
              <div className="flex">
                <h1 className="font-normal">Destilación: </h1>
                <p className="font-bold text-gray-400">
                  {' '}
                  {product.destilacion}
                </p>
              </div>
              <br />
              <div className="flex">
                <h1 className="font-normal">Poblado: </h1>
                <p className="font-bold text-gray-400"> {product.poblado}</p>
              </div>
              <br />
              <div className="flex">
                <h1 className="font-normal">Municipio: </h1>
                <p className="font-bold text-gray-400"> {product.municipio}</p>
              </div>
            </p>
          </div>
          <div className="flex justify-center">
            <Separator />
          </div>
          <div className="flex justify-end text-white items-center pt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <p className="pl-2">4.78 (74)</p>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="px-8">
          <div className="text-data-pink-200 pb-4">
            También te puede interesar
          </div>
          <div className="pb-8">
            <Separator />
          </div>
          <ProductosRelacionados />
        </div>
      </div>
    </div>
  )
}
