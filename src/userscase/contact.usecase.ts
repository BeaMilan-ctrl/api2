import {
   ContactCreate,
   ContactRepository, 
   Contact,
  } from "../interfaces/contacs.interface";
import { ContactsRepositoryPrisma } from "../interfaces/repositories/contacts.repository";
import { UserRepositoryPrisma } from "../interfaces/repositories/user.repository";
import { UserRepository } from "../interfaces/users.interfaces";

class ContactUseCase {
  private contactRepository: ContactRepository;
  private userRepository: UserRepository;
  
  constructor(){
    this.contactRepository = new ContactRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }

  async create ({ email, name, phone, userEmail} : ContactCreate) {
    //email do usuario logado
    //buscar o usuario pelo email
    //se nao existir, retornar erro
    //se existir, criar o contato
    // validar se ele ja exiate pelo telefone ou email

    const user = await this.userRepository.findByEmail(userEmail);

    if(!user){
      throw new Error('User not found');
    }

    const verifyExistsContact =  await this.contactRepository.findyByEmailOrPhone(email, phone);

    if (verifyExistsContact) {
      throw new Error('Contact already exists');
    }
     
    const contact = await this.contactRepository.create ({
      email,
      name,
      phone,
      userId: user.id,

    });
    return contact 
  }

}
 async listAllContacts( userEmail : string ){
  const user= await this.userRepository.findByEmail(userEmail);

  if(!user) {
    throw new Error('User not found');
  }

  const contacts = await this.contactRepository.findAllContacts(user.id);

  return contacts;
 }
  async updateContact({id, name, email, phone}: Contact){
    const data = await this.contactRepository.updateContact({
      id,
      name,
      email,
      phone,
    });

    return data ;
  }
    async delete(id: string ){
       const data = await this.contactRepository.delete(id);

       return data;

 }

 export { ContactUseCase };