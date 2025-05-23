'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { CartContext } from '../context/cart'
import carritoIcon from '/public/carritoIcon.svg'

const ButtonCarrito = () => {
  const { getCartTotalItems } = useContext(CartContext)

  return (
    <a href="/carrito">
      <div className="fixed top-3/4 right-6 z-20">
        <div className="rounded-full flex justify-center items-center md:h-24 md:w-24 h-18 w-18 bg-data-yellow-200 relative">
          <div className="p-4">
            <Image src={carritoIcon}></Image>
          </div>
        </div>
        <div className="bg-[#8E213F] md:h-12 md:w-12 h-8 w-8 rounded-full flex justify-center items-center absolute md:top-18 top-12 left-0">
          <p className="font-roboto font-bold text-white md:text-xl text-sm">
            {getCartTotalItems()}
          </p>
        </div>
      </div>
    </a>
  )
}

export default ButtonCarrito
