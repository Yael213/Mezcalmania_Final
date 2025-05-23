'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const ButtonAdmin = ({ text, currentPage }) => {
  const page =
    currentPage.split('/')[1].charAt(0).toUpperCase() + currentPage.slice(2)
  const buttonColor =
    page === text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      ? 'bg-data-cherry-888 '
      : 'bg-data-purple-200 hover:bg-data-cherry-860'
  return (
    <div
      className={`flex items-center  justify-between px-6 h-12 rounded-xl ${buttonColor} font-roboto font-semibold `}
    >
      <div className="relative w-1/6 h-full">
        <Image
          src={`/Images/${text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')}.svg`}
          alt="Botón"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {text}
    </div>
  )
}

export const Sidebar = () => {
  const currentPage = usePathname()

  return (
    <div className="bg-[#ECE4E4] w-1/6 ">
      <div className="h-96 flex flex-col justify-evenly px-2">
        <Link href="/dashboard" className="">
          <ButtonAdmin text="Dashboard" currentPage={currentPage} />
        </Link>
        <Link href="/productos">
          <ButtonAdmin text="Productos" currentPage={currentPage} />
        </Link>
        <Link href="/marcas">
          <ButtonAdmin text="Marcas" currentPage={currentPage} />
        </Link>
        <Link href="/mezcaleras">
          <ButtonAdmin text="Mezcaleras" currentPage={currentPage} />
        </Link>
        <Link href="/pedidos">
          <ButtonAdmin text="Pedidos" currentPage={currentPage} />
        </Link>
        <Link href="/eventosAdmin">
          <ButtonAdmin text="Eventos" currentPage={currentPage} />
        </Link>
        <Link href="/configuracion">
          <ButtonAdmin text="Configuración" currentPage={currentPage} />
        </Link>
      </div>
    </div>
  )
}
