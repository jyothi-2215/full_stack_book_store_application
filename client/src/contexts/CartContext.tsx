import { createContext, Dispatch, ReactNode, useReducer, useEffect } from "react";
import { cartReducer } from "../reducers/CartReducer";
import { ShoppingCartItem } from "../types";
import { AppActions } from "../reducers/CartReducer";

// Define the initial state
const initialCartState: ShoppingCartItem[] = [];

// Create the context with the specified type
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null,
});

// Set display name for better debugging
CartStore.displayName = "CartContext";

// Define the props interface for the CartContext component
interface CartContextProps {
    children: ReactNode;
}

// Define the storage key
const storageKey = 'cart';

// Define the CartContext component
export default function CartContext({ children }: CartContextProps) {

    const [cart, dispatch] = useReducer(
        cartReducer as (state: ShoppingCartItem[], action: AppActions) => ShoppingCartItem[],
        initialCartState,
        (initialState) => {
            try {
                // Get the stored cart from localStorage
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        }
    );


    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }, [cart]);

    // Provide the context value to its children
    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
}
