const inputField = document.getElementById('message-box');
const sendingButton = document.getElementById('send-btn');
const messageList = document.getElementById('messages');

const ws = new WebSocket('ws://localhost:3000');

ws.addEventListener('open', () => {
    console.log('A new connection is established');
});

ws.addEventListener('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = data;
    messageList.appendChild(messageElement);
});

ws.addEventListener('close', () => {
    console.log('Websocket connection closed');
});

sendingButton.addEventListener('click', (e) => {
    e.preventDefault();
    ws.send(inputField.value);
    inputField.value = '';
});
