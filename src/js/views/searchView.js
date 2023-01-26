import view from "./view_parent";
export class Query extends view {
  #searchContainer = document.querySelector(".search");
  #searchField = this.#searchContainer.querySelector(".search__field");
  #resultsField = document.querySelector(".results");
  getSerchingWord() {
    const w = this.#searchField.value;
    this.#clearInput();
    return w;
  }
  #clearInput() {
    this.#searchField.value = "";
  }
  putSpiner() {
    super.putSpiner(this.#resultsField);
  }
  errorMesg() {
    super.errorMesg(this.#resultsField);
  }
  listenSearch(handFunc) {
    this.#searchContainer.addEventListener("submit", function (e) {
      e.preventDefault();
      handFunc();
    });
  }
}

export default new Query();
