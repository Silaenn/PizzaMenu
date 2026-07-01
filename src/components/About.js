import useScrollReveal from "../hooks/useScrollReveal";

const images = [
  "/pizzas/margherita.jpg",
  "/pizzas/diavola.jpg",
  "/pizzas/funghi.jpg",
  "/pizzas/prosciutto.jpg",
];

function About() {
  const [sectionRef, isVisible] = useScrollReveal(.4);

  return (
    <section
      ref={sectionRef}
      className={`about reveal-section${isVisible ? " visible" : ""}`}
      id="about"
    >
      <div className="about-content">
        <h2>Our Story</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Born in a small kitchen with a big dream, Fast React Pizza Co.
              brings the authentic taste of Napoli to your table. Every pizza
              starts with our 48-hour fermented dough, imported San Marzano
              tomatoes, and the finest mozzarella.
            </p>
            <p>
              We believe great pizza is about three things: quality ingredients,
              the perfect stone-baked crust, and a passion that never cools
              down. No shortcuts, no compromises — just pizza the way it should
              be.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">18</span>
                <span className="stat-label">Pizza Varieties</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Fresh Ingredients</span>
              </div>
              <div className="stat">
                <span className="stat-number">48h</span>
                <span className="stat-label">Dough Fermentation</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-image-grid">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="about-img-box"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
