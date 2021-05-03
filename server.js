// Import libraries and middlewares
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

// Import router callback functions
const accounts = require("./routes/account");
const contacts = require("./routes/contact");
const departments = require("./routes/department");
const prospects = require("./routes/prospect");
const quotes = require("./routes/quote");
const users = require("./routes/user");

// Import utils
const { login, authenticateToken } = require("./routes/login");
const { upload } = require("./routes/utils/file");

/* ----------------------------------
Express Server Configuration
---------------------------------- */
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is runningat port ${PORT}`);
});
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

/* ----------------------------------
Database Configuration
---------------------------------- */
require("./database")();

/* ----------------------------------
Endpoints Configuration
---------------------------------- */

// Login ednpoint
app.post("/api/login", login);

//Account RESTFul endpoionts
app.get("/api/accounts", authenticateToken, accounts.getAll);
app.post("/api/accounts", accounts.createOne);
app.get("/api/accounts/:id", accounts.getOne);
app.put("/api/accounts/:id", accounts.updateOne);
app.delete("/api/accounts/:id", accounts.deleteOne);

//Contact RESTFul endpoionts
app.get("/api/contacts", authenticateToken, contacts.getAll);
app.post("/api/contacts", contacts.createOne);
app.get("/api/contacts/:id", contacts.getOne);
app.put("/api/contacts/:id", contacts.updateOne);
app.delete("/api/contacts/:id", contacts.deleteOne);

//Department RESTFul endpoionts
app.get("/api/departments", departments.getAll);
app.post("/api/departments", departments.createOne);
app.get("/api/departments/:id", departments.getOne);
app.put("/api/departments/:id", departments.updateOne);
app.delete("/api/departments/:id", departments.deleteOne);

//Prospect RESTFul endpoionts
app.get("/api/prospects", authenticateToken, prospects.getAll);
app.post("/api/prospects", prospects.createOne);
app.get("/api/prospects/:id", prospects.getOne);
app.put("/api/prospects/:id", prospects.updateOne);
app.delete("/api/prospects/:id", prospects.deleteOne);

//Quote RESTFul endpoionts
app.get("/api/quotes", authenticateToken, quotes.getAll);
app.post("/api/quotes", upload.any("files"), quotes.createOne);
app.get("/api/quotes/:id", quotes.getOne);
app.put("/api/quotes/:id", upload.array("files"), quotes.updateOne);
app.delete("/api/quotes/:id", quotes.deleteOne);

//User RESTFul endpoionts
app.get("/api/users", users.getAll);
app.post("/api/users", users.createOne);
app.get("/api/users/:id", users.getOne);
app.put("/api/users/:id", users.updateOne);
app.delete("/api/users/:id", users.deleteOne);

// static front end
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
};