import React from 'react';
import './conocenos.css';

const SucursalCard = ({ titulo, direccion, imagenSrc, alt, mapaUrl }) => {
  return (
    <div className='bg-white text-[#370D23] w-full md:w-[90%] h-auto md:h-[auto] flex flex-col md:flex-row items-center rounded-3xl shadow-lg m-auto mt-4'>

      <div className='w-full md:w-[40%] m-3 md:inline-block text-center'>
        <h1 className='text-3xl md:text-4xl font-serif leading-relaxed text-gray-800 tracking-wide font-bold'>{titulo}</h1>
        <br/><br/>
        <h1 className='text-xl md:text-2xl text-gray-700'>{direccion}</h1>
      </div>

      <div className='w-full md:w-[55%] h-[55%] m-3 md:inline-block p-2'>
        <a href={mapaUrl} target='_blank' rel='noopener noreferrer' className='group'>
          <img alt={alt} src={imagenSrc} className='rounded-3xl m-4 w-full h-[90%] object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-90 '/>
        </a>
      </div>

    </div>
  );
};


const Sucursales = () => {
  const mapaUrlMorelia = 'https://maps.google.com/maps?ll=19.688924,-101.178711&z=14&t=m&hl=es-ES&gl=US&mapclient=embed&cid=1375940727335301588';
  const mapaUrlZacapu = 'https://maps.google.com/maps?ll=19.819111,-101.792081&z=16&t=m&hl=es-419&gl=MX&mapclient=embed&cid=15467762234819286156';

  return (
    <div className='font-acueducto bg-deep-violet'>

        <div className='relative w-full h-28'>
            <img alt='barril' src='barril.jpg' className="w-full h-28 object-cover" />

            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center py-5">
                <span className="text-white text-5xl md:text-3xl lg:text-4xl font-bold">
                Nuestras Sucursales
                </span>
            </div>
        </div>

      <SucursalCard
        titulo='Sucursal Morelia'
        direccion='Aristeo Mercado #161 Local 4. Plaza comercial Takamba, Colonia del Empleado, C.P. 58020 Morelia Michoacán, México.'
        imagenSrc='/conocenos/ubicacion-morelia.png'
        alt='Morelia'
        mapaUrl={mapaUrlMorelia}
      />
      <br/><br/>
      <SucursalCard
        titulo='Sucursal Zacapu'
        direccion='PLAZA FRAY JACOBO DACIANO #5-A ENTRE ZARAGOZA Y MORELOS C.P. 58600 COL. CENTRO, ZACAPU, MICHOACÁN, MÉXICO'
        imagenSrc='/conocenos/ubicacion-zacapu.png'
        alt='Zacapu'
        mapaUrl={mapaUrlZacapu}
      />
    </div>
  );
};

export default Sucursales;
