var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
const {ObjectId} = require('mongodb');
const datetime = require('date-time');

function handle_request(msg, callback){

	//console.log(Buffer.from(msg.file.data.data));
    console.log(msg);

	var fileid = msg.fileid;
    var emailshare = msg.emailshare;
    var userid = msg.userid;
    var filetype = msg.filetype;
    var filename = msg.filename;
    var filepath = msg.filepath;
	
	mongo.connect(mongoURL,function(){
        var coll = mongo.collection('share');

        coll.findOne({fileid:fileid,emailshare:emailshare},function(err,user){
            if (err) throw err;

            if(user){
                var res = {
                    status: '202',
                    message: 'Already Shared With '+emailshare
                }
                callback(null,res);
            }
            if(!user){
                var data = {
                    fileid:fileid,
                    filename: filename,
                    userid:userid,
                    filetype: filetype,
                    filepath: filepath,
                    emailshare:emailshare,
                    datetime: datetime(),
                    star:'0'
                }
                coll.insertOne(data,function(err,file){
                    if(err) throw err;
                    var res = {
                            status: '201',
                            message: 'Shared Successfully With '+emailshare
                        }
                    console.log(res);
                    callback(null,res);
                });
            }

        });   
    });
}

exports.handle_request = handle_request;