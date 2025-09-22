import { HttpError } from "../errors/HttpError";
import { CreateUserAttributes, IUserRepositorie } from "../repositories/UserRepositorie";
import bcrypt from "bcrypt";


export class UserService {

    constructor(readonly userRepositorie: IUserRepositorie){}

    async findAll () {
        const users = await this.userRepositorie.findMany();
        return users;
    }

    async createUser(attributes: CreateUserAttributes) {
        const userAlreadyExists = await this.userRepositorie.findUnique(attributes.email);
        if(userAlreadyExists) new HttpError(404, "Usuário já existente com esse mesmo email!")
        const passwordHash = await bcrypt.hash(attributes.password, 10);
        attributes.password = passwordHash
        const newUser = await this.userRepositorie.create(attributes);
        return newUser;
    }

    async findByEmail(email: string) {
        const user = await this.userRepositorie.findUnique(email);
        if(!user) new HttpError(404, "Usuário não encontrado!");
        return user;
    }

    async userExists (id:number) {
        const user = await this.userRepositorie.findById(id);
        if(!user) new HttpError(404, "Usuário não encontrado!");
    }

    async updateById (id: number, attributes: Partial<CreateUserAttributes>) {
        await this.userExists(id);
        const updateUser = await this.userRepositorie.update(id, attributes);
        return updateUser;
    }

    async deleteById (id: number) {
        await this.userExists(id);
        const deletedUser = await this.userRepositorie.delete(id);
        return deletedUser;
    }
}