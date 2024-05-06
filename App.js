import { renderDetailView } from "./views/detailView/detailView.js";
import { renderMainView } from "./views/mainView/mainView.js";

console.log("Hello");

if (window.location.search.includes("?country=")) {
  document.querySelector(".filters").classList.add("hidden");
  renderDetailView();
} else {
  renderMainView();
}
