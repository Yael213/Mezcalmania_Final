'use client'
import React, { useEffect, useState } from 'react'

// Función para obtener los eventos desde la API
async function fetchEventos() {
  const response = await fetch('/api/eventos')
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Error al obtener eventos')
  }
}

// Función para crear un nuevo evento
async function crearEvento(titulo, resumen, file) {
  const imagen = file.name
  const imagenPath = '/eventos/' + imagen
  const response = await fetch('/api/eventos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ titulo, resumen, imagenPath }),
  })

  if (!file) return

  const form = new FormData()
  form.set('file', file)

  const res2 = await fetch('/api/upload/eventos', {
    method: 'POST',
    body: form,
  })

  if (res2.ok) {
    return response.json()
  } else {
    throw new Error('Error al crear evento')
  }
}

// Función para eliminar un evento
async function eliminarEvento(id) {
  const response = await fetch('/api/eventos', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Error al eliminar evento')
  }
}

const EventosList = () => {
  const [file, setFile] = useState(null)
  const [eventos, setEventos] = useState([])
  const [titulo, setTitulo] = useState('')
  const [resumen, setResumen] = useState('')
  const [imagenPath, setImagenPath] = useState('')

  useEffect(() => {
    fetchEventos().then(setEventos).catch(console.error)
  }, [])

  const handleAgregarEvento = async (e) => {
    e.preventDefault()
    try {
      const nuevoEvento = await crearEvento(titulo, resumen, file)
      setEventos([...eventos, nuevoEvento])
      setTitulo('')
      setResumen('')
      setFile(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEliminarEvento = async (id) => {
    try {
      await eliminarEvento(id)
      setEventos(eventos.filter((evento) => evento.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="relative font-roboto py-10 bg-[#E1DDDD] min-h-screen">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="font-bold text-4xl mb-2 text-[#333]">Eventos</h1>
          <div className="bg-data-cherry-500 p-4 rounded-lg text-white text-lg font-medium shadow-md">
            Lista de eventos
          </div>
        </div>

        {/* Tabla de eventos */}
        <div className="bg-[#FBFBFB] rounded-3xl shadow-lg overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-data-cherry-860 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Título</th>
                  <th className="px-6 py-4 text-left">Resumen</th>
                  <th className="px-6 py-4 text-left">Imagen</th>
                  <th className="px-6 py-4 text-left">Fecha</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {eventos.map((evento) => (
                  <tr key={evento.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{evento.id}</td>
                    <td className="px-6 py-4 font-medium">{evento.titulo}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{evento.resumen}</td>
                    <td className="px-6 py-4">
                      <img 
                        src={evento.imagenPath} 
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        alt={evento.titulo}
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(evento.fechaInicio).toLocaleDateString('es-MX')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleEliminarEvento(evento.id)}
                        className="bg-data-cherry-500 hover:bg-data-cherry-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario para agregar nuevo evento */}
        <div className="mb-6">
          <div className="bg-data-cherry-500 p-4 rounded-lg text-white text-lg font-medium shadow-md mb-6">
            Agregar nuevo evento
          </div>
          
          <form
            onSubmit={handleAgregarEvento}
            className="bg-white p-8 rounded-3xl shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Título:</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-data-cherry-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Imagen:</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-data-cherry-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-data-cherry-100 file:text-data-cherry-700 hover:file:bg-data-cherry-200"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Resumen:</label>
              <textarea
                value={resumen}
                onChange={(e) => setResumen(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-data-cherry-300"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-data-cherry-500 hover:bg-data-cherry-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
              >
                Agregar Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EventosList