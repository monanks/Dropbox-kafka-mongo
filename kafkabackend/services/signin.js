var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg, callback){

    console.log("In handle request: "+ JSON.stringify(msg));

    mongo.connect(mongoURL,function(){
        console.log('connected to mongo');
        var coll = mongo.collection('user');

        coll.findOne({email: msg.email}, function(err, user){
            if(err){
                callback(err,null);
            }
            else{
                if (!user) {
                    console.log('ACCOUNT DOES NOT EXISTS');
                    var res = {
                        status:'203',
                        message:'ACCOUNT DOES NOT EXISTS'
                    };
                    callback(null,res);
                } else {
                    if(user.password===msg.password){
                        var res = {
                            status: '201',
                            email: user.email,
                            id: user._id,
                            firstname: user.firstname,
                            curdir: '0',
                            parentdir:'-1'
                        }
                        callback(null,res);
                    }
                    else{
                        var res = {
                            status: '202',
                            message: 'WRONG PASSWORD'
                        }
                        callback(null,res);
                    }      
                }
            }
            
        });
    });

}

exports.handle_request = handle_request;