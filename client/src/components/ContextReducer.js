import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            const existingItem = state.find(food => food.id === action.id && food.size === action.size);

            if (existingItem) {
                // If the item already exists, update its quantity and price
                return state.map(food =>
                    food.id === action.id && food.size === action.size
                        ? { ...food, qty: food.qty + action.qty, price: (food.price / food.qty) * (food.qty + action.qty) }
                        : food
                );
            } else {
                // If the item doesn't exist, add it as a new entry
                return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
            }

        case "UPDATE":
            return state.map(food =>
                food.id === action.id && food.size === action.size
                    ? { ...food, qty: action.qty, price: (food.price / food.qty) * action.qty }
                    : food
            );

        case "REMOVE":
            return state.filter((_, index) => index !== action.index);

        case "DROP":
            return [];

        default:
            console.log("Error in Reducer");
            return state;
    }
};





export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
