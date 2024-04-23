import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Recipes } from '../../api/recipe/Recipe';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(Recipes.schema);

const EditRecipe = () => {
  const { _id } = useParams();
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
    setIngredients([...ingredients, { name: '', cost: 0, location: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const submit = (data) => {
    // eslint-disable-next-line no-shadow
    const { image, title, dietaryRestrictions, description, instructions, ingredients } = data;
    Recipes.collection.update(_id, { $set: { image, title, dietaryRestrictions, description, instructions, ingredients } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Recipe updated successfully', 'success');
      }
    });
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Recipe</h2></Col>
          <AutoForm schema={bridge} onSubmit={submit} model={doc}>
            <Card>
              <Card.Body>
                <h7>Image Link</h7>
                <TextField name="image" label="" />

                <h7>Recipe Title</h7>
                <TextField name="title" label="" />

                <h7>Dietary Restrictions</h7>
                <TextField name="dietaryRestrictions" label="" />

                <h7>Description</h7>
                <TextField name="description" label="" />

                <h7>Cooking Instructions</h7>
                <TextField name="instructions" label="" />

                <h7>Ingredients</h7>
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
                    <Button className="mr-3" variant="secondary" onClick={handleAddIngredient}>Add Ingredient</Button>
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
