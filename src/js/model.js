import { async } from "regenerator-runtime";
import * as config_var from "./config_vars";
import * as helperFunc from "./helper_func.js";
export const state = {
  recipe: {},
  search: {
    searchWord: "",
    results: [],
  },
  bookmarks: {},
};

const formatRecipe = function (recipe) {
  return {
    id: recipe.id,
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    sourceUrl: recipe.source_url,
    imageUrl: recipe.image_url,
    title: recipe.title,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    key: recipe.key ? recipe.key : null,
  };
};
export const loadRecipe = async function (windowID) {
  try {
    const URL = `${config_var.API_URL}/${windowID}`;
    // promise.race it makes a race between 2 promises
    // and here I used it with fetching the url for a weak network
    // avoiding a forever request
    const recipe = await Promise.race([
      helperFunc.send_GetJson(URL),
      helperFunc.timeout(config_var.TIME_RESPONSE),
    ]);

    let refactRecipe = recipe.data.recipe;
    // refactor the recipeProperitesNames A_B:{} -> AB:{}
    state.recipe = formatRecipe(refactRecipe);
  } catch (err) {
    throw err;
  }
};
export let resultsNumber;
export const loadResults = async function (word) {
  try {
    state.search.searchWord = word;
    const urlWord = `${config_var.API_URL}?search=${word}&key=${config_var.KEY}`;
    const results = await helperFunc.send_GetJson(urlWord);
    if (!results.status || results.results === 0) throw new Error("no results");
    state.search.results = results.data.recipes.map((res) => {
      return {
        id: res.id,
        publisher: res.publisher,
        imageUrl: res.image_url,
        title: res.title,
        key: res.key ? res.key : null,
      };
    });
    resultsNumber = state.search.results.length;
  } catch (err) {
    throw err;
  }
};
export const uploadRecipeData = async function (newRecipe) {
  try {
    const data = await helperFunc.send_GetJson(
      `${config_var.API_URL}?key=${config_var.KEY}`,
      newRecipe
    );
    console.log(data.data.recipe, "fantasticc");
    state.recipe = formatRecipe(data.data.recipe);
  } catch (err) {
    console.log(err);
  }
};
export const minimaizeResults = function (pageNum) {
  const start = (pageNum - 1) * config_var.RESULTS_NUM;
  const end = pageNum * config_var.RESULTS_NUM; // the slice doesn't include the last element so we don't need to add (-1)
  return state.search.results.slice(start, end);
};
