import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Vendor = () => (
  <Container id="landing-page" fluid>
    <Row className="align-middle text-center header-background">
      <Col className="justify-content-center">
        <Image src="/images/header_banner.png" height="270px" />

      </Col>
    </Row>
    <Row className="align-middle text-center pt-4">
      <Col>
        {/* eslint-disable-next-line max-len,jsx-a11y/control-has-associated-label */}
        <a href="https://easydrawingguides.com/wp-content/uploads/2022/11/how-to-draw-a-shop-featured-image-1200.png"><Image src="/images/shop.png" width="320px" roundedCircle /> </a>
      </Col>
      <Col>
        <br /><br /><br />
        {/* eslint-disable-next-line max-len */}
        <h1>Welcome, Vendor Partner</h1>
        <h4>Connect your store to UH students!</h4>
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
        <h3>Key Features of our Website:</h3><br />
        <ul>
          <li>
            User Roles: The platform encompasses three primary user roles: students, vendors, and admins, each with distinct responsibilities and permissions.
          </li>
          <li>
            {/* eslint-disable-next-line max-len */}
            Student Contributions: Students can browse, search, and contribute recipes tailored to their constraints, including limited kitchen facilities, time, and budget. They can also upload photos and provide detailed descriptions of their recipes.
          </li>
          <li>
            {/* eslint-disable-next-line max-len */}
            Vendor Integration: Local vendors, such as grocery stores and farmer&apos;s markets, can create profiles and input information regarding ingredient availability, pricing, and store locations. This data enhances the accuracy and accessibility of recipe details for students.
          </li>
          <li>
            Ingredient Information: For each recipe, the platform aggregates information on ingredient availability and pricing from various local vendors, allowing users to make informed purchasing decisions.
          </li>
          <li>
            Dietary Filters: Users can filter recipes based on dietary preferences and restrictions, such as vegan, gluten-free, or allergen-free options, ensuring inclusivity and catering to diverse dietary needs.
          </li>
          <li>
            {/* eslint-disable-next-line max-len */}
            Admin Oversight: Admins maintain content integrity by monitoring user-generated content, removing inappropriate material, and managing user roles. They also have the authority to designate users as vendors and oversee platform functionality.
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
