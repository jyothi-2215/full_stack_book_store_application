import {createContext, useEffect, useState,ReactNode} from "react";
import {CategoryItem} from "../types";
import axios from "axios";

export const Category= createContext <CategoryItem[]|[]>([])
Category.displayName= 'CategoryContext';

interface CategoryContextProps{
    children:ReactNode;
}

export default function CategoryContext({children}:CategoryContextProps) {
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    // const [lastVisitedCategory, setLastVisitedCategory] = useState<string | null>(null);
    useEffect(() => {
        axios.get('http://webdev.cs.vt.edu:8080/JyothiBookstoreReactOrder/api/categories')
            .then((result) => setCategories(result.data))
            .catch(console.error);
    }, []);


    return(
        <Category.Provider value={categories}>{children}</Category.Provider>
    );

}
