import view from "./view_parent";
import icons from "../../img/icons.svg";

export class ResultssV extends view {
  #resultsContainer = document.querySelector(".results");
  #resultsNav = document.querySelector(".results--nav");
  #sortMenu = document.querySelector("#sort__options");
  currentResults = [];
  render(results) {
    this.currentResults = results;
    super.render(this.recipesDataFormated(results), this.#resultsContainer);
    this.#resultsNav.classList.remove("hidden");
    this.sortMenuChange();
  }
  recipesDataFormated(results) {
    let recipePreviewField = "";
    results.forEach((res) => {
      recipePreviewField += ` <li class="preview">
      <a class="preview__link" href="#${res.id}">
        <figure class="preview__fig">
          <img src="${res.imageUrl}" alt="${res.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${res.title} ...</h4>
          <p class="preview__publisher">${res.publisher}</p>
          
          <div class="preview__user-generated ${!res.key ? "hidden" : ""}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>

          </div>
        </div>
      </a>
    </li>  `;
    });
    return recipePreviewField;
  }

  markSelectedRecipeLink(windowID) {
    super.markPreivewLink(windowID, this.#resultsContainer);
  }
  sortMenu() {
    console.log(this.currentResults);
  }
  sortMenuChange() {
    this.#sortMenu.addEventListener("change", this.sortMenu.bind(this));
  }
}

export default new ResultssV();
