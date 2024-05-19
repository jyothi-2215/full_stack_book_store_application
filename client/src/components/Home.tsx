
// import HomeCategoryList from './HomeCategoryList';
// import '../assets/css/global.css';
import '../assets/css/Home.css'
import {Link} from "react-router-dom";

function Home() {
    return (
                <div className="home-page">
                    <div className="week-book">
                        <img className="main-book"
                            src={require('../assets/images/books/Nobody_Told_Me_Before.jpg')}
                            alt="book-of the-week"/>

                    </div>
                    <div className="content-main">
                        <div className="first-line"><b>LITERARY HIGHLIGHT OF THE WEEK</b></div>
                        <div className="second-line">Why Has Nobody Told Me This Before?</div>
                        <div className="third-line">-Dr.Julie Smith</div>
                        <div className="fourth-line" >$13<span className="decimal-value">.64</span>
                        </div>
                        <div className="fifth-line">Explore and buy curated stories. Each click bring a new world to
                            your fingertips. Happy Reading!
                        </div>
                        <div className="sixth-line">
                            <Link to="categories/horror">
                                <button className="shop-now">Shop Now!</button>
                            </Link>


                        </div>

                    </div>


                </div>

    )
}

export default Home;
