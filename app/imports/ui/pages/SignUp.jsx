import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to landing page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" fluid>
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
            <h3 className="fw-semibold">Create a New Account</h3>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="Enter an e-mail address" />
                <TextField name="password" placeholder="Enter a password" type="password" />
                <ErrorsField />
                <SubmitField className="text-center" />
              </Card.Body>
            </Card>
          </AutoForm>
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
              Already have an account? <br />
              <Button
                className="mt-2"
                as={Link}
                to="/signin"
                variant="primary"
                style={{
                  fontFamily: 'Titillium Web, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                }}
              >Login Here
              </Button>
            </div>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
