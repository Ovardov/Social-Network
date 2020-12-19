import models from '../models'

export const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`New connection ${socket.id}`);

    socket.on('join', (room) => {
      io.in(room).clients((err, clients) => {
        if (clients.length < 2) {
          socket.join(room);
        }
      })
    })

    socket.on('message', async ({ message, room, sender }) => {
      try {
        const createdMessage = await models.Message.create({ sender, message });
        await models.Conversation.updateOne(
          { room },
          { $push: { messages: createdMessage._id } },
          { upsert: true }
        );

        socket.to(room).emit('chat', message);
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
