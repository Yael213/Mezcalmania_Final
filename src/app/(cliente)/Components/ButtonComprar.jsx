import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/cart'

const ButtonComprar = ({ mezcal, cantidad }) => {
  const [showModal, setShowModal] = useState(false)
  const { cartItems, addToCart, addQuantityProduct } = useContext(CartContext)

  const openModal = () => {
    addToCart(mezcal)
    addQuantityProduct(mezcal, cantidad)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <a
        className="bg-data-cherry-500 w-full text-white h-14 rounded-xl flex justify-center items-center"
        href="#"
        onClick={() => openModal()}
      >
        <div className="font-roboto font-semibold text-xl">
          <p className=" ">Añadir al Carrito</p>
        </div>
      </a>
    </div>
  )
}

export default ButtonComprar
