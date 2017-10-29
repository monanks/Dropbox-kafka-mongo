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
const fileUpload = require('express-fileupload');

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
app.use(fileUpload());

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

app.post('/doupload', function(req,res){
    //console.log(req.files.file);
    

    if(!req.files){
        res.json({status:'202',message:'FILE NOT UPLOADED'});
    }

    var payload = {
        userid: req.body.userid,
        curdir: req.body.curdir,
        file: req.files.file
    }

    kafka.make_request('upload_topic',payload,function(err,data){
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
    //console.log(req.body.curdir+'curdir');
    // console.log(req.body.userid+'userid');
    // console.log(JSON.stringify(req.files.file)+'file');

    // let samplefile = req.files.file;

    // console.log(samplefile.mv);

    // samplefile.mv('./hello.jpg',function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log('hello');
    //     }
    // });
    //res.json();
});

app.post('/getFiles',function(req,res){

    var payload = {
        userid: req.body.userid,
        curdir: req.body.curdir
    };
    console.log(payload);

    kafka.make_request('list_topic',payload,function(err,data){
        console.log(data.status);
        if(err){
            res.json(err);
        }
        else{
            res.json(data);
        }
    });
});

app.post('/dlFile',function(req,res){

    var payload = {
        fileid: req.body.fileid,
        filepath: req.body.filepath
    };
    console.log(payload);

    kafka.make_request('download_topic',payload,function(err,data){
        console.log(Buffer.from(data.data.data));
        if(err){
            res.json(err);
        }
        else{
            res.json(data);
        }
    });
});

module.exports = app;
