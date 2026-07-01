import { useCart } from "./CartContext";

function Order({ closeHour, openHour, onCheckout }) {
  const { totalItems, totalPrice } = useCart();

  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      {totalItems > 0 && (
        <p className="order-summary">
          {totalItems} pizza{totalItems > 1 ? "s" : ""} selected — $
          {totalPrice.toFixed(2)}
        </p>
      )}
      {totalItems > 0 && (
        <button className="btn" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Order;
