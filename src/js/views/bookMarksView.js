import icons from "../../img/icons.svg";
import view from "./view_parent.js";
export class Bookmarks extends view {
  #btn_addBookMark;
  #bookMarksContainer = document.querySelector(".bookmarks__list");
  #bookMarksString = "";
  // bookmarksList = new Set();
  bookmarksList = [];
  #currentRecipe;

  insertToHtml(e) {
    e.preventDefault();
    // check if it Is in the list
    this.#bookMarksString = " ";
    const index = this.inBookMarkList(this.#currentRecipe.id);
    if (index !== -1) {
      this.deleteBookMark(index);
      this.fillOrEmptyBtn(false);
      console.log(this.#currentRecipe);

      if (+this.bookmarksList.length === 0) {
        this.#bookMarksContainer.innerHTML = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>
        No bookmarks yet. Find a nice recipe and bookmark it :)
      </p>
    </div>`;
        localStorage.clear();
        return;
      }
      this.listToHtmlString();
      this.saveBookMarksToLocalStorage();
      return;
    }

    // if not add it

    this.bookmarksList.push(this.#currentRecipe);
    this.saveBookMarksToLocalStorage();

    this.listToHtmlString();
    this.fillOrEmptyBtn(true);
    // set mark to the added recipe
    this.markSelectedRecipeLink(this.#currentRecipe.id);
  }
  deleteBookMark(index) {
    this.bookmarksList.splice(index, 1);
    return;
  }

  inBookMarkList(id) {
    const idIndex = this.bookmarksList.findIndex(
      (bkedMarked) => bkedMarked.id === id
    );
    return idIndex;
  }
  listToHtmlString() {
    this.bookmarksList.forEach((bookMark) => {
      this.#bookMarksString += ` <li class="preview">
          <a class="preview__link" href="#${bookMark.id}">
            <figure class="preview__fig">
              <img src="${bookMark.imageUrl}" alt="${bookMark.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${bookMark.title} </h4>
              <p class="preview__publisher">${bookMark.publisher}</p>
              
              <div class="preview__user-generated ${
                !bookMark.key ? "hidden" : ""
              }">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
        </li>  `;
    });
    this.#bookMarksContainer.innerHTML = this.#bookMarksString;
  }
  fillOrEmptyBtn(ch) {
    this.#btn_addBookMark.firstElementChild.innerHTML = `<use href="${icons}#icon-bookmark${
      ch ? "-fill" : ""
    }"></use>`;
  }
  Bookmarkslistener(data) {
    this.#currentRecipe = data;
    this.#btn_addBookMark = document.querySelector(".btn--round");
    this.#bookMarksContainer = document.querySelector(".bookmarks__list");
    this.#btn_addBookMark.addEventListener(
      "click",
      this.insertToHtml.bind(this)
    );
  }

  anyBookMarkedRecipe() {
    return this.bookmarksList.length;
  }
  markSelectedRecipeLink(windowID) {
    super.markPreivewLink(windowID, this.#bookMarksContainer);
  }
  saveBookMarksToLocalStorage() {
    localStorage.setItem("bookMarks", JSON.stringify(this.bookmarksList));
  }
  savedBookMarkedBack() {
    const data = JSON.parse(localStorage.getItem("bookMarks"));
    if (!data) return;

    this.bookmarksList = data;

    this.listToHtmlString();
    console.log(this.bookmarksList);
  }
  afterReload() {
    window.onload = this.savedBookMarkedBack();
  }
}

export default new Bookmarks();
