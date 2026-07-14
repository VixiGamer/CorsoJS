import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js"
import { RESULTS_PER_PAGE } from "./config.js";

export const state = {
    recipe: {},
    search: {
        querry: "",
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1
    }
}

export async function loadRecipe(id) {
    try {
        const data = await getJSON(`${API_URL}${id}`)

        const { recipe } = data.data
        state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
        }
        console.log(state.recipe);
    } catch (error) {
        console.error(error)
        throw error;
    }
}


export async function loadSearchResults(querry) {
    try {
        state.search.querry = querry
        const data = await getJSON(`${API_URL}?search=${querry}`)
        console.log(data);

        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            }
        })

        console.log(state.search);
    } catch (error) {
        throw error;
    }
}


export function getSearchResultPage(page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage
    return state.search.results.slice(start, end)
}


export function updateServings(newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings
    })

    state.recipe.servings = newServings;
}