const messageController = require('../controllers/message/message.controller');

function messageRoutes(fastify) {
  fastify.get('/message', messageController.getAllMessages);
  fastify.post('/message', messageController.postMessage);
}

module.exports = messageRoutes;