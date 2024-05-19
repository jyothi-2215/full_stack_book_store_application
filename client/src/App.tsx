import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import CategoryBookList from './components/CategoryBookList';
import {Cart} from "./components/Cart";
import {CheckoutPage} from "./components/CheckoutPage";
import CategoryContextProvider from "./contexts/CategoryContext";
import {ConfirmationPage} from "./components/ConfirmationPage";
import React from "react";


function App() {
    return (

        <Router basename="JyothiBookstoreReactOrder">
            <CategoryContextProvider>
                <AppContent />
            </CategoryContextProvider>
        </Router>
    );
}

function AppContent() {
    const location = useLocation();
    const isInCategoriesPage = location.pathname.includes('categories');
    // const [categories, setCategories] = useState<CategoryItem[]>([]);
    //
    // useEffect(() => {
    //     axios.get('http://localhost:8080/JyothiBookstoreReactState/api/categories')
    //         .then((result) => setCategories(result.data))
    //         .catch(console.error);
    // }, []);
    return (
        <>
            <AppHeader isCategoriesPage={isInCategoriesPage} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/categories" element={<CategoryBookList  />} >
                    <Route path=":categoryId" element={<CategoryBookList  />} />

                </Route>
            </Routes>
            <AppFooter />
        </>
    );
}

export default App;
