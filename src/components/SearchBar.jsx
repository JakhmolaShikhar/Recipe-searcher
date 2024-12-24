/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Filter, Search } from "lucide-react"


const SearchBar = ({searchTerm, setSearchTerm, showFilters, setShowFilters}) => {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex-1 relative">
				<input 
				type="text"
				placeholder="Search recipes"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="w-full p-4 pl-12 rounded-lg border"
				/>
				<Search className='absolute left-4 top-1/2 -translate-y-1/2' />
      </div>
			<button
			onClick={() => setShowFilters(!showFilters)}
			className={`p-4 rounded-lg border ${ showFilters ? 
				'bg-blue-50 border-blue-200' :'hover:bg-gray-50'}`}
			>
				<Filter size={20} />
			</button>
    </div>
  )
}

export default SearchBar