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
      <div>
        {showFavorites ? (
          <div>
            <BookmarkCheck size={45} className='mx-auto mb-4' />
            <p className='text-xl'>No favorite recipes found</p>
            <p className='mt-2'>Save your favorite recipes by clicking heart icon</p>
          </div>
        ) : (
          <div>
            <ChefHat size={45} className='mx-auto mb-4' />
            <p className='text-xl'>No recipes found</p>
            <p className='mt-2'>Try adjusting your search</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
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