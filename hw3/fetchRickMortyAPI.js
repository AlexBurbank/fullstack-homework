const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const path = require("path");

app.use(
  express.urlencoded({
    extended: true,
  }),
);

const server = http.createServer(app);

const port = 5001;

let data = [];
let species = [];
let uniqueSpecies = new Set();
let speciesLookupTable = new Map();

app.use(express.static("public"));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

const fetchData = async function FetchData(numPage) {
  return fetch(`https://rickandmortyapi.com/api/character?page=${numPage}`)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    })
    .catch((err) => console.log(numPage + ": " + err));
};

const fetchLocationInfo = async function FetchLocationInfo() {
  return fetch("https://rickandmortyapi.com/api/location?page=1") // Just need info from one of the pages
    .then((res) => res.json())
    .then((data) => {
      return data.info;
    })
    .catch((err) => console.log(err));
};

const fetchInfo = async function FetchInfo() {
  return fetch(`https://rickandmortyapi.com/api/character?page=1`) // Just need info from one of the pages
    .then((res) => res.json())
    .then((data) => {
      return data.info;
    })
    .catch((err) => console.log(err));
};

app.get("/", (req, res) => {
  res.set({ "Content-Type": "text/html" });
  res.status(200);
  res.send("Welcome to this rick and morty API page");
});

app.get("/home", (req, res) => {
  res.set({ "Content-Type": "text/html" });
  res.status(200);
  res.send("Welcome to this rick and morty API page");
});

app.get("/characters", async (req, res) => {
  let numPage = 1;
  let numPagesToGet = 5; // Brings only 100 characters. The API becomes overloaded otherwise and returns a 429 status code which means I would have to set a timeout before fetching more
  do {
    if (numPage === 1) {
      const entryInfoChunk = await fetchInfo();
      totalPages = entryInfoChunk.pages;
    }
    const entryResultChunk = await fetchData(numPage);
    data.push(...entryResultChunk);
    numPage = numPage + 1;
  } while (numPage <= numPagesToGet);

  res.set({ "Content-Type": "text/html" });
  res.status(200);
  res.render("characters", {
    data: data,
  });
});

app.get("/species", (req, res) => {
  if (data.length === 0) {
    res.set({ "Content-Type": "text/html" });
    res.status(200);
    res.send("Go get characters using the /characters before using this route");
    return; // If I don't put this, I get an error that headers cannot be set after response sent
  }
  data.forEach((character) => uniqueSpecies.add(character.species));
  const specieCategoryIterator = uniqueSpecies.keys(); // keys and values the same here

  const speciesCategories = [];

  for (let i = 0; i < uniqueSpecies.size; i++) {
    const categoryName = specieCategoryIterator.next().value;
    const speciesBucket = [];
    speciesCategories.push(categoryName);
    species.push(speciesBucket);
    speciesLookupTable.set(categoryName, i);
  }

  for (let i = 0; i < data.length; i++) {
    const character = data[i];
    const indexToInsertInto = speciesLookupTable.get(character.species);
    species[indexToInsertInto].push(character.name);
  }

  res.set({ "Content-Type": "text/html" });
  res.status(200);
  res.render("species", {
    categories: speciesCategories,
    data: species,
  });
});

app.get("/locations", async (req, res) => {
  const locationInfo = await fetchLocationInfo();

  res.set({ "Content-Type": "text/html" });
  res.status(200);
  res.render("location", {
    numLocations: locationInfo.count,
  });
});

app.use("", (req, res) => {
  // For all other routes
  res.set({ "Content-Type": "text/html" });
  res.status(404);
  res.send("Route not implemented");
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
