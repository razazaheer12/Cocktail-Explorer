import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Home page - show a random cocktail by default
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random.php`);
    const cocktail = response.data.drinks[0];

    res.render("index", {
      cocktail,
      ingredients: extractIngredients(cocktail),
      error: null,
      searchTerm: ""
    });
  } catch (error) {
    console.error(error.message);
    res.render("index", {
      cocktail: null,
      ingredients: [],
      error: "Unable to load cocktail data. Please try again.",
      searchTerm: ""
    });
  }
});

// Search cocktails by name
app.post("/search", async (req, res) => {
  const searchTerm = req.body.cocktailName;

  try {
    const response = await axios.get(
      `${API_URL}/search.php?s=${encodeURIComponent(searchTerm)}`
    );

    const drinks = response.data.drinks;

    if (!drinks || drinks.length === 0) {
      return res.render("index", {
        cocktail: null,
        ingredients: [],
        error: `No cocktails found for "${searchTerm}".`,
        searchTerm
      });
    }

    const cocktail = drinks[0];

    res.render("index", {
      cocktail,
      ingredients: extractIngredients(cocktail),
      error: null,
      searchTerm
    });
  } catch (error) {
    console.error(error.message);
    res.render("index", {
      cocktail: null,
      ingredients: [],
      error: "Something went wrong while searching.",
      searchTerm
    });
  }
});

// Random cocktail button
app.get("/random", async (req, res) => {
  res.redirect("/");
});

// Extract ingredients and measurements
function extractIngredients(cocktail) {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure: measure ? measure.trim() : ""
      });
    }
  }

  return ingredients;
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});