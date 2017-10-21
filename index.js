var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var userNum = 0;

io.on('connection', function(socket){
  var addedUser = false;
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('get user', function(username){
    if (addedUser) {
      io.emit('added user', username);
      return;
    }
    if (username.trim() === "") username="Anonymous";
    socket.username = username;
    ++userNum;
    addedUser = true;
    io.emit('get user', username);
    io.emit('added user', username);
  });
  socket.on('chat message', function(msg){
    console.log(socket.username + ': ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});