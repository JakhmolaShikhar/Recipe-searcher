/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Clock, Heart, Info } from 'lucide-react';
import React from 'react'

const RecipeCard = ({recipe, isFavorite, onFavoriteToggle, onViewDetails}) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shodow-lg'>
      <div className='relative'>
        <img 
        src={recipe.image}
        alt={recipe.title}
        className='w-full h-48 object-cover grouo-hover:scale-100 transition duration-300'
        />

        <button
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle(recipe);
        }}
        className='absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-yellow-100'  
        >
          <Heart 
          size={20}
          className={isFavorite ? 'fill-yellow-400 text-green-800' : ''}
          />
        </button>
      </div>
      <div className='p-4'>
        <h3 className='font-semibold text-lg mb-2'>{recipe.title}</h3>
        <div className='flex items-center mb-4 gap-4 text-sm text-gray-600'>
          <div className='flex items-center gap-1'>
            <Clock size={20} />
            <span>{recipe.readyInMintues || '30' } mins</span>
          </div>
          {recipe.nutrition?.nutrients[0] && (
            <div className='flex items-center gap-1'>
              <Info size={15}/>
              <span>{Math.round(recipe.nutrition.nutrients[0].amount)} cal</span>
            </div>
          )}
        </div>
        <button
        onClick={() => onViewDetails(recipe.id)}
        className='w-full py-2 px-4 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition'
        >
          View recipe
        </button>
      </div>
    </div>
  )
}

export default RecipeCard