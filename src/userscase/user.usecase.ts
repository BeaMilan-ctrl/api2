import { UserRepositoryPrisma } from "../interfaces/repositories/user.repository";
import {  User, UserCreate, UserRepository } from "../interfaces/users.interfaces";

class UserUseCase {
   private userRepository: UserRepository
  constructor (){
    this.userRepository = new UserRepositoryPrisma()
  }

  async create({name, email}: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);
    if (verifyIfUserExists){
      throw new Error ('User already exists');
    }
    const result = await this.userRepository.create({email, name });

    return result;
  }
}

export {UserUseCase };