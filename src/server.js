const { WebSocketServer } = require('ws');
const http = require('http');

const onSocketError = (err) => {
    console.error(err);
};

const httpServer = http.createServer();
const port = 3000;

const wss = new WebSocketServer({ noServer:true });
wss.on('connection', (ws, req) => {
    console.log('connected');
});

httpServer.on('upgrade', (req, socket, head) => {
    socket.on('error', onSocketError);

    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});

httpServer.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
