import React from 'react';
import Recipe from '../components/Recipe';
import { Image, Row, Col, Container } from 'react-bootstrap';

const recipesData = [
  {
    title: 'Pasta Carbonara',
    image: 'images/pasta_carbonara.jpg',
    description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.',
    // eslint-disable-next-line max-len
    instructions: 'Cook pasta according to package instructions. Cook pancetta in a large skillet until crispy. In a bowl, whisk together eggs, Parmesan, and black pepper. Drain pasta and toss with pancetta. Quickly stir in egg mixture until creamy. Serve immediately.',
    dietaryRestrictions: 'No Dietary Restriction',
    ingredients: [
      { name: 'Spaghetti', cost: 1.99, location: 'Pantry' },
      { name: 'Pancetta', cost: 3.49, location: 'Refrigerator' },
      { name: 'Eggs', cost: 2.99, location: 'Refrigerator' },
      { name: 'Parmesan', cost: 4.99, location: 'Refrigerator' },
      { name: 'Black Pepper', cost: 0.99, location: 'Pantry' },
    ],
  },
  {
    title: 'Vegetable Stir Fry',
    image: 'images/stir_fry.jpg',
    description: 'A healthy and flavorful vegan stir fry loaded with colorful vegetables and served over rice.',
    instructions: 'Heat oil in a large skillet or wok over medium heat. Add chopped vegetables and stir-fry until tender. Add sauce and continue cooking until heated through. Serve over cooked rice.',
    dietaryRestrictions: 'Vegan',
    ingredients: [
      { name: 'Broccoli', cost: 2.49, location: 'Refrigerator' },
      { name: 'Bell Pepper', cost: 1.99, location: 'Refrigerator' },
      { name: 'Carrots', cost: 1.29, location: 'Refrigerator' },
      { name: 'Soy Sauce', cost: 3.99, location: 'Pantry' },
      { name: 'Rice', cost: 2.49, location: 'Pantry' },
    ],
  },
];

/** Renders a list of recipes. */
/** Renders a list of recipes. */
const ListRecipes = () => (
  <Container fluid id="landing-page"> {/* Add Container with id */}
    <Row className="align-middle text-center header-background"> {/* Add Row with classes */}
      <Col className="justify-content-center">
        <Image src="/images/header_banner.png" height="270px" />
      </Col>
    </Row>
    <div className="row">
      {recipesData.map((recipe, index) => (
        <div className="col-lg-6 mb-3" key={index}>
          <Recipe recipe={recipe} />
        </div>
      ))}
    </div>
  </Container>
);

export default ListRecipes;
