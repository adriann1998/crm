// Import middleware
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Import router callback functions
const accounts = require("./routers/account");
const contacts = require("./routers/contact");
const departments = require("./routers/department");
const prospects = require("./routers/prospect");
const quotes = require("./routers/quote");
const users = require("./routers/user");
import login from "./routers/login";
const cors = require("cors");

const app = express();
app.listen(8080, () => {console.log("Server is running at port 8080")});
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/CRM",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
  function (err) {
    if (err) {
      return console.log("Mongoose - connection error:", err);
    }
    console.log("Connected to database Successfully");
  }
);

/* ----------------------------------
Endpoints Configuration
---------------------------------- */

// Login ednpoint
app.post("/login", login);

//Account RESTFul endpoionts
app.get("/accounts", accounts.getAll);
app.post("/accounts", accounts.createOne);
app.get("/accounts/:id", accounts.getOne);
app.put("/accounts/:id", accounts.updateOne);
app.delete("/accounts/:id", accounts.deleteOne);

//Contact RESTFul endpoionts
app.get("/contacts", contacts.getAll);
app.post("/contacts", contacts.createOne);
app.get("/contacts/:id", contacts.getOne);
app.put("/contacts/:id", contacts.updateOne);
app.delete("/contacts/:id", contacts.deleteOne);

//Department RESTFul endpoionts
app.get("/departments", departments.getAll);
app.post("/departments", departments.createOne);
app.get("/departments/:id", departments.getOne);
app.put("/departments/:id", departments.updateOne);
app.delete("/departments/:id", departments.deleteOne);

//Prospect RESTFul endpoionts
app.get("/prospects", prospects.getAll);
app.post("/prospects", prospects.createOne);
app.get("/prospects/:id", prospects.getOne);
app.put("/prospects/:id", prospects.updateOne);
app.delete("/prospects/:id", prospects.deleteOne);

//Quote RESTFul endpoionts
app.get("/quotes", quotes.getAll);
app.post("/quotes", quotes.createOne);
app.get("/quotes/:id", quotes.getOne);
app.put("/quotes/:id", quotes.updateOne);
app.delete("/quotes/:id", quotes.deleteOne);

//User RESTFul endpoionts
app.get("/users", users.getAll);
app.post("/users", users.createOne);
app.get("/users/:id", users.getOne);
app.put("/users/:id", users.updateOne);
app.delete("/users/:id", users.deleteOne);
