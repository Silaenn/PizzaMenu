import { useState } from "react";
import Pizza from "./Pizza";

const categories = ["all", "vegetarian", "meat"];

function Menu({ pizzas }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = pizzas.filter((pizza) => {
    const matchSearch =
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.ingredients.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      category === "all" || pizza.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <section className="menu" id="menu">
      <h2>Our Menu</h2>
      <p>
        {pizzas.length} handcrafted pizzas. All from our stone oven, all
        organic, all delicious.
      </p>

      <div className="menu-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search pizza..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <ul className="pizzas">
          {filtered.map((data, i) => (
            <Pizza pizzaObj={data} key={data.name} index={i} />
          ))}
        </ul>
      ) : (
        <p className="no-results">
          No pizzas found for "<strong>{searchQuery}</strong>"
        </p>
      )}
    </section>
  );
}

export default Menu;
