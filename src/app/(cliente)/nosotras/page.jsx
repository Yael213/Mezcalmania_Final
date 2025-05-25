"use client"

import LeftorRight from '../Components/LeftorRight';
import Image from 'next/image';
import { GiAgave } from "react-icons/gi";
import { MezcalerasContext } from '../context/mezcalerasContext';
import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

const TextBox = ({ label, id, type, placeholder, value, onChange }) => {
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
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default function Nosotras() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Obtenemos el ID de la URL
  const { mezcaleras, loadMimebros, getMiembroById } = useContext(MezcalerasContext);
  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    message: ''
  });

  // Cargar todos los miembros inicialmente
  useEffect(() => {
    loadMimebros();
  }, []);

  // Si hay un ID en la URL, cargar ese miembro específico
  useEffect(() => {
    if (id) {
      const fetchMiembro = async () => {
        const miembro = await getMiembroById(id);
        setMiembroSeleccionado(miembro);
      };
      fetchMiembro();
    }
  }, [id, getMiembroById]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    alert('Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    setFormData({
      name: '',
      email: '',
      city: '',
      message: ''
    });
  };

  return (
    <div className="bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className='relative h-[70vh]'>
        <Image 
          src="/Images/TT.jpeg"
          alt="background image"
          fill
          className="object-cover"
          priority
        />
        <div className='absolute inset-0 bg-black bg-opacity-45 flex items-center justify-center'>
          <h1 className='flex items-center justify-center text-[#fffcf9] font-jom text-5xl sm:text-7xl md:text-8xl xl:text-9xl'>
            <GiAgave className='text-5xl sm:text-7xl md:text-8xl xl:text-9xl mx-2 sm:mx-4 lg:mx-6 mb-5' color='#fffcf9'/>
            NUESTRA HISTORIA
            <GiAgave className='text-5xl sm:text-7xl md:text-8xl xl:text-9xl mx-2 sm:mx-4 lg:mx-6 mb-5' color='#fffcf9'/>
          </h1>
        </div>
      </div>

      {/* Asociación Section */}
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

      {/* Mezcaleras Section */}
      <div className="pt-8 px-6">
        <h1 className="text-center font-jom text-[#ffb712] text-5xl sm:text-7xl md:text-8xl lg:text-9xl ">
          NUESTRAS MUJERES MEZCALERAS
        </h1>

        {miembroSeleccionado ? (
          <div className="max-w-4xl mx-auto">
            <LeftorRight asociada={miembroSeleccionado} featured />
          </div>
        ) : (
          <div className="space-y-16 max-w-6xl mx-auto">
            {mezcaleras
              .sort((a, b) => {
                const ordenPuestos = ["Presidente", "Vicepresidenta", "Secretaria", "Vicesecretaria", "Miembro"];
                return ordenPuestos.indexOf(a.puesto) - ordenPuestos.indexOf(b.puesto);
              })
              .map((asociada) => (
                <div key={asociada.id}>
                  <LeftorRight 
                    asociada={asociada} 
                    onClick={() => router.push(`/nosotras?id=${asociada.id}`)}
                  />
                </div>
              ))
            }
          </div>
        )}
      </div>

      {/* Contacto Section */}
      <div className="py-16 px-6 font-outfit">
        <div className='relative h-64 w-full mb-16'>
          <Image 
            src="/Images/acueductoContacto.png" 
            alt="Acueducto de contacto"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center flex-col">
            <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-outfit mb-4">
              CONTÁCTANOS
            </h2>
            <p className="text-white text-xl sm:text-2xl text-center font-outfit">
              Cel: (443) 456 78 70
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-white text-2xl lg:text-3xl font-outfit">
              Ubicación
            </h3>
            <p className='text-white text-lg lg:text-xl'>
              Gob. Aristeo Mercado 161-local 4,<br />
              Col del Empleado, 58020,<br />
              Morelia, Michoacán
            </p>
            <div className="h-96 w-full">
              <iframe
                className='w-full h-full'
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBpTKmWEVDNkF7_vTmWOYOvsV-n5VaDCQw&q=Mezcal+Armonia">
              </iframe>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-contactoRosa shadow-xl rounded-lg px-8 pt-8 pb-10">
              <TextBox 
                label="Nombre" 
                id="name" 
                type="text" 
                placeholder="Ingrese su nombre"
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextBox 
                label="Email" 
                id="email" 
                type="email" 
                placeholder="Ingrese su email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <TextBox 
                label="Ciudad o localidad" 
                id="city" 
                type="text" 
                placeholder="Ingrese su ciudad"
                value={formData.city}
                onChange={handleInputChange}
              />
              <TextBox 
                label="Mensaje" 
                id="message" 
                type="textarea" 
                placeholder="Ingrese su mensaje"
                value={formData.message}
                onChange={handleInputChange}
              />
              <button 
                className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white text-xl font-bold py-3 px-6 rounded-lg w-full transition duration-300"
                type="submit"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}