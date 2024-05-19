import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {asDollarsAndCents} from "../utils";

const bookImageFileName =  (book:BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpg`;
};

function CategoryBookListItem(props:BookItem) {
    const{cart,dispatch}=useContext(CartStore);
    const addToCart = () =>{
        dispatch({type:'ADD',item:props});
    }
    const price = props.price;
    const integerPart = Math.floor(price);
    const decimalPart = (price - integerPart).toFixed(2).substring(1);

    return (
        <li className="book-box">
            <div className="book-image">
                <img style={{width:'120px',height:'180px',marginTop:'23px'}} src={require('../assets/images/books/' + bookImageFileName(props))}
                     alt="book.title"

                />
                {props.isPublic &&
                    <button className="read-now-button" style={{cursor:'pointer'}}>
                        <img className="read-now-img" style={{cursor:'pointer'}} src={require('../assets/images/site/read_now.png')} alt="read-now-img"/>
                    </button>}
            </div>
            <div className="book-info">
                <div className="book-price">{asDollarsAndCents(price*100)}</div>
                <div className="book-title">{props.title}</div>
                <div className="book-author">{props.author}</div>

                <button className="add-cart-button" onClick={addToCart}><i className="fa">&#xf217;</i> ADD TO CART</button>

            </div>


        </li>

    )
}

export default CategoryBookListItem;
