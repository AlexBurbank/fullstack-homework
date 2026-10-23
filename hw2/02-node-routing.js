const http = require("http");
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    "welcome",
    "redirect",
    "redirected",
    "cache",
    "cookie",
    "other",
  ];

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Node Routing Exercise</h1>");
  } else if (req.url === `/${routes[0]}`) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome page</h1>");
    res.write("<p>Welcome! Nothing to see here yet</p>");
  } else if (req.url === `/${routes[1]}`) {
    res.writeHead(302, { Location: `/${routes[2]}` });
  } else if (req.url === `/${routes[2]}`) {
    res.write("<h1>You have been redirected</h1>");
  } else if (req.url === `/${routes[3]}`) {
    res.writeHead(200, { "cache-control": "max-age=86400" });
    res.write("<h1>this resource was cached");
  } else if (req.url === `/${routes[4]}`) {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "set-cookie": "hello=world",
    });
    res.write("cookies... yummm");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>404 - page not found</h1>");
  }

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
