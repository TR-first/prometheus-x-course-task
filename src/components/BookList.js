// BookCatalog.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { BooksContext } from '../context/BooksContext';
import imageNotFound from '../images/imageNotFound.png';
import './BookList.css';

export default function BookList() {
  const { books } = useContext(BooksContext);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('All');

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  useEffect(() => {
    let filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (priceFilter !== 'All') {
      filtered = filtered.filter(book => {
        if (priceFilter === '<15') return book.price > 0 && book.price < 15;
        if (priceFilter === '15-30') return book.price > 15 && book.price < 30;
        if (priceFilter === '>30') return book.price > 30;
        return true;
      });
    }

    setFilteredBooks(filtered);
  }, [searchTerm, priceFilter, books]);

  return (

    <Container className='mt-5 flex-grow-1'>
      <Row className="my-4">
        <Col md={5}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by book name"
            className='border-form search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroup.Text className='loupe'>&#128270;</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            onChange={(e) => setPriceFilter(e.target.value)}
            className='option-form'
          >
            <option>Price</option>
            <option value="All">Всі</option>
            <option value="<15">0 &lt; ціна &lt; 15</option>
            <option value="15-30">15 &lt;  ціна  &lt; 30</option>
            <option value=">30">ціна &gt; 30 </option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        {filteredBooks.map(book => (
          <Col md={4} key={book.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={book.image || imageNotFound}
                className='card-image card-image-books'
                alt={book.title}
              />
              <Card.Body>

                <Card.Title>
                  {book.title.length > 24
                    ? `${book.title.substring(0, 24)}...`
                    : book.title}
                </Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Card.Text className='h3 price-text'>${book.price}</Card.Text>
                  <Link to={`/books/${book.id}`}>
                    <Button
                      variant='outline-primary'
                      className="outline-button"
                      block
                    >
                      View
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

  );
}
