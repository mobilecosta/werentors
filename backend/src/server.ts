import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
    origin: '*',
});

const port = 3000
const host = '0.0.0.0'

fastify.get('/', (request, reply) => {
    reply.send({ test: 'test' })
})

fastify.listen({
    port,
    host,
}).then(() => {console.log(`Server is running at port ${port}`)})
