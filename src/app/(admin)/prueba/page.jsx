'use client'
import React, { useState } from 'react'

const CreateMezcalForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
      })

      const newMezcal = await response.json()
      console.log('Mezcal creado:', newMezcal)
      // Aquí puedes manejar la respuesta, como limpiar el formulario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Precio:
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Crear Mezcal</button>
    </form>
  )
}

export default CreateMezcalForm
