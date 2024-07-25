import React, { createContext, useState, useEffect } from 'react';
import booksData from '../data/books.json';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setBooks(booksData);
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (book) => {
        setCart((prevCart) => {
            const bookInCart = prevCart.find((item) => item.id === book.id);
            let updatedCart;
            if (bookInCart) {
                updatedCart = prevCart.map((item) =>
                    item.id === book.id ? { ...item, count: item.count + book.count } : item
                );
            } else {
                updatedCart = [...prevCart, { ...book, count: book.count }];
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    const removeFromCart = (bookId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((book) => book.id !== bookId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const getCountInCart = (bookId) => {
        const bookInCart = cart.find((item) => item.id === bookId);
        return bookInCart ? bookInCart.count : 0;
    };

    return (
        <BooksContext.Provider value={{ books, cart, addToCart, removeFromCart, clearCart, getCountInCart }}>
            {children}
        </BooksContext.Provider>
    );
};

export { BooksContext };
