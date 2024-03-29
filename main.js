/*
 * Tobias Hurtig, 2024
 *
 * movies, tv-shows and actor search
 * Uses The Movie Data Base API https://developer.themoviedb.org
 *
 * Fetches information about movies, actors and tv-shows
 * Info displayed depending on user search
 *
 */
import { displayTopTen } from "./modules/display.js";
import { fetchInfo } from "./modules/fetch.js";
import { topRatedButtonAnimationObject } from "./modules/animations.js";
import { popButtonAnimationObject } from "./modules/animations.js";
import { popTvButtonAnimationObject } from "./modules/animations.js";
import { topRatedTvButtonAnimationObject } from "./modules/animations.js";
import { displayInfo } from "./modules/display.js";
import { displayError } from "./modules/display.js";

const buttonDiv = document.querySelector(".button-div");
const searchForm = document.querySelector("form");
const sideSearchForm = document.querySelector("#side-form");
const logoDiv = document.querySelector(".left-header-div");

buttonDiv.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.id != "")
    fetchInfo(event.target.id)
      .then((object) => {
        if (event.target.id == "top-rated-tv-btn") {
          topRatedTvButtonAnimationObject.restart();
          displayTopTen(object);
        } else if (event.target.id == "top-rated-btn") {
          topRatedButtonAnimationObject.restart();
          displayTopTen(object);
        } else if (event.target.id == "popular-btn") {
          popButtonAnimationObject.restart();
          displayTopTen(object);
        } else if (event.target.id == "popular-tv-btn") {
          popTvButtonAnimationObject.restart();
          displayTopTen(object);
        } else {
          location.reload();
        }
      })
      .catch(displayError);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchParameter = "search";
  let userSelect = document.querySelector("select").value;
  const userInput = document.querySelector("input").value;
  fetchInfo(searchParameter, userSelect, userInput)
    .then((object) => {
      displayInfo(object);
      searchForm.reset();
    })
    .catch(displayError);
});
sideSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const multiSearch = document.querySelector("#multi-search").value;
  fetchInfo(event.target.id, multiSearch)
    .then((object) => {
      displayInfo(object);
      sideSearchForm.reset();
    })
    .catch(displayError);
});

logoDiv.addEventListener("click", (event) => {
  event.preventDefault();
  location.reload();
});
