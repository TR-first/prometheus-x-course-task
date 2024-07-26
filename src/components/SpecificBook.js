import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Image, Modal } from 'react-bootstrap';
import { BooksContext } from '../context/BooksContext';
import imageNotFound from '../images/imageNotFound.png';
import './BookList.css';


export default function SpecificBook() {
  const { id } = useParams();
  const { books, getCountInCart, addToCart } = useContext(BooksContext);
  const book = books.find(book => book.id === parseInt(id));

  const [count, setCount] = useState(1);

  const handleCountChange = (event) => {
    setCount(parseInt(event.target.value));
  };

  const handleIncrease = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      return newCount <= book.amount ? newCount : prevCount; 
    });
  };

  const handleDecrease = () => {
    setCount(prevCount => {
      const newCount = prevCount - 1;
      return newCount >= 1 ? newCount : prevCount; 
    });
  };

  const [smShow, setSmShow] = useState(false);
  useEffect(() => {
    if (smShow) {
      setTimeout(() => setSmShow(false), 1000); 
    }
  }, [smShow]);
  const handleClose = () => {
    setSmShow(false);
  };

  const handleAddToCart = () => {
    addToCart({ ...book, count });
    setSmShow(true);
  };

  return (
    <Container className="marginTop-6 flex-grow-1">
      <Row>
        <Col md={3}>
          <Image src={book.image || imageNotFound} className='card-image card-image-book' alt={book.title} />
        </Col>
        <Col md={5}>
          <Card className='no-border'>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text className="mt-5"><strong>Author:</strong> {book.author}</Card.Text>
              <Card.Text><strong>Level:</strong> {book.level}</Card.Text>
              <Card.Text><strong>Tags:</strong> {book.tags.join(', ')}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 color-border">
            <Row>
              <Col md={8}><Card.Text><strong>Price, $</strong> </Card.Text></Col>
              <Col md={4} className="d-flex justify-content-end align-items-center">{book.price}</Col>
              <Col md={8}><Card.Text><strong>Count</strong> </Card.Text></Col>
              <Col md={4} className="d-flex justify-content-end align-items-center">
                <Button variant="outline-primary" className='outline-button' onClick={handleDecrease}>-</Button>
                <Form.Control
                  type="number"
                  value={count}
                  onChange={handleCountChange}
                  min="1"
                  max={book.amount}
                  className='border-form'
                  style={{ width: '4rem' }}
                />
                
                <Button variant="outline-primary" className='outline-button' onClick={handleIncrease}>+</Button>
              </Col>
              <Col md={8}><Card.Text><strong>Total price</strong> </Card.Text></Col>
              <Col md={4} className="d-flex justify-content-end align-items-center">${(book.price * count).toFixed(2)}</Col>
              <>
              {getCountInCart(book.id) > 0 ? <><Col md={8}><Card.Text><strong>Count in cart</strong> </Card.Text></Col>
              <Col md={4} className="d-flex justify-content-end align-items-center">{getCountInCart(book.id)}</Col></> : null}</>
            </Row>

            <div className="d-flex justify-content-end mt-5">
              <Button variant="outline-primary" block className='outline-button' onClick={handleAddToCart}>Add to cart</Button>
              <Modal
        size="sm"
        show={smShow}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Tовар доданo до кошика.</Modal.Body>
      </Modal>
            </div>
          </Card>
        </Col>
        <Col md={12}>
          <Card className='no-border marginTop-6'>
            <Card.Body>
              <Card.Text>{book.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}
