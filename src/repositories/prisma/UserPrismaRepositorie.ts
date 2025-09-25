import { User } from "@prisma/client";
import { CreateUserAttributes, IUserRepositorie } from "../UserRepositorie";
import { prisma } from "../../database/database";

export class UserPrismaRepositorie implements IUserRepositorie{
    findMany (): Promise<User[]> {
        return prisma.user.findMany();
    };

    create (attributes: CreateUserAttributes): Promise<User>{
        return prisma.user.create({ data: attributes });
    };

    findUnique (email: string): Promise<User | null>{
        return prisma.user.findUnique({ 
            where: { email },
            include: { cart: { include: { products: { include: { product: true } } } } }  
        });
    };

    findById (id: number): Promise<User | null>{
        return prisma.user.findUnique({ where: { id } });
    };

    update (id: number, attributes: Partial<CreateUserAttributes>): Promise<User | null>{
        return prisma.user.update({ 
            where: { id },
            data: attributes
         })
    };

    delete (id: number): Promise<User | null>{
        return prisma.user.delete({ where: { id } });
    };

    
}