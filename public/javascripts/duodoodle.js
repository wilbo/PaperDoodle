// $(document).ready(function() {
//
//
//
//
//
//
// });

var socket = io();
var socketId;


// hello/goodbye to get the socket id

socket.on('hello client', function() {

  socketId = socket.id;
  console.log('Hello client: ' + socketId);
  socket.emit('hello server', 'hello server!');

})





// our paths
paths = {};


// this socket draws

function onMouseDown(event) {

  startPath(event.point, socketId);
  socket.emit("startPath", event.point, socketId);

}

function onMouseDrag(event) {

  continuePath(event.point, socketId);
  socket.emit("continuePath", event.point, socketId);

}

function onMouseUp(event) {

  endPath(event.point, socketId);
  socket.emit("endPath", event.point, socketId);

}




// drawing functions

function startPath(position, socketId) {

  paths[socketId] = new Path();
	paths[socketId].strokeColor = 'rgba(255,0,0,0.75)';
	// Add the mouse down position:
	paths[socketId].add(position);
  paths[socketId].strokeWidth = 10;
  paths[socketId].strokeCap = 'round';
  paths[socketId].strokeJoin = 'round';

}

function continuePath(position, socketId) {

  paths[socketId].add(position);

}

function endPath(position, socketId) {

  paths[socketId].add(position);
  paths[socketId].smooth();
  delete paths[socketId]

}


// 'other' sockets drawing

socket.on('startPath', function(position, socketId) {

  var newPos = {
    x: position[1],
    y: position[2]
  }


  startPath(newPos, socketId);

})


socket.on('continuePath', function(position, socketId) {

  var newPos = {
    x: position[1],
    y: position[2]
  }

  continuePath(newPos, socketId);
  view.draw();

})


socket.on('endPath', function(position, socketId) {

  var newPos = {
    x: position[1],
    y: position[2]
  }

  endPath(newPos, socketId);
  view.draw();

})
