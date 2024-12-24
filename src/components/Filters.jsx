/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const Filters = ({ filters, setFilters}) => {
  return (
    <div className='vg-white p-4 mb-4 rounded-lg shadow-md'>
      <div className='grid grid-cols-1 md:frid-cols-3 gap-4'>
        <select
        value={filters.diet}
        onChange={(e) => setFilters(prev => ({...prev, diet: e.target.value}))}
        className='p-2 border rounded-lg'
        >
          <option value=''>Any Diet</option>
          <option value='vegetarian'>Vegetarian</option>
          <option value='vegan'>Vegan</option>
          <option value='gluten-free'>Gluten Free</option>
        </select>
        <select
        value={filters.cuisine}
        onChange={(e) => setFilters(prev => ({...prev, cuisine: e.target.value}))}
        className='p-2 border rounded-lg'
        >
          <option value=''>Any Cuisine</option>
          <option value='italian'>italian</option>
          <option value='indian'>Indian</option>
          <option value='chinese'>Chinese</option>
        </select>
        <select
        value={filters.maxRedyTime}
        onChange={(e) => setFilters(prev => ({...prev, maxRedyTime: e.target.value}))}
        className='p-2 border rounded-lg'
        >
          <option value=''>Any Time</option>
          <option value='15'>15 minutes or less</option>
          <option value='30'>30 minutes or less</option>
          <option value='60'>1 hour or less</option>
        </select>
      </div>
    </div>
  )
}

export default Filters