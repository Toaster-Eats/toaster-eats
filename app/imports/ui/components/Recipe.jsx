import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Image, CardText, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
              {/* Rounds price to two decimal places */}
              <strong>{ingredient.name}</strong> - ${ingredient.cost.toFixed(2)} - {ingredient.location}
            </ListGroupItem>
          ))}
        </ListGroup>
        <div className="d-flex justify-content-center mt-2">
          <Link to={`/edit-recipe/${recipe._id}`}>
            <Button variant="success" size="sm">Edit</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

// Require a document to be passed to this component.
Recipe.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string, // Add _id here to link to the correct page
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
