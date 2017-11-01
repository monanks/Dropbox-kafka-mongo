var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var fs = require('fs');
const datetime = require('date-time');

function handle_request(msg, callback){

	//console.log(Buffer.from(msg.file.data.data));

	var userid = msg.userid;
	var curdir = msg.curdir;
	var ufile = msg.file;

	
	mongo.connect(mongoURL,function(){
		console.log('connected to mongo');
    	var coll = mongo.collection('files');
        var coll1 = mongo.collection('activity');

    	var data = {
    		name: ufile.name,
    		datetimeCreated: datetime(),
    		shared: '0',
            filetype: '0',
            star: '0',
    		ownerid: userid,
    		parentid: curdir
            //content:ufile.data.data
    	}

    	//console.log(data);

    	coll.insertOne(data,function(err,file){
    		if(err) throw err;
    		console.log(file.ops[0]._id);
            var fileid = file.ops[0]._id;

            var dir = './storage/'+userid+'/'+fileid;

            var path = dir +'/'+ufile.name ;
			if (!fs.existsSync(dir)){
			    fs.mkdirSync(dir);
			}
			
            fs.writeFile(path,Buffer.from(msg.file.data.data),function(err){
            	if(err){
            		console.log(err);
            	}
            	else{
            		coll.updateOne({'_id':fileid},{$set:{'filepath':path}},function(err,file){
            			if(err) throw err;
                        var act = {
                            userid: userid,
                            task: 'Uploaded File',
                            name: ufile.name,
                            datetime: datetime()
                        }

                        coll1.insertOne(act,function(err,file){
                            if(err) throw err;
                                var res = {
                                status: '201',
                                message: 'FILE UPLOADED SUCCESSFULLY'
                            }
                            callback(null,res);
                        });
            		})
            	}
            });

    	});
	});

}

exports.handle_request = handle_request;