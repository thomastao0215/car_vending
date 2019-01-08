var socket = require('socket.io-client')('http://129.28.117.167:8080/');
//var socket = require('socket.io-client')('http://localhost:8080/');
const request = require('request');
    socket.emit('setCar',{"carId":"001"})
    socket.on('stock', function (res) {
     console.log(res);
       if (res.command !== null){
          request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     'http://localhost:8081/',
            body:    "navcmd=&outcmd="+res.command
          }, function(error, response, body){
            var body = JSON.parse(body)
            if (body !== undefined){
              socket.emit('result', { result: body.Retout })
            }else socket.emit('result', { result: "inner error" })
            
          });

       }
     })



    socket.on('nav', function (res) {
     console.log(res);
       if (res.command !== null){
         request.post({
           headers: {'content-type' : 'application/x-www-form-urlencoded'},
           url:     'http://localhost:8081/',
           body:    "navcmd="+res.command+"&outcmd="
         }, function(error, response, body){
          var body = JSON.parse(body)
                      if (body !== undefined){
              socket.emit('result2', { result: body.Retnav })
            }else socket.emit('result2', { result: "inner error" })
           
         });

       }
     })
