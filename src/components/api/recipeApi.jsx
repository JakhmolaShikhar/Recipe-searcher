/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-labels */
const API_BASE_URL = 'https://api/spoonacular.com/recipes';
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const recipeApi = () => {
  const searchRecipes = async(searchTerm, filters) => {
    const params = new URLSearchParams({
      query: searchTerm,
      apikey: API_KEY,
      number: 12,
      addRecipeNutrition: true,
      ...filters
    });

    const res = await fetch(`${API_BASE_URL}/complexSearch?query=${params}`);
    if(!res.ok)throw new Error('Failed to fetch recipes');
    return res.json()
  }

  const getRecipeDetails = async(id) => {
    const res = await fetch(`${API_BASE_URL}/${id}/information?apikey=${API_KEY}`);
    if(!res.ok) throw new Error('Failed to fetch recipe details');
    return res.json()
  }
  
}

export default recipeApi