import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
  const { products, searchQuery } = useAppContext()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredProducts(filtered)
      } else {
        setFilteredProducts(products)
      }
      setLoading(false)
    }, 400) // 400ms delay to simulate loading

    return () => clearTimeout(timeout)
  }, [products, searchQuery])

  // // Function to highlight matched text
  // const highlightMatch = (text) => {
  //   const query = searchQuery.trim()
  //   if (!query) return text

  //   const regex = new RegExp(`(${query})`, 'gi')
  //   return text.replace(regex, '<mark class="bg-yellow-200 text-black">$1</mark>')
  // }

  return (
    <div className='mt-16 flex flex-col w-full px-4'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-xl md:text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {loading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 gap-3 md:gap-6'>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white shadow rounded-xl p-3 space-y-3 border border-gray-200"
            >
              <div className="bg-gray-300 h-40 w-full rounded-lg" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className='text-center w-full mt-10 text-gray-500 text-lg'>
              No products found for "<span className='font-semibold'>{searchQuery}</span>"
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 gap-3 md:gap-6'>
              {filteredProducts.filter(p => p.inStock).map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AllProducts
