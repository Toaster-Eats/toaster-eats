import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Image, CardText, ListGroup, ListGroupItem } from 'react-bootstrap';

/** Renders a single recipe card with details. */
const Recipe = ({ recipe }) => {
  const instructions = recipe.instructions.split('. ').filter((step) => step.trim().length > 0);

  return (
    <Card className="h-100">
      <Card.Header className="d-flex flex-column align-items-center">
        <Image src={recipe.image} height={250} width={250} style={{ objectFit: 'cover' }} />
        <div className="text-center mt-3">
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Subtitle>{recipe.dietaryRestrictions}</Card.Subtitle>
        </div>
      </Card.Header>
      <CardBody>
        <CardText>
          <h5>Description:</h5>
          <p>{recipe.description}</p>
          <h5>Instructions:</h5>
          <ol>
            {instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </CardText>
        <h5>Ingredients:</h5>
        <ListGroup>
          {recipe.ingredients.map((ingredient, index) => (
            <ListGroupItem key={index}>
              <strong>{ingredient.name}</strong> - ${ingredient.cost} - {ingredient.location}
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

// Require a document to be passed to this component.
Recipe.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    instructions: PropTypes.string,
    dietaryRestrictions: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      cost: PropTypes.number,
      location: PropTypes.string,
    })),
  }).isRequired,
};

export default Recipe;
