import React, { useContext } from 'react';
import { Container, Row, Col, Image, Table, CloseButton, Button } from 'react-bootstrap';
import { BooksContext } from '../context/BooksContext';
import cartEmpty from '../images/cartEmpty.png';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(BooksContext);
  const calculateTotal = () => {
    return cart.reduce((total, book) => total + book.price * book.count, 0).toFixed(2);
  };

  return (
    <>
      {cart.length === 0 ?
        (<Container className='mt-5 flex-grow-1'>
          <div className='d-flex flex-column justify-content-center'>
           <Row className='justify-content-end'>
              <Col className='text-end'>
                <Button variant="outline-primary" className='outline-button' disabled>Purchase</Button>
              </Col>
            </Row> 
          </div>
          
          <Row className='justify-content-md-center'>
            <Col className='text-center'>
              <Image src={cartEmpty} className="mb-4" />
            </Col>
          </Row>
        </Container>) : (
          <Container className='mt-5 flex-grow-1'>
            <div className='d-flex flex-column justify-content-center mb-5'>
            <Row className='justify-content-end'>
              <Col className='text-end'>
                <Button variant="outline-primary" className='outline-button' onClick={clearCart}>Purchase</Button>
              </Col>
            </Row>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Price</th>
                  <th>Count</th>
                  <th>Remove</th>
                  <th>Total Price</th>   
                </tr>
              </thead>
              <tbody>
                {cart.map((book) => (
                  <tr key={book.id}>
                    <td><strong>{book.title}</strong>, {book.author}</td>
                    <td>${book.price.toFixed(2)}</td>
                    <td>{book.count}</td>
                    <td>
                      <CloseButton
                        onClick={() => removeFromCart(book.id)} className='close-button' />
                    </td>
                    <td>${book.price.toFixed(2) * book.count}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className='text-end'><strong>Total price, ${calculateTotal()}</strong></td>
                </tr>
              </tfoot>
            </Table>
          </Container>
        )}
    </>
  );
}