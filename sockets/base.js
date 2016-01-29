module.exports = function (io) {



io.on('connection', function(socket) {

    io.emit('hello client');

    socket.on('hello server', function(msg) {
      console.log(msg);
    });

    // A User starts a path
    socket.on( 'startPath', function( position, socketId ) {

      socket.broadcast.emit( 'startPath', position, socketId );

    });

    // A User continues a path
    socket.on( 'continuePath', function( position, socketId ) {

      socket.broadcast.emit( 'continuePath', position, socketId );

    });

    // A user ends a path
    socket.on( 'endPath', function( position, socketId ) {


      socket.broadcast.emit( 'endPath', position, socketId );

    });

});



}
