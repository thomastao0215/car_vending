var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var bodyParser = require("body-parser");
var result = []
server.listen(8080);
// WARNING: app.listen(80) will NOT work here!
var socket
io.on('connection', function (socketX) {
  socket = socketX
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/outstock',function(req,res){

  var products = req.body.products
  console.log(products)
  for (var i=0;i<products.length;i++){
    for (var j=0;j<products[i].count;j++ ){
      socket.emit('command', { command: products[i].command });
      socket.on('result', function (data) {
        result.push(data)
      });
    }
  }

  res.json({data:{result:result}})

})
