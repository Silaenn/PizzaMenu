import { useState, useEffect } from "react";
import { useCart } from "./CartContext";

function Header() {
  const { totalItems } = useCart();
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("pizza-theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("pizza-theme", dark ? "dark" : "light");
  }, [dark]);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="theme-toggle" onClick={() => setDark((d) => !d)}>
          {dark ? "☀️" : "🌙"}
        </button>
        <nav className="header-nav">
          <button onClick={() => scrollTo("#about")}>About</button>
          <button onClick={() => scrollTo("#menu")}>Menu</button>
        </nav>
      </div>

      <div className="header-center">
        <h1>Fast React Pizza Co.</h1>
      </div>

      <div className="header-right">
        {totalItems > 0 && (
          <button
            className="cart-badge"
            onClick={() => scrollTo("#cart")}
            title="View cart"
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{totalItems}</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
