const express = require("express");
const app = express();
const port = process.env.PORT || 5001;

app.use(
  express.urlencoded({
    extended: true,
  }),
);

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
  res.write("<form action='/submit' method='post'>");

  res.write("<label for='username'>Username:</label>");
  res.write("<input type='text' name='username' id='username' /><br />");

  res.write("<label for='email'>Email:</label>");
  res.write("<input type='email' name='email' id='email' /><br />");

  res.write("<label for='comments'>Comments:</label>");
  res.write("<textarea name='comments' id='comments'></textarea><br />");

  res.write("<label for='newsletterSignup'>Newsletter Signup:</label>");
  res.write(
    "<input type='checkbox' name='newsletterSignup' id='newsletterSignup' /><br />",
  );

  res.write("<input type='submit' id='submit' />");
  res.write("</form>");
  res.end();
});

app.post("/submit", (req, res) => {
  res.status(200);
  res.set({ "Content-Type": "text/html" });
  res.write(
    `Username: ${req.body.username ? req.body.username : "No response"}`,
  );
  res.write("<br />");

  res.write(`Email: ${req.body.email ? req.body.email : "No response"}`);
  res.write("<br />");

  res.write(
    `Comments: ${req.body.comments ? req.body.comments : "No response"}`,
  );
  res.write("<br />");
  res.write(
    `Newsletter signup: ${req.body.newsletterSignup ? "checked" : "not checked"}`,
  );
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
