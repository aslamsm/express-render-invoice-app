import { useState } from "react";

/**
 * Recipe: describes the shape of each recipe object we expect from the API.
 * - id: unique numeric identifier for use as React key
 * - name: recipe title
 * - servings, cuisine, difficulty: meta fields shown in UI
 * - image: URL for the recipe image
 */
type Recipe = {
  id: number;
  name: string;
  servings: number;
  cuisine: string;
  difficulty: string;
  image: string;
};

const RecipeSearch = () => {
  // recipes: holds the list of recipes returned by the API
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // searchTerm: controlled input value used to build the search query
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * fetchRecipes:
   * - constructs the search URL using the current searchTerm
   * - calls the API and parses JSON response
   * - updates the recipes state with the returned array (data.recipes)
   *
   * Note: console.log is useful while developing to verify the request URL.
   * In production you may want to add error handling and loading state.
   */
  const fetchRecipes = async () => {
    const apiUrl = `https://dummyjson.com/recipes/search?q=${searchTerm}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    // data.recipes is expected to be an array of Recipe objects
    setRecipes(data.recipes);
  };

  return (
    <div>
      {/* Page heading */}
      <h1 className="text-danger fw-bold mb-4">Recipes (Search)</h1>

      {/* Search input + button */}
      <div className="mb-5 d-flex">
        {/* 
          Controlled input:
          - value is bound to searchTerm state
          - onChange updates searchTerm as user types
        */}
        <input
          type="text"
          className="form-control"
          placeholder="Search Recipes (e.g. Pizz, Chicken, Soup)..."
          onChange={(event) => setSearchTerm(event.target.value)}
          value={searchTerm}
        />
        {/* Clicking Search triggers the API call */}
        <button className="btn btn-primary" onClick={() => fetchRecipes()}>
          Search
        </button>
      </div>

      {/* Grid of recipe cards */}
      <div className="row">
        {recipes.map((recipe) => (
          // Each item needs a unique key for React's reconciliation
          <div className="col-md-4 mb-3" key={recipe.id}>
            <div className="card h-100">
              <img
                alt={recipe.name}
                src={recipe.image}
                className="card-img-top"
              />

              <div className="card-body">
                <h4 className="card-title">{recipe.name}</h4>
                <p className="card-body">{recipe.difficulty}</p>
              </div>
              <div className="card-footer">View Details</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecipeSearch;
