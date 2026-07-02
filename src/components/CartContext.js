import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

const CART_KEY = "pizza-cart";
const ORDERS_KEY = "pizza-orders";

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function loadOrders() {
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function calcTotals(items) {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
  };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);
      let newItems;
      if (existing) {
        newItems = state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { ...state, items: newItems, ...calcTotals(newItems) };
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter((i) => i.id !== action.payload);
      return { ...state, items: newItems, ...calcTotals(newItems) };
    }
    case "UPDATE_QTY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        const newItems = state.items.filter((i) => i.id !== id);
        return { ...state, items: newItems, ...calcTotals(newItems) };
      }
      const newItems = state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      return { ...state, items: newItems, ...calcTotals(newItems) };
    }
    case "CLEAR_CART":
      return { ...state, items: [], totalItems: 0, totalPrice: 0 };
    case "ADD_ORDER": {
      const newOrders = [action.payload, ...state.orders];
      return { ...state, orders: newOrders, items: [], totalItems: 0, totalPrice: 0 };
    }
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((o) => o.id !== action.payload),
      };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const initialItems = loadCart();
  const [state, dispatch] = useReducer(cartReducer, {
    items: initialItems,
    ...calcTotals(initialItems),
    orders: loadOrders(),
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(state.orders));
  }, [state.orders]);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

export { CartProvider, useCart };
