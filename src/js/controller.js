// I refacterd the code using MVC [model controller views] so I splitted the code into 3 types of mvc files
// so we needa a live connection between these files , and this happens through export and import
import * as model from "./model.js";
import recipeView from "./views/recipeViews.js";
import search from "./views/searchView.js";
import Pagination from "./views/paginationView.js";
import resultsView from "./views/results_view.js";
import addRecipe from "./views/addingRecipeView.js";
import BookmarksView, { Bookmarks } from "./views/bookMarksView.js";

// to support old browsers
import "core-js/stable";
import "regenerator-runtime/runtime";
import { Fraction } from "fractional";
import { async } from "regenerator-runtime";
import bookMarksView from "./views/bookMarksView.js";

////////////////////////////////////////
/*
safe write 
Some text editors and IDE's have a feature called safe write
 that basically prevents data loss, by taking a copy of the file and renaming it when saved.
When using Hot Module Reload (HMR) this feature blocks the automatic detection of file updates,
 to disable safe write use the options provided below:
*/
if (module.hot) {
  module.hot.accept();
}
/////////////////////////////////
// we need the asynchronous  principle here
//for waiting the server response to our request

// constrol recipes
const showRecipe = async function () {
  // handle the code with try and catch for capturing the error
  try {
    // fetch the recipe id and using slice method to remove the first char ( # )
    const windowID = window.location.hash.slice(1);
    if (!windowID) return;
    // display spiner untill the handle of recipe
    recipeView.putSpiner();
    resultsView.markSelectedRecipeLink(windowID);
    ////////// loading the recipe
    // and this function will impact to the original object "state "
    // that contains receipe object and therefore we can call the recipe from
    // the state object and we are sure that it was filled with data
    // after loadRecipe func had been done successfully
    await model.loadRecipe(windowID);
    // (2) insert the recipe data to html to render it
    bookMarksView.inBookMarkList(model.state.recipe.id) !== -1
      ? recipeView.render(model.state.recipe, "none", "-fill")
      : recipeView.render(model.state.recipe, "none", "");
    bookMarksView.Bookmarkslistener(model.state.recipe); // bookMarks

    if (bookMarksView.anyBookMarkedRecipe)
      bookMarksView.markSelectedRecipeLink(windowID);
  } catch (error) {
    console.error("hahha", error);
    recipeView.errorMesg();
  }
};
// control recipes results
const recipesSearch = async function () {
  const word = search.getSerchingWord();
  if (!word) return;
  search.putSpiner();
  try {
    await model.loadResults(word);
    Pagination.resetPaginatonBtns();
    Pagination.number_O_Pages();
    Pagination.checkLimit(); // check if the res = 1 so we need no pge btns
    resultsView.render(model.minimaizeResults(1));
    const windowID = window.location.hash.slice(1);
    resultsView.markSelectedRecipeLink(windowID);
  } catch (error) {
    Pagination.failedSearchSoHidePageBtns();
    search.errorMesg();
    console.log(error);
  }
};
const uploadRecipeData = async function (newRecipe) {
  await model.uploadRecipeData(newRecipe);
  window.history.pushState(null, "", `#${model.state.recipe.id}`);

  // recipeView.render(model.state.recipe, "none", "-fill");

  showRecipe();
};
const main = function () {
  recipeView.activeEvent(showRecipe);
  search.listenSearch(recipesSearch);
  Pagination.listenPageSwitch(
    resultsView.render.bind(resultsView),
    model.minimaizeResults.bind(model),
    resultsView.markSelectedRecipeLink.bind(resultsView)
  );
  bookMarksView.afterReload();
  addRecipe.activeUploadEvents(uploadRecipeData);
};

main();

const func22 = function (n1, n2, word) {
  console.log(`( ${n2}،${n1}،${word} )`);
};

func22(2004, 75, "ليلي كرم");
