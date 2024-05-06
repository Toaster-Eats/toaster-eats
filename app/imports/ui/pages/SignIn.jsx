import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Image, Row, Button } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return (<Navigate to="/" />);
  }

  return (
    <Container id="signin-page" fluid>
      <Row className="align-middle text-center header-background">
        <Col className="justify-content-center">
          <Image src="/images/header_banner.png" height="270px" />
        </Col>
      </Row>
      <Row className="justify-content-center pb-5">
        <Col xs={5}>
          <Col className="text-center">
            <br />
            <br />
            <br />
            <h3 className="fw-semibold">Sign In</h3>
          </Col>
          <AutoForm schema={bridge} onSubmit={submit}>
            <Card>
              <Card.Body>
                <TextField id="signin-form-email" name="email" placeholder="Enter your e-mail address" />
                <TextField id="signin-form-password" name="password" type="password" placeholder="Enter your password" />
                <ErrorsField />
                <SubmitField id="signin-form-submit" className="text-center" />
              </Card.Body>
            </Card>
          </AutoForm>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger" className="mt-3 text-center">
              <Alert.Heading>Login failed</Alert.Heading>
              {error}
            </Alert>
          )}
          <br />
          <br />
          <br />
          <Alert
            style={{
              fontFamily: 'Titillium Web, sans-serif',
              fontWeight: 400,
              fontStyle: 'normal',
            }}
            variant="light"
          >
            <div className="text-center">
              Don&#39;t have an account? <br />
              <Button
                className="mt-2"
                as={Link}
                to="/signup"
                variant="primary"
                style={{
                  fontFamily: 'Titillium Web, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                }}
              >
                Create a new account
              </Button>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
