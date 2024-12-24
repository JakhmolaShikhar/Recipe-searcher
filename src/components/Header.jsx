/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'

const Header = ({showFavorites, setShowFavorites}) => {
  return (
    <div>
        <nav className='bg-red-300 shadow-md rounded-md text-white'>
            <div className='max-w-7xl mx-auto px-4 py-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-bold text-yellow-300'>
                      Recipe Hub
                    </h1>
                    <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
                      ${showFavorites ? 'bg-yelow-100 text-green-100' : 'hover:bggray-100'}`}
                    >
                      {showFavorites ? <BookmarkCheck /> : <Bookmark/>}
                      {showFavorites ? 'Favorites' : 'Show Favorites'}
                    </button>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header