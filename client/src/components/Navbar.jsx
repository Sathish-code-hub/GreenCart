import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  
  const [open, setOpen] = useState(false)
  const {user,setUser, setShowUserLogin, navigate, searchQuery, setSearchQuery, location, getCartCount,
     axios} = useAppContext();

  const logout = async() => {
    try {
      const {data} = await axios.post('/api/user/logout')
      if (data.success) {
        toast.success(data.message)
        setUser(null)
        setOpen(false)
        navigate('/')        
      }else{
        toast.error(data.error)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }
  
useEffect(() => {
  // Only clear if searchQuery is not empty
  if (location.pathname !== '/products' && searchQuery !== '') {
    setSearchQuery('');
  }
}, [location.pathname]);
 

  return (
    <nav className="flex fixed top-0 right-0 left-0 z-10 items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">

            <NavLink to='/'>
                <img className="h-7 lg:h-9" src={assets.logo} alt="logo" />
            </NavLink>

            <Link to='/seller' className="px-3 py-1 text-sm md:text-base rounded-full border border-gray-400 whitespace-nowrap 
             hover:bg-gray-100 transition duration-200">
            Seller
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/" onClick={() => setSearchQuery('')}>Home</NavLink>
                <NavLink to="/products">All products</NavLink>
                <NavLink to="/contact">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                  <input value={searchQuery} onChange={(e) => {
                      setSearchQuery(e.target.value)
                      if (location.pathname !== '/products') {
                          navigate('/products');
                      }
                  }
                    } className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"  type="text" placeholder="Search products" />
                    <img src={assets.search_icon} />
                </div>

                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer  ">
                     <img src={assets.nav_cart_icon} />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
              {
                  !user ? (
                      <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                          Login
                      </button>

                  ) : (
                      <div className="relative group">
                          <button className="cursor-pointer transition text-white rounded-full">
                              <img src={assets.profile_icon} className="h-8" alt="Profile" />
                          </button>


                          {/* Dropdown on hover */}
                          <div className="absolute cursor-pointer -right-4  w-40 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200 z-50">
                             <p onClick={()=>navigate('/my-orders')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                                My orders
                            </p>
                              <button
                                  onClick={logout}
                                  className="w-full cursor-pointer text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                  Logout
                              </button>
                          </div>
                      </div>

                  )
              }
                
            </div>

            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer  ">
                     <img src={assets.nav_cart_icon} />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                 <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
                {/* Menu Icon SVG */}
                 <img src={assets.menu_icon} />
            </button>
            </div>

           

            {/* Mobile Menu */}
          { open && ( 
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-6 flex-col items-start gap-4 px-5 text-sm md:hidden`}>
              <NavLink to='/' className="block" onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink to='/products' className="block" onClick={() => setOpen(false)}>All products</NavLink>
              <NavLink to='/contact' className="block" onClick={() => setOpen(false)}>Contact</NavLink>
              
              {user && 
                      <p onClick={() => navigate('/orders')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" >
                          My orders
                      </p>
              }
    
              {
                  !user ? (
                      <button onClick={()=>{setOpen(false); setShowUserLogin(true);} } className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                          Login
                      </button>
                  ) : (
                      <button onClick={logout} className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                          Logout
                      </button>
                  )
              }
          </div>
           )}
        </nav>
  )
}

export default Navbar
