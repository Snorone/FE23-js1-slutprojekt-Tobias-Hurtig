/*
 *In this module is the function that fetches all the information from The API
 */

import { displayError } from "./display.js";

const BAERER_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmEzMGUzMDUxNDk2MzYzMGIzZjBmMTFlNDVjZmZlZiIsInN1YiI6IjY1ODAwNTQ0MGU2NGFmMDgzOWE4NTY2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mXFG31A3Gc9TIa9a-tDRXc2PwfYME01u_gmyEt5ipL4";

export async function fetchInfo(typeOfSearch, userChoice, userSearch) {
  let urlChoices = `${userChoice}?query=${userSearch}&include_adult=false&language=en-US&page=1`;

  let tmdbUrl = `https://api.themoviedb.org/3/${typeOfSearch}/` + urlChoices;

  if (typeOfSearch == "top-rated-btn") {
    tmdbUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&include_video=true&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
  } else if (typeOfSearch == "popular-btn") {
    tmdbUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&include_video=true&sort_by=popularity.desc`;
  } else if (typeOfSearch == "popular-tv-btn") {
    tmdbUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&include_video=false&sort_by=popularity.desc`;
  } else if (typeOfSearch == "top-rated-tv-btn") {
    tmdbUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&include_video=false&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
  } else if (typeOfSearch == "side-form") {
    tmdbUrl = `https://api.themoviedb.org/3/search/multi?query=${userChoice}&include_adult=false&language=en-US&page=1`;
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BAERER_KEY}`,
    },
  };
  const response = await fetch(tmdbUrl, options);
  const data = await response.json();
  const sectionDiv = document.querySelector("section");
  sectionDiv.innerHTML = "";
  if (response.ok && data.results.length !== 0) {
    return data;
  }
  if (userChoice === "movie" && data.results.length == 0) {
    throw "Movie Not Found";
  }

  if (userChoice === "person" && data.results.length == 0) {
    throw "Actor Not Found";
  }
  if (typeOfSearch === "side-form" && data.results.length == 0) {
    throw "Nothing matches your search";
  } else {
    throw 404;
  }
}
