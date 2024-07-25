import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BooksProvider } from './context/BooksContext';
import SignIn from './components/SignIn';
import BookList from './components/BookList';
import SpecificBook from './components/SpecificBook';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import PageNotFound from './components/PageNotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
    setIsLoading(false);
  }, []);
  const isSignIn = (name) => {
    localStorage.setItem('username', name);
    setUsername(name);
  };
  const isSignOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('cart');
    setUsername(null);
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }
  const isLoggedIn = !!username;
  return (
    <BooksProvider>
    <div className="d-flex flex-column min-vh-100">
      <Router basename="prometheus-x-course-task">
      <Header username={username} onSignOut={isSignOut} />
        <Routes>
        <Route 
            path="/" 
            element={<Navigate to="/signin" />} 
        />
          <Route 
            path="/signin" 
            element={ <SignIn onSignIn={isSignIn} />} 
          />
              <Route path="/books" element={isLoggedIn ? <BookList /> : <Navigate to="/signin" />} />
              <Route path="/books/:id" element={isLoggedIn ? <SpecificBook  /> : <Navigate to="/signin" />} />

          <Route
            path="/cart"
            element={isLoggedIn ? <Cart /> : <Navigate to="/signin" />}
          />
          <Route path="*" element={ <PageNotFound />} />
        </Routes>
      </Router>
      <Footer />
    </div>
    </BooksProvider>
  );
}
