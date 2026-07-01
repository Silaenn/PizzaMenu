import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { LocationIcon, PhoneIcon } from "./Icons";

function OrderHistory({ isOpen, onClose }) {
  const { orders, dispatch } = useCart();
  const [expanded, setExpanded] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setExpanded(null);
      setDeletingId(null);
    }
  }, [isOpen]);

  function formatTime(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  }

  return (
    <section className={`order-history${isOpen ? "" : " order-history--closed"}`}>
      <div className="order-history-overlay" onClick={onClose} />
      <div className="order-history-modal">
        <div className="order-history-header">
          <h2>Order History</h2>
          <button className="order-history-close" onClick={onClose}>×</button>
        </div>

        {orders.length === 0 ? (
          <p className="order-history-empty">No orders yet</p>
        ) : (
          <ul className="order-history-list">
            {orders.map((order) => (
              <li key={order.id} className={`history-item${deletingId === order.id ? " history-item--deleting" : ""}`}>
                <button
                  className="history-item-header"
                  onClick={() =>
                    setExpanded(expanded === order.id ? null : order.id)
                  }
                >
                  <div className="history-item-info">
                    <span className="history-item-id">Order #{order.id}</span>
                    <span className="history-item-meta">
                      {order.totalItems} item{order.totalItems > 1 ? "s" : ""}
                      {" · "}
                      ${order.totalPrice.toFixed(2)}
                    </span>
                    <span className="history-item-time">
                      {formatTime(order.time)}
                    </span>
                  </div>
                  <span className="history-item-arrow">
                    {expanded === order.id ? "▾" : "▸"}
                  </span>
                </button>

                {expanded === order.id && (
                  <div className="history-item-detail">
                    <div className="confirm-details">
                      <h3>Items</h3>
                      <ul className="confirm-items">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            <span>{item.quantity}x {item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="confirm-total">
                        <strong>Total</strong>
                        <strong>${order.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>

                    <div className="confirm-info">
                      <p><LocationIcon />{order.customer.address}</p>
                      <p><PhoneIcon />{order.customer.phone}</p>
                    </div>

                    <button
                      className="history-item-delete"
                      onClick={() => {
                        setDeletingId(order.id);
                        setTimeout(() => {
                          dispatch({ type: "DELETE_ORDER", payload: order.id });
                        }, 300);
                      }}
                    >
                      Delete Order
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default OrderHistory;
