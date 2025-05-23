'use client'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Add registration logic here
    console.log('Username:', username)
    console.log('Email:', email)
    console.log('Password:', password)
  }

  return (
    <div className="bg-deep-violet min-h-screen flex items-center justify-center text-productos-violet text-3xl font-roboto">
      <div className="bg-white w-full max-w-xl p-8 rounded shadow-lg">
        <h2 className="text-4xl mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-data-cherry-900 focus:border-data-cherry-900"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-data-cherry-900 focus:border-data-cherry-900"
            />
          </div>
          <div>
            <ReCAPTCHA sitekey="6LfACewpAAAAAMKkyPcfxIhK3S98aK7V_VQRJuPk" />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-data-cherry-900 hover:bg-data-cherry-850 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-data-cherry-900"
            >
              Registrate
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-700">
            Ya tienes una cuenta?
            <a
              href="/login"
              className="text-data-cherry-888 hover:text-data-cherry-860"
            >
              {' '}
              Entra
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
