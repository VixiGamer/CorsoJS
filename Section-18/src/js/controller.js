import "core-js/stable"
import "regenerator-runtime/runtime"
import * as model from "./model"
import recipeView from "./views/recipeView.js"
import searchView from "./views/searchView.js"
import resultsView from "./views/resultsView.js"
import paginationView from "./views/paginationView.js"

// if (module.hot) {
//   module.hot.accept();
// }

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1)
    console.log(id);

    if (!id) throw new Error(`${data.message} (${res.status})`)

    recipeView.renderSpinner()

    //§ Loading recepice
    await model.loadRecipe(id)

    //§ Redering recipe
    recipeView.render(model.state.recipe)

  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    resultsView.renderSpinner();

    //§ 1. Get search query
    const querry = searchView.getQuery();
    if (!querry) return;

    //§ 2. Load search results
    await model.loadSearchResults(querry)

    //§ 3. Render results
    resultsView.render(model.getSearchResultPage());

    //§ 4. Render initial pagination buttons
    paginationView.render(model.state.search)
  } catch (error) {
    console.error(error);
  }
}

function controlPagination(goToPage) {
  //§ 1. Render NEW results
  resultsView.render(model.getSearchResultPage(goToPage));

  //§ 2. Render NEW pagination buttons
  paginationView.render(model.state.search)
}

function controlServings(newServings) {
  //§ Update the recipe servings (in state)
  model.updateServings(newServings)

  //§ Update the recipe view
  recipeView.render(model.state.recipe)
}


function init() {
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandelerUpdateServings(controlServings);
  searchView.addHandelerSearch(controlSearchResults);
  paginationView.addHandelerClick(controlPagination);
}
init();