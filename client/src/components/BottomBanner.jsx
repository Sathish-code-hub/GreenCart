import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='relative mt-24 '>
      <img src={assets.bottom_banner_image} alt='banner' className='w-full hidden md:block'/>
      <img src={assets.bottom_banner_image_sm} alt='banner' className='w-full block md:hidden'/>

      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center
       pt-10 md:pt-0 md:pr-24">
        <div>
            <h1 className='text-primary font-semibold text-2xl md:text-3xl mb-6 '>
                Why We Are the Best?
            </h1>
            {features.map((feature,index)=>(
                <div key={index} className='flex items-start gap-4 mt-2'>
                    <img src={feature.icon} alt={feature.title} className='w-9 md:w-11'/>
                    <div>
                        <h3 className='text-lg md:text-xl font-medium'>{feature.title}</h3>
                        <p className='text-xs md:text-sm text-gray-500'>{feature.description}</p>
                    </div>
                    

                </div>
            )
                 
            )}
        </div>
        
      </div>
    </div>
  )
}

export default BottomBanner
