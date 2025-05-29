'use client'

import React, { useContext } from 'react'
import { UsuariosContext } from '../context/usuariosContext'
import Login from '../Components/Login'
import Registro from '../Components/Registro'

export default function Page() {
  const { loged } = useContext(UsuariosContext)

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-deep-violet px-4 py-12">
      {loged === false ? (
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="h-full rounded-xl shadow-lg p-6 pt-18">
            <Login />
          </div>
          <div className="rounded-xl shadow-lg p-6">
            <Registro />
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl rounded-xl shadow-lg p-6">
          <Login />
        </div>
      )}
    </div>
  )
}
