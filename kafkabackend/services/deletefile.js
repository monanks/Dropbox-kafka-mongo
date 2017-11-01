var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var fs = require('fs');
const datetime = require('date-time');
const {ObjectId} = require('mongodb');

function handle_request(msg, callback){

	//console.log(Buffer.from(msg.file.data.data));

	var fileid = msg.fileid;
	var filepath = msg.filepath;
    var filetype = msg.filetype;
    var userid = msg.userid;

    console.log(fileid);
    console.log(filepath);
    console.log(filetype);

    if(filetype==='0'){
        deleteFile(filepath,userid);
    }
    else if(filetype==='1'){
         var temp = deleteFolder(fileid,userid);
    }
    
    var res = {
        status: '201'
    };
    callback(null,res);
}

function deleteFile(filepath,userid){
    mongo.connect(mongoURL,function(){
        var coll = mongo.collection('files');
        var coll1 = mongo.collection('activity');

        coll.findOne({filepath:filepath},function(err,result){
            console.log(result);
            var filename = result.name;

            coll.deleteOne({filepath:filepath},function(err,result){
                if (err) throw err;
                var dir = filepath.split('/');
                var a = dir.splice(-1);
                var d = dir.join('/');
                console.log(d);
                fs.unlinkSync(filepath);
                fs.rmdirSync(d);

                var act = {
                    userid: userid,
                    task: 'Deleted File',
                    name: filename,
                    datetime: datetime()
                }

                coll1.insertOne(act,function(err,file){            
                    if(err) throw err;
                });
                return 1;
            });

        });

    });
}

function deleteFolder(fileid,userid){
    mongo.connect(mongoURL,function(){
        var coll = mongo.collection('files');
        var coll1 = mongo.collection('activity');

        coll.findOne({_id:ObjectId(fileid)},function(err,result){
            var filename = result.name;

            coll.find({parentid:fileid}).toArray(function(err,files){
                if (err) throw err;
                console.log(files);
                for(var i=0;i<files.length;i++){
                    if(files[0].filetype==='0'){
                        deleteFile(files[0].filepath,userid);
                    }
                    else{
                        deleteFolder(files[0]._id,userid);
                    }
                }

                coll.deleteOne({_id:ObjectId(fileid)},function(err,result){

                })
                
                var act = {
                    userid: userid,
                    task: 'Deleted Folder',
                    name: filename,
                    datetime: datetime()
                }

                coll1.insertOne(act,function(err,file){            
                    if(err) throw err;
                });

            });

        });

        

    });
}

exports.handle_request = handle_request;