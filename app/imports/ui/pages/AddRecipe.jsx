import React, { useState } from 'react';
import { Card, Col, Container, Row, Button, Image } from 'react-bootstrap';
import { AutoForm, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useNavigate } from 'react-router-dom';
import { Recipes } from '../../api/recipe/Recipe';

// Schema for the form
const formSchema = new SimpleSchema({
  title: String,
  dietaryRestrictions: String,
  description: String,
  instructions: String,
  image: String,
  ingredients: Array,
  'ingredients.$': Object,
  'ingredients.$.name': String,
  'ingredients.$.cost': Number,
  'ingredients.$.location': String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddRecipe = () => {
  const [ingredients, setIngredients] = useState([{ name: '', cost: '', location: '' }]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', cost: '', location: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const submit = (data, formRef) => {
    // eslint-disable-next-line no-shadow
    const { image, title, dietaryRestrictions, description, instructions, ingredients } = data;
    const owner = Meteor.user()?.username; // Ensure proper null safety
    Recipes.collection.insert(
      { image, title, dietaryRestrictions, description, instructions, ingredients, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Recipe added successfully', 'success').then(() => {
            navigate('/recipes'); // Navigate to the recipes page after success
          });
          formRef.reset(); // Reset the form after successful submission
        }
      },
    );
  };

  let fRef = null; // Form reference for AutoForm

  return (
    <Container id="addrecipes-page" className="py-0" fluid>
      <Row className="align-middle text-center header-background">
        <Col className="justify-content-center">
          <Image src="/images/header_banner.png" height="270px" />
        </Col>
      </Row>
      <Row className="justify-content-center pt-4">
        <Col xs={10}>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <h6>Image</h6>
                    <TextField name="image" label="" placeholder="Link" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Recipe</h6>
                    <TextField name="title" label="" placeholder="Name" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Dietary Restrictions</h6>
                    <TextField name="dietaryRestrictions" label="" placeholder="None, Vegan, Fish, etc." />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Description</h6>
                    <TextField name="description" label="" placeholder="Describe your dish" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Instructions</h6>
                    <TextField name="instructions" label="" placeholder="How is it made?" />
                  </Col>
                </Row>
                <Row>
                  <h6>Ingredients</h6>
                  {ingredients.map((ingredient, index) => (
                    <Row key={index} className="mb-3 align-items-center">
                      <Col>
                        <TextField
                          name={`ingredients.${index}.name`}
                          placeholder="Item"
                        />
                      </Col>
                      <Col>
                        <TextField
                          name={`ingredients.${index}.cost`}
                          placeholder="Price"
                        />
                      </Col>
                      <Col>
                        <TextField
                          name={`ingredients.${index}.location`}
                          placeholder="Place"
                        />
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <Button variant="danger" onClick={() => handleRemoveIngredient(index)}>Remove</Button>
                      </Col>
                    </Row>
                  ))}
                </Row>
                <Row>
                  <Col xs={12}>
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
          <br />
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipe;
