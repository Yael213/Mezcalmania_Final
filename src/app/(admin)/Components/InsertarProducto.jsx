'use client'

import React, { useEffect, useState } from 'react'

async function loadMarcas() {
  const response = await fetch('/api/brands/')
  const data = await response.json()
  return data
}

export default function InsertarProducto({ isVisible, onClose }) {
  const [marcas, setMarcas] = useState([])
  const [nombre, setNombre] = useState('')
  const [file, setFile] = useState(null)
  const [activo, setActivo] = useState(true)
  const [costo, setCosto] = useState(0.0) // Estado para el puesto
  const [clase, setClase] = useState('')
  const [poblado, setPoblado] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [agave, setAgave] = useState('')
  const [fermentacion, setFermentacion] = useState('')
  const [destilacion, setDestilacion] = useState('')
  const [presentacion, setPresentacion] = useState('')
  const [cocimiento, setCocimiento] = useState('')
  const [molienda, setMolienda] = useState('')
  const [marca, setMarca] = useState(1)
  const [cantidad, setCantidad] = useState(0)
  const [riqueza, setRiqueza] = useState('')

  useEffect(() => {
    async function fetchData() {
      const data = await loadMarcas()
      setMarcas(data)
    }
    fetchData()
  }, []) // Agregar un array vacío como segundo argumento para que el efecto se ejecute solo una vez

  const handleAltaChange = (event) => {
    const value = event.target.value === 'true' // Convertir a booleano
    setActivo(value)
  }

  const handleMarcaChange = (event) => {
    setMarca(event.target.value)
  }

  if (!isVisible) return null

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file) return

    const selectedFile = file.name
    const imagen = '/Images/Mezcales/' + selectedFile

    const marcaId = parseInt(marca)
    const precio = parseFloat(costo)
    const cant = parseInt(cantidad)

    const form = new FormData()
    form.set('file', file)

    const res = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        activo,
        nombre,
        precio,
        cantidad: cant,
        clase,
        poblado,
        municipio,
        agave,
        cocimiento,
        molienda,
        fermentacion,
        destilacion,
        presentacion,
        riquezaAlcoholica: riqueza,
        imagen,
        marcaId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    const res2 = await fetch('/api/upload/mezcales', {
      method: 'POST',
      body: form,
    })

    if (res.ok) {
      console.log('Producto creado:', data)
      window.location.reload()
      onClose()
    } else {
      console.error('Error creando producto')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="fixed inset-0 z-50 pb-6 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center px-10"
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
              <h1 className="font-jom text-center text-gray-900 text-2xl md:text-3xl lg:text-4xl -mt-4">
                INFORMACIÓN DE PRODUCTO
              </h1>
            </div>

            <div className="flex pt-8 justify-center w-full">
              <div className="flex flex-col w-full pl-4 mt-1 mr-6">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  NOMBRE DEL PRODUCTO
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  ACTIVO/INACTIVO
                </label>
                <select
                  value={activo}
                  onChange={handleAltaChange}
                  className="bg-gray-400 font-roboto font-bold text-sm p-2 rounded-lg w-full"
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
              <div className="flex flex-col w-full pl-4 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  COSTO
                </label>
                <input
                  type="number"
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Costo"
                  onChange={(e) => setCosto(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-full pl-2 mt-1 mr-4">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  CLASE
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Clase"
                  onChange={(e) => setClase(e.target.value)}
                />
              </div>
            </div>

            <div className="flex pt-8 justify-center w-full">
              <div className="flex flex-col w-full pl-4 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  POBLADO
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Poblado"
                  onChange={(e) => setPoblado(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-full pl-2 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  MUNICIPIO
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Municipio"
                  onChange={(e) => setMunicipio(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pl-2 mt-1 mr-4">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  AGAVE
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Agave"
                  onChange={(e) => setAgave(e.target.value)}
                />
              </div>
            </div>
            <div className="flex pt-8 justify-center w-full">
              <div className="flex flex-col w-full pl-4 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  COCIMIENTO
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Cocimiento"
                  onChange={(e) => setCocimiento(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pl-2 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  MOLIENDA
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Molienda"
                  onChange={(e) => setMolienda(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pl-2 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  CANTIDAD
                </label>
                <input
                  type="text"
                  pattern="[0-9]*" // Acepta solo dígitos
                  inputMode="numeric" // Muestra un teclado numérico en dispositivos móviles
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value) || 0)
                      .toString()
                      .slice(0, 10)
                  }}
                  placeholder="Ingrese un entero positivo"
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pl-2 mt-1 mr-4">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  MARCA
                </label>
                <select
                  value={marca}
                  onChange={handleMarcaChange}
                  className="bg-gray-400 font-roboto font-bold text-sm p-2 rounded-lg w-full"
                >
                  {marcas.map((marca) => (
                    <option key={marca.id} value={marca.id}>
                      {marca.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex pt-8 justify-center w-full">
              <div className="flex flex-col w-full pl-4 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  DESTILACIÓN
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Destilacion"
                  onChange={(e) => setDestilacion(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pl-4 mt-1">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  PRESENTACIÓN
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Presentacion"
                  onChange={(e) => setPresentacion(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pl-2 mt-1 mr-4">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  FERMENTACIÓN
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Fermentacion"
                  onChange={(e) => setFermentacion(e.target.value)}
                />
              </div>
            </div>

            <div className="flex pt-8 justify-center w-full">
              <div className="flex flex-col w-full pl-4 mt-1 mr-6">
                <label className="font-roboto font-bold text-black text-base -mt-4">
                  RIQUEZA ALCOHOLICA
                </label>
                <input
                  className="pl-4 font-roboto text-sm shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Riqueza alcoholica"
                  onChange={(e) => setRiqueza(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col w-full pl-4 mr-6">
                <label className=" font-roboto font-bold  text-black text-base -mt-4  ">
                  FOTO
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
