/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import RecipeCard from './RecipeCard'
import { Loader, BookmarkCheck, ChefHat } from 'lucide-react'

const RecipeGrid = ({ recipes, loading, showFavorites, favorites, onFavoriteToggle, onViewDetails}) => {
  
  if(loading) {
    return(
      <div className='flex justify-center items-center h-64'>
        <Loader className='text-blue-500 animate-spin' size={46}/>
      </div>
    )
  }
  
  if(recipes.length === 0){
    return (
      <div></div>
    )
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard 
        key={recipe.id}
        recipe={recipe}
        isFavorite={favorites.some(fav => fav.id === recipe.id)}
        onFavoriteToggle={onFavoriteToggle}
        onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
}

export default RecipeGrid