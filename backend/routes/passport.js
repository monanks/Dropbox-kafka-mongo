var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in passport');
        kafka.make_request('signin_topic',{"email":username,"password":password}, function(err,data){
            console.log('in result');
            console.log(data);
            if(err){
                done(err,{});
            }
            else
            {
                done(null,data);
            }
        });
    }));
};


