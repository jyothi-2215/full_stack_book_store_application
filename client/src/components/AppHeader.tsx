import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import {Link, useLocation} from 'react-router-dom';
import {CartStore} from "../contexts/CartContext";
import {useContext} from "react";
import CartItemCount from "../contexts/CartItemCount";


function AppHeader(props:any) {
    const{cart}=useContext(CartStore);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const totalItems = CartItemCount();
    return (
        <header className="complete-header">
            <link href='https://fonts.googleapis.com/css?family=Amatic SC' rel='stylesheet'/>
            <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet'/>
            <link href='https://fonts.googleapis.com/css?family=Italianno' rel='stylesheet'/>
            <link href='https://fonts.googleapis.com/css?family=Kadwa' rel='stylesheet'/>
            <link href='https://fonts.googleapis.com/css?family=Freckle Face' rel='stylesheet'/>
            <link href='https://fonts.googleapis.com/css?family=Irish Grover' rel='stylesheet'/>
            <link href='https://fonts.googleapis.com/css?family=Just Another Hand' rel='stylesheet'/>
            <link rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

            <section className="header-top"></section>

            <section className="header-bottom">

                <section className="left-section">
                    <section className="logo">
                        <Link to="/">
                            <img
                                src={require('../assets/images/site/img.png')}
                                alt="imageAlt"
                                width="100px"
                                height="auto"/>
                        </Link>
                    </section>

                    <section className="title">
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <h1 className="store-name">Booksy</h1>
                        </Link>
                    </section>

                </section>


                <section className="middle-section">
                    <section className="search-bar">

                        <input className="search-toolbar" type="text" placeholder="Search Books"/>
                        <div className="search-icon"><i className="fa">&#xf002;</i></div>

                    </section>
                </section>

                <section className="right-section">
                    <section className="categories-dropdown">
                        <HeaderDropdown/>
                    </section>

                    <section className="cart">
                        <Link to="/cart">
                            <i className="fa fa-shopping-cart" style={{fontSize: '36px'}}></i>
                            <div className="cart-number">{totalItems}</div>
                        </Link>
                    </section>

                    <section className="login">

                        <button className="login-button">{isHomePage ? 'LOGIN' : 'JYOTHI'} <i
                            className="fa fa-user-circle-o"></i></button>

                    </section>


                </section>


            </section>

            <section className="horizontal-line"></section>
        </header>

    )
}

export default AppHeader;

