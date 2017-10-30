var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";
var fs = require('fs');

function handle_request(msg,callback) {
	var userid = msg.userid;
	var curdir = msg.curdir;

	mongo.connect(mongoURL,function(){

		var coll = mongo.collection('files');
		var mysort = { filetype: -1, datetimeCreated: -1};
		coll.find({ownerid:userid,parentid:curdir}).sort(mysort).toArray(function(err,files){
			if (err) throw err;
			//console.log(files);

			var arr = files.map(function(obj){
				return {
					fileid: obj._id,
					filename: obj.name,
					filetype: obj.filetype,
					datetime: obj.datetimeCreated,
					path: obj.filepath,
					parentid: obj.parentid
				}
			});

			let res = {
				status:'201',
				data: arr
			}

			//console.log(res);

			callback(null,res);
		});

	});
}

exports.handle_request = handle_request;