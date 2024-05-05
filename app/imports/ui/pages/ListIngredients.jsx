import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, Container, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Ingredient from '../components/Ingredient';
import { Ingredients } from '../../api/ingredient/Ingredient';

/** Renders a list of ingredients from the database. */
const ListIngredients = () => {
  const { ready, ingredients } = useTracker(() => {
    const subscription = Meteor.subscribe(Ingredients.userPublicationName);
    const rdy = subscription.ready();
    const ingredientItems = Ingredients.collection.find({}).fetch();
    return {
      ingredients: ingredientItems,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container fluid id="ingredients-page">
      <Row className="align-middle text-center header-background">
        <Col className="justify-content-center">
          <Image src="/images/header_banner.png" height="270px" alt="Ingredients Banner" />
        </Col>
      </Row>
      <br />
      <Row xs={1} md={2} lg={5} className="g-3">
        {ingredients.map((ingredient) => (
          <Col lg={4} key={ingredient._id}>
            <Ingredient ingredient={ingredient} />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="mb-4 justify-content-center">
        <Col className="text-center">
          <Link to="/add-ingredient">
            {/* CSS class won't apply to this button specifically */}
            <Button
              size="sm"
              variant="primary"
              style={{
                // Gray button
                // backgroundColor: '#7E888C', border: 'none', color: 'white',
                fontFamily: 'Titillium Web, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
              }}
            >
              Add an Ingredient!
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default ListIngredients;
