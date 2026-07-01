import { useState, useCallback, useRef, useEffect } from "react";
import pizzaData from "../data";
import { CartProvider, useCart } from "./CartContext";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Menu from "./Menu";
import Footer from "./Footer";
import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderConfirm from "./OrderConfirm";

function AppContent() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { items, orders } = useCart();
  const hasOrders = orders.length > 0;

  const prevItemCount = useRef(0);
  useEffect(() => {
    if (items.length > 0 && prevItemCount.current === 0) {
      setShowCart(true);
    }
    prevItemCount.current = items.length;
  }, [items.length]);

  const handleToggleCart = useCallback(() => setShowCart((v) => !v), []);
  const handleCloseCart = useCallback(() => setShowCart(false), []);
  const handleCheckout = useCallback(() => {
    setShowCart(false);
    setShowCheckout(true);
  }, []);
  const handleCloseCheckout = useCallback(() => setShowCheckout(false), []);
  const handleOrderDone = useCallback(() => setShowCheckout(false), []);

  return (
    <>
      <Header onToggleCart={handleToggleCart} />
      <Hero />
      <About />
      <Menu pizzas={pizzaData} />
      <Footer onCheckout={handleCheckout} />
      <Cart isOpen={showCart} onCheckout={handleCheckout} onClose={handleCloseCart} />

      {showCheckout && !hasOrders && (
        <Checkout onClose={handleCloseCheckout} />
      )}

      {hasOrders && <OrderConfirm onClose={handleOrderDone} />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
