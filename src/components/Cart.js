import { useCart } from "./CartContext";

function Cart({ onCheckout, onClose }) {
  const { items, totalItems, totalPrice, dispatch } = useCart();

  return (
    <aside className="cart" id="cart">
      <div className="cart-header">
        <h3>Your Cart{totalItems > 0 ? ` (${totalItems})` : ""}</h3>
        <div className="cart-header-actions">
          {totalItems > 0 && (
            <button
              className="cart-clear"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
            >
              Clear
            </button>
          )}
          <button className="cart-close" onClick={onClose}>
            ×
          </button>
        </div>
      </div>

      {totalItems === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="cart-item-qty">
                  <button
                    className="cart-qty-btn"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QTY",
                        payload: { id: item.id, quantity: item.quantity - 1 },
                      })
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="cart-qty-btn"
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_QTY",
                        payload: { id: item.id, quantity: item.quantity + 1 },
                      })
                    }
                  >
                    +
                  </button>
                  <button
                    className="cart-remove"
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", payload: item.id })
                    }
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <strong>Total:</strong> ${totalPrice.toFixed(2)}
          </div>

          <button className="btn btn-cart-checkout" onClick={onCheckout}>
            Proceed to Checkout →
          </button>
        </>
      )}
    </aside>
  );
}

export default Cart;
