import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, Container, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Ingredient from '../components/Ingredient';
import { Ingredients } from '../../api/ingredient/Ingredient'; // Assuming this is the correct import path

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
      <Row xs={1} md={2} lg={3} className="g-4">
        {ingredients.map((ingredient) => (
          <Col lg={6} key={ingredient._id}>
            <Ingredient ingredient={ingredient} />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="mb-3 justify-content-center">
        <Col className="text-center">
          <Link to="/add-ingredient">
            <Button variant="primary">Add an Ingredient!</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default ListIngredients;
