import { PersonalInfoDao } from "../Dao";
import { PersonalInfo, UpdatePersonalInfo } from "../Utils/Types";
import { Response, RESPONSE_MEESAGE } from "../Utils/Response";
import { Log } from "../Logger";

export default class PersonalInfoService {
    private personalDao: PersonalInfoDao;
    constructor() {
        this.personalDao = new PersonalInfoDao();
    }

    public async createPersonalInfo(data: PersonalInfo): Promise<any> {
        Log.info('createPersonalInfo service input', data);
        try {
            let personalInfo = await this.personalDao.getPersonalInfoByUserId(data._id);
            Log.info('check personalInfo', personalInfo);
            if (personalInfo) {
                Log.info('return from createPersonalInfo service', personalInfo);
                return Response.badRequest(RESPONSE_MEESAGE['PERSONAL_INFO_ALREADY_EXISTED']);
            }
            const newInfo = await this.personalDao.createPersonalInfo(data);
            Log.info('return from createPersonalInfo service', newInfo);
            return Response.success(newInfo);
        } catch (error) {
            Log.error('error from createPersonalInfo service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_CREATE_PERSONAL_INFO']);
        }
    }

    public async getPersonalInfoByUserId(id: string): Promise<any> {
        Log.info('getPersonalInfoByUserId service input id', id);
        try {
            let info = await this.personalDao.getPersonalInfoByUserId(id);
            Log.info('return val from getPersonalInfoByUserId', info);
            if (!info) {
                Log.info('return getPersonalInfoByUserId service', info);
                return Response.notFound(RESPONSE_MEESAGE['PERSONAL_INFO_NOT_FOUND']);
            }
            Log.info('return from getPersonalInfoByUserId service', info);
            return Response.success(info);
        } catch (error) {
            Log.error('error from getPersonalInfoByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async updatePersonalInfoByUserId(id: string, data: UpdatePersonalInfo): Promise<any> {
        Log.info('updatePersonalInfo service input id', id);
        Log.info('updatePersonalInfo service input data', data);
        try {
            let info = await this.personalDao.getPersonalInfoByUserId(id);
            Log.info('return val from getPersonalInfo', info);
            if (!info) {
                Log.info('return updatePersonalInfo service', info);
                return Response.notFound(RESPONSE_MEESAGE['PERSONAL_INFO_NOT_FOUND']);
            }
            const updatedInfo = await this.personalDao.updatePersonalInfoByUserId(id, data);
            Log.info('return from updatePersonalInfo service', updatedInfo);
            return Response.success(updatedInfo);
        } catch (error) {
            Log.error('return from updatePersonalInfo service', error);
            return Response.badRequest(error.message);
        }
    }

    public async deletePersonalInfoByUserId(id: string): Promise<any> {
        Log.info('deletePersonalInfo service input id', id);
        try {
            let info = await this.personalDao.getPersonalInfoByUserId(id);
            Log.info('return val from getPersonalInfo', info);
            if (!info) {
                Log.info('return deletePersonalInfo service', info);
                return Response.notFound(RESPONSE_MEESAGE['PERSONAL_INFO_NOT_FOUND']);
            }
            const deletedInfo = await this.personalDao.deletePersonalInfoByUserId(id);
            Log.info('return from deletePersonalInfo service', deletedInfo);
            return Response.success(RESPONSE_MEESAGE['PERSONAL_INFO_DELETED_SUCCESSFULLY']);
        } catch (error) {
            Log.error('error from deletePersonalInfo service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_PERSONAL_INFO']);
        }
    }
}