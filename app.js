var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

function sendSync(port, src) {
    return new Promise((resolve, reject) => {
        port.write(src);
        port.once('data', (data) => {
            resolve(data.toString());
        });

        port.once('error', (err) => {
            reject(err);
        });
    });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

var SerialPort = require("serialport")
var port = new SerialPort("/COM4", {
  baudRate: 11200
}); 

sendSync(port, 'STAT\n').then((data) => {
    //receive data
  console.log(data)
});



