import { useState, useCallback } from "react";
import pizzaData from "../data";
import { CartProvider } from "./CartContext";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Menu from "./Menu";
import Footer from "./Footer";
import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderConfirm from "./OrderConfirm";
import OrderHistory from "./OrderHistory";

function AppContent() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);

  const handleOpenCart = useCallback(() => setShowCart(true), []);
  const handleToggleCart = useCallback(() => setShowCart((v) => !v), []);
  const handleCloseCart = useCallback(() => setShowCart(false), []);
  const handleCheckout = useCallback(() => {
    setShowCart(false);
    setShowCheckout(true);
  }, []);
  const handleCloseCheckout = useCallback(() => setShowCheckout(false), []);
  const handleOrderPlaced = useCallback(() => {
    setShowCheckout(false);
    setShowOrderConfirm(true);
  }, []);
  const handleOrderDone = useCallback(() => setShowOrderConfirm(false), []);
  const handleToggleHistory = useCallback(
    () => setShowOrderHistory((v) => !v),
    []
  );

  return (
    <>
      <Header
        onToggleCart={handleToggleCart}
        onToggleHistory={handleToggleHistory}
      />
      <Hero />
      <About />
      <Menu pizzas={pizzaData} onOpenCart={handleOpenCart} />
      <Footer onCheckout={handleCheckout} />
      <Cart isOpen={showCart} onCheckout={handleCheckout} onClose={handleCloseCart} />
      <Checkout isOpen={showCheckout} onClose={handleCloseCheckout} onOrderPlaced={handleOrderPlaced} />
      <OrderConfirm isOpen={showOrderConfirm} onClose={handleOrderDone} />
      <OrderHistory isOpen={showOrderHistory} onClose={() => setShowOrderHistory(false)} />
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
