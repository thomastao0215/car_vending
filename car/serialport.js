const SerialPort = require('serialport');
var socket = require('socket.io-client')('http://localhost:8080');
SerialPort.list().then( ports => {
    // 假设选择第一个串口实例化
    let path = ports[0].comName;
    console.log(path)
    let myPort = new SerialPort(path,
    {
      baudRate: 19200
    })



    socket.on('command', function (res) {
     console.log(res);
       if (res.command !== null){
         myPort.write(res.command, function(err) {
           if (err) {
             return console.log('Error on write: ', err.message)
           }
         })

         myPort.on('data',function(res){
           var resultx  =res.toString()
            console.log(resultx)
           socket.emit('result', { result: resultx })
         })

       }
     })








})
.catch(err => console.log(err))
