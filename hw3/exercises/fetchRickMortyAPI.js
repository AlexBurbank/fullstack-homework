const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const axios = require("axios");

app.use(
  express.urlencoded({
    extended: true,
  }),
);

const server = http.createServer(app);

const port = 5001;

let data = [];

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

const fetchData = async function FetchData(numPage) {
  return fetch(`https://rickandmortyapi.com/api/character?page=${numPage}`)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    })
    .catch((res) => console.log(numPage + ": " + res));
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
  let numPages = 0;
  do {
    const entryResultChunk = await fetchData(numPage);
    console.log(entryResultChunk + " " + numPage);
    //numPages = entryInfoChunk.pages; // All the info is the same for all pages so this works to get the number of fetches needed to get all the data
    data.push(...entryResultChunk);
    numPage = numPage + 1;
  } while (numPage <= 42);
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
