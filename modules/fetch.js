/*
 *In this module is the function that fetches
 */

const BAERER_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmEzMGUzMDUxNDk2MzYzMGIzZjBmMTFlNDVjZmZlZiIsInN1YiI6IjY1ODAwNTQ0MGU2NGFmMDgzOWE4NTY2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mXFG31A3Gc9TIa9a-tDRXc2PwfYME01u_gmyEt5ipL4";

export async function fetchInfo(typeOfSearch, movieOrPerson, userSearch) {
  let urlChoices = `${movieOrPerson}?query=${userSearch}&include_adult=false&language=en-US&page=1`;

  let searchByMovieOrPerson =
    `https://api.themoviedb.org/3/${typeOfSearch}/` + urlChoices;

  if (typeOfSearch == "top-rated-btn") {
    searchByMovieOrPerson = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&include_video=true&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
  } else if (typeOfSearch == "popular-btn") {
    searchByMovieOrPerson = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&include_video=true&sort_by=popularity.desc`;
  } else if (typeOfSearch == "popular-tv-btn") {
    searchByMovieOrPerson = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&include_video=false&sort_by=popularity.desc`;
  } else if (typeOfSearch == "top-rated-tv-btn") {
    searchByMovieOrPerson = `https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=1&include_video=false&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
  } else if (typeOfSearch == "side-form") {
    searchByMovieOrPerson = `https://api.themoviedb.org/3/search/multi?query=${movieOrPerson}&include_adult=false&language=en-US&page=1`;
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BAERER_KEY}`,
    },
  };
  const sectionDiv = document.querySelector("section");
  sectionDiv.innerHTML = "";
  const response = await fetch(searchByMovieOrPerson, options);
  if (response.ok) {
    const data = await response.json();
    if (data.results.length == 0) {
      const sectionDiv = document.querySelector("section");
      const imgDiv = document.createElement("div");
      imgDiv.className = "error-image";
      const h2El = document.createElement("h2");
      h2El.innerText = "No matches to your search result";
      const imgEl = document.createElement("img");
      imgEl.src = "./assets/error.png";
      imgEl.className = "img-class";
      sectionDiv.append(imgDiv);
      imgDiv.append(h2El);
      imgDiv.append(imgEl);
    }
    return data;
  }
}
