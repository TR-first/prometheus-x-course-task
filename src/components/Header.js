import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Image, Button } from 'react-bootstrap';
import cart from '../images/cart.svg';
import user from '../images/user.png';
import './header.css';

export default function Header({ username, onSignOut }) {
    const navigate = useNavigate();
    const signOut = () => {
        onSignOut();
        navigate('/signin');
    }
    const linkBooks = () => {
        navigate('/books');
    }
    const linkCart = () => {
        navigate('/cart');
    }
    const userN = username;
    return (
        <header>
            <Navbar collapseOnSelect expand="md" bg='dark' variant='dark' fixed='top'>
                <Container>
                <Navbar.Brand onClick={linkBooks} className="brand">JS BAND STORE / Rebenchuk Tetiana </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    {username ? <Navbar.Collapse id='responsive-navbar-nav' className="justify-content-end" >
                        <Nav className='ml-auto'>
                            <Nav.Link onClick={linkCart}>
                            <Image src={cart} className='header-cart mx-3' />
                            </Nav.Link>
                            <Button
                                variant='outline-primary'
                                className="outline-button"
                                onClick={signOut}
                            >
                                Sign-Out
                            </Button>
                            <Image src={user} className='header-cart mx-3' />
                            <Nav.Link disabled className='user-name'>{userN}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse> : ''}
                </Container>
            </Navbar>
            <hr />
        </header>
    );
}