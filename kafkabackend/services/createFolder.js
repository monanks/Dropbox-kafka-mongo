var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var fs = require('fs');
const datetime = require('date-time');

function handle_request(msg, callback){

	//console.log(Buffer.from(msg.file.data.data));

	var userid = msg.userid;
	var curdir = msg.curdir;
	var foldername = msg.foldername;

	
	mongo.connect(mongoURL,function(){
		console.log('connected to mongo');
    	var coll = mongo.collection('files');
        var coll1 = mongo.collection('activity');

    	var data = {
    		name: foldername,
    		datetimeCreated: datetime(),
    		shared: '0',
            filetype: '1',
    		ownerid: userid,
    		parentid: curdir,
            star: '0'
    	}

    	console.log(data);

    	coll.insertOne(data,function(err,file){
    		if(err) throw err;
    		console.log(file.ops[0]._id);

            var act = {
                userid: userid,
                task: 'Created Folder',
                name: foldername,
                datetime: datetime()
            }

            coll1.insertOne(act,function(err,file){
                if(err) throw err;
                var res = {
                    status: '201',
                    message: 'FOLDER CREATED SUCCESSFULLY'
                }
                callback(null,res);
            });
    	});
	});

}

exports.handle_request = handle_request;