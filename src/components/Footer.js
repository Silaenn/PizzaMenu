import useScrollReveal from "../hooks/useScrollReveal";
import Order from "./Order";

function Footer({ onCheckout }) {
  const [footerRef, isVisible] = useScrollReveal();
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  if (!isOpen) {
    const nextOpen = hour < openHour ? openHour : 12;
    return (
      <footer
        ref={footerRef}
        className={`footer reveal-section${isVisible ? " visible" : ""}`}
      >
        <div className="order">
          <p>We're currently closed for the day.</p>
          <p>
            Our kitchen is open daily from {openHour}:00 to {closeHour}:00,
            serving authentic wood-fired pizzas made with the freshest
            ingredients.
          </p>
          <p>
            We'll be back tomorrow at {nextOpen}:00. See you then for a slice of
            Napoli!
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer
      ref={footerRef}
      className={`footer reveal-section${isVisible ? " visible" : ""}`}
    >
      <Order
        closeHour={closeHour}
        openHour={openHour}
        onCheckout={onCheckout}
      />
    </footer>
  );
}

export default Footer;
