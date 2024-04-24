import React from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WelcomeMsg from '../components/WelcomeMsg';
import RoleLogo from '../components/RoleLogo';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
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
      <Col className="py-4">
        <h3>Key Features:</h3><br />
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
        <h3>Get Cooking with Us! Sign up for free to gain access to hundreds of mouthwatering recipes designed to fit your busy student lifestyle.</h3><br />
        <Link to="/signup">
          <Button variant="success">Sign Up</Button>{' '}
        </Link>
      </Col>
      <Col />
    </Row>
  </Container>
);

export default Landing;
