export type CartItem = {
  id: string;
  name: string;
  price: number;
  emoji: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | {
      type: "ADD_ITEM";
      payload: {
        id: string;
        name: string;
        price: number;
        emoji: string;
      };
    }
  | {
      type: "INCREASE";
      payload: string;
    }
  | {
      type: "DECREASE";
      payload: string;
    }
  | {
      type: "REMOVE";
      payload: string;
    }
  | {
      type: "CLEAR";
    };

export const initialCartState: CartState = {
  items: [],
};

export function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    case "INCREASE":
      return {
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE":
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE":
      return {
        items: state.items.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "CLEAR":
      return initialCartState;

    default:
      return state;
  }
}