import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import { Link } from 'react-router-dom';
import {useContext, useState} from "react";
import {CategoryItem} from "../types";
import {Category} from "../contexts/CategoryContext";


function HeaderDropdown() {
    const categories=useContext<CategoryItem[]>(Category);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

  return (
      <div className="header-dropdown">
          <button className="categories-button">
              CATEGORIES <i className="fa fa-angle-double-down"></i>
          </button>
          <ul className={showDropdown ? 'show' : ''}>
              {categories.map((item:CategoryItem) => (
                  <li key={item.categoryId}>
                      <Link to={`/categories/${item.name.toLowerCase()}`}>
                          {item.name}
                      </Link>
                  </li>
              ))}
          </ul>
      </div>
  );
}
export default HeaderDropdown

