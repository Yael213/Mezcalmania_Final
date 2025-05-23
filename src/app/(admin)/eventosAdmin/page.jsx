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
    <div className=" relative font-roboto w-[350vh] h-[300vh] bg-[#E1DDDD] flex flex-col justify-start  m-10 text-black">
      <div className="flex flex-col justify-end  m-10 top-0">
        <h1 className="font-bold p-8 text-black text-4xl ">Eventos</h1>
        <div className="bg-data-cherry-500 p-4 mb-4 rounded-lg text-white">
          Lista de eventos
        </div>
      </div>

      <table className="bg-[#FBFBFB] m-4 rounded-3xl w-[95%]">
        <thead>
          <tr className="bg-[#FBFBFB] m-10 rounded-3xl px-7 py-7">
            <th>ID</th>
            <th>Título</th>
            <th>Resumen</th>
            <th>Imagen Path</th>
            <th>Fecha de Inicio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.id} className="mx-4 px-4 py-4">
              <td className="w-[5%]">{evento.id}</td>
              <td className="w-[20%]">{evento.titulo}</td>
              <td className="w-[30%]">{evento.resumen}</td>
              <td className="w-[10%]">
                {' '}
                <img src={evento.imagenPath} className="w-[90%] p-2" />{' '}
              </td>
              <td className="w-[15%]">
                {new Date(evento.fechaInicio).toLocaleString()}
              </td>
              <td className="w-[10%]">
                <button
                  onClick={() => handleEliminarEvento(evento.id)}
                  className="bg-data-cherry-500 p-2 mb-2 rounded-lg text-white"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-data-cherry-500 p-4 mb-4 rounded-lg text-white m-6 w-[95%]">
        Agregar nuevo evento
      </div>

      <form
        onSubmit={handleAgregarEvento}
        className="w-[95%] mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:bg-slate-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Resumen:</label>
          <input
            type="files"
            value={resumen}
            onChange={(e) => setResumen(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:bg-slate-200"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Imagen:</label>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0])
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:bg-slate-200"
            placeholder="Foto"
          />
        </div>
        <button
          type="submit"
          className="w-[20%] bg-data-cherry-500 hover:bg-data-cherry-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Agregar Evento
        </button>
      </form>
    </div>
  )
}

export default EventosList
