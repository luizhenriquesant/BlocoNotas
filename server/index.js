const { onRequest } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');
const Fastify = require('fastify');
const messageRoutes = require('./routes/messages.routes');

setGlobalOptions({ region: 'southamerica-east1' });

const app = Fastify({ logger: true });

app.register(require('@fastify/formbody'));
app.register(require('@fastify/cors'), {
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS']
});
app.addContentTypeParser('application/json', {}, (req, payload, done) => {
    req.rawBody = payload.rawBody;
    done(null, payload.body);
});
app.register(messageRoutes, { prefix: '/api' });

exports.api = onRequest({ memory: '256MiB' }, (req, res) => {
  app.ready(err => {
    if (err) throw err;
    app.server.emit('request', req, res);
  });
});