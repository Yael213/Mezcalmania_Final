'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const CardPedido = ({ producto }) => {
  console.log(producto)
  return (
    <div className="flex h-full">
      <div className="w-2/3">
        <div className="flex justify-between overflow-hidden">
          <h1>Nombre:</h1>
          <p>{producto.mezcal.nombre}</p>
        </div>
        <div className="flex justify-between">
          <h1>Cantidad:</h1>
          <p>{producto.cantidad}</p>
        </div>
        <div className="flex justify-between">
          <h1>Monto c/u:</h1>
          <p>
            $
            {producto.mezcal.precio !== undefined
              ? producto.mezcal.precio.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : 'N/A'}
          </p>
        </div>
        <div className="flex justify-between">
          <h1>Monto total:</h1>
          <p>
            $
            {producto.mezcal.precio !== undefined
              ? (producto.mezcal.precio * producto.cantidad).toLocaleString(
                  'en-US',
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )
              : 'N/A'}
          </p>
        </div>
      </div>
      <div className=" relative flex  justify-enter w-1/3 h-32 p-20  ">
        <Image
          src={producto.mezcal.imagen}
          alt={producto.mezcal.nombre}
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  )
}

export const DetallesPedido = ({ isVisible, onClose, pedido }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('/api/products/id?idPedido=' + pedido.id)
        const data = await response.json()
        setProducts(data.data[0].renglonPedido)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    getProducts()
  }, [pedido.id])

  if (!isVisible) return null

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose()
  }

  console.log(products)

  return (
    <div
      className="fixed inset-0 z-50 pb-6 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center  px-10 w-full h-full"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-full h-full flex flex-col justify-center">
        <button
          className="text-[#000] text-xl font-mono font-bold place-self-end"
          onClick={() => onClose()}
        >
          x
        </button>
        <div className="flex flex-col justify-center items-center rounded-lg h-4/5 w-full bg-[#f1f1f1] py-10">
          <div className="w-full p-10 font-bold font-roboto text-3xl">
            <h1>Detalles del pedido</h1>
          </div>
          <div className="flex w-full h-full justify-around text-xl ">
            <div className="w-1/4 h-9/10 border-r-4 rounded-md ">
              <div className="h-1/2 border-b-4 p-4 rounded-md">
                <h1 className="font-semibold text-2xl text-black">Generales</h1>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">ID:</h1>
                  <p>{pedido.id}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">Fecha:</h1>
                  <p>{pedido.fecha}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">Monto:</h1>
                  <p>
                    $
                    {pedido.total !== undefined
                      ? pedido.total.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : 'N/A'}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">Envío:</h1>
                  <p>
                    {pedido.tipoEnvio === 2
                      ? 'Todo México'
                      : 'Recoger en tienda (Morelia)'}
                  </p>
                </div>
              </div>
              <div className="h-1/2 text-xl  p-4">
                <h1 className="font-semibold text-2xl">Notas de la entrega</h1>
                <p>{pedido.notas}</p>
              </div>
            </div>
            <div className=" h-2/3 w-1/3 text-xl">
              <h1 className="font-semibold text-2xl text-black">Productos</h1>
              <div className="overflow-y-auto h-5/6">
                {products.map((producto) => (
                  <div
                    key={producto.id}
                    className="bg-white shadow-md rounded-lg p-4 mb-4 "
                  >
                    <CardPedido producto={producto} />
                  </div>
                ))}
              </div>
              <div>
                <h1 className="font-bold text-2xl">Monto total</h1>
                <p>
                  $
                  {pedido.total !== undefined
                    ? pedido.total.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
            <div className="h-9/10 w-4/12 text-xl border-l-4 p-4 rounded-md overflow-auto">
              <h1 className="text-2xl font-semibold text-black">Cliente</h1>
              <div>
                <div className="flex justify-between ">
                  <h1 className="font-semibold text-left">Nombre</h1>
                  <p>{pedido.nombre}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">Apellidos</h1>
                  <p>
                    {pedido.apellidoPaterno} {pedido.apellidoMaterno}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">Dirección</h1>
                  <p>{pedido.direccion}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">Ciudad</h1>
                  <p>{pedido.ciudad}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">Estado</h1>
                  <p>{pedido.estado}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">Código postal</h1>
                  <p>{pedido.codigoPostal}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">Teléfono</h1>
                  <p>{pedido.telefono}</p>
                </div>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-left">
                    Correo electrónico
                  </h1>
                  <p>{pedido.correoElectronico}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
