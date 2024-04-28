import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Table, ListGroup, ListGroupItem, Button, CardText } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Recipes } from '../../api/recipe/Recipe';

/** Renders a single recipe card with details. */
const Recipe = ({ recipe }) => {
  const navigate = useNavigate(); // For navigation after deletion

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'This cannot be undone.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Recipes.collection.remove(recipe._id, (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Recipe deleted successfully', 'success').then(() => {
              navigate('/recipes');
            });
          }
        });
      }
    });
  };

  return (
    <Card className="h-100">
      <Card.Header className="d-flex flex-column align-items-center">
        <Image className="mt-2" src={recipe.image} height={250} width={250} style={{ objectFit: 'cover' }} />
        <div className="text-center mt-2">
          <Card.Title className="fw-bold">{recipe.title}</Card.Title>
          <Card.Subtitle>{recipe.dietaryRestrictions}</Card.Subtitle>
        </div>
      </Card.Header>
      <Card.Body>
        <CardText className="pt-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Estimations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cost Per Serving</td>
                <td>${recipe.estimations.costPerServing.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Number of Servings</td>
                <td>{recipe.estimations.numberOfServings}</td>
              </tr>
              <tr>
                <td>Total Time</td>
                <td>{recipe.estimations.totalTime}</td>
              </tr>
            </tbody>
          </Table>

          <h5 className="pt-2 fw-bold">Ingredients:</h5>
          <ListGroup>
            {recipe.ingredients.map((ingredient, index) => (
              <ListGroupItem key={index}>
                <strong>{ingredient.name}</strong> - ${ingredient.cost.toFixed(2)} - {ingredient.location}
              </ListGroupItem>
            ))}
          </ListGroup>

          <h5 className="pt-4 fw-bold">Instructions:</h5>
          <ol>
            {recipe.instructions.split('\n').map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </CardText>

        <div className="d-flex justify-content-center mt-3">
          <Link to={`/edit-recipe/${recipe._id}`}>
            <Button variant="success" size="sm">Edit</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    instructions: PropTypes.string,
    dietaryRestrictions: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        cost: PropTypes.number,
        location: PropTypes.string,
      }),
    ),
    estimations: PropTypes.shape({
      costPerServing: PropTypes.number,
      numberOfServings: PropTypes.number,
      totalTime: PropTypes.string,
    }),
  }).isRequired,
};

export default Recipe;
