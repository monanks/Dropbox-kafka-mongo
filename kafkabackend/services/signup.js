var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var fs = require('fs');

function handle_request(msg, callback){

    console.log("In handle request:"+ JSON.stringify(msg));

    mongo.connect(mongoURL,function(){
    	console.log('connected to mongo');
    	var coll = mongo.collection('user');

    	coll.findOne({email: msg.email}, function(err, user){
            if (user) {
                console.log('user already exists');
                res = {
                	status:'202',
                	message:'username already exists'
                };
                callback(null,res);
            } else {
                coll.insertOne(msg,function(err,user){
                    if(err) throw err;
                    console.log(user.ops[0]._id);
                    var id = user.ops[0]._id;
                    //make directory for user to store files
                    var dir = './storage/'+id;
                    if(!fs.existsSync('./storage')){
                    	fs.mkdirSync('./storage');
                    }
					if (!fs.existsSync(dir)){
					    fs.mkdirSync(dir);
					}

                    console.log("1 document inserted"+JSON.stringify(user.ops[0]));
                    res = {
	                	status:'201',
	                	message:'Signup Successful. SignIn now'
	                };
	                callback(null,res);
                    //res.status(201).send({message:'username is available'});
                });      
            }
        });
    });
}

exports.handle_request = handle_request;