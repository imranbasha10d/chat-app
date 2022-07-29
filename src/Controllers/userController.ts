import { Request, Response } from 'express';
import { UserService } from '../Services';
import { User } from '../Utils/types'

const userService = new UserService();

export default class UserController {
    public async createAdminUser(req: Request, res: Response): Promise<void> {
        const body: User = req.body
        const data = await userService.createAdminUser(body);
        res.status(data.statusCode).json(data);
    }
    public async createUser(req: Request, res: Response): Promise<void> {
        const body: User = req.body
        const data = await userService.createUser(body);
        res.status(data.statusCode).json(data);
    }
    public async signin(req: Request, res: Response): Promise<void> {
        const { username, password } = await req.body;
        let result = await userService.signin(username, password);
        res.status(result.statusCode).json(result);
    }
    public async getUserDataByUserId(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        let result = await userService.getUserDataByUserId(id);
        res.status(result.statusCode).json(result);
    }
    public async updatePassword(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const { newPassword } = req.body;
        let result = await userService.updateUserPassword(id, newPassword);
        res.status(result.statusCode).json(result);
    }
    public async deleteUser(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        let result = await userService.deleteUserById(id);
        res.status(result.statusCode).json(result);
    }
}