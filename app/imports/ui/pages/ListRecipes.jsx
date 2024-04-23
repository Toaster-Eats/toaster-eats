import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Recipe from '../components/Recipe';
import { Recipes } from '../../api/recipe/Recipe';

/** Renders a list of recipes from the database. */
const ListRecipes = () => {
  const { ready, recipes } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    const rdy = subscription.ready();
    const recipeItems = Recipes.collection.find({}).fetch();
    return {
      recipes: recipeItems,
      ready: rdy,
    };
  }, []);

  return ready ? (
    <Container fluid id="recipes-page">
      <Row className="align-middle text-center header-background">
        <Col className="justify-content-center">
          <Image src="/images/header_banner.png" height="270px" alt="Recipes Banner" />
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {recipes.map((recipe) => (
          <Col lg={6} key={recipe._id}>
            <Recipe recipe={recipe} />
          </Col>
        ))}
      </Row>
      <Row className="mb-3 justify-content-center">
        <Col className="text-center">
          <Link to="/add-recipe">
            <Button variant="primary">Add a Recipe!</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default ListRecipes;
