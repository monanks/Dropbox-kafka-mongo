var mongo = require("../utils/mongo");
var mongoURL = "mongodb://localhost:27017/dropbox";

function handle_request(msg,callback) {
	var userid = msg.userid;
	var curdir = msg.curdir;

	mongo.connect(mongoURL,function(){

		var coll = mongo.collection('files');
		var coll1 = mongo.collection('star');
		var mysort = { filetype: -1, datetimeCreated: -1};
		coll.find({ownerid:userid,parentid:curdir}).sort(mysort).toArray(function(err,files){
			if (err) throw err;
			//console.log(files);

			var arr = files.map(function(obj){
				//console.log(getStar(userid,obj._id));
				let a = 1;
				var temp = {
					fileid: obj._id,
					filename: obj.name,
					filetype: obj.filetype,
					datetime: obj.datetimeCreated,
					path: obj.filepath,
					parentid: obj.parentid,
					star: obj.star
				}
				return temp;
				
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