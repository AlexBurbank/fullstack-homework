const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5001;

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// http://localhost:5001/form should return a form with input elements for username, email, comments, newsletter sign up, and submit button.

// http://localhost:5001/submit should return all the data the user entered

app.get("/", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.send("Express Routing Exercise");
});

app.get("/form", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.sendFile(path.join(__dirname + "/public/form.html"));
});

app.post("/submit", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.render("formResults", {
    username: req.body.username ? req.body.username : "No response",
    email: req.body.email ? req.body.email : "No response",
    comments: req.body.comments ? req.body.comments : "",
    newsletterSignup: req.body.newsletterSignup ? "Checked" : "Not checked",
  });
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
