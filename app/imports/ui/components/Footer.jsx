import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="py-3 footer-background">
    <Container>
      <Row>
        <Col className="text-center">
          <Image src="/images/logo.png" width="80px" alt="Logo"/>
          Toaster Eats
          {' '}
          <br/>
          University of Hawaii
          <br/>
          Honolulu, HI 96822
          {' '}
          <br/>
          <a href="https://toaster-eats.github.io/">
            Our Project Page |
          </a>
          <a href="https://github.com/Toaster-Eats">
            &nbsp;Our GitHub
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
