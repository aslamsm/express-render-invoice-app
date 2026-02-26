import { useEffect, useState } from "react";

type Recipe = {
  id: number;
  name: string;
  cuisine: string;
  cookingTime: number;
  image: string;
  ingredients: string[];
};

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch("https://dummyjson.com/recipes");
      const data = await res.json();
      setRecipes(data.recipes);
    };

    fetchRecipe();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Recipe List</h2>
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <div className="card h-100">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text mb-1">
                  <strong>Cuisine:</strong> {recipe.cuisine}
                </p>
                <p className="card-text mb-2">
                  <strong>Cooking Time:</strong> {recipe.cookingTime} mins
                </p>
                <p className="card-text">
                  <strong>Main Ingredients:</strong>{" "}
                  {recipe.ingredients.slice(0, 5).join(", ")}
                </p>
                <div className="mt-auto">
                  <button className="btn btn-primary w-100">View Recipe</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
