import "core-js/stable"
import "regenerator-runtime/runtime"
import { async } from "regenerator-runtime"

import * as model from "./model"
import { MODAL_CLOSE_SEC } from "./config.js"
import recipeView from "./views/recipeView.js"
import searchView from "./views/searchView.js"
import resultsView from "./views/resultsView.js"
import paginationView from "./views/paginationView.js"
import bookmarksView from "./views/bookmarksView.js"
import addRecipeView from "./views/addRecipeView.js"

// if (module.hot) {
//   module.hot.accept();
// }

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1)
    //console.log(id);

    if (!id) throw new Error(`${data.message} (${res.status})`)
    recipeView.renderSpinner()

    //§ 0. Update results View to mark selected search result
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks)

    //§ 1. Loading recepice
    await model.loadRecipe(id)

    //§ 2. Redering recipe
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
  //recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

function controlAddBookmark() {
  //§ 1. Add
  if (!model.state.recipe.bookmarked) model.addBokkmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //§ 2. Update recipe view
  recipeView.update(model.state.recipe);

  //§ Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks)
}

async function controlAddRecipe(newRecipe) {
  try {
    //§ Show loading spinner
    addRecipeView.renderSpinner()

    //§ Upload the new recipe data
    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe);
    
    //§ Render recipe
    recipeView.render(model.state.recipe)

    //§ Diplay succes message
    addRecipeView.renderMessage()

    //§ Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //§ Change ID in the URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    //§ Close form window
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, 1000 * MODAL_CLOSE_SEC)
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message)
  }
}


function init() {
  bookmarksView.addHandelerRender(controlBookmarks)
  recipeView.addHandelerRender(controlRecipes);
  recipeView.addHandelerUpdateServings(controlServings);
  recipeView.addHandelerAddBookmark(controlAddBookmark);
  searchView.addHandelerSearch(controlSearchResults);
  paginationView.addHandelerClick(controlPagination);
  addRecipeView.addHandelerUpload(controlAddRecipe)
}
init();