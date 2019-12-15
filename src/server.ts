import http = require('http');
import app from './app';

const port = +process.env.PORT || 7777;
const server = http.createServer(app);

server.listen(port, '0.0.0.0');
