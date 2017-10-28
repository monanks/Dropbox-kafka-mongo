var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var kafka = require('./routes/kafka/client');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);

app.post('/signout', function(req,res) {
    console.log(req.session.userid);
    req.session.destroy();
    console.log('Session Destroyed');
    res.json({status:'201'});
});

app.post('/signin', function(req, res) {
    console.log('hello from'+req.body.username);
    passport.authenticate('login', function(err, data) {
        if(err) {
            res.status(500).send();
        }
        else{
            console.log(data);
            if(data.status==='201'){
                req.session.userid = data.id;
                console.log(req.session.userid+' '+data.id);
                console.log("session initilized");
                res.json(data);
            }
            else{
                res.json(data);
            }
            
        }      
    })(req, res);
});

app.post('/signup', function(req,res){
    console.log(' the other side'+req.body.email+req.body.firstname+req.body.lastname+req.body.password);

    var payload = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };

    kafka.make_request('signup_topic',payload, function(err,data){
            console.log(data.status);
            console.log(data);
            if(err){
                res.json(err);
            }
            else
            {
                res.json(data);
            }
        });
});

module.exports = app;
