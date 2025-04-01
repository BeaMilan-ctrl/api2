import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../userscase/contact.usecase";
import { ContactCreate } from "../interfaces/contacs.interface";
import { authMiddleware } from "../middlewares/auth.middlewares";

  export async function contactsRoutes (fastify: FastifyInstance){
  const contactUseCase = new ContactUseCase ();
  fastify.addHook('preHandler', authMiddleware );

  fastify.post<{ Body:ContactCreate }>('/', async (req, reply)=> {
    const { name, email, phone } = req.body;
    const emailUser = req.headers['email'];
    try{
     const data = await contactUseCase.create ({
       email: req.body.email,
       name, 
       phone, 
       userEmail: emailUser });
     return reply.send(data);
    } catch (error) {
       reply.send(error);
   }
 }); 
 fastify.get('/', async( req, reply)=> {
  const emailUser = req.headers['email'];
  try {
    const data = await contactUseCase.listAllContacts(emailUser);
    return reply.send(data);
  } catch (error) {
    reply.send(error);
  }
 });
  fastify.put<{ Body: ContactCreate, Params: {id: string}}> (
    '/:id', 
    async(req, reply) => {
  const {id } = req.params
  const {name, email, phone } = req.body;
  try{
      const data = await contactUseCase.updateContact({
        id, 
        name,
        email,
        phone,
      });
      return reply.send(data);
  } catch (error){
     reply.send(error)
  }
 })
 fastify.delete<{ Params: {id: string}}>('/:id', async (req, reply)=>{
  const { id } = req.params;
    try {
      const data = await contactUseCase.delete(id)
      return reply.send(data)
    } catch (error){
      reply.send (error)
    }
 } );
}
