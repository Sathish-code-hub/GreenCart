import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { Link, NavLink } from 'react-router-dom'

const MainBanner = () => {
  
  const {navigate} = useAppContext()

  return (
    <div className="relative" data-aos="fade-up">
      {/* Background images */}
      <img src={assets.main_banner_bg} alt="banner" className="w-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="banner" className="w-full block md:hidden" />

      {/* Overlayed content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center
        pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-center lg:text-left text-3xl md:text-5xl font-bold text-gray-900 max-w-lg leading-tight">
          Freshness You Can Trust, <br className="hidden sm:block" /> Savings You will Love!
        </h1>
      

        <div className=" flex items-center mt-6 gap-4">
          <Link to={'/products'} className=" group flex gap-2 items-center transition rounded bg-primary text-white px-7 md:px-9 py-3 cursor-pointer font-medium hover:bg-primary-dull">
            Shop now
            <img src={assets.white_arrow_icon} className='md:hidden transition group-focus:translate-x-1'/>
          </Link>

          <Link to={"/deals"} className="group hidden md:flex items-center gap-2  text-gray-800 cursor-pointer font-medium transition">
            Explore deals 
            <img src={assets.black_arrow_icon} className=' transition group-hover:translate-x-1' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
