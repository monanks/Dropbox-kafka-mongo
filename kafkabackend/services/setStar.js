var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
const {ObjectId} = require('mongodb');

function handle_request(msg, callback){

	//console.log(Buffer.from(msg.file.data.data));
    console.log(msg);

	var fileid = msg.fileid;
    var star = msg.star;
	
	mongo.connect(mongoURL,function(){
        var coll = mongo.collection('files');
        coll.updateOne({'_id':ObjectId(fileid)},{$set:{'star':star}},function(err,file){
            if(err) throw err;
            if(file){
                var res = {
                    status: '201',
                }
            }
            else{
                var res = {
                    status: '202',
                }
            }
            console.log(res);
            callback(null,res);
        });
    });

}

exports.handle_request = handle_request;