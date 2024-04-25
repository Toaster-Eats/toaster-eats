import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Image, CardText, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Recipes } from '../../api/recipe/Recipe'; // Import the recipe collection

/** Renders a single recipe card with details. */
const Recipe = ({ recipe }) => {
  const instructions = recipe.instructions.split('. ').filter((step) => step.trim().length > 0);
  const navigate = useNavigate(); // For navigation after deletion

  const handleDelete = () => {
    // Warning that deletion cannot be reverted
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
              navigate('/recipes'); // Redirect to the recipes list after deletion
            });
          }
        });
      }
    });
  };

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
              <strong>{ingredient.name}</strong> - ${ingredient.cost.toFixed(2)} - {ingredient.location}
            </ListGroupItem>
          ))}
        </ListGroup>
        <div className="d-flex justify-content-center mt-2">
          <Link to={`/edit-recipe/${recipe._id}`}>
            <Button variant="success" size="sm">Edit</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={handleDelete} className="ml-3">Delete</Button>
        </div>
      </CardBody>
    </Card>
  );
};

// Require a document to be passed to this component.
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
  }).isRequired,
};

export default Recipe;
