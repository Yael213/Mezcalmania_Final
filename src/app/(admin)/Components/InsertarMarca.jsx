'use client'

import React, { useState } from 'react'

const InsertarMarca = ({ isVisible, onClose }) => {
  const [file, setFile] = useState(null)
  const [selectedAlta, setSelectedAlta] = useState(true)
  const [nombre, setNombre] = useState('')
  const [facebook, setFacebook] = useState('/')
  const [instagram, setInstragram] = useState('/')
  const [web, setWeb] = useState('/')
  const [descripcion, setBio] = useState('')
  //const imagen = '/Images/Fotos/Godzi.jpg'; // Default image path for demonstration

  const handleAltaChange = (event) => {
    const value = event.target.value === 'true' // Convert to boolean
    setSelectedAlta(value)
  }

  if (!isVisible) return null

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) return

    const selectedFile = file.name
    const imagen = '/Images/Marcas/' + selectedFile

    const form = new FormData()
    form.set('file', file)

    const res = await fetch('/api/brands', {
      method: 'POST',
      body: JSON.stringify({
        nombre,
        descripcion,
        activa: selectedAlta,
        imagen,
        facebook,
        instagram,
        web,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const res2 = await fetch('/api/upload/marcas', {
      method: 'POST',
      body: form,
    })

    if (res.ok) {
      const data = await res.json()
      console.log('Marca created:', data)
      window.location.reload()
      onClose()
    } else {
      console.error('Error creating marca')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center px-32"
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
          <div className="flex flex-col justify-center items-center rounded-lg bg-[#f1f1f1] py-5">
            <div className="flex justify-center items-start">
              <h1 className="font-jom text-center text-gray-900 text-3.5xl md:text-4xl lg:text-5xl -mt-4">
                INFORMACIÓN DE LA MARCA
              </h1>
            </div>

            <div className="flex pt-8 justify-center w-full">
              <div className="flex flex-col w-full pl-4 mt-1 mr-6">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  NOMBRE COMPLETO (EN MAYUSCULAS)
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pl-4 mt-1 mx-6">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  ACTIVA O INACTIVA
                </label>
                <select
                  value={selectedAlta}
                  onChange={handleAltaChange}
                  className="bg-gray-400 font-roboto font-bold text-sm p-2 rounded-lg w-full"
                >
                  <option value="true">Activa</option>
                  <option value="false">Inactiva</option>
                </select>
              </div>
            </div>

            <div className="flex pt-8 justify-center w-full">
              <div className="flex flex-col w-full pl-4 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  FACEBOOK
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Facebook"
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pl-2 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  INSTAGRAM
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Instagram"
                  onChange={(e) => setInstragram(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pl-2 mt-1 mr-4">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  SITIO WEB
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Web"
                  onChange={(e) => setWeb(e.target.value)}
                />
              </div>
            </div>
            <div className="flex pt-8 justify-center w-full">
              <div className="flex flex-col w-full pl-4 mt-1 mr-6">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  DESCRIPCIÓN
                </label>
                <textarea
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Descripción"
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col w-full pl-4 mr-6">
                <label className=" font-roboto font-bold  text-black text-base -mt-4  ">
                  IMAGEN
                </label>
                <input
                  type="file"
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setFile(e.target.files[0])
                  }}
                  placeholder="Foto"
                />
              </div>
            </div>
            <div className="flex pt-8 justify-center w-full">
              <button
                type="submit"
                className="bg-[#7F0147] hover:bg-[#551538] justify-center items-center rounded-xl text-white py-3 px-28 font-bold flex"
              >
                Agregar Mezcalera
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default InsertarMarca
