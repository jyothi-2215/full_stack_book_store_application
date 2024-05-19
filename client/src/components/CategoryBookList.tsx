import   '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import  "../types";
import {BookItem} from "../types";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {asDollarsAndCents} from "../utils";


function CategoryBookList() {
    const [bookList, setBookList] = useState<BookItem[]>([]);
    const { categoryId } = useParams<{ categoryId: string }>();


    useEffect(() => {

        axios.get(`http://webdev.cs.vt.edu:8080/JyothiBookstoreReactOrder/api/categories/name/${categoryId}/books`)
            .then((result) => setBookList(result.data))
            .catch(console.error);
    }, [categoryId]);



    return (
        <>

            <CategoryNav />
            <ul className="book-lists">
                {bookList.map((book: BookItem) => (
                    <CategoryBookListItem
                        key={book.bookId}
                        bookId={book.bookId}
                        isPublic={book.isPublic}
                        price={book.price}
                        title={book.title}
                        author={book.author}
                        categoryId={book.categoryId}
                    />
                ))}
            </ul>
        </>
    )
}

export default CategoryBookList;