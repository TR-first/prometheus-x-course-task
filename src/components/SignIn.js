import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Form, FormControl, FormLabel, Row, Button, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import user from '../images/user.png';
import './SignIn.css';

export default function SignIn({ onSignIn }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const isSignIn = (event) => {
    event.preventDefault();
    onSignIn(username);
    navigate('/books');
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Створіть унікальне значення! Довжина - від 4 до 16 символів.
    </Tooltip>
  );
    return (
      <>
      <Container className='signin-container flex-grow-1'>
        <Row className='justify-content-md-center'>
          <Col md={4} className='text-center'>
          <Image src={user} className="signin-avatar mb-4" />
            <Form className="centered-form">
              <Form.Group controlId='formUsername' className='form-group'>
                <FormLabel>Username</FormLabel>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                <FormControl 
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='type Username'
                  className='text-center border-form widthtype form-group-text'
                />
                </OverlayTrigger>
                <Button 
                variant='outline-primary'
                onClick={isSignIn}
                disabled={username.length < 4 || username.length > 16}
                className="mt-3 outline-button widthtype w-100 form-group-button"
              >
                Sign-In
              </Button>
              </Form.Group>
              
            </Form>
          </Col>
        </Row>
      </Container>
    </>
    );
}
