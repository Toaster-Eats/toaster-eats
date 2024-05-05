import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import Select from 'react-select'; // Multi-select component
import LoadingSpinner from '../components/LoadingSpinner';
import Recipe from '../components/Recipe';
import { Recipes } from '../../api/recipe/Recipe';

/** Renders a list of recipes from the database with a multi-select filter for dietary restrictions. */
const ListRecipes = () => {
  const [selectedRestrictions, setSelectedRestrictions] = useState([]); // State for selected dietary restrictions

  const { ready, recipes } = useTracker(() => {
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    const rdy = subscription.ready();
    const recipeItems = Recipes.collection.find({}).fetch();
    return {
      recipes: recipeItems,
      ready: rdy,
    };
  }, []);

  // eslint-disable-next-line no-shadow
  const shuffleRecipes = (recipes) => [...recipes].sort(() => 0.5 - Math.random()); // Randomize recipes

  // Calculate the counts for each dietary restriction
  const calculateDietaryCounts = () => {
    const counts = {};
    recipes.forEach((recipe) => {
      // No diet restriction is default value if restriction is missing/undefined.
      const restriction = recipe.dietaryRestrictions || 'No Dietary Restriction';
      counts[restriction] = (counts[restriction] || 0) + 1;
    });
    return counts;
  };

  const dietaryCounts = calculateDietaryCounts();

  const dietaryOptions = [
    { value: 'Vegan', label: `Vegan (${dietaryCounts.Vegan || 0})` },
    { value: 'Vegetarian', label: `Vegetarian (${dietaryCounts.Vegetarian || 0})` },
    { value: 'Gluten-Free', label: `Gluten-Free (${dietaryCounts['Gluten-Free'] || 0})` },
    { value: 'No Dietary Restriction', label: `No Dietary Restriction (${dietaryCounts['No Dietary Restriction'] || 0})` },
    { value: 'Allergen-Free', label: `Allergen-Free (${dietaryCounts['Allergen-Free'] || 0})` },
  ];

  const filteredRecipes = selectedRestrictions.length > 0
    ? recipes.filter((recipe) => selectedRestrictions.some((r) => r.value === recipe.dietaryRestrictions))
    : shuffleRecipes(recipes);

  return ready ? (
    <Container fluid id="recipes-page">
      <Row className="align-middle text-center header-background">
        <Col className="justify-content-center">
          <Image src="/images/header_banner.png" height={270} alt="Recipes Banner" />
        </Col>
      </Row>
      <br />
      <Row
        className="justify-content-end"
        style={{
          fontFamily: 'Titillium Web, sans-serif',
          fontWeight: 400,
          fontStyle: 'normal',
        }}
      >
        <Col xs={3} className="text-start">
          <Select
            isMulti
            options={dietaryOptions}
            value={selectedRestrictions}
            onChange={setSelectedRestrictions}
            placeholder="Select dietary restrictions..."
          />
        </Col>
      </Row>
      <br />
      <Row xs={1} md={2} lg={5} className="g-3">
        {filteredRecipes.map((recipe) => (
          <Col key={recipe._id} lg={4}>
            <Recipe recipe={recipe} />
          </Col>
        ))}
      </Row>
      <br />
      <Row className="mb-3 justify-content-center">
        <Col className="text-center">
          <Link to="/add-recipe">
            <Button
              size="sm"
              variant="primary"
              style={{
                fontFamily: 'Titillium Web, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
              }}
            >
              Add a Recipe!
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default ListRecipes;
