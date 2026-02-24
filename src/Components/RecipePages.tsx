// RecipeList with Client side Pagination
import { useEffect, useState } from "react";

// Define the Recipe type for type safety
type Recipe = {
  id: number;
  name: string;
  servings: number;
  cuisine: string;
  difficulty: string;
  image: string;
};

const PAGE_SIZE = 4;

const RecipePages = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0); // Assuming there are 10 pages total

  const fetchPosts = async () => {
    let skipRecords = (currentPage - 1) * PAGE_SIZE;
    let apiUrl: string = `https://dummyjson.com/recipes?select=id,name,image,difficulty&limit=${PAGE_SIZE}&skip=${skipRecords}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const recipesData: Recipe[] = data.recipes;
    setTotalPages(Math.ceil(data.total / PAGE_SIZE));
    console.log(`Total Page = ${totalPages}`);

    setRecipes(recipesData); // Store recipes in state
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  return (
    <div className="container mt-4">
      <h1 className="text-danger fw-bold mb-4">Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-3 mb-3" key={recipe.id}>
            <div className="card h-100">
              {/* Link to recipe details page */}
              <img alt="" src={recipe.image} className="card-img-top" />

              <div className="card-body">
                <h4 className="card-title">
                  {recipe.id} - {recipe.name}
                </h4>
                <p className="card-body">{recipe.difficulty}</p>
              </div>
              <div className="card-footer">
                View Details
                {/* Link to view recipe details */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(currentPage > 2 ? currentPage - 1 : 1)
              }
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(1)}>
              1
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(2)}>
              2
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(3)}>
              3
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setCurrentPage(4)}>
              4
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(
                  currentPage < totalPages ? currentPage + 1 : currentPage
                )
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default RecipePages;
