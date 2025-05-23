'use client'
import { useState, useEffect } from 'react'
import CardPedido from '../Components/CardPedido'
import Charts from '../Components/Charts'
import Image from 'next/image'

const ProductoEstrella = ({ mezcal }) => {
  return (
    <div className="flex w-full h-16 items-center my-2 justify-evenly rounded-3xl border-2">
      <div className="relative h-full w-full m-2 ">
        <Image
          src={mezcal.imagen}
          alt={mezcal.nombre}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className=" w-full">
        <p className="text-gray-600">{mezcal.nombre}</p>
        <p className="text-sm text-gray-400 ">Id: {mezcal.id}</p>
      </div>
      <div className="px-">
        <p>
          $
          {mezcal.precio.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    getBestSeller()
  }, [])

  const getOrders = async () => {
    try {
      const response = await fetch('/api/orders/?quantity=4')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const getBestSeller = async () => {
    try {
      const response = await fetch('api/products/bestSeller')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching best products:', error)
    }
  }

  return (
    <div className="font-roboto font-bold w-full min-h-screen bg-[#E1DDDD]">
      <div className="p-10 text-[#687287] ">
        <div className="border flex justify-between items-center p-7 my-1 bg-[#F7F7F7] rounded-2xl">
          <div className="items-start flex flex-col ">
            <p className="text-2xl text-[#020510]">Descripción general</p>
            <p className="text-md">
              Monitoriza el progreso de tu tienda para aumentar tus ventas
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="w-full h-full border bg-[#F7F7F7] rounded-2xl p-7 my-1 items-center">
            <p className="text-2xl text-[#020510]">Informe de Ingresos</p>
            <div className="relative h-4/5 w-full">
              <Charts />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="bg-[#FBFBFB] my-10 mr-4 rounded-3xl w-2/3">
            <div className="p-6">
              <p className="text-2xl text-[#020510]">Pedidos recientes</p>
              <div className="flex mb-2 text-[#655F5F] text-sm font-semibold">
                <div className="w-1/6">ID del pedido</div>
                <div className="w-1/4">Contacto</div>
                <div className="w-1/4">Envio</div>
                <div className="w-1/6">Monto</div>
                <div className="w-1/4">Fecha y Hora</div>
                <div className="w-max">Ver</div>
              </div>
              <hr className="my-2 border-[#655F5F]" />
              {orders.map((pedido) => (
                <div
                  key={pedido.id}
                  className="bg-white shadow-md rounded-lg p-4 mb-4 "
                >
                  <CardPedido pedido={pedido} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#FBFBFB] my-10 rounded-3xl w-1/3">
            <div className="p-6">
              <p className="text-2xl text-[#020510]">Productos populares</p>
              {products.map((product) => (
                <ProductoEstrella mezcal={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
