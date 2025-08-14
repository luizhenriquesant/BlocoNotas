const Fastify = require('fastify');
const cors = require('@fastify/cors');
const messageRoutes = require('./routes/messages.routes.js');

require('dotenv').config();

const fastify = Fastify({ logger: true });

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

fastify.register(messageRoutes);

const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();