import models from '../models'

export const initSocket = (io) => {
  io.on('connect', (socket) => {
    
    socket.on('join', (room) => {
      if (room) {
        const clients = io.sockets.adapter.rooms.get(room)
        const clientsInRoom = clients ? clients.size : 0;

        if (clientsInRoom < 2) {
          socket.join(room);
        }
      }
    })

    socket.on('message', async ({ message, room, sender }) => {
      try {
        const createdMessage = await models.Message.create({ sender, message });

        await models.Conversation.updateOne(
          { room },
          { $push: { messages: createdMessage._id } },
          { upsert: true }
        );

        const messageData = {
          id: createdMessage._id,
          sender: createdMessage.sender,
          message: createdMessage.message,
          createdAt: createdMessage.createdAt
        }

        io.to(room).emit('message', messageData);
      } catch (err) {
        console.log(err);
        socket.to(room).emit('error', err);
      }
    })

    socket.on('leave', (room) => {
      socket.leave(room);
    })

    socket.on('disconnect', () => {
      console.log(`Connection left ${socket.id}`);
    })
  })
}
