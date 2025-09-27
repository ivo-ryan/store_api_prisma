import { HttpError } from "../errors/HttpError";
import { CreateUserAttributes, IUserRepositorie } from "../repositories/UserRepositorie";
import bcrypt from "bcrypt";
import { JwtService } from "./JwtService";


export class UserService {

    constructor(
        readonly userRepositorie: IUserRepositorie,
        readonly jwtService: JwtService
    ){}

    async findAll () {
        const users = await this.userRepositorie.findMany();
        return users;
    }

    async createUser(attributes: CreateUserAttributes) {
        const userAlreadyExists = await this.userRepositorie.findUnique(attributes.email);
        if(userAlreadyExists) throw new HttpError(404, "Usuário já existente com esse mesmo email!");
        const passwordHash = await bcrypt.hash(attributes.password, 10);
        attributes.password = passwordHash
        const newUser = await this.userRepositorie.create(attributes);
        return newUser;
    }

    async findByEmail(email: string) {
        const user = await this.userRepositorie.findUnique(email);
        if(!user) throw new HttpError(404, "Usuário não encontrado!");
        return user;
    }

    async checkPassword(email: string, password: string) {
        const user = await this.findByEmail(email);
        const correctPasword = await bcrypt.compare(password , user.password);
        if(!correctPasword) throw new HttpError(404, "A senha está incorreta!");
        const token = this.jwtService.signToken(user.id, user.email);
        return token
    }

    async userExists (id:number) {
        const user = await this.userRepositorie.findById(id);
        if(!user) throw new HttpError(404, "Usuário não encontrado!");
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