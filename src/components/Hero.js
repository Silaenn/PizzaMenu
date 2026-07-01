function Hero() {
  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="hero">
      <div id="hero-sentinel" />
      <div
        className="hero-bg"
        style={{ backgroundImage: "url(/pizzas/hero-bg.jpg)" }}
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Fast React Pizza Co.</h1>
        <p className="hero-subtitle">
          Authentic Italian · Wood-fired Since 2025
        </p>
        <p className="hero-desc">
          Handcrafted pizzas made with imported Italian ingredients,
          baked to perfection in our traditional stone oven.
        </p>
        <button className="hero-cta" onClick={scrollToMenu}>
          Browse Our Menu
        </button>
      </div>
      <div className="hero-scroll" onClick={scrollToMenu}>
        <span>Scroll down</span>
        <span className="hero-scroll-icon">↓</span>
      </div>
    </section>
  );
}

export default Hero;
