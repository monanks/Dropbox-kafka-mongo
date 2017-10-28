var connection =  new require('./kafka/Connection');
var signin = require('./services/signin');
var signup = require('./services/signup');

var topic_name = 'signin_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

console.log('server1 is running');
consumer.on('message', function (message) {
    console.log('message received at signin_topic');
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

console.log('server2 is running');
consumer1.on('message', function (message) {
    console.log('\nmessage received at signup_topic');
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