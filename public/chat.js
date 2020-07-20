//Make connection
const socket = io.connect('http://localhost:3000');

//Query DOM
let message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

//Emit events
btn.addEventListener('click', () => {
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	});
	message.value = "";
});

message.addEventListener('keydown', () => {
	socket.emit('typing', handle.value);
})

//Listen for events
socket.on('chat', (data) => {
	feedback.innerHTML = '';
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>'  + data.message +new Date().toLocaleString(); +'</p>';
});	

socket.on('typing', (data) => {
feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});