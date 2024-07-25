import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
export default function Footer() {
    return (
        <footer className='mt-4 flex-shrink-0'>
            <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Text className='mx-auto py-3'>
                    Виконано в <a href='https://prometheus.org.ua/' rel="noopener">Prometheus</a> &copy; 2024
                </Navbar.Text>
            </Container>
            </Navbar>
        </footer>
    );
}