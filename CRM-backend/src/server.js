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
app.listen(PORT, () => {console.log(`Server is runningat port ${PORT}`)});
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'))


/* ----------------------------------
Database Configuration
---------------------------------- */
require('./database')();


/* ----------------------------------
Endpoints Configuration
---------------------------------- */

// Login ednpoint
app.post("/login", login);

//Account RESTFul endpoionts
app.get("/accounts", authenticateToken, accounts.getAll);
app.post("/accounts", accounts.createOne);
app.get("/accounts/:id", accounts.getOne);
app.put("/accounts/:id", accounts.updateOne);
app.delete("/accounts/:id", accounts.deleteOne);

//Contact RESTFul endpoionts
app.get("/contacts", authenticateToken, contacts.getAll);
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
app.get("/prospects", authenticateToken, prospects.getAll);
app.post("/prospects", prospects.createOne);
app.get("/prospects/:id", prospects.getOne);
app.put("/prospects/:id", prospects.updateOne);
app.delete("/prospects/:id", prospects.deleteOne);

//Quote RESTFul endpoionts
app.get("/quotes", authenticateToken, quotes.getAll);
app.post("/quotes", upload.any('files'), quotes.createOne);
app.get("/quotes/:id", quotes.getOne);
app.put("/quotes/:id", upload.array('files'), quotes.updateOne);
app.delete("/quotes/:id", quotes.deleteOne);

//User RESTFul endpoionts
app.get("/users", users.getAll);
app.post("/users", users.createOne);
app.get("/users/:id", users.getOne);
app.put("/users/:id", users.updateOne);
app.delete("/users/:id", users.deleteOne);

// static front end
if (process.env.NODE_ENV) {
    app.use(express.static('crm-frontend/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'crm-frontend', 'build', 'index.html'))
    })
}