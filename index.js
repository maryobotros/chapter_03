// '/dev/tty.usbmodem14101'
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  delimiter: '\r\n'
});

var serialport = new SerialPort('/dev/tty.usbmodem14101',{ 
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

serialport.pipe(parser);

app.engine('ejs', require('ejs').__express);
    app.set('view engine', 'ejs');
    app.get('/', function (req, res){
        res.render('index');
    });
    serialport.on('open', function(){
        console.log('serial port opened');
    });
    io.on('connection', function(socket){
        console.log('socket.io connection');
        serialport.on('data', function(data){
            data = data.toString().trim();
            socket.emit('data', data);
        });
        socket.on('disconnect', function(){
            console.log('disconnected');
}); });
    server.listen(3000, function(){
        console.log('listening on port 3000...');
});

