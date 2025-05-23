"use client"

import LeftorRight from '../Components/LeftorRight';
import Image from 'next/image';
import { GiAgave } from "react-icons/gi";
import { MezcalerasContext } from '../context/mezcalerasContext';
import { useContext, useEffect } from 'react';


const TextBox = ({ label, id, type, placeholder }) => {
  return (
    <div className="mb-4 text-xl md:text-base lg:text-2xl">
      <label className="block text-white font-bold mb-1" htmlFor={id}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          placeholder={placeholder}
          rows="4"
        />
      ) : (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default function Nosotras() {
  const { mezcaleras, loadMimebros } = useContext(MezcalerasContext);
  console.log(mezcaleras)

  useEffect(() => {
    loadMimebros();
  }, []);

  return (
    <div>
      <div className='relative'>
        <div className='py-8 sm:py-16 md:py-18 lg:py-28 xl:py-32 bg-black bg-opacity-45'>
          <h1 className='flex items-center justify-center text-[#fffcf9] font-jom text-5xl sm:text-7xl md:text-8xl xl:text-9xl'>
            <GiAgave className='text-5xl sm:text-7xl md:text-8xl xl:text-9xl mx-2 sm:mx-4 lg:mx-6 mb-5' color='#fffcf9'/>
            NUESTRA HISTORIA
            <GiAgave className='text-5xl sm:text-7xl md:text-8xl xl:text-9xl mx-2 sm:mx-4 lg:mx-6 mb-5' color='#fffcf9'/>
          </h1>
        </div>
        <Image src="/Images/TT.jpeg"
               alt="background image"
               className="bg-img"
               fill={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 bg-[#3E5A51] -mb-2">
        <div className='flex justify-center px-5 py-px'>
          <div>
            <h1 className="mt-2 -mb-2 lg:-mb-3 font-jom text-[#fffdfc] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
              NUESTRA ASOCIACIÓN 
            </h1>
            <h1 className='font-roboto font-light pb-5 text-[#fffdfc] text-xm leading-tight sm:text-sm md:text-base lg:text-xl xl:text-2xl'>
              Lorem ipsum dolor sit amet consectetur. Pellentesque fusce sed massa tellus faucibus feugiat dolor urna habitant. Sodales felis pellentesque lacus malesuada natoque sagittis eu morbi tellus. 
              Eget ultricies lacinia faucibus scelerisque quis odio. Quisque vel congue egestas id pretium sed sodales.
              Lorem ipsum dolor sit amet consectetur. Pellentesque fusce sed massa tellus faucibus feugiat dolor urna habitant. Sodales felis pellentesque lacus malesuada natoque sagittis eu morbi tellus. 
              Eget ultricies lacinia faucibus scelerisque quis odio. Quisque vel congue egestas id pretium sed sodales.
              Lorem ipsum dolor sit amet consectetur. Pellentesque fusce sed massa tellus faucibus feugiat dolor urna habitant. Sodales felis pellentesque lacus malesuada natoque sagittis eu morbi tellus. 
              Eget ultricies lacinia faucibus scelerisque quis odio. Quisque vel congue egestas id pretium sed sodales.
            </h1>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div className='columns-3 md:columns-2 gap-5 py-5 px-5 items-center'>
            <img 
              src='/Images/Galeria/26.jpeg'
              alt='Image' 
              className="w-full aspect-auto border-4 border-[#F3E8E0] mb-5"
            />
            <img 
              src='/Images/15.jpeg'
              alt='Image' 
              className="w-full aspect-auto border-4 border-[#F3E8E0] mb-5"
            />
            <img 
              src='/Images/mezca_family.jpeg'
              alt='Image' 
              className="w-full aspect-auto border-4 border-[#F3E8E0] mb-5"
            />
            <img 
              src='/Images/m_de_mezcal.jpg'
              alt='Image' 
              className="w-full aspect-auto border-4 border-[#F3E8E0]"
            />
          </div>
        </div>
          
      </div>

      <div className="bg-[#D1A42E] h-full z-10">
        <h1 className="mt-2 -mb-10 flex items-center justify-center font-jom text-[#fffdfc] text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
          NUESTRAS MARCAS
        </h1>
        {/*
       
        
        <MarcaLeft nombre='MATAVERDE' foto='Mataverde.jpg' width={1000} height={1000}
        Facebook='https://www.facebook.com/p/MataVerde-Mezcales-100093951884648/' Instagram='https://www.instagram.com/mezcal_mataverde/' Pagina='https://casamezcal.com.mx/producto/mezcal-mata-verde-certificado-750ml/'
        bio='Una tradición familiar desde 1840, 6 generaciones de maestros mezcaleros que honra la tradición, el legado familia, la tierra y el producto del estado de Michoacán.
        El nombre de Mezcal Don Mateo lo tomamos en honor a Don Mateo Rangel, maestro mezcalero (4ta generación) y bisabuelo de los maestros mezcaleros actuales.
        Con esto, buscamos rendir homenaje a quienes fueron pioneros en esta noble tradición.
        Impulsamos la D. O. M. Mezcal en el estado de Michoacán y somos la primera marca certificada de Michoacán.'
        />*/}
      </div>

      <div className="bg-deep-violet pt-10 -z-30 min-h-screen flex flex-col justify-center items-center -mb-2">
        <h1 className="mt-2 drop-shadow-md flex items-center justify-center font-jom text-[#ffb712] text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
          NUESTRAS MUJERES MEZCALERAS
        </h1>

        {mezcaleras.map((asociada) => 
          <div key={asociada.id}> 
            <LeftorRight asociada={asociada}/>
          </div>
        )}
      </div>
      <div className="bg-deep-violet min-h-screen">
        <div className='relative pt-20'>
            <Image 
                src="/Images/acueductoContacto.png" 
                layout="responsive" 
                width={1930} 
                height={1650} 
                objectFit="cover" 
            />
            <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl text-center sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl font-outfit">
                CONTACTANOS
                <br />
                Cel: (443) 456 78 70
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 mx-8 gap-8 mt-10 font-outfit">
          <div className=" w-full h-full ">
            <div className="flex flex-col h-full">
              <div className="mb-4 flex-grow">
                <p className='text-white text-xl lg:text-2xl xl:text-3xl'>
                  Gob. Aristeo Mercado 161-local 4, 
                  <br />
                  Col del Empleado, 58020,
                  <br />
                  Morelia, Michoacán
                  </p>
                </div>
                <div className="flex justify-center h-full">
                  <div className='flex  ml-1 mr-1 h-full w-full'>
                    <iframe
                      className='w-full h-96 md:h-full'
                      width="full"
                      height="full"
                      loading="lazy"
                      allowfullscreen
                      referrerpolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBpTKmWEVDNkF7_vTmWOYOvsV-n5VaDCQw&q=Mezcal+Armonia">
                    </iframe>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full"> 
                <div className="bg-contactoRosa shadow-md rounded px-8 pt-6 pb-8">
                    <TextBox label="Nombre" id="name" type="text" placeholder="Ingrese su nombre" />
                    <TextBox label="Email" id="email" type="email" placeholder="Ingrese su email" />
                    <TextBox label="Ciudad o localidad" id="city" type="text" placeholder="Ingrese su ciudad o localidad" />
                    <TextBox label="Mensaje" id="message" type="textarea" placeholder="Ingrese su mensaje" />
                    <button className="bg-contactoVerde hover:bg-contactoVerdeClic text-white text-2xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="button"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>

    </div>
    </div>
  );
}
