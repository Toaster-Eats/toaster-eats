import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, ArrayField, SubmitField, TextField } from 'uniforms-bootstrap5';
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
  ingredients: Array,
  'ingredients.$': Object,
  'ingredients.$.name': String,
  'ingredients.$.cost': Number,
  'ingredients.$.location': String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddRecipe = () => {
  const submit = (data, formRef) => {
    const { title, dietaryRestrictions, description, instructions, ingredients } = data;
    const owner = Meteor.user().username;
    Recipes.collection.insert(
      { title, dietaryRestrictions, description, instructions, ingredients, owner },
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
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Recipe</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="title" />
                <TextField name="dietaryRestrictions" />
                <TextField name="description" />
                <TextField name="instructions" />
                <ArrayField name="ingredients">
                  <TextField name="$" />
                </ArrayField>
                <SubmitField />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRecipe;
