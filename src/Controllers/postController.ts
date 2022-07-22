import { Request, Response } from 'express';
import { PostService } from '../Services';
import { Post } from '../Utils/Types'

const postService = new PostService();

export default class PostController {
    public async createPost(req: Request, res: Response): Promise<void> {
        const body: Post = req.body
        const result = await postService.createPost(body);
        res.status(result.statusCode).json(result);
    }
    public async getPostById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        let result = await postService.getPostById(id);
        res.status(result.statusCode).json(result);
    }
    public async getAllPostsByOwnerId(req: Request, res: Response): Promise<void> {
        const ownerId = req.params.id;
        const { limit, offset } = req.body;
        let result = await postService.getAllPostsByOwnerId(ownerId, limit, offset);
        res.status(result.statusCode).json(result);
    }
    public async getUserFeedsByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const { limit, offset } = req.body;
        let result = await postService.getUserFeedsByUserId(userId, limit, offset);
        res.status(result.statusCode).json(result);
    }
    public async updatePostCaptionById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const { caption } = req.body;
        let result = await postService.updatePostCaptionById(id, caption);
        res.status(result.statusCode).json(result);
    }
    public async deletePostById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        let result = await postService.deletePostById(id);
        res.status(result.statusCode).json(result);
    }
    public async deleteAllPostsByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        let result = await postService.deleteAllPostsByUserId(userId);
        res.status(result.statusCode).json(result);
    }
}