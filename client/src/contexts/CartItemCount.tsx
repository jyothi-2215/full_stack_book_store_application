import { useContext } from 'react';
import { CartStore } from "./CartContext";

function CartItemCount() {
    // Access the cart state from the CartContext
    const { cart } = useContext(CartStore);

    // Calculate the total number of items in the cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return totalItems;
}

export default CartItemCount;
