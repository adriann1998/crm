const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const accounts = require('./routers/account');
const contacts = require('./routers/contact');
const departments = require('./routers/department');
const opportunities = require('./routers/opportunity');
const users = require('./routers/user');

const app = express();
app.listen(8080);
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/CRM', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});

//Configuring Endpoints
//Account RESTFul endpoionts 
app.get('/accounts', accounts.getAll);
app.post('/accounts', accounts.createOne);
app.get('/accounts/:id', accounts.getOne);
app.put('/accounts/:id', accounts.updateOne);
app.delete('/accounts/:id', accounts.deleteOne);

//Contact RESTFul endpoints
// app.get('/contacts', movies.getAll);
// app.get('/movies/:id', movies.getOne);
// app.get('/movies/:year1/:year2', movies.getAllYearsBetween);
// app.post('/movies', movies.createOne);
// app.post('/movies/:movieid/actors', movies.addActor);
// app.put('/movies/:id', movies.updateOne);
// app.delete('/movies/:id', movies.deleteOne);
// app.delete('/movies/:movieid/:actorid', movies.deleteActorFromMovie);
// app.delete('/movies/', movies.deleteYearsBetween);