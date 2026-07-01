import { useState } from "react";
import { useCart } from "./CartContext";

function Checkout({ onClose }) {
  const { items, totalItems, totalPrice, dispatch } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  if (submitted) return null;

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.address.trim()) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      id: Date.now().toString(36).toUpperCase(),
      items: [...items],
      totalItems,
      totalPrice,
      customer: { ...form },
      time: new Date().toISOString(),
    };

    dispatch({ type: "ADD_ORDER", payload: order });
    setSubmitted(true);
  }

  function handleChange(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  if (submitted) {
    return null;
  }

  return (
    <section className="checkout">
      <div className="checkout-overlay" onClick={onClose} />
      <div className="checkout-modal">
        <button className="checkout-close" onClick={onClose}>
          ×
        </button>
        <h2>Place Your Order</h2>

        <div className="checkout-summary">
          <p>
            {totalItems} pizza{totalItems > 1 ? "s" : ""} · $
            {totalPrice.toFixed(2)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="form-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="John Doe"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="+62 812-3456-7890"
            />
            {errors.phone && (
              <span className="form-error">{errors.phone}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="address">Delivery Address</label>
            <input
              id="address"
              value={form.address}
              onChange={handleChange("address")}
              placeholder="Jl. Merdeka No. 123, Jakarta"
            />
            {errors.address && (
              <span className="form-error">{errors.address}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={handleChange("notes")}
              placeholder="Extra cheese, no onions, etc."
              rows={3}
            />
          </div>

          <button type="submit" className="btn btn-checkout">
            Place Order — ${totalPrice.toFixed(2)}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
