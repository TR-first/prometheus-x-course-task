import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import pagesnotfound from '../images/pagesnotfound.png';

export default function PageNotFound() {
    return (
        <Container className='d-flex flex-column justify-content-center flex-grow-1'>
            <Row className='justify-content-md-center'>
                <Col className='text-center'>
                    <Image src={pagesnotfound} className="mb-4" />
                </Col>
            </Row>
        </Container>
    );
};
