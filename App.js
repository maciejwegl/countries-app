import { renderDetailView } from "./views/detailView/detailView.js";
import { renderMainView } from "./views/mainView/mainView.js";

console.log("Dupa dupa");

if (window.location.search.includes("?country=")) {
  document.querySelector(".filters").classList.add("hidden");
  renderDetailView();
} else {
  renderMainView();
}
