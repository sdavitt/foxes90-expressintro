// access the express module
const express = require('express');
// access the path module
const path = require('path');

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
    'Frank Reynolds': {name: 'Frank Reynolds', desc: "Businessman. Founder at Frank's Fluids.", image: 'cannedwine.webp'},
    'Ongo Gablogian': {name: 'Ongo Gablogian', desc: "Esteemed art collector. Charmed, I'm sure.", image: 'ongogablogian.webp'},
    'Manspider': {name: 'Manspider', desc: "I'm a man-spider.", image: 'manspider.png'},
    'Mancheetah': {name: 'Mancheetah', desc: "I'm a man-cheetah.", image: 'mancheetah.webp'},
    'Trashman': {name: 'Trashman', desc: "I'm the trashman! I eat trash and I'll hit him with this metal trashcan.", image: 'trashman.webp'},
    'Frank in the Couch': {name: 'Frank in the Couch', desc: "There's a man in that couch!", image: 'frankinthecouch.png'}
};

// our first route - a route that accepts a get request
// runs a callback function when the route is triggered
    // req gives access to the request
    // res represents the response
app.get('/', (req, res)=>{
    //res.send('Hello, Foxes! Welcome to Express.');
    res.render('pages/index');
});

app.get('/franks', (req, res)=>{
    res.render('pages/franksfaces', {characters: characters});
})

// dynamic routing
    // we should be able to write one route that covers a set of urls
    // and potentially uses that set of urls to provide input
// method 1 - regex - a route for any url endpoint ending in reynolds
app.get('/[A-Za-z]*Cricket', (req, res) => {
    res.send('This is a member of the Reynolds family.');
});

// route-specific middleware - can provide an additional argument to app.use to cause the middleware to only run for specific urls
app.use('/frank/:character', (req, res, next) => {
    console.log('Route specific middleware has access to request parameters:\nCurrent Frank:', req.params);
    next();
});

// method 2 - variables in the url
app.get('/frank/:character', (req, res) => {
    // variables in the URL are accessible through the req.params object
    //res.send(`Which ${req.params.actor} character are we talking about? Frank in the ${req.params.character}.`);
    res.render('pages/character', characters[req.params.character]);
});

// Show my app where to find static files with middleware
app.use(express.static(path.join(__dirname, 'public')));