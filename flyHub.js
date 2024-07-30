#!/usr/bin/env node
/**
 * @author doodlewind
 * @licence MIT
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var ua = require('useragent');

var port = process.argv.length > 2 ? parseInt(process.argv[2]) : 3000;
var app = http.createServer(httpHandler).listen(port);
var io = require('socket.io')(app);

function broadcastLog(request, response) {
  var reqStream = "";
  var logData = {};

  if(request.method == 'POST') {
    request.on('data', function(data) {
      reqStream += data;
    });
    request.on('end', function() {
      logData = JSON.parse(reqStream);
      logData.data.ua = ua.parse(request.headers['user-agent']).toString();
      logData.data.ip = request.connection.remoteAddress;
      io.emit(logData.type, logData.data);
    });
  }

  response.writeHead(200);
  response.end();
}

function serveAdmin(request, response) {
  var filePath = '.' + request.url;
  if (filePath == './') filePath = './index.html';

  var extName = path.extname(filePath);
  var contentType = 'text/html';
  switch (extName) {
    case '.js':
      contentType = 'text/javascript'; break;
    case '.css':
      contentType = 'text/css'; break;
    case '.json':
      contentType = 'application/json'; break;
    case '.png':
      contentType = 'image/png'; break;
    case '.jpg':
      contentType = 'image/jpg'; break;
  }

  fs.readFile(path.join(__dirname, filePath), function(error, content) {
    if (error) {
      if(error.code == 'ENOENT'){
        response.writeHead(200, { 'Content-Type': contentType });
        response.end('404 not found');
        response.end();
      }
      else {
        response.writeHead(500);
        response.end('500 Internal Error');
        response.end();
      }
    }
    else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
}

function httpHandler(request, response) {
  // support preflight cross-site OPTION request
    if (path.normalize(decodeURI(request.url)) !== decodeURI(request.url)) {
        response.statusCode = 403;
        response.end();
        return;
    }
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Request-Method', '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return;
  }

  // route requests to handlers
  if (request.url === '/log') {
    broadcastLog(request, response);
  } else {
    serveAdmin(request, response);
  }
}

console.log('flyHub starts at port', port);
