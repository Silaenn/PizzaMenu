import { useCart } from "./CartContext";
import { LocationIcon, PhoneIcon, ClockIcon } from "./Icons";

function OrderConfirm({ isOpen, onClose }) {
  const { orders } = useCart();
  const lastOrder = orders[0];

  return (
    <section className={`order-confirm${isOpen ? "" : " order-confirm--closed"}`}>
      <div className="order-confirm-overlay" onClick={onClose} />
      <div className="confirm-card">
        <div className="confirm-icon">✓</div>
        <h2>Order Confirmed!</h2>
        {lastOrder && (
          <>
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
              <p><LocationIcon />{lastOrder.customer.address}</p>
              <p><PhoneIcon />{lastOrder.customer.phone}</p>
              <p><ClockIcon />Estimated delivery: 30-45 minutes</p>
            </div>
          </>
        )}

        <button className="btn" onClick={onClose} style={{ marginTop: "2rem" }}>
          Back to Menu
        </button>
      </div>
    </section>
  );
}

export default OrderConfirm;
