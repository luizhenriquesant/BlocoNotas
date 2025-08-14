const {postMessage, getAllMessages} =  require('../controllers/message/message.controller.js');

function messageRoutes(fastify) {
    fastify.post('/message', postMessage);
    fastify.get('/message', getAllMessages);
}

module.exports = messageRoutes;
