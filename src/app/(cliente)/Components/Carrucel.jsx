'use client'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { GiAgave } from "react-icons/gi";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Carrucel (){
  return (
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-navigation-size': '28px',
                    '--swiper-pagination-color': '#D2004C',
                    '--swiper-navigation-top-offset':'50%',
                    '--swiper-navigation-sides-offset': '40px',
                    '--swiper-pagination-bullet-inactive-color': '#fff',
                    '--swiper-pagination-bullet-inactive-opacity': '1'
                  }}
                autoplay={{
                    delay: 6500,
                    disableOnInteraction: false,
                }}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                loop
                >

                <SwiperSlide>
                    <div className='relative'>
                        <div className=''>
                            <img src="/Images/Carousel/1.png"
                                alt="backgroundm image"
                                className="bg-img"
                                fill={true}
                            />
                        </div>
                    </div>
                    
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <div >
                            <img src="/Images/Carousel/2.jpeg"
                                alt="backgroundm image"
                                className="bg-img"
                                fill={true}
                            />
                        </div>
                    </div>
                
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <div >
                            <img src="/Images/Carousel/3.jpeg"
                                alt="backgroundm image"
                                className="bg-img"
                                fill={true}
                            />
                        </div>
                    </div>
                
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <div className=''>
                            <img src="/Images/Carousel/4.jpeg"
                                alt="backgroundm image"
                                className="bg-img"
                                fill={true}
                            />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <div >
                            <img src="/Images/Carousel/5.jpeg"
                                alt="backgroundm image"
                                className="bg-img"
                                fill={true}
                            />
                        </div>
                    </div>{/*className='py-28 sm:py-32 md:py-40 lg:py-60 xl:py-64'*/}
                </SwiperSlide>
            </Swiper>
    
  );
};