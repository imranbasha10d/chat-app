import { PersonalInfo, UpdatePersonalInfo } from '../Utils/types';
import { Log } from "../Logger";
import PgDatabase from "../PgDatabase/pgDatabase";

export class PersonalInfoDao {
    public async createPersonalInfo(data: PersonalInfo): Promise<any> {
        Log.info('createPersonalInfo dao input data', data);
        try {
            await PgDatabase.query("INSERT INTO personal_info (_id, fullName, gender, dob, status) VALUES ($1,$2,$3,$4,$5)", [
                data.id,
                data.fullName,
                data.gender,
                data.dob,
                data.status
            ]);
            const newPersonalInfo = await this.getPersonalInfoByUserId(data.id);
            Log.info('Return value from getPersonalInfoByUserId method: newPersonalInfo: ', newPersonalInfo);
            Log.info('return of createPersonalInfo dao', newPersonalInfo);
            return newPersonalInfo;
        } catch (error) {
            Log.error('Error in createPersonalInfo dao', error);
            return error.message;
        }
    }
    public async getPersonalInfoByUserId(userId: string) {
        Log.info('getPersonalInfo dao input userId', userId);
        try {
            const personalInfo = await PgDatabase.query(`SELECT _id, fullName, gender, dob, status FROM personal_info where _id=$1`, [userId])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch personalInfo query', rows);
                    if (rows.length > 0) return rows[0];
                    return null;
                })
                .catch((error) => {
                    Log.error('Error in fetch personalInfo query', error);
                    return null;
                });
            Log.info('return of getPersonalInfo dao', personalInfo);
            return personalInfo;
        } catch (error) {
            Log.error('Error in getPersonalInfo dao', error);
            return error.message;
        }
    }
    public async updatePersonalInfoByUserId(id: string, data: UpdatePersonalInfo): Promise<any> {
        Log.info('updatePersonalInfo dao input id', id);
        Log.info('updatePersonalInfo dao input data', data);
        try {
            const updatedPersonalInfo = await PgDatabase.query(`UPDATE personal_info SET fullName=$1,status=$2 where _id=$3`, [data.fullName, data.status, id])
                .then(async () => {
                    Log.info('Success updated query personalinfo');
                    const info = await this.getPersonalInfoByUserId(id);
                    Log.info('Return value from getPersonalInfoByUserId: info: ', info);
                    return info;
                })
                .catch((error) => {
                    Log.error('Error in updated query personalinfo', error);
                    return null;
                });
            Log.info('return of updatePersonalInfo dao', updatedPersonalInfo);
            return updatedPersonalInfo;
        } catch (error) {
            Log.error('Error in updatePersonalInfo dao', error);
            return error.message;
        }
    }
    public async deletePersonalInfoByUserId(id: string): Promise<any> {
        Log.info('deletePersonalInfoByUserId dao input id', id);
        try {
            const deletedId = await PgDatabase.query(`DELETE FROM personal_info where _id=$1 RETURNING *`, [id])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success deleted query personalinfo', rows);
                    return id;
                })
                .catch((error) => {
                    Log.error('Error in deleted query personalinfo', error);
                    return null;
                });
            Log.info('return of deletePersonalInfoByUserId dao', deletedId);
            return deletedId;
        } catch (error) {
            Log.error('Error in deletePersonalInfoByUserId dao', error);
            return error.message;
        }
    }
}