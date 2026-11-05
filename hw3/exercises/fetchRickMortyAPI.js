const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const axios = require("axios");
const { setTimeout } = require('timers/promises');

app.use(
  express.urlencoded({
    extended: true,
  }),
);

const server = http.createServer(app);

const port = 5001;

let data = [];
let speciesSet = new Set();
let speciesArr = [];

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

const fetchData = async function FetchData(numPage) {
  return fetch(`https://rickandmortyapi.com/api/character?page=${numPage}`)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    })
    .catch((err) => console.log(numPage + ": " + err));
};

const fetchInfo = async function FetchInfo() {
  return fetch(`https://rickandmortyapi.com/api/character?page=1`)
    .then((res) => res.json())
    .then((data) => {
      return data.info;
    })
    .catch((err) => console.log(err));
};

app.get("/home", (req, res) => {
  res.set({ "Content-Type": "text/html" });
  res.status(200);
  res.send("Welcome to this rick and morty API page");
});

app.get("/characters", (req, res) => {
  res.set({ "Content-Type": "text/html" });
  res.status(200);
  console.log(data);
  res.render("characters", {
    data: data,
  });
});

app.get("/", async (req, res) => {
  let numPage = 1;
  let totalPages = 0;
  do {
    if (numPage === 1) {
      const entryInfoChunk = await fetchInfo();
      totalPages = entryInfoChunk.pages
    }
    const entryResultChunk = await fetchData(numPage);
    data.push(...entryResultChunk);
    numPage = numPage + 1;
    if (numPage % 5 === 0) {
      await setTimeout(2000); // Wait for 2 seconds
    }
  } while (numPage <= totalPages);
  console.log()
  res.send("Wecome to the / route")
});

app.get("/species", (req, res) => {
  console.log(data.length)
  data.forEach(character => {species.add(character.species)}) // All unique in species
  speciesSet.size
  const typesOfSpecies = new Array();
  speciesSet.values()
  
  data.forEach()
  res.end()
})

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
