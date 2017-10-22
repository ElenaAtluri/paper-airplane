var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var THREE = require("./src/three.js");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var cubes = [];

io.on('connection', function(socket) {
  socket.on('add object', function(obj){
    console.log("creating object at " + obj.x + ", " + obj.y + ", " + obj.z + ", with color " + obj.color);
    io.sockets.emit('add object', {x:obj.x, y:obj.y, z:obj.z, color:obj.color});
  });
  socket.on('cubes', function(obj){
    cubes.push(obj);
    io.sockets.emit('cubes', cubes);
  });
});

// var userNum = 0;

// io.on('connection', function(socket){
//   var addedUser = false;
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
//   socket.on('get user', function(username){
//     if (addedUser) {
//       io.emit('added user', username);
//       return;
//     }
//     if (username.trim() === "") username="Anonymous";
//     socket.username = username;
//     ++userNum;
//     addedUser = true;
//     io.emit('get user', username);
//     io.emit('added user', username);
//   });
//   socket.on('chat message', function(msg){
//     console.log(socket.username + ': ' + msg);
//     io.emit('chat message', msg);
//   });
// });

http.listen(3000, function(){
  console.log('listening on *:3000');
});