/*
 *In this module are all the functions that displays the information that you get from the API
 */

import { divAnimations } from "./animations.js";

export function displayTopTen(movieObjects) {
  const sectionDiv = document.querySelector("section");
  for (let i = 0; i < 10; i++) {
    const containerDiv = document.createElement("div");
    containerDiv.className = "container";
    const textDiv = document.createElement("div");
    textDiv.className = "text-div";
    sectionDiv.append(containerDiv);
    createAndAppendElement(
      "img",
      "https://image.tmdb.org/t/p/original/" +
        movieObjects.results[i].poster_path,
      containerDiv
    );
    createAndAppendElement(
      "h2",
      movieObjects.results[i].title || movieObjects.results[i].name,
      containerDiv
    );
    if (movieObjects.results[i].release_date == null) {
      createAndAppendElement(
        "h3",
        "First air date: " + movieObjects.results[i].first_air_date,
        containerDiv
      );
    } else {
      createAndAppendElement(
        "h3",
        "Release date: " + movieObjects.results[i].release_date,
        containerDiv
      );
    }
    containerDiv.append(textDiv);
    createAndAppendElement("p", movieObjects.results[i].overview, textDiv);
  }
  anime(divAnimations);
}

export function displayInfo(movieObject) {
  movieObject.results.sort(sortResults);
  const sectionDiv = document.querySelector("section");

  for (let i = 0; i < movieObject.results.length; i++) {
    const containerDiv = document.createElement("div");
    sectionDiv.append(containerDiv);
    const textDiv = document.createElement("div");
    textDiv.className = "text-div";
    containerDiv.className = "container";

    if (movieObject.results[i].gender != null) {
      let posterImg = "./assets/noimg.png";
      if (movieObject.results[i].profile_path != null) {
        posterImg =
          "https://image.tmdb.org/t/p/original/" +
          movieObject.results[i].profile_path;
      }

      createAndAppendElement("img", posterImg, containerDiv);
      createAndAppendElement("h2", movieObject.results[i].name, containerDiv);
      createAndAppendElement(
        "h3",
        "Department most known for: " +
          movieObject.results[i].known_for_department,
        containerDiv
      );
      createAndAppendElement("h3", "Mostly known for:", containerDiv);
      const olElement = document.createElement("ol");
      containerDiv.append(olElement);

      for (let knownFor of movieObject.results[i].known_for) {
        olElement.className = "actor-list";
        const liElement = document.createElement("li");
        if (typeof knownFor.title === "undefined") {
          liElement.innerText = knownFor.media_type + ": " + knownFor.name;
        } else {
          liElement.innerText = knownFor.media_type + ": " + knownFor.title;
        }
        olElement.append(liElement);
      }
    } else {
      let posterImg = "./assets/noimg.png";
      if (movieObject.results[i].poster_path != null) {
        posterImg =
          "https://image.tmdb.org/t/p/original/" +
          movieObject.results[i].poster_path;
      }
      createAndAppendElement("img", posterImg, containerDiv);

      createAndAppendElement(
        "h2",
        movieObject.results[i].name || movieObject.results[i].title,
        containerDiv
      );
      if (movieObject.results[i].title == null) {
        createAndAppendElement(
          "h3",
          "First air date: " + movieObject.results[i].first_air_date,
          containerDiv
        );
      } else if (movieObject.results[i].name == null) {
        createAndAppendElement(
          "h3",
          "Release date: " + movieObject.results[i].release_date,
          containerDiv
        );
      }

      containerDiv.append(textDiv);
      createAndAppendElement("p", movieObject.results[i].overview, textDiv);
    }
  }
  anime(divAnimations);
}

function sortResults(result1, result2) {
  return result2.popularity - result1.popularity;
}

function createAndAppendElement(type, content, container) {
  const el = document.createElement(type);
  container.append(el);

  if (type === "img") {
    el.src = content;
    el.className = "img-class";
  } else el.innerText = content;
}

export function displayError(error) {
  const sectionDiv = document.querySelector("section");
  sectionDiv.innerHTML = "";
  const h2El = document.createElement("h2");
  const imgDiv = document.createElement("div");
  const imgEl = document.createElement("img");
  imgEl.src = "./assets/error.png";
  imgEl.className = "img-class";
  imgDiv.className = "error-image";
  if (
    error === "Movie Not Found" ||
    error === "Actor Not Found" ||
    error === "Nothing matches your search"
  ) {
    h2El.innerText = error + ". Please try again.";
    sectionDiv.append(imgDiv);
    imgDiv.append(h2El);
    imgDiv.append(imgEl);
  } else {
    h2El.innerText = "something went wrong. Please try again";
    sectionDiv.append(imgDiv);
    imgDiv.append(h2El);
    imgDiv.append(imgEl);
  }
}
