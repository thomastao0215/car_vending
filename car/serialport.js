const SerialPort = require('serialport');
var socket = require('socket.io-client')('http://localhost:8080');
var command
SerialPort.list().then( ports => {
    // 假设选择第一个串口实例化
    let path = ports[0].comName;
    console.log(path)
    let myPort = new SerialPort(path,
    {
      baudRate: 19200
    })

    socket.on('command', function (command) {
     console.log(command);
      if (command){

        myPort.write(command, function(err) {
          if (err) {
            return console.log('Error on write: ', err.message)
          }
        })

        myPort.on('data',function(res){
          var resultx  =res.toString()
          socket.emit('result', { result: resultx });

        })

        // socket.emit('result', { result: command });

      }


    });




})
.catch(err => console.log(err))
