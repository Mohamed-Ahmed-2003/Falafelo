import view from "./view_parent";

export class AddRcipeView extends view {
  _btn_addRecipe = document.querySelector(".nav__btn--add-recipe");
  _btn_close_RecipeMenu = document.querySelector(".btn--close-modal");
  _uploadContainer = document.querySelector(".upload");
  _addRecipeMenu = document.querySelector(".add-recipe-window");
  _overLay = document.querySelector(".overlay");

  _showRecipe(e) {
    e.preventDefault();
    this._addRecipeMenu.classList.remove("hidden");
    this._overLay.classList.remove("hidden");
  }
  _hideReccipeMenu() {
    this._addRecipeMenu.classList.add("hidden");
    this._overLay.classList.add("hidden");
  }
  _reInsertMenu() {
    const htmlDta = `    
    <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="كفتة" required name="كفتة" type="text" />
    <label>URL</label>
    <input value="TEST" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="URL_IMAGE" required name="image" type="text" />
    <label>Publisher</label>
    <input value="Mo Ahmed" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="20" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="25" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value="0.5,kg,Rice"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,,Avocado"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=",,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>`;
    super.render(htmlDta, this._uploadContainer);
  }
  _fromatRecipeObj(dataArr) {
    // here we take the ingredients into an array using filter on the original array
    // where we take the element that accept the 2 conditions
    // then we make they into object using map method
    this.putSpiner();
    const ings = dataArr
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        let fromatedIng = {};
        const details = ing[1].split(",");
        fromatedIng.quantity = details[0] === "" ? null : +details[0];
        fromatedIng.unit = !details[1] ? "" : details[1];
        fromatedIng.description = !details[2] ? "" : details[2];
        return fromatedIng;
      });
    // delete the ing elements from the original array
    // then return the formated to push it again
    dataArr.splice(6, 6);
    super.successMesg(this._uploadContainer);

    setTimeout(this._hideReccipeMenu.bind(this), 1000);
    setTimeout(this._reInsertMenu.bind(this), 1500);

    return ings;
  }
  putSpiner() {
    super.putSpiner(this._uploadContainer);
  }
  activeUploadEvents(func) {
    const thisClass = this;
    this._btn_addRecipe.addEventListener("click", this._showRecipe.bind(this));

    [this._btn_close_RecipeMenu, this._overLay].forEach((e) =>
      e.addEventListener("click", this._hideReccipeMenu.bind(this))
    );

    this._uploadContainer.addEventListener("submit", function (e) {
      e.preventDefault();
      // it select all the values in the form and assign they into array enteries key & value using FormaData
      const dataArr = [...new FormData(this)];
      // convert this array to an object takes the key and value into proberity and value  using
      const ings = thisClass._fromatRecipeObj(dataArr);
      const dataObj = Object.fromEntries(dataArr);
      dataObj.ingredients = ings;

      const receipe = {
        publisher: dataObj.publisher,
        ingredients: dataObj.ingredients,
        source_url: dataObj.sourceUrl,
        image_url: dataObj.image,
        title: dataObj.title,
        servings: +dataObj.servings,
        cooking_time: +dataObj.cookingTime,
      };
      func(receipe);
    });
  }
}
export default new AddRcipeView();
