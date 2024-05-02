import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button, Image } from 'react-bootstrap';
import { AutoForm, SubmitField, TextField, ErrorsField, LongTextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useParams, useNavigate } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { TrashFill } from 'react-bootstrap-icons';
import { Recipes } from '../../api/recipe/Recipe';
import LoadingSpinner from '../components/LoadingSpinner';

// Create schema bridge from Recipes schema
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
    const newIngredient = { name: '', cost: '0', location: '' };
    setIngredients([...ingredients, newIngredient]); // Add new ingredient to list
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1); // Remove ingredient at specified index
    setIngredients(newIngredients);

    // Update the database after removing an ingredient
    Recipes.collection.update(_id, { $set: { ingredients: newIngredients } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      }
    });
  };

  const submit = (data) => {
    // eslint-disable-next-line no-shadow
    const { image, title, dietaryRestrictions, description, instructions, ingredients, estimations } = data;

    Recipes.collection.update(
      _id,
      { $set: { image, title, dietaryRestrictions, description, instructions, ingredients, estimations } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Recipe updated successfully', 'success').then(() => {
            navigate('/recipes'); // Navigate to recipes after successful update
          });
        }
      },
    );
  };

  return ready ? (
    <Container className="py-0" fluid>
      <Row className="align-middle text-center header-background">
        <Col>
          <Image src="/images/header_banner.png" height={270} alt="Edit Recipe Banner" />
        </Col>
      </Row>
      <Row className="justify-content-center pt-4 mb-5">
        <Col xs={9}>
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
                <LongTextField name="instructions" label="" placeholder="How is it made? (new line for new step)" />

                <h6>Ingredients</h6>
                {ingredients.map((ingredient, index) => (
                  <Row key={index} className="mb-3 align-items-center">
                    <Col>
                      <TextField name={`ingredients.${index}.name`} label="" placeholder="Name" />
                    </Col>
                    <Col>
                      <TextField name={`ingredients.${index}.cost`} label="" placeholder="Cost" />
                    </Col>
                    <Col>
                      <TextField name={`ingredients.${index}.location`} label="" placeholder="Location" />
                    </Col>
                    <Col className="d-flex justify-content-end pb-4">
                      <Button variant="danger" onClick={() => handleRemoveIngredient(index)}>
                        <TrashFill />
                      </Button>
                    </Col>
                  </Row>
                ))}

                <Row>
                  <Col xs={4}>
                    <Button className="mr-3" variant="secondary" onClick={handleAddIngredient}>Add an Ingredient</Button>
                  </Col>
                </Row>

                <h6 className="pt-4">Estimations</h6>
                <Row>
                  <Col>
                    <TextField name="estimations.costPerServing" label="" placeholder="Cost Per Serving" />
                  </Col>
                  <Col>
                    <TextField name="estimations.numberOfServings" label="" placeholder="Number of Servings" />
                  </Col>
                  <Col>
                    <TextField name="estimations.totalTime" label="" placeholder="Total Time" />
                  </Col>
                </Row>

                <Row className="justify-content-center pt-2">
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
