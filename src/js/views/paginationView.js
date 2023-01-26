import { resultsNumber } from "./../model";
class Pagination {
  pageLeftButton = document.querySelector(".pagination__btn--prev");
  btnLeftTx = this.pageLeftButton.lastElementChild;
  pageRightButton = document.querySelector(".pagination__btn--next");
  pagesNumber = document.querySelector(".pages--number");
  btnRightTx = this.pageRightButton.firstElementChild;
  currentPg = 1;
  flagLeft = true;
  flagRight = true;

  checkLimit(dir = "undefined") {
    if (Math.ceil(resultsNumber / 10) === 1) {
      this.hideBtns();
      this.flagLeft = false;
      this.flagRight = false;
    }
    if (dir == "L") {
      if (this.currentPg == 1) {
        this.flagLeft = false;
        this.pageLeftButton.classList.add("hidden");
        return true;
      }
    } else if (dir == "R") {
      if (this.currentPg == Math.ceil(resultsNumber / 10)) {
        this.flagRight = false;
        this.pageRightButton.classList.add("hidden");
        return true;
      }
    }

    return false;
  }
  number_O_Pages() {
    this.pagesNumber.textContent = `<- ${Math.ceil(
      resultsNumber / 10
    )} Pages -> `;
    this.pagesNumber.classList.remove("hidden");
  }
  changePrevPage() {
    this.pageRightButton.classList.remove("hidden");
    this.currentPg--;
    this.btnRightTx.textContent = `Page ${this.currentPg + 1}`;
    if (this.checkLimit("L")) return;
    this.btnLeftTx.textContent = `Page ${this.currentPg - 1}`;
  }

  changeNextPage() {
    this.currentPg++;
    this.btnLeftTx.textContent = `Page ${this.currentPg - 1}`;
    this.pageLeftButton.classList.remove("hidden");
    if (this.checkLimit("R")) return;
    this.btnRightTx.textContent = `Page ${this.currentPg + 1}`;
    console.log("first");
  }
  resetPaginatonBtns() {
    this.currentPg = 1;
    this.pageLeftButton.classList.add("hidden");
    this.btnRightTx.textContent = "Page 2";
    this.pageRightButton.classList.remove("hidden");
    this.flagLeft = true;
    this.flagRight = true;
    this.pagesNumber.classList.add("hidden");
  }
  failedSearchSoHidePageBtns() {
    this.currentPg = 1;
    this.hideBtns();
  }
  hideBtns() {
    this.pageLeftButton.classList.add("hidden");
    this.pageRightButton.classList.add("hidden");
  }
  listenPageSwitch(F1, F2, F3) {
    const thisClass = this;
    this.pageRightButton.addEventListener("click", function (e) {
      e.preventDefault();
      thisClass.flagLeft = true;
      if (!thisClass.flagRight) return;
      thisClass.changeNextPage();
      F1(F2(thisClass.currentPg)); // render the next 10 results

      F3(window.location.hash.slice(1)); // check if the current recipe == any of the results so we marked it
    });
    this.pageLeftButton.addEventListener("click", function (e) {
      e.preventDefault();
      thisClass.flagRight = true;
      if (!thisClass.flagLeft) return;
      thisClass.changePrevPage();
      F1(F2(thisClass.currentPg));
      F3(window.location.hash.slice(1));
    });
  }
}

export default new Pagination();
