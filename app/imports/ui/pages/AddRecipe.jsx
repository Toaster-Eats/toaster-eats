import React, { useState } from 'react';
import { Card, Col, Container, Row, Button, Image } from 'react-bootstrap';
import { AutoForm, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Recipes } from '../../api/recipe/Recipe';

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
    const owner = Meteor.user().username;
    Recipes.collection.insert(
      { image, title, dietaryRestrictions, description, instructions, ingredients, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Recipe added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
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
                      <TextField
                        name={`ingredients.${index}.name`}
                        label=""
                        placeholder="Name"
                      />
                    </Col>
                    <Col>
                      <TextField
                        name={`ingredients.${index}.cost`}
                        label=""
                        placeholder="Cost"
                      />
                    </Col>
                    <Col>
                      <TextField
                        name={`ingredients.${index}.location`}
                        label=""
                        placeholder="Location"
                      />
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Button variant="danger" onClick={() => handleRemoveIngredient(index)}>Remove</Button>
                    </Col>
                  </Row>
                ))}
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
