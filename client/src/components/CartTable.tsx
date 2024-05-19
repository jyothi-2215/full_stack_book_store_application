import "../assets/css/CartTable.css";
import { useContext } from "react";
import { BookItem } from "../types";
import { CartStore } from "../contexts/CartContext";
import { CartTypes } from "../reducers/CartReducer";

const getBookImageUrl = function (book: BookItem): string {
    let filename = book.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "") + ".jpg";
    try {
        return require(`../assets/images/books/${filename}`);
    } catch (_) {
        return require('../assets/images/books/atomic-habits.jpg');
    }
};

function CartTable() {
    // Access the cart state from the context
    const { cart, dispatch } = useContext(CartStore);

    const handleQuantityChange = (itemId: number, newQuantity: number) => {
        if(newQuantity<=0)
        dispatch({type:CartTypes.REMOVE_ITEM,id:itemId})
        else
        dispatch({ type: CartTypes.UPDATE_QUANTITY, id: itemId, quantity: newQuantity });
    };


    return (
        <div className="cart-table">
            <ul className="cart-bill">
                <li className="table-heading">
                    <div className="heading-book">BOOK</div>
                    <div className="heading-price">PRICE</div>
                    <div className="heading-quantity">QUANTITY</div>
                    <div className="heading-subtotal">AMOUNT</div>
                </li>
                {cart.map((item) => (

                    <li key={item.id}>

                        <div className="cart-book-image">
                            <img src={getBookImageUrl(item.book)} alt={item.book.title}/>
                        </div>
                        <div className="cart-book-title">{item.book.title}</div>
                        <div className="cart-book-price">${item.book.price}</div>
                        <div className="cart-book-quantity">
                            <input
                                type="number"
                                value={item.quantity}
                                min="0"
                                max="20"
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            />
                        </div>

                        <div className="cart-book-subtotal">${(item.book.price * item.quantity).toFixed(2)}</div>

                    </li>
                ))}
            </ul>

        </div>
    );
}

export default CartTable;
