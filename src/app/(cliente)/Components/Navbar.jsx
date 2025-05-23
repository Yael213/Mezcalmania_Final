'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import { useState } from 'react';
import ButtonNav from './ButtonNav';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [header,setHeader] = useState(false);

    const handleNav = () => {
        setMenuOpen(!menuOpen);
    }

    const scrollHeader = () => {
      if (window.scrollY >= 100){
        setHeader(true)
      }else {
        setHeader(false)
      }
    }

    useEffect(()=>{
      window.addEventListener("scroll",scrollHeader)

      return ()=>{
        window.addEventListener("scroll",scrollHeader)
      }

    },[])

    useEffect(() => {
      const handleScroll = () => {
          setScrollPosition(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
          window.removeEventListener("scroll", handleScroll);
      };
    }, [])

    const calculateHeight = () => {
      // Calcula la altura deseada del rectángulo en función de la posición del scroll
      const minHeight = 4.5; // Altura mínima deseada
      const maxHeight = 7.5; // Altura máxima original
      const scrollThreshold = 150; // Puedes ajustar este valor según tus necesidades

      // Calcula la altura deseada en función de la posición del scroll
      const newHeight = Math.max(maxHeight - (scrollPosition / scrollThreshold) * (maxHeight - minHeight), minHeight);

      return newHeight;
  };


  return (
  <nav className={header ? "bg-white bg-fixed w-full sticky top-0 z-30 drop-shadow-lg" : "bg-black md:bg-white lg:bg-white w-full sticky top-0 z-30 "}
      style={{
      height: `${calculateHeight()}rem`, // Aplica la altura calculada con una unidad adecuada
      transition: 'height 0.25s ease' // Agrega una transición suave
  }}>

    <div className='absolute -z-10'>
      <Image alt='pattern' className={header ? 'hidden' : 'hidden md:flex bg-white'} src="/Images/patternclear.png" width={6400} height={475}
      style={{
        height: `${calculateHeight()}rem`
    }}/>
    </div>
    

    <div className="flex justify-between h-full w-full items-end">
      <div className={header ? 'hidden md:flex w-full h-full justify-around items-center' :'hidden md:flex bg-[#370D23] w-full h-16 justify-evenly  items-center'}>
        <ButtonNav bg='bg-nosotras-green' border='border-nosotras-green' hbg='bg-hover-green' grouphbg='group-hover:bg-hover-green' grouphborder='group-hover:border-hover-green' translate='-translate-x-1 translate-y-1' href='/nosotras' desc='NOSOTRAS'/>
        <div className={header ? "hidden" : "w-px h-8 bg-white"}></div>
        <ButtonNav bg='bg-eventos-mint' border='border-eventos-mint' hbg='bg-hover-mint' grouphbg='group-hover:bg-hover-mint' grouphborder='group-hover:border-hover-mint' translate='-translate-x-1 translate-y-1' href='/eventos' desc='EVENTOS'/> 
        <div className={header ? "hidden" : "w-px h-8 bg-white"}></div>
        <ButtonNav bg='bg-galeria-red' border='border-galeria-red' hbg='bg-hover-red' grouphbg='group-hover:bg-hover-red' grouphborder='group-hover:border-hover-red' translate='-translate-x-1 translate-y-1' href='/galeria' desc='GALERÍA'/> 
      </div>

      <div className={header ? 'hidden' : 'hidden md:flex w-36 items-center'}>
        <Link href='/'>
          <Image className='h-24 w-16 md:h-28 md:w-18 lg:h-28 lg:w-18' src="/Images/LogoArco.png" width={930} height={1650}/>
        </Link>
      </div>

      <div className={header ? 'hidden' : 'flex md:hidden h-full pl-2 items-center'}>
        <Link href='/'>
          <Image className='h-20 w-20' src="/Images/mezcaleras.ico" width={256} height={256}/>
        </Link>
      </div>

      <div className={header ? 'hidden' : 'flex md:hidden h-full items-center'}>
        <Link href='/'>
          <button className='mx-4 h-full hover:shadow-primary-2 duration-300'>
            <h1 className='text-[#D2004C] font-bung text-4xl tracking-wider  -my-3 text-center'>MUJERES</h1>
            <h1 className='text-white font-bung text-2xl tracking-widest -my-3 text-center '>MEZCALERAS</h1>
          </button>
        </Link>
      </div>
      
      <div className='flex justify-center items-center h-full' >
        <div className={header ? 'hover:underline ' : 'hidden'}>
          <Link href='/'>
            <button className='mx-4 h-full hover:shadow-primary-2 duration-300'>
              <h1 className='text-data-cherry-400 font-bung text-2xl lg:text-4xl tracking-wider  -my-3 text-center'>MUJERES</h1>
              <h1 className='text-[#A21037] font-bung text-base lg:text-2xl tracking-widest -my-3 text-center '>MEZCALERAS</h1>
            </button>
          </Link>
        </div>
      </div>

      <div className={header ? 'hidden md:flex w-full h-full justify-around items-center' : 'hidden md:flex bg-[#370D23] w-full h-16 justify-evenly items-center'}>
        <ButtonNav bg='bg-productos-violet' border='border-productos-violet' hbg='bg-hover-violet' grouphbg='group-hover:bg-hover-violet' grouphborder='group-hover:border-hover-violet' translate='translate-x-1 translate-y-1' href='/tienda' desc='TIENDA'/>
        <div className={header ? "hidden" : "w-px h-8 bg-white"}></div>
        <ButtonNav bg='bg-carrito-orange' border='border-carrito-orange' hbg='bg-hover-orange' grouphbg='group-hover:bg-hover-orange' grouphborder='group-hover:border-hover-orange' translate='translate-x-1 translate-y-1' href='/carrito' desc='CARRITO'/>
        <div className={header ? "hidden" : "w-px h-8 bg-white"}></div>
        <ButtonNav bg='bg-contacto-yellow' border='border-contacto-yellow' hbg='bg-hover-yellow' grouphbg='group-hover:bg-hover-yellow' grouphborder='group-hover:border-hover-yellow' translate='translate-x-1 translate-y-1' href='/contacto' desc='CUENTA'/>
      </div>

      <div onClick={handleNav} className='flex md:hidden cursor-pointer pr-3 items-center h-full w-auto'>
        <div className={header ? 'bg-data-cherry-400 py-1.5 px-1.5 rounded-sm':'bg-[#A21037] py-1.5 px-1.5 rounded-sm'}> 
          <AiOutlineMenu color='white' size={20} />
        </div>
      </div>

      <div className={menuOpen
            ? 'fixed right-0 top-0 w-[40%] md:hidden h-screen bg-[#370D23] p-10 ease-in duration-500'
            : 'fixed right-[100%] top-0 p-10 w-[120%] h-screen ease-in duration-500'
      }>
        <div className={menuOpen? 'flex w-full items-center justify-end':'hidden'}>
          <div onClick={handleNav} className='cursorPointer'>
            <AiOutlineClose color='white' size={25}/>
          </div>
        </div>

        <div className={menuOpen? 'py-4':'hidden'}>
          <div className='flex flex-col items-center'>
            <div className='py-3' onClick={() => setMenuOpen(false)}>
              <ButtonNav bg='bg-nosotras-green' border='border-nosotras-green' hbg='bg-hover-green' grouphbg='group-hover:bg-hover-green' grouphborder='group-hover:border-hover-green' translate='translate-y-1' href='/nosotras' desc='NOSOTRAS'/>
            </div>
            <div className='py-3' onClick={() => setMenuOpen(false)}>
              <ButtonNav bg='bg-eventos-mint' border='border-eventos-mint' hbg='bg-hover-mint' grouphbg='group-hover:bg-hover-mint' grouphborder='group-hover:border-hover-mint' translate='translate-y-1' href='/eventos' desc='EVENTOS'/>
            </div>
            <div className='py-3' onClick={() => setMenuOpen(false)}>
              <ButtonNav bg='bg-galeria-red' border='border-galeria-red' hbg='bg-hover-red' grouphbg='group-hover:bg-hover-red' grouphborder='group-hover:border-hover-red' translate='translate-y-1' href='/galeria' desc='GALERÍA'/>
            </div>
            <div className='py-3' onClick={() => setMenuOpen(false)}>
              <ButtonNav bg='bg-productos-violet' border='border-productos-violet' hbg='bg-hover-violet' grouphbg='group-hover:bg-hover-violet' grouphborder='group-hover:border-hover-violet' translate='translate-y-1' href='/tienda' desc='TIENDA'/>
            </div>
            <div className='py-3' onClick={() => setMenuOpen(false)}>
              <ButtonNav bg='bg-carrito-orange' border='border-carrito-orange' hbg='bg-hover-orange' grouphbg='group-hover:bg-hover-orange' grouphborder='group-hover:border-hover-orange' translate='translate-y-1' href='/carrito' desc='CARRITO'/>
            </div>
            <div className='py-3' onClick={() => setMenuOpen(false)}>
              <ButtonNav bg='bg-contacto-yellow' border='border-contacto-yellow' hbg='bg-hover-yellow' grouphbg='group-hover:bg-hover-yellow' grouphborder='group-hover:border-hover-yellow' translate='translate-y-1' href='/contacto' desc='CUENTA'/>
            </div>
          </div>
        </div>
      </div>

    </div>
  </nav>
  )
}

export default Navbar