# Cocktail Explorer 🍸

A premium **Express + Axios + EJS** web app that lets you **search cocktails by name** and discover a **random drink** using the free **TheCocktailDB API**.

Live demo: https://cocktail-explorer-psi.vercel.app/

GitHub: https://github.com/razazaheer12/Cocktail-Explorer

---

## ✨ Features

- **Random Cocktail** landing page (loads on `/`)
- **Search cocktails** by name (POST `/search`)
- Clean, modern UI with custom styling (`public/style.css`)
- Displays:
  - Cocktail image (`strDrinkThumb`)
  - Alcohol type (`strAlcoholic`)
  - Category (`strCategory`)
  - Ingredient list + measurements (`strIngredient1..15`, `strMeasure1..15`)
  - Full instructions (`strInstructions`)

---

## 🧩 Tech Stack

- **Node.js**
- **Express** (server + routing)
- **EJS** (views / templates)
- **Axios** (HTTP requests to TheCocktailDB)
- **TheCocktailDB API** (cocktail data)

---

## 📦 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/razazaheer12/Cocktail-Explorer.git
cd Cocktail-Explorer
```

2. Install dependencies:

```bash
npm install
```

3. Run the app locally:

```bash
npm start
```

4. Open your browser:

- http://localhost:3000

---

## 🚀 Deployment (Vercel)

This project is deployed on **Vercel**.

**Notes:**
- Vercel runs Node apps using the configured entry (the server in `index.js`).
- Static assets are served from `public/` via:

```js
app.use(express.static("public"));
```

---

## 🗂️ Project Structure

```text
Cocktail Explorer/
├─ index.js
├─ package.json
├─ package-lock.json
├─ public/
│  └─ style.css
├─ views/
│  ├─ index.ejs
│  └─ partials/
│     ├─ header.ejs
│     └─ footer.ejs
└─ README.md
```

---

## 🔍 How it Works

- **GET `/`**
  - Calls:
    - `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  - Renders `views/index.ejs` with:
    - `cocktail`
    - extracted `ingredients`

- **POST `/search`**
  - Calls:
    - `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=...`
  - If no results are found, the UI shows an error message.

- **Ingredient extraction**
  - Uses `extractIngredients(cocktail)` to loop through `strIngredient1..15` and pair each with `strMeasure`.

---

## 🧪 Scripts

From `package.json`:

- `npm start` → starts the server
- `npm run dev` → runs with nodemon (development)

---

## 🤝 Acknowledgements

- **TheCocktailDB** for providing the cocktail data API.
- EJS + Express community for templates and routing patterns.

---

## 📄 License

ISC

