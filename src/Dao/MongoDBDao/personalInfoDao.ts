import { PersonalInfoModel } from "../../Models";
import { PersonalInfo, UpdatePersonalInfo } from "../../Utils/types";
import { Log } from "../../Logger";

export class PersonalInfoDao {
    public async createPersonalInfo(data: PersonalInfo): Promise<any> {
        Log.info('createPersonalInfo dao input data', data);
        try {
            const newPersonalInfo = new PersonalInfoModel({
                _id: data.id,
                fullName: data.fullName,
                dob: data.dob,
                gender: data.gender,
                status: data.status
            });
            const newInfo = await newPersonalInfo.save();
            Log.info('createPersonalInfo dao successfully', newInfo);
            return newInfo && newInfo.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in createPersonalInfo dao', error);
            return error.message;
        }
    }
    public async getPersonalInfoByUserId(id: string) {
        Log.info('getPersonalInfo dao input id', id);
        try {
            const info = await PersonalInfoModel.findById(id);
            Log.info('return from findById dao', info);
            return info && info.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in getPersonalInfo dao', error);
            return error.message;        
        }
    }
    public async updatePersonalInfoByUserId(id: string, data: UpdatePersonalInfo): Promise<any> {
        Log.info('updatePersonalInfo dao input id', id);
        Log.info('updatePersonalInfo dao input data', data);
        try {
            await PersonalInfoModel.findByIdAndUpdate(id, data);
            const updatedInfo = await PersonalInfoModel.findById(id);
            Log.info('Return from findByIdAndUpdate', updatedInfo);
            return updatedInfo && updatedInfo.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in updatePersonalInfo dao', error);
            return error.message          
        }
    }
    public async deletePersonalInfoByUserId(id: string): Promise<any> {
        Log.info('deletePersonalInfoByUserId dao input id', id);
        try {
            const deletedInfo = await PersonalInfoModel.findByIdAndDelete(id);
            Log.info('Return value of findByIdAndDelete method: deletedInfo: ', deletedInfo);
            Log.info('Return from deletePersonalInfoByUserId dao', id);
            return id;
        } catch (error) {
            Log.error('Error in deletePersonalInfoByUserId dao', error);
            return error.message;
        }
    }
}