var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var fs = require('fs');
const datetime = require('date-time');

function handle_request(msg, callback){

	//console.log(Buffer.from(msg.file.data.data));

	var fileid = msg.fileid;
	var filepath = msg.filepath;
    var filetype = msg.filetype;

    console.log(fileid);
    console.log(filepath);
    console.log(filetype);

    if(filetype==='0'){
        deleteFile(filepath);
    }
    else if(filetype==='1'){
        deleteFolder(fileid);
    }
    
    var res = {
        status: '201'
    };
    callback(null,res);
}

function deleteFile(filepath){
    mongo.connect(mongoURL,function(){
        var coll = mongo.collection('files');
        coll.deleteOne({filepath:filepath},function(err,result){
            if (err) throw err;
            var dir = filepath.split('/');
            var a = dir.splice(-1);
            var d = dir.join('/');
            console.log(d);
            fs.unlinkSync(filepath);
            fs.rmdirSync(d);
        })
    });
}

function deleteFolder(fileid){
    mongo.connect(mongoURL,function(){

        var coll = mongo.collection('files');
        coll.find({parentid:fileid}).toArray(function(err,files){
            if (err) throw err;
            console.log(files);

            

        });

    });
}

exports.handle_request = handle_request;