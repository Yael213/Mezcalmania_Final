import React from 'react'
import Image from 'next/image'
import mezcalerasIcon from '/public/logoPequeno.svg'
import Link from 'next/link'

export const Navbar = () => {
  return (
    <div className="bg-[#8E7A8E] h-24">
      <button className="relative mx-2 w-20 h-full">
        <Link href={'/'}>
          <Image
            src={mezcalerasIcon}
            alt="Logo Mujeres Mezcaleras de Michoacán"
            layout="fill"
            objectFit="contain"
          />
        </Link>
      </button>
    </div>
  )
}
