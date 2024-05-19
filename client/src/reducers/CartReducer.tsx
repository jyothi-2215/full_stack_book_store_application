import {ShoppingCartItem,BookItem} from "../types";
export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR: 'CLEAR',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    REMOVE_ITEM: 'REMOVE_ITEM'
};

export type AppActions = {
    id: number;
    type: 'ADD' | 'REMOVE' | 'CLEAR' | 'UPDATE_QUANTITY'|'REMOVE_ITEM'; // Added UPDATE_QUANTITY action type
    item: BookItem;
    quantity?: number; // Optional quantity field for the UPDATE_QUANTITY action
}

export const cartReducer = (state: ShoppingCartItem[], action: AppActions) => {
    switch (action.type) {
        case CartTypes.ADD: {
            // const existingIndex = state.findIndex(book => book.id === action.item.bookId);
            const existingIndex = state.findIndex(book => book.id === (action.item?.bookId));
            if (existingIndex !== -1) {
                const newstate = [...state];
                newstate[existingIndex].quantity++;
                return newstate;
            } else {
                return [...state, new ShoppingCartItem(action.item)];
            }
        }
        case CartTypes.REMOVE: {
            const existingIndex = state.findIndex(book => book.id === action.item.bookId);
            if (existingIndex !== -1) {
                const newstate = [...state];
                if (newstate[existingIndex].quantity > 0) {
                    newstate[existingIndex].quantity--;
                }
                if (newstate[existingIndex].quantity === 0) {
                    newstate.splice(existingIndex, 1);
                }
                return newstate;
            }
            return state;
        }
        case CartTypes.CLEAR: {
            // Add logic for clearing the cart
            return [];
        }
        case CartTypes.UPDATE_QUANTITY: {

            const existingIndex = state.findIndex(book => book.id === action.id);
            if (existingIndex !== -1 && action.quantity !== undefined) {
                const newstate = [...state];
                newstate[existingIndex].quantity = action.quantity;
                return newstate;
            }
            return state;
        }
        case CartTypes.REMOVE_ITEM: {
            return state.filter(item => item.id !== action.id);
        }
        default: {
            throw new Error(`Invalid action type ${action.type}`);
        }
    }
};
