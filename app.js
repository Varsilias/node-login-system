const express = require('express');
const path = require('path');
var exphbs  = require('express-handlebars'); // Express handlebars module
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const app = express();  // initialize app
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json())  // parse application/json
app.use(express.static(path.join(__dirname, 'public'))) //Serves static files (we need it to import a css file)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// Database connections
mongoose.connect('mongodb://localhost/loginsystem');
let db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
});

// Check for DB connection success
db.once('open',() => {
    console.log('Connected to MongoDB');
});


// Model References
const User = require('./models/User');

// Define routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Now'
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Welcome back - Login'
    })
})

app.post('/register', (req, res) => {
    let user = new User
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    secondPassword = req.body.confirmPassword;
    if (secondPassword !== user.password) {
        res.redirect('/register', {
            msg: 'Passwords do not match'
        })
    } else {
        user.save((error) => {
            if(error){
                console.log(error);
                return;
            } else {
                res.redirect('/', {
                    msg: 'You are registered successfully'
                });
            }
        })
    }
    
})

app.post('/login', (req, res) => {
    let useremail = req.body.email;
    let userPassword = req.body.password;
    User.find(() =>{
        if (useremail !== email && userPassword !== password ) {
            res.redirect('/login', {
                msg: 'Unauthorized User'
            })
        } else {
            
        }
    })
})

app.listen(port, function() {
    console.log(`Server started on port ${port}`)
})
