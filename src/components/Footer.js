import Order from "./Order";

function Footer({ onCheckout }) {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  if (!isOpen) return <footer className="footer">CLOSED</footer>;

  return (
    <footer className="footer">
      <Order
        closeHour={closeHour}
        openHour={openHour}
        onCheckout={onCheckout}
      />
    </footer>
  );
}

export default Footer;
