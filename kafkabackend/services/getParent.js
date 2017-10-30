var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
const {ObjectId} = require('mongodb');

function handle_request(msg, callback){

	//console.log(Buffer.from(msg.file.data.data));

	var dir = msg.dir;
	
	mongo.connect(mongoURL,function(){
		console.log('connected to mongo');
    	var coll = mongo.collection('files');

    	coll.findOne({_id:ObjectId(dir)},function(err,result){
            if (err) throw err;
            var res = {
                status: '201',
                dir: result.parentid
            }
            callback(null,res);
        })
	});

}

exports.handle_request = handle_request;