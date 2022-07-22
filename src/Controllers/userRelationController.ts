import { Request, Response } from 'express';
import { UserRelationService } from '../Services';
import { UserRelationIds } from '../Utils/Types'

const userRelationService = new UserRelationService();

export default class UserRelationController {
    public async sendUserRequest(req: Request, res: Response): Promise<void> {
        const body: UserRelationIds = req.body
        const result = await userRelationService.sendUserRequest(body);
        res.status(result.statusCode).json(result);
    }
    public async acceptUserRequest(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const result = await userRelationService.acceptUserRequestById(id);
        res.status(result.statusCode).json(result);
    }
    public async getFollowersByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const { limit, offset } = req.body;
        let result = await userRelationService.getFollowersByUserId(userId, limit, offset);
        res.status(result.statusCode).json(result);
    }
    public async getFollowingUsersByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const { limit, offset } = req.body;
        let result = await userRelationService.getFollowingUsersByUserId(userId, limit, offset);
        res.status(result.statusCode).json(result);
    }
    public async getRequestersByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const { limit, offset } = req.body;
        let result = await userRelationService.getRequestersByUserId(userId, limit, offset);
        res.status(result.statusCode).json(result);
    }
    public async deleteUserRelationByIds(req: Request, res: Response): Promise<void> {
        const body: UserRelationIds = req.body;
        let result = await userRelationService.deleteUserRelationByIds(body);
        res.status(result.statusCode).json(result);
    }
    public async deleteAllUserRelationByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        let result = await userRelationService.deleteAllUserRelationByUserId(userId);
        res.status(result.statusCode).json(result);
    }
}