let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

var messageId = 0; //так нельзя делать

io.on('connection', function(socket) {
    console.log('Пользователь подсоединился');
    socket.on('disconnect', function() {
        console.log('Пользователь отсоединился');
    })
});

io.on('connection', function(socket) {
   socket.on('Девочки', function(message) {
       console.log('Пользователь ' + message.userName + ' написал: ' + message.message);
   })
})

io.on('connection', function(socket) {
    socket.on('Мальчики', function(message) {
        console.log('Пользователь ' + message.userName + ' написал: ' + message.message);
    })
 })

 io.on('connection', function(socket) {
     socket.on('Мальчики', function(message) {
         messageId ++;
         message.messageId = messageId;
         io.emit('Мальчики', message)
     })
 })

 io.on('connection', function(socket) {
    socket.on('Девочки', function(message) {
        messageId ++;
        message.messageId = messageId;
        console.log('-----------------')
        io.emit('Девочки', message)
    })
})


http.listen(3001, function(){
    console.log('Сервер запущен');
  });