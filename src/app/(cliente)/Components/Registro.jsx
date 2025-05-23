"use client"

import React, { useState, useContext, useEffect } from 'react'
import { UsuariosContext } from '../context/usuariosContext'

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState('');
    const { usuarios, loadUsuarios } = useContext(UsuariosContext);
    
    useEffect(() => {
      loadUsuarios();
    }, [loadUsuarios]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!email || !password || !nombre || !apellido || !telefono) {
        setError('Debe ingresar todos los campos');
        return;
      }

      const userExists = usuarios.some((usr) => usr.email === email);
      if (userExists) {
        setError('Ya existe una cuenta registrada con este correo');
        return;
      }

      try {
        const res = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({
            nombre,
            apellido,
            email,
            password,       
            telefono
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (res.ok) {
          const data = await res.json();
          console.log('Usuario creado:', data);
          setNombre('');
          setApellido('');
          setEmail('');
          setPassword('');
          setTelefono('');
          setError('');
        } else {
          console.error('Error al crear usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    return (
      <div className="flex items-center justify-center py-2 px-4">
        <div className="w-full space-y-2">
          <div>
            <h1 className="mt-6 text-center text-2xl font-jom text-white">¿No posee una cuenta? regístrese</h1>
            <h2 className="text-center text-6xl font-jom text-white">Registro</h2>
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
          <form className="mt-2 space-y-2 font-jom text-6xl" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-2">
              <div>
                <label htmlFor="email-address" className="sr-only">Correo electrónico</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:text-xl"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:text-xl"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="nombre" className="sr-only">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:text-xl"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="apellido" className="sr-only">Apellido</label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:text-xl"
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="telefono" className="sr-only">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="text"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm md:text-xl"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center pt-1 px-12 border border-transparent sm:text-sm md:text-2xl font-medium rounded-md text-white bg-data-cherry-500 hover:bg-[#6b1b3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Registro;
