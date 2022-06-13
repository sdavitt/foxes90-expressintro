// access the express module
const express = require('express');

// create our instance of an express app
const app = express();
const port = 3000;
// tell the app what port it should listen for requests on
app.listen(port, ()=>{
    console.log(`Hello Foxes! This app is listening on port: ${port}`);
});
// set up templating engine aka the view engine
app.set('view engine', 'ejs');


// middleware - do stuff in the middle of the process of the request/response
    // middleware should run after the request is received, before the callback for the request runs
// this is app-level middleware - it should run for every single route on this application
app.use((req, res, next)=>{
    console.log(`Request received at: ${Date()}`);
    next();
});

const characters = {
    normal: 'Frank Reynolds',
    art: 'Ongo Gablogian',
    work: 'The Warthog'
};

// our first route - a route that accepts a get request
// runs a callback function when the route is triggered
    // req gives access to the request
    // res represents the response
app.get('/', (req, res)=>{
    //res.send('Hello, Foxes! Welcome to Express.');
    res.render('pages/index', characters);
});

// dynamic routing
    // we should be able to write one route that covers a set of urls
    // and potentially uses that set of urls to provide input
// method 1 - regex - a route for any url endpoint ending in reynolds
app.get('/[A-Za-z]*reynolds', (req, res) => {
    res.send('This is a member of the Reynolds family.');
});

// route-specific middleware - can provide an additional argument to app.use to cause the middleware to only run for specific urls
app.use('/:actor/frank/:character', (req, res, next) => {
    console.log('Route specific middleware has access to request parameters:', req.params);
    next();
});

// method 2 - variables in the url
app.get('/:actor/frank/:character', (req, res) => {
    // variables in the URL are accessible through the req.params object
    //res.send(`Which ${req.params.actor} character are we talking about? Frank in the ${req.params.character}.`);
    res.render('pages/character', req.params);
});
