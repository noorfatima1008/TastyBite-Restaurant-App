import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

import {
  cartReducer,
  initialCartState,
  CartItem,
} from "../reducers/cartReducer";

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: {
    id: string;
    name: string;
    price: number;
    emoji: string;
  }) => void;
  increaseItem: (id: string) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState
  );

  const value = useMemo(() => {
    const totalItems = state.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const totalPrice = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      items: state.items,
      totalItems,
      totalPrice,

      addItem: (item: {
        id: string;
        name: string;
        price: number;
        emoji: string;
      }) =>
        dispatch({
          type: "ADD_ITEM",
          payload: item,
        }),

      increaseItem: (id: string) =>
        dispatch({
          type: "INCREASE",
          payload: id,
        }),

      decreaseItem: (id: string) =>
        dispatch({
          type: "DECREASE",
          payload: id,
        }),

      removeItem: (id: string) =>
        dispatch({
          type: "REMOVE",
          payload: id,
        }),

      clearCart: () =>
        dispatch({
          type: "CLEAR",
        }),
    };
  }, [state.items]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}