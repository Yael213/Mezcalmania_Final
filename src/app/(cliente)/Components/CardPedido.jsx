'use client'

import React, { useEffect, useState } from 'react'
import { DetallesPedido } from '../DetallesPedido'

const CardPedido = ({ pedido }) => {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="flex text-[#655F5F] text-sm ">
      <div className="w-1/6">{pedido.id}</div>
      <div className="w-1/4">{pedido.correoElectronico}</div>
      <div className="w-1/4">
        {pedido.tipoEnvio === 1 ? 'Todo México' : 'Recoger en tienda (Morelia)'}
      </div>
      <div className="w-1/6">
        $
        {pedido.total.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="w-1/4">{pedido.fecha}</div>
      <button
        className="text-bold text-2xl items-center align-middle"
        onClick={() => setShowModal(true)}
      >
        ...
      </button>
      <DetallesPedido
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        pedido={pedido}
      />
    </div>
  )
}

export default CardPedido
