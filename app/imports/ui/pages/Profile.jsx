import React from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';

/* A simple static component to render some text for the Profile page. */
const Profile = () => (
  <Container id="landing-page" fluid>
    <Row className="align-middle text-center header-background">
      <Col className="justify-content-center">
        <Image src="/images/header_banner.png" height="270px" />

      </Col>
    </Row>
    <Row className="align-middle text-center pt-4">
      <Col>
        {/* eslint-disable-next-line max-len */}
        <h1>User Profile</h1> <br />
        <Image src="/images/PhilipJohnson.jpg" width="270px" />

        <ul>
          <h3>Philip Johnson</h3>
          <h3>Sophomore</h3>
          <h3>Dietary Preferences: gluten-free</h3>
        </ul>
      </Col>

    </Row>
  </Container>
);

export default Profile;