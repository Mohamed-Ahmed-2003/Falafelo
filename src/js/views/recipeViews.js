// because the parcel changes the urlPath of the assets [imgs,icons,files] and put into dist
// we need to select they by impoting them
import icons from "../../img/icons.svg";
import view from "./view_parent";

import Fractional from "fractional"; // transformm 0.5 -> 1/2 ...
class RecipeView extends view {
  _recipeContainer = document.querySelector(".recipe");
  _servings;
  _data;
  Servings_flag = true;

  render(data, updateType = "none", booked = "") {
    this._data = data;
    super.render(
      this._insertRecipeDataToHtml(data, updateType, booked),
      this._recipeContainer
    );
    this._servings = document.querySelector(".recipe__info-buttons");
    this.servingsListen();
  }
  putSpiner() {
    super.putSpiner(this._recipeContainer);
  }

  _loopIngs(recipe, updateType) {
    // we need to loop on the ingredients properity
    // and store all its elements data in one variable
    let ingredientsFill = "";
    recipe.ingredients.forEach((ing) => {
      if (updateType === "increase")
        ing.quantity *= this._data.servings / (this._data.servings - 1);
      else if (updateType === "decrease") {
        ing.quantity *= this._data.servings / (this._data.servings + 1);
      }

      ingredientsFill += `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ""
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
    });
    return ingredientsFill;
  }
  _insertRecipeDataToHtml(recipe, updateType, booked) {
    // then write this var in html cont
    console.log(recipe);
    const htmlContent = `
    <figure class="recipe__fig">
      <img src=${recipe.imageUrl} alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>
  
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text">servings</span>
  
        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--decrease-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
              
      <div class="recipe__user-generated ${!recipe.key ? "hidden" : " "}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark${booked}"></use>
        </svg>
      </button>
    </div>
  
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
       ${this._loopIngs(recipe, updateType)}
      </ul>
    </div>
  
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          recipe.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
    return htmlContent;
  }

  errorMesg() {
    console.log(this);
    super.errorMesg(this._recipeContainer);
  }

  activeEvent(handFunc) {
    // window.addEventListener("hashchange", handFunc);
    // window.addEventListener("load", handFunc);

    // multi parameters with the same handler function
    ["hashchange", "load"].forEach((evnt) =>
      window.addEventListener(evnt, handFunc)
    );
  }

  servingsListen() {
    const thisClass = this;
    this._servings.addEventListener("click", function (e) {
      const countBtn = e.target.closest(".btn--tiny");
      if (!countBtn) return;
      if (countBtn.classList.contains("btn--increase-servings")) {
        thisClass._data.servings++;
        thisClass.Servings_flag = true;
        thisClass._updateServings(thisClass._data, "increase");
      } else {
        if (!thisClass.Servings_flag) return;
        if (+thisClass._data.servings === 1) {
          thisClass.Servings_flag = false;
          return;
        }
        thisClass._data.servings--;
        thisClass._updateServings(thisClass._data, "decrease");
      }
    });
  }
  _updateServings(updatedRecipe, updateType) {
    this._ingreientsContainer = this._recipeContainer.querySelector(
      ".recipe__ingredient-list"
    );
    this._servingsNum = this._recipeContainer.querySelector(
      ".recipe__info-data--people"
    );

    this._servingsNum.innerHTML = updatedRecipe.servings;
    this._ingreientsContainer.innerHTML = this._loopIngs(
      updatedRecipe,
      updateType
    );
  }
}

export default new RecipeView();
