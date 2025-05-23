'use client'
import { useState } from 'react';
import ModalImage from '../Components/ModalImage';
import Carrucel from '../Components/Carrucel';

export default function Galeria() {
  const images = Array.from({ length: 48 }, (_, i) => `/Images/Galeria/${i + 1}.jpeg`); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = (image) => {
    setSelectedImage(image);
  };

    return (
      <div className="bg-deep-violet min-h-screen">
        <h1 className="pt-5 flex items-center justify-center font-jom text-[#E6C725] text-7xl lg:text-8xl">
          GALERÍA
        </h1>
        <div className="p-5 ">
          <div className="columns-2 sm:columns-3xs gap-5  [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-8" >
            {images.map((image, index) => (
            <button key={index} className="hover:brightness-50" onClick={() => { handleClick(image); setShowModal(true); }}>
              <img 
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full aspect-auto rounded-lg shadow-md mb-6"
              />
            </button>
            ))}
          </div>
        </div>
        <ModalImage isVisible={showModal} onClose={() => setShowModal(false)} ruta={selectedImage}/>
      </div>
    );
  }