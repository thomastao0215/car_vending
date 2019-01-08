var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var bodyParser = require("body-parser");
server.listen(8080);
// WARNING: app.listen(80) will NOT work here!
var clientX
var result
io.on('connection', function (client) {

  console.log('client connect');
  clientX = client

});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req,res,next){
    req.io = io;
    next();
});


function processData(newdata) {
  console.log(newdata);
  result = newdata
}

app.post('/nav',function(req,res){
  var command = req.body.command

  //console.log(products)
  req.io.sockets.emit('nav', { command: command });

  clientX.on('result2', function (data) {
    console.log("Received Result:",data)
    processData(data)
  })


  res.json(result)




})


app.post('/outstock',function(req,res){
  var command = req.body.command
  console.log(command)
  //console.log(products)
  req.io.sockets.emit('stock', { command: command });

  clientX.on('result', function (data) {
    console.log("Received Result:",data)
    processData(data)
  })


  res.json(result)


})

