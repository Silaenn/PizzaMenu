import { useState, useEffect, useRef } from "react";
import { useCart } from "./CartContext";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function Header() {
  const { totalItems } = useCart();
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("pizza-theme") === "dark";
    } catch {
      return false;
    }
  });
  const [scrolled, setScrolled] = useState(false);
  const heroSentinel = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("pizza-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`header${scrolled ? " header-scrolled" : ""}`}>
      <div className="header-left">
        <button className="header-logo-btn" onClick={() => scrollTo("#hero")}>
          <img src="/logo.png" alt="Fast React Pizza Co." className="header-logo-img" />
        </button>
        <nav className="header-nav">
          <button onClick={() => scrollTo("#about")}>About</button>
          <button onClick={() => scrollTo("#menu")}>Menu</button>
        </nav>
      </div>

      <div className="header-right">
        <button
          className="header-icon-btn"
          onClick={() => setDark((d) => !d)}
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className="header-icon-btn cart-btn"
          onClick={() => scrollTo("#cart")}
          title="Cart"
        >
          <CartIcon />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </button>
      </div>
    </header>
  );
}

export default Header;
