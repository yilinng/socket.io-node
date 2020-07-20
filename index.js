const express = require('express');
const socket = require('socket.io');

//App setup
const app = express();
const server = app.listen(3000, () => {
	console.log('listening for request on port 3000!');

});

//static files
app.use(express.static('public'));

//Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    //Handle chat event
    socket.on('chat', (data) => {
    	//console.log(data);
  	io.sockets.emit('chat', data);    
});

    //Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});