import { useCart } from "./CartContext";

function OrderConfirm({ onClose }) {
  const { orders } = useCart();
  const lastOrder = orders[0];

  if (!lastOrder) return null;

  return (
    <section className="order-confirm">
      <div className="confirm-card">
        <div className="confirm-icon">✓</div>
        <h2>Order Confirmed!</h2>
        <p className="confirm-id">Order #{lastOrder.id}</p>
        <p className="confirm-msg">
          Thank you, {lastOrder.customer.name}! Your order is being prepared.
        </p>

        <div className="confirm-details">
          <h3>Order Summary</h3>
          <ul className="confirm-items">
            {lastOrder.items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="confirm-total">
            <strong>Total</strong>
            <strong>${lastOrder.totalPrice.toFixed(2)}</strong>
          </div>
        </div>

        <div className="confirm-info">
          <p>📍 {lastOrder.customer.address}</p>
          <p>📞 {lastOrder.customer.phone}</p>
          <p>⏱️ Estimated delivery: 30-45 minutes</p>
        </div>

        <button className="btn" onClick={onClose} style={{ marginTop: "2rem" }}>
          Back to Menu
        </button>
      </div>
    </section>
  );
}

export default OrderConfirm;
