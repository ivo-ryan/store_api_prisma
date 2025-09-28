
import { UpdateUserRequestSchema, UserByEmailRequestSchema, UserLoginRequestSchema, UserRequestSchema } from "./schema/UserRequestSchema";
import { UserService } from "../services/UserService";
import { Handler } from "express";

export class UsersController {
    constructor( readonly userService: UserService ){}

    index: Handler = async (req, res, next) => {
        try {

            const users = await this.userService.findAll();
            res.json(users);
            
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = UserRequestSchema.parse(req.body);
            const newUser = await this.userService.createUser(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error)
        }
    }

    login: Handler = async (req, res, next) => {
        try {
            const body = UserLoginRequestSchema.parse(req.body);
            const token = await this.userService.checkPassword(body.email, body.password);
            res.json({authenticated: true, token: token});
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const email = UserByEmailRequestSchema.parse(req.body);
            const user = await this.userService.findByEmail(email.email);
            res.json(user)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const body = UpdateUserRequestSchema.parse(req.body);
            const updatedUser = await this.userService.updateById(id, body);
            res.json(updatedUser);
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const deletedUser = await this.userService.deleteById(id);
            res.json(deletedUser);
        } catch (error) {
            next(error)
        }
    }
}