import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Image, Table, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipes } from '../../api/recipe/Recipe';

const ViewRecipe = () => {
  const navigate = useNavigate();
  const { _id } = useParams(); // Get recipe ID from URL

  const { ready, recipe } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.PublicationName);
    const isReady = subscription.ready();
    const recipeItem = Recipes.collection.findOne(_id);
    return {
      ready: isReady,
      recipe: recipeItem,
    };
  }, [_id]);

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Recipes.collection.remove(_id, (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Recipe deleted successfully', 'success').then(() => {
              navigate('/recipes'); // Navigate to the recipe list after deletion
            });
          }
        });
      }
    });
  };

  if (!ready) {
    return <LoadingSpinner />;
  }

  if (!recipe) {
    return <p>Recipe not found.</p>; // Case where recipe is not found
  }

  return (
    <Container fluid>
      <Row className="align-middle text-center header-background">
        <Col className="justify-content-center">
          <Image src="/images/header_banner.png" height={270} alt="Recipes Banner" />
        </Col>
      </Row>
      <Row className="mt-3 mx-5">
        <Col>
          <Image className="mt-4 mx-4 rounded-4" src={recipe.image} height={325} width={400} style={{ objectFit: 'cover' }} />
        </Col>
        <Col className="mx-4 mt-3 text-center" style={{ fontFamily: 'Titillium Web, sans-serif', fontWeight: 400, fontStyle: 'normal' }}>
          <h3 className="fw-bold">{recipe.title}</h3>
          <h5>{recipe.dietaryRestrictions}</h5>
          <p>{recipe.description}</p>
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
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <h5 className="fw-bold">Ingredients:</h5>
          <ListGroup>
            {recipe.ingredients.map((ingredient, index) => (
              <ListGroupItem key={index}>
                <strong>{ingredient.name}</strong> - ${ingredient.cost.toFixed(2)} - {ingredient.location}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col className="mt-4">
          <h5 className="fw-bold">Instructions:</h5>
          <ol>
            {recipe.instructions.split('\n').map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3 mb-5">
        <Col
          xs="auto"
          style={{
            fontFamily: 'Titillium Web, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
          }}
        >
          <Link to={`/edit-recipe/${recipe._id}`}>
            <Button variant="success" size="sm">Edit</Button>
          </Link>
          <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewRecipe;
