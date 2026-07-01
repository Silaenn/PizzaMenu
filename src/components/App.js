import { useState, useCallback } from "react";
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
  const { orders } = useCart();
  const hasOrders = orders.length > 0;

  const handleCheckout = useCallback(() => setShowCheckout(true), []);
  const handleCloseCheckout = useCallback(() => setShowCheckout(false), []);
  const handleOrderDone = useCallback(() => setShowCheckout(false), []);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Menu pizzas={pizzaData} />
      <Footer onCheckout={handleCheckout} />
      <Cart onCheckout={handleCheckout} />

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
