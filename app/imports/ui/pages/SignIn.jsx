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
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  if (redirect) {
    return (<Navigate to="/" />);
  }
  // Otherwise return the Login form.
  return (
    <Container id="signin-page" fluid>
      <Row className="align-middle text-center header-background">
        <Col className="justify-content-center">
          <Image src="/images/header_banner.png" height="270px" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={2}>
          <Col className="text-center">
            <br />
            <br />
            <br />
            <h2>Login</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id="signin-form-email" name="email" placeholder="E-mail address" />
                <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id="signin-form-submit" className="text-center" />
              </Card.Body>
            </Card>
          </AutoForm>
          <br />
          <br />
          <br />
          <Alert variant="light">
            <div className="text-center">
              Don&#39;t have an account? <br />
              <Button as={Link} to="/signup" variant="primary">Create new Account</Button>
            </div>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
