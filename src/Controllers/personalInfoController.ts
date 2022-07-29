import { Request, Response } from 'express';
import { PersonalInfoService } from '../Services';
import { PersonalInfo, UpdatePersonalInfo } from '../Utils/types'

const personalInfoService = new PersonalInfoService();

export default class PersonalInfoController {
    public async createPersonalInfo(req: Request, res: Response): Promise<void> {
        const body: PersonalInfo = req.body
        const result = await personalInfoService.createPersonalInfo(body);
        res.status(result.statusCode).json(result);
    }
    public async getPersonalInfoByUserId(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const result = await personalInfoService.getPersonalInfoByUserId(id);
        res.status(result.statusCode).json(result);
    }
    public async updatePersonalInfoByUserId(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const body: UpdatePersonalInfo = req.body
        let result = await personalInfoService.updatePersonalInfoByUserId(id, body);
        res.status(result.statusCode).json(result);
    }
    public async deletePersonalInfoByUserId(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        let result = await personalInfoService.deletePersonalInfoByUserId(id);
        res.status(result.statusCode).json(result);
    }
}