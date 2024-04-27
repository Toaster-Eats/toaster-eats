import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

/** About Us page explaining the purpose and vision of the platform */
const AboutUs = () => (
  <>
    {/* Fluid container for the banner image */}
    <Container fluid className="px-0">
      <Row className="align-middle text-center header-background">
        <Col>
          <Image src="/images/header_banner.png" height="270px" alt="About Us Header" />
        </Col>
      </Row>
    </Container>
    <Container id="about-us-page" className="py-4 px-2">
      <Row className="py-4">
        <Col xs={4} className="text-center">
          <Image src="/images/find_recipes.jpg" height={250} width={250} style={{ objectFit: 'cover' }} alt="Our Story" />
        </Col>
        <Col xs={8}>
          <h3 className="text-center py-2">Discover New Recipes</h3>
          <p>
            {/* eslint-disable-next-line max-len */}
            On our platform, you can easily discover a variety of recipes designed specifically for college students. Whether it&apos;s simple dishes you can whip up in a dorm kitchen or more elaborate meals for those with full kitchens, our site has you covered.
          </p>
          <p>
            You can also find out what’s on the menu in campus food trucks and cafeterias, and stay in the loop on your favorite dishes.
          </p>
        </Col>
      </Row>

      <Row className="py-4">
        <Col xs={8}>
          <h3 className="text-center">Instant Recipe Availability</h3>
          <p>
            Are you craving something specific? Our platform helps you find recipes that match your current mood and available ingredients. No more scrounging through your pantry; just check the site and let your cravings guide you.
          </p>
          <p>
            We also offer instant updates on ingredient availability at nearby stores, so you know where to shop for what you need.
          </p>
        </Col>
        <Col xs={4} className="text-center">
          <Image src="/images/recipe_availability.jpg" height={250} width={250} style={{ objectFit: 'cover' }} alt="Instant Availability" />
        </Col>
      </Row>

      <Row className="py-4">
        <Col xs={4} className="text-center py-2"> {/* Image on the left */}
          <Image src="/images/users.jpg" height={250} width={250} style={{ objectFit: 'cover' }} alt="What Can Users Do?" />
        </Col>
        <Col xs={8}>
          <h3 className="text-center py-2">What Can Users Do?</h3>
          <ul>
            <li><strong>Student Contributions:</strong> Users can browse, search, and contribute recipes tailored to their constraints, including limited kitchen facilities, time, and budget.</li>
            <li><strong>Ingredient Information:</strong> Our platform aggregates ingredient availability and pricing from various local vendors, allowing users to make informed purchasing decisions.</li>
            <li><strong>Dietary Filters:</strong> Users can filter recipes based on dietary preferences and restrictions, such as vegan, gluten-free, or allergen-free options.</li>
            <li><strong>Vendor Integration:</strong> Local vendors can create profiles and input ingredient information like pricing and store locations.</li>
          </ul>
        </Col>
      </Row>
    </Container>
  </>
);

export default AboutUs;
