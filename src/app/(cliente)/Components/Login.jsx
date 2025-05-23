// src/pages/login.jsx
'use client'

import React, { useState, useContext, useEffect } from 'react'
import { UsuariosContext } from '../context/usuariosContext'
import CardPedido from "../Components/CardPedido";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { mail, loged, pedidos, usuarios, master, usuario, loadUsuarios, loadPedidos, setLog } = useContext(UsuariosContext)

  useEffect(() => {
    loadUsuarios()
  }, [loadUsuarios])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor, ingresa tu correo electrónico y contraseña.')
      return
    }

    const usuario = usuarios.find((usr) => usr.email === email && usr.password === password);
    if (usuario) {
      setLog(true, usuario);
      loadPedidos(email);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  }

  const handleClick = () => {
    setLog(false, usuario)
    setError('');
    setEmail('');
    setPassword('');
  }

  const handleWindow = () => {
    setLog(false, usuario)
    window.location.assign('/dashboard')
  }

  return (
    <div>
      {loged === false ? (
        <div className="flex items-center justify-center  py-2 px-4 sm:px-6 lg:px-8">
          <div className="w-full space-y-2">
            <div>
              <h2 className=" text-center text-6xl font-jom text-white">
                Iniciar sesión
              </h2>
            </div>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form
              className="mt-2 space-y-6 font-jom text-6xl"
              onSubmit={handleLogin}
            >
              <div className="rounded-md shadow-sm  space-y-2">
                <div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:text-xl"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm md:text-xl"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center pt-1 px-4 border border-transparent sm:text-sm md:text-2xl font-medium rounded-md text-white bg-data-cherry-500 hover:bg-[#6b1b3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className='px-4'>
          <h2 className="mt-6 text-center text-6xl font-jom text-white">
            Bienvenido {usuario.nombre}
          </h2>
          {master.map((masterUser) =>
            masterUser.email === mail ? (
              <div key={masterUser.email}>
                <button
                  className="group font-jom mb-4 relative w-full flex justify-center pt-1 px-4 border border-transparent sm:text-sm md:text-2xl font-medium rounded-md text-white bg-data-cherry-500 hover:bg-[#6b1b3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleWindow}
                >
                  Ir a modo administrador
                </button>
                <button
                  className="group font-jom relative w-full flex justify-center pt-1 px-4 border border-transparent sm:text-sm md:text-2xl font-medium rounded-md text-white bg-data-cherry-500 hover:bg-[#6b1b3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleClick}
                >
                  Salir de cuenta
                </button>
              </div>
            ) : (
              <div key={masterUser.email}>
                <h2 className="mt-6 text-center text-6xl font-jom text-white">
                  Pedidos
                </h2>
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
                    {pedidos.map((pedido) => (
                      <div
                        key={pedido.id}
                        className="bg-white shadow-md rounded-lg p-4 mb-4 "
                      >
                        <CardPedido pedido={pedido} />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="group font-jom relative w-full flex justify-center pt-1 px-4 border border-transparent sm:text-sm md:text-2xl font-medium rounded-md text-white bg-data-cherry-500 hover:bg-[#6b1b3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleClick}
                >
                  Salir de cuenta
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
