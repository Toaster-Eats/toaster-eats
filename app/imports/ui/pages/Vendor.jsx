import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import WelcomeMsg from '../components/WelcomeMsg';
import RoleLogo from '../components/RoleLogo';
import KeyFeatures from '../components/KeyFeatures';

/* A simple static component to render some text for the landing page. */
const Vendor = () => (
  <Container id="vendor-page" fluid>
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
      <Col>
        <br /><br /><br />
        {/* eslint-disable-next-line max-len */}
        <div>
          <WelcomeMsg />
        </div>
      </Col>
    </Row>
    <Row className="align-middle pt-4">
      <Col className="green-background py-4">
        <h3>Vendor Tools</h3><br />
        <h5>
          Ways Market to UH students on our Website:
        </h5><br />
        <ul>
          <li>Your Store Profile: Include pictures, hours and other details of your store. Students can browse the list of stores and find your profile. </li>
          <li>Ingredient Accessibility: Through the ingredients page, you can indicate if an ingredient is in stock, with its price and sizes. </li>
          <li>Recipes: Vendors can also contribute to the recipe list, increasing  your exposure to students as they browse our recipes. </li>
          <li>Cost-Efficiency: Each recipe includes estimated costs per serving, empowering students to make informed decisions based on their budget.</li>
        </ul>
      </Col>
      <Col className="py-4">
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
    <Row className="align-middle">
      <Col />
      <Col className="align-middle text-center py-5">
        <h3> Get Cooking With Us! </h3><br />
      </Col>
      <Col />
    </Row>
  </Container>
);

export default Vendor;
