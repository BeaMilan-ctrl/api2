import fastify, { FastifyInstance } from "fastify"
import {userRoutes} from './routes/users.routes'
import {contactsRoutes} from './routes/contacts.routes'

const app = fastify();

app.register(userRoutes, {
  prefix: '/users',
});
app.register(contactsRoutes, {
  prefix: '/contacts',
});

app.listen({ port: 3100 }, () => {
console.log ('Server is running on port 3100');
}); 
