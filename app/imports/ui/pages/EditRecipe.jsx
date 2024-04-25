import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button, Image } from 'react-bootstrap';
import { AutoForm, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipe/Recipe';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Recipes.schema);

const EditRecipe = () => {
  const { _id } = useParams();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    const rdy = subscription.ready();
    const document = Recipes.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (doc && doc.ingredients) {
      setIngredients(doc.ingredients);
    }
  }, [doc]);

  const handleAddIngredient = () => {
    const newIngredient = { name: '', cost: '0', location: '' }; // Create a blank ingredient
    const newIngredients = [...ingredients, newIngredient]; // Add the new blank ingredient to the list
    setIngredients(newIngredients); // Update the state with the new list
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1); // Remove the ingredient from the state
    setIngredients(newIngredients);

    // Update the recipe in the database after removing the ingredient
    Recipes.collection.update(_id, { $set: { ingredients: newIngredients } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      }
    });
  };

  const submit = (data) => {
    // eslint-disable-next-line no-shadow
    const { image, title, dietaryRestrictions, description, instructions, ingredients } = data;
    Recipes.collection.update(_id, { $set: { image, title, dietaryRestrictions, description, instructions, ingredients } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Recipe updated successfully', 'success').then(() => {
          navigate('/recipes'); // Redirect after successful update
        });
      }
    });
  };

  return ready ? (
    <Container className="py-0" fluid>
      <Row className="align-middle text-center header-background">
        <Col>
          <Image src="/images/header_banner.png" height={270} />
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs={10}>
          <AutoForm schema={bridge} onSubmit={submit} model={doc}>
            <Card>
              <Card.Body>
                <h6>Image</h6>
                <TextField name="image" label="" placeholder="Link" />

                <h6>Recipe</h6>
                <TextField name="title" label="" placeholder="Name" />

                <h6>Dietary Restrictions</h6>
                <TextField name="dietaryRestrictions" label="" placeholder="None, Vegan, Fish, etc." />

                <h6>Description</h6>
                <TextField name="description" label="" placeholder="Describe your dish" />

                <h6>Instructions</h6>
                <TextField name="instructions" label="" placeholder="How is it made?" />

                <h6>Ingredients</h6>
                {ingredients.map((ingredient, index) => (
                  <Row key={index} className="mb-3 align-items-center">
                    <Col>
                      <TextField name={`ingredients.${index}.name`} placeholder="Name" />
                    </Col>
                    <Col>
                      <TextField name={`ingredients.${index}.cost`} placeholder="Cost" />
                    </Col>
                    <Col>
                      <TextField name={`ingredients.${index}.location`} placeholder="Location" />
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Button variant="danger" onClick={() => handleRemoveIngredient(index)}>Remove</Button>
                    </Col>
                  </Row>
                ))}

                <Row>
                  <Col>
                    <Button variant="secondary" onClick={handleAddIngredient}>Add Ingredient</Button>
                  </Col>
                </Row>

                <Row className="justify-content-center">
                  <Col xs={12} className="text-center">
                    <SubmitField />
                    <ErrorsField />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default EditRecipe;
