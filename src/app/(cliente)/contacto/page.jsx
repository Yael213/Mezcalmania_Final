"use client"

import React, { useState, useContext, useEffect } from 'react'
import { UsuariosContext } from '../context/usuariosContext'
import Login from '../Components/Login'
import Registro from '../Components/Registro'

const page = () => {
  const { loged } = useContext(UsuariosContext)

  return (
    <div className="w-full flex flex-col items-center justify-center bg-deep-violet py-12 px-4">
      { loged === false ? (
        <div>
          <div>
            <Login></Login>
          </div>
          <div>
            <Registro></Registro>
          </div>
        </div>
        ) : (
          <div>
            <div >
              <Login></Login>
            </div>
          </div>
        ) 
      }

      
    </div>
  )
}

export default page
