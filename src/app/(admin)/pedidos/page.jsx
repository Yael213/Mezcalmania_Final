"use client";

import React, { useEffect, useState } from "react";
import Productos from "../productos/page";
import CardPedido from "../Components/CardPedido";

const Pedidos = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await fetch("/api/orders/");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="font-roboto w-full h-full min-h-screen bg-[#E1DDDD]">
      <div className="flex flex-col justify-end  m-10 ">
        <h1 className="font-bold p-8 text-black text-4xl ">Pedidos</h1>
        <div className="bg-data-cherry-500 p-4 mb-4 rounded-lg text-white">
          Historial de Pedidos
        </div>
      </div>
      <div className="bg-[#FBFBFB] m-10 rounded-3xl">
        <div className="p-6">
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
    </div>
  );
};

export default Pedidos;
