import CartTable from "./CartTable";
import '../assets/css/Cart.css';
import CartItemCount from "../contexts/CartItemCount";
import { CartStore } from "../contexts/CartContext";
import {useContext, useEffect, useState} from "react";
import {CartTypes} from "../reducers/CartReducer";
import {useNavigate} from 'react-router-dom'



export function Cart() {
    const { cart,dispatch } = useContext(CartStore);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        // Calculate subtotal when the cart changes
        calculateSubtotal();

    }, [cart]);


    const calculateSubtotal = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.book.price * item.quantity;
        });
        setSubtotal(total);
    };



    const handleProceedToCheckout = () => {
        navigate("/checkout");
    };


    // console.log("Previous path:"+previousPathname);
    const handleContinueShopping = () => {

            navigate(-1);

        };

    const handleClearCart = () => {
        dispatch({type:CartTypes.CLEAR});
    };
    const totalItems = CartItemCount();
    return (
        <div>
            <div className="cart-info">
                Your shopping cart contains {totalItems} {'item' +(totalItems === 1 ? '' : 's')}
            </div>

            {cart.length > 0 ? (
                <div>
                    <div className="cart-buttons">
                        <button className="continue-shopping" onClick={handleContinueShopping}>Continue Shopping
                        </button>
                        <button className="checkout-button" onClick={handleProceedToCheckout}>Proceed to Checkout
                        </button>
                    </div>
                    <div style={{marginTop: '50px', marginBottom: '80px'}}>
                        <CartTable/>
                        <div className="clear-and-total">
                            <div>
                                <button className="clear-cart" onClick={handleClearCart}>Clear Cart</button>
                            </div>
                            <div className="sub-total">SubTotal: ${subtotal.toFixed(2)}</div>
                        </div>

                    </div>
                </div>
            ) : (
                <div className="cart-buttons">
                    <button className="continue-shopping" onClick={handleContinueShopping}>Continue Shopping</button>
                </div>
            )}
        </div>
    );
}
