import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Table, Button, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single recipe card with image, recipe name, dietary restriction(s), and estimations. */
const Recipe = ({ recipe }) => (
  <Card className="h-100">
    <Card.Header className="d-flex flex-column align-items-center">
      <Image className="mt-2" src={recipe.image} height={250} width={250} style={{ objectFit: 'cover' }} />
      <div className="text-center mt-2">
        <Card.Title className="fw-bold">{recipe.title}</Card.Title>
        <Card.Subtitle>{recipe.dietaryRestrictions}</Card.Subtitle>
      </div>
    </Card.Header>

    <Card.Body>
      <CardText className="pt-2">
        <h5 className="fw-bold">Description:</h5>
        <p>{recipe.description}</p>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Estimations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cost Per Serving:</td>
              <td>${recipe.estimations.costPerServing.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Number of Servings:</td>
              <td>{recipe.estimations.numberOfServings}</td>
            </tr>
            <tr>
              <td>Total Time:</td>
              <td>{recipe.estimations.totalTime}</td>
            </tr>
          </tbody>
        </Table>
      </CardText>

      <div className="d-flex justify-content-center">
        <Link to={`/recipe/${recipe._id}`}>
          <Button size="sm" style={{ backgroundColor: '#FFBD59', border: 'none', color: 'white' }}>View Recipe</Button>
        </Link>
      </div>
    </Card.Body>
  </Card>
);

Recipe.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    dietaryRestrictions: PropTypes.string,
    estimations: PropTypes.shape({
      costPerServing: PropTypes.number,
      numberOfServings: PropTypes.number,
      totalTime: PropTypes.string,
    }),
  }).isRequired,
};

export default Recipe;
