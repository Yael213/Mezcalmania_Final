'use client'

import React, { useState, useContext, useEffect } from 'react'
import { UsuariosContext } from '../context/usuariosContext'
import CardPedido from "../Components/CardPedido";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [nombreEditado, setNombreEditado] = useState('')
  const [emailEditado, setEmailEditado] = useState('')
  const [pedidosUsuario, setPedidosUsuario] = useState([])

  const {
    mail,
    loged,
    usuarios,
    master,
    usuario,
    loadUsuarios,
    setLog
  } = useContext(UsuariosContext)

  // Carga usuarios al inicio
  useEffect(() => {
    loadUsuarios()
  }, [loadUsuarios])

  // Cargar pedidos cuando el usuario cambia
  useEffect(() => {
    if (usuario && usuario.email) {
      fetchPedidosUsuario(usuario.email)
      setNombreEditado(usuario.nombre || '')
      setEmailEditado(usuario.email || '')
    }
  }, [usuario])

  // Función mejorada para obtener pedidos del usuario
  const fetchPedidosUsuario = async (userEmail) => {
    try {
      const response = await fetch('/api/orders')
      if (!response.ok) {
        throw new Error('Error al obtener pedidos')
      }
      const allPedidos = await response.json()
      
      // Filtrar pedidos del usuario comparando con correoElectronico
      const pedidosFiltrados = allPedidos.filter(pedido => 
        pedido.correoElectronico && 
        pedido.correoElectronico.toLowerCase() === userEmail.toLowerCase()
      )
      
      // Ordenar por fecha más reciente primero
      pedidosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      
      setPedidosUsuario(pedidosFiltrados)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setPedidosUsuario([])
      setError('Error al cargar los pedidos')
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor, ingresa tu correo electrónico y contraseña.')
      return
    }

    const usuarioEncontrado = usuarios.find(
      (usr) => usr.email.toLowerCase() === email.toLowerCase() && 
              usr.password === password
    )

    if (usuarioEncontrado) {
      setLog(true, usuarioEncontrado)
      setError('')
      // No necesitamos llamar fetchPedidosUsuario aquí porque el useEffect lo hará
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  const handleClickLogout = () => {
    setLog(false, null)
    setError('')
    setEmail('')
    setPassword('')
    setEditMode(false)
    setPedidosUsuario([])
  }

  const handleWindow = () => {
    setLog(false, null)
    window.location.assign('/dashboard')
  }

  const handleSaveUser = () => {
    alert(`Datos actualizados:\nNombre: ${nombreEditado}\nEmail: ${emailEditado}`)
    setEditMode(false)
  }

  return (
    <div className="min-h-screen text-white">
      {!loged ? (
        <div className="flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md space-y-4">
            <h2 className="text-center text-4xl font-jom">Iniciar sesión</h2>
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error: </strong>
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-black"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white text-black"
                required
              />
              <button type="submit" className="w-full py-2 bg-data-cherry-500 hover:bg-[#6b1b3a] rounded">
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <h2 className="text-center text-4xl font-jom mb-6">Bienvenido {usuario.nombre}</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {master.some((m) => m.email === mail) && (
              <button
                onClick={handleWindow}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
              >
                Ir a modo administrador
              </button>
            )}
            <button
              onClick={() => setEditMode(!editMode)}
              className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded"
            >
              {editMode ? "Cancelar edición" : "Editar información"}
            </button>
            <button
              onClick={handleClickLogout}
              className="w-full md:w-auto bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
            >
              Salir de cuenta
            </button>
          </div>

          {editMode && (
            <div className="bg-white text-black p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-4">Editar información</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombreEditado}
                  onChange={(e) => setNombreEditado(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={emailEditado}
                  onChange={(e) => setEmailEditado(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
                <button
                  onClick={handleSaveUser}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          )}

          {!master.some((m) => m.email === mail) && (
            <>
              <h2 className="text-3xl font-jom mb-4">Mis Pedidos</h2>
              <div className="bg-[#FBFBFB] text-black rounded-3xl p-6 mb-4">
                {pedidosUsuario.length === 0 ? (
                  <p className="text-center py-4">No tienes pedidos registrados.</p>
                ) : (
                  <>
                    <div className="hidden md:flex mb-2 font-semibold text-sm text-[#655F5F]">
                      <div className="w-1/6">ID del pedido</div>
                      <div className="w-1/4">Contacto</div>
                      <div className="w-1/4">Envío</div>
                      <div className="w-1/6">Monto</div>
                      <div className="w-1/4">Fecha y Hora</div>
                      <div className="w-max">Detalles</div>
                    </div>
                    <hr className="my-2 border-[#655F5F]" />
                    {pedidosUsuario.map((pedido) => (
                      <div key={pedido.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <CardPedido pedido={pedido} />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}