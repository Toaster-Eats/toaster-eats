import React from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WelcomeMsg from '../components/WelcomeMsg';
import RoleLogo from '../components/RoleLogo';
import BottomMsg from '../components/BottomMsg';
import KeyFeatures from '../components/KeyFeatures';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div style={{ position: 'relative' }}>
    <Image
      src="/images/landing_background.jpg"
      fluid
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 1,
        zIndex: -1,
      }}
    />
    <Container id="landing-page" fluid>

      <Row className="align-middle text-center header-background">
        <Col className="justify-content-center">
          <Image src="/images/header_banner.png" height="270px" />

        </Col>
      </Row>
      <Row className="align-middle text-center pt-4">
        <Col>
          <div>
            <RoleLogo />
          </div>
        </Col>
        <Col className="rounded-background">
          <br /><br /><br />
          {/* eslint-disable-next-line max-len */}
          <div>
            <WelcomeMsg />
          </div>
        </Col>
      </Row>
      <Row className="align-middle pt-4">
        <Col className="green-background py-4">
          <h3>The Solution?</h3><br />
          <h5>
            Our website serves as a comprehensive solution to the nutritional challenges faced by college students, offering practical assistance in the following ways:
          </h5><br />
          <ul>
            <li>Recipe Database: We provide a diverse array of recipes tailored specifically for students, taking into account limited kitchen facilities, time constraints, and budget considerations.</li>
            <li>Ingredient Accessibility: Through our platform, students can easily find recipes using ingredients available within walking distance of their campus, eliminating the need for extensive shopping trips.</li>
            <li>Dietary Preferences: Our database includes filters for dietary restrictions such as vegan, gluten-free, and more, ensuring that students with specific dietary needs can find suitable options.</li>
            <li>Cost-Efficiency: Each recipe includes estimated costs per serving, empowering students to make informed decisions based on their budget.</li>
            <li>Time Management: With estimated preparation times provided for each recipe, students can plan meals that fit seamlessly into their busy schedules, reducing reliance on fast food or vending machine snacks.</li>
          </ul>
        </Col>
        <Col className="py-4" style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
          <h3>Your Tools:</h3><br />
          <ul>
            <li>
              <div>
                <KeyFeatures />
              </div>
            </li>
          </ul>
        </Col>
      </Row>
      <br />
      <Row className="align-middle">
        <Col />
        <Col className="align-middle text-center py-5 rounded-background">
          <div>
            <BottomMsg />
          </div>
          {/* eslint-disable-next-line no-undef */}
          {!Meteor.userId() ? (
            <Link to="/signup">
              <Button
                variant="success"
                style={{
                  fontFamily: 'Titillium Web, sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                }}
              >
                Sign Up!
              </Button>
            </Link>
          ) : null}
        </Col>
        <Col />
      </Row>
      <br />
    </Container>
  </div>
);

export default Landing;
