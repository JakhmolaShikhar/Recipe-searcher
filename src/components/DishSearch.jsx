import { useState, useMemo, useCallback } from "react";
import { Search, Loader2, AlertTriangle, ChevronRight } from 'lucide-react'


const useDishSearch = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
      currentPage: 1,
      totalResults: 0,
      resultsPerPage: 12
    });
  
    const searchDishes = useCallback(async (searchTerm, filters = {}) => {
      if (!searchTerm) return;
  
      setLoading(true);
      setError(null);
  
      try {
        const params = new URLSearchParams({
          query: searchTerm,
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          number: pagination.resultsPerPage,
          offset: (pagination.currentPage - 1) * pagination.resultsPerPage,
          ...filters
        });
  
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${params}`);
        
        if (!response.ok) {
          throw new Error('Unable to fetch dishes. Please try again.');
        }
  
        const data = await response.json();
        setDishes(data.results);
        setPagination(prev => ({
          ...prev,
          totalResults: data.totalResults
        }));
      } catch (err) {
        setError(err.message);
        setDishes([]);
      } finally {
        setLoading(false);
      }
    }, [pagination.currentPage, pagination.resultsPerPage]);
  
    return {
      dishes,
      loading,
      error,
      pagination,
      searchDishes,
      setPagination
    };
  };

const DishSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
      diet: '',
      cuisine: '',
      maxReadyTime: ''
    });
  
    const {
      dishes, 
      loading, 
      error, 
      pagination, 
      searchDishes,
      setPagination
    } = useDishSearch();
  
    const handleSearch = () => {
      searchDishes(searchTerm, {
        diet: filters.diet,
        cuisine: filters.cuisine,
        maxReadyTime: filters.maxReadyTime
      });
    };
  
    const dietOptions = [
      { value: '', label: 'All Diets' },
      { value: 'vegetarian', label: 'Vegetarian' },
      { value: 'vegan', label: 'Vegan' },
      { value: 'gluten-free', label: 'Gluten Free' }
    ];
  
    const cuisineOptions = [
      { value: '', label: 'All Cuisines' },
      { value: 'italian', label: 'Italian' },
      { value: 'mexican', label: 'Mexican' },
      { value: 'asian', label: 'Asian' }
    ];
  
    const renderPagination = useMemo(() => {
      const totalPages = Math.ceil(pagination.totalResults / pagination.resultsPerPage);
  
      return (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button
            disabled={pagination.currentPage === 1}
            onClick={() => setPagination(prev => ({ 
              ...prev, 
              currentPage: prev.currentPage - 1 
            }))}
            className="disabled:opacity-50 p-2 bg-gray-200 rounded"
          >
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {totalPages}
          </span>
          <button
            disabled={pagination.currentPage >= totalPages}
            onClick={() => setPagination(prev => ({ 
              ...prev, 
              currentPage: prev.currentPage + 1 
            }))}
            className="disabled:opacity-50 p-2 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      );
    }, [pagination, setPagination]);
  
    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Culinary Discovery Hub
          </h1>
  
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow relative">
              <input 
                type="text" 
                placeholder="Search for recipes (e.g., pasta, pizza)" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
  
            <button 
              onClick={handleSearch} 
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <><Loader2 className="mr-2 animate-spin" /> Searching...</>
              ) : (
                'Search Recipes'
              )}
            </button>
          </div>
  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <select
              value={filters.diet}
              onChange={(e) => setFilters(prev => ({ ...prev, diet: e.target.value }))}
              className="p-2 border rounded"
            >
              {dietOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
  
            <select
              value={filters.cuisine}
              onChange={(e) => setFilters(prev => ({ ...prev, cuisine: e.target.value }))}
              className="p-2 border rounded"
            >
              {cuisineOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
  
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <AlertTriangle className="inline mr-2" />
              {error}
            </div>
          )}
  
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {dishes.map((dish) => (
                  <div 
                    key={dish.id} 
                    className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                  >
                    <img 
                      src={dish.image} 
                      alt={dish.title} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 truncate">
                        {dish.title}
                      </h3>
                      <button className="flex items-center text-blue-600 hover:text-blue-800">
                        View Details <ChevronRight className="ml-1" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
  
              {dishes.length > 0 && renderPagination}
  
              {dishes.length === 0 && !loading && (
                <div className="text-center text-gray-500 py-12">
                  No recipes found. Try a different search term.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default DishSearch;