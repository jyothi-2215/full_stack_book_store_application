
import '../assets/css/CategoryNav.css';
import '../assets/css/global.css';
import React, {useState, useEffect, useContext} from 'react';
import { Link, useLocation } from 'react-router-dom';
import {CategoryItem} from "../types";
import {Category} from "../contexts/CategoryContext";


function CategoryNav() {
    const categories=useContext<CategoryItem[]>(Category);
    const [activeCategory, setActiveCategory] = useState(""); // State to track active category
    const location = useLocation();

    // Extract category name from current route pathname
    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        const categoryName = pathSegments[2]; // Assuming the category name is the third segment in the pathname
        setActiveCategory(categoryName);
    }, [location.pathname]);

  return (
      <nav className="category-nav">
          <ul className="category-buttons">
              {categories.map((category:CategoryItem) => (
                  <Link key={category.categoryId} to={`/categories/${category.name.toLowerCase()}`}>
                  <li

                      className={`button ${activeCategory === category.name.toLowerCase() ? 'selected-category-button' : 'unselected-category-button'}`}
                  >

                          {category.name}

                  </li>
                  </Link>
              ))}
          </ul>
      </nav>
  );
}

export default CategoryNav;
