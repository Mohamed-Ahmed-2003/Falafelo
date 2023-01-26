import icons from "../../img/icons.svg";
export default class Views {
  _recipeData;
  render(data, parentContainer) {
    this._clearHtmlCont(parentContainer);
    //const mark = insertFunc(data);
    parentContainer.insertAdjacentHTML("afterbegin", data);
  }
  putSpiner(parentContainer) {
    parentContainer.innerHTML = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> `;
  }

  errorMesg(
    parentContainer,
    mesg = "No recipes found for your query. Please try again!"
  ) {
    parentContainer.innerHTML = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${mesg}</p>
  </div> `;
  }

  successMesg(parentContainer, mesg = "❤️Succeded") {
    parentContainer.innerHTML = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${mesg}</p>
  </div>
   `;
  }

  markPreivewLink(windowID, parentContainer) {
    const insertedResults = parentContainer.querySelectorAll(".preview__link");

    insertedResults.forEach((el) => {
      windowID === el.getAttribute("href").slice(1)
        ? el.classList.add("preview__link--active")
        : el.classList.remove("preview__link--active");
    });
  }
  _clearHtmlCont(parentContainer) {
    parentContainer.innerHTML = " ";
  }
}
