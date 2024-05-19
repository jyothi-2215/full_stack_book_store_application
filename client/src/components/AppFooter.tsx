import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link, useLocation} from "react-router-dom";
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import '../assets/css/AppFooter.css';


function AppFooter(){
    const { cart } = useContext(CartStore);
    const location = useLocation();

    // Check if the current location is the cart page
    const isCartPage = location.pathname === "/cart";
    const isConfiramationPage = location.pathname === "/confirmation";
    const isCheckoutPage = location.pathname === "/checkout";

return(
    <footer className={`complete-footer ${((isCartPage || isCheckoutPage)  && (cart.length === 0|| cart.length === 1||cart.length === 2))||(isConfiramationPage)? 'empty-cart' : ''} `}>
        <section className="links"></section>
        <section className="contact-info">
            <p className="social-media-icons">
                <a href="https://www.twitter.com" target="_blank">
                    <img title="X Logo"
                         src="https://rails-assets-us.bookshop.org/assets/icon-x-06f2c6421bcff972e6d6da324504104da14c947623f367be696d63f47a0ea451.svg"/>
                </a>
                <a href="https://www.facebook.com" target="_blank">
                    <img title="Facebook Logo"
                         src="https://rails-assets-us.bookshop.org/assets/icon-facebook-573255ba1a893bcc1b0e26d5bb3d26e29950e72079360d7b58e6ca1aa628757c.svg"/></a>
                <a href="https://www.instagram.com" target="_blank">
                    <img title="Instagram Logo"
                         src="https://rails-assets-us.bookshop.org/assets/icon-instagram-015ea6b8500fb243a606a5117772f949603f9d035d5ab677b7d24a6f379e3cbe.svg"/></a>

            </p>


        </section>

        <section className="contact-info">
            <p className="about-us">
                <Link to="/">
                    <i  className="fa">&#xf05a;</i></Link>
            </p>

        </section>

        <section className="contact-info">
            <p className="directions">
                <Link to="/"><i className="material-icons">&#xe52e;</i></Link>
            </p>

        </section>

        <section className="copyright-info">
            <p>Copyright © 2024 Jyothi Sevakula All Rights Reserved.</p>


    </section>
    {/*<section className="about-us">*/}
        {/*    <Link to="/">about</Link>*/}
        {/*    <Link to="/">contact</Link>*/}
        {/*    <Link to="/">directions</Link>*/}
        {/*</section>*/}
        {/*<section className="directions">*/}
        {/*    <Link to="/">about</Link>*/}
        {/*    <Link to="/">contact</Link>*/}
        {/*    <Link to="/">directions</Link>*/}
        {/*</section>*/}
        {/*<section className="copyright-info">*/}
        {/*    <Link to="/">about</Link>*/}
        {/*    <Link to="/">contact</Link>*/}
        {/*    <Link to="/">directions</Link>*/}
        {/*</section>*/}


    </footer>
)
}

export default AppFooter;
