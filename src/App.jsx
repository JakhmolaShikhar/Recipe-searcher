/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';
import DishSearch from './components/DishSearch'
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import RecipeGrid from './components/RecipeGrid';
import useLocalStorage from './components/hooks/useLocalStorage';
import useDebounce from './components/hooks/useDebounce';
import recipeApi from './components/api/recipeApi';

function App() {

  const [showFavorites, setShowFavorites] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [filters, setFilters] = useState({
    diet: '',
    cuisine: '',
    maxReadyTime: '',
  });
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchRecipes = async() => {
      if(!debouncedSearchTerm) return;
      setLoading(true);
      setError(null);

      try {
        const data = await recipeApi.searchRecipes(debouncedSearchTerm, filters);
        setRecipes(data.results);
      } catch(error){
        setError(error.message);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [debouncedSearchTerm,filters]);

  const handleFavoriteToggle = (recipe) => {
    setFavorites(prev =>{
      prev.some(fav => fav.id ===recipe.id)
      ? prev.filter(fav => fav.id !== recipe.id)
      : [...prev, recipe]
    });
  };

  const handleViewDetails = async(id) => {
    try{
      const recipe = await recipeApi.getRecipeDetails(id);
      console.log(recipe);
    } catch(error){
      setError('Failed to load recipe');
    }
  }

  return (
    <div>
      <Header showFavorites={showFavorites} setShowFavorites={setShowFavorites}/>
      <SearchBar 
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      />

      {showFilters && (
        <Filters filters={filters} setFilters={setFilters}/>
      )}

      <RecipeGrid 
      recipes={showFavorites ? favorites : recipes}
      loading={loading}
      showFavorites={showFavorites}
      favorites={favorites}
      onFavoriteToggle={handleFavoriteToggle}
      onViewDetails={handleViewDetails}
      />
      
    </div>
  )
}

export default App
