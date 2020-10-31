const models = require('../models');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`New connection ${socket.id}`);

    socket.on('join', (room) => {      
      io.in(room).clients((err, clients) => {        
        if(clients.length < 2) {
          socket.join(room);
        }        
      })
    })

    socket.on('message', async ({message, room}) => {
      socket.to(room).emit('chat-message', message);
    });

    socket.on('leave', (room) => {
      socket.leave(room);
    });
    
    socket.on('disconnect', () => {
      console.log(`Connection left ${socket.id}`)
    })
  });
}