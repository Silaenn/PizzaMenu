import Order from "./Order";

function Footer({ onCheckout }) {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  if (!isOpen) {
    return (
      <footer
        className="footer"
      >
        <div className="order">
          <p>
            We're closed. We're open from {openHour}:00 to {closeHour}:00.{" "}
            {hour < openHour
              ? `Come back at ${openHour}:00.`
              : `Come back tomorrow at ${openHour}:00.`}
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer
      className="footer"
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
