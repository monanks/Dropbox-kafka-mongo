var connection =  new require('./kafka/Connection');
var signin = require('./services/signin');
var signup = require('./services/signup');
var upload = require('./services/upload');

var producer = connection.getProducer();

var topic_name = 'signin_topic';
var consumer = connection.getConsumer(topic_name);


console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received at '+topic_name);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    signin.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_name1 = 'signup_topic';
var consumer1 = connection.getConsumer(topic_name1);

console.log('server1 is running');
consumer1.on('message', function (message) {
    console.log('\nmessage received at '+topic_name1);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    signup.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_name2 = 'upload_topic';
var consumer2 = connection.getConsumer(topic_name2);

console.log('server2 is running');
consumer2.on('message', function (message) {
    console.log('\nmessage received at '+topic_name2);
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    upload.handle_request(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});


