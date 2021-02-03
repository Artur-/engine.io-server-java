var helpers = require('./helpers');
var getStdin = require('get-stdin');
var parser = require('engine.io-parser');

var stdout = process.stdout;

getStdin.buffer().then(function (stdin) {
    var inputMessages = JSON.parse(stdin);
    var packets = [];
    for (var i = 0; i < inputMessages.length; i++) {
        packets.push({ type: 'message', data: helpers.toArrayBuffer(inputMessages[i]) });
    }

    parser.encodePayload(packets, function (encodedValue) {
        stdout.write(encodedValue);
    });
});
