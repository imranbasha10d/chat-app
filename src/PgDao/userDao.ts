import { User, UserPassword, IUserDao } from '../Utils/types';
import { Log } from "../Logger";
import { v4 as uuid } from "uuid";
import PgDatabase from "../PgDatabase/pgDatabase";
import { getQueryIds } from "../Utils/pgMethods";

export class UserDao implements IUserDao {
    public async createUser(data: User): Promise<any> {
        Log.info('createUser dao input data', data);
        try {
            await PgDatabase.query("INSERT INTO users (_id, username, password, email, role) VALUES ($1,$2,$3,$4,$5)", [
                uuid(),
                data.username,
                data.password,
                data.email,
                data.role
            ]);
            const newUser = await this.getUserByUsername(data.username);
            Log.info('return of createUser dao', newUser);
            return newUser;
        } catch (error) {
            Log.error('Error in createUser dao', error);
            return error.message;
        }
    }
    public async getUserByUsername(data: string): Promise<any> {
        Log.info('getUserByUsername dao input data', data);
        try {
            const user = await PgDatabase.query(`SELECT * FROM users where username=$1`, [data])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch user query', rows);
                    if (rows.length > 0) return rows[0];
                    return null;
                })
                .catch((error) => {
                    Log.error('Error in fetch user query', error);
                    return null;
                });
            Log.info('return of getUserByUsername dao', user);
            return user;
        } catch (error) {
            Log.error('Error in getUserByUsername dao', error);
            return error.message;
        }
    }
    public async getUserDataByUserId(id: string): Promise<any> {
        Log.info('getUserDataByUserId dao input id', id);
        try {
            const user = await PgDatabase.query(`SELECT _id, username, email, role FROM users where _id=$1`, [id])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch user query', rows);
                    if (rows.length > 0) return rows[0];
                    return null;
                })
                .catch((error) => {
                    Log.error('Error in fetch user query', error);
                    return null;
                });
            Log.info('return of getUserDataByUserId dao', user);
            return user;
        } catch (error) {
            Log.error('Error in getUserDataByUserId dao', error);
            return error.message;
        }
    }
    public async getUsersByUserIds(ids: string[]): Promise<any> {
        Log.info('getUsersByUserIds dao input ids', ids);
        try {
            if (!ids.length) return [];
            const queryIds = getQueryIds(ids);
            Log.info('Checking queryIds : ', queryIds);
            const user = await PgDatabase.query(`SELECT _id, username, email, role FROM users where _id in (${queryIds})`, [])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch user query', rows);
                    if (rows.length > 0) return rows;
                    return [];
                })
                .catch((error) => {
                    Log.error('Error in fetch user query', error);
                    return null;
                });
            Log.info('return of getUsersByUserIds dao', user);
            return user;
        } catch (error) {
            Log.error('Error in getUsersByUserIds dao', error);
            return error.message;
        }
    }
    public async getUserByUserId(id: string): Promise<any> {
        Log.info('getUserByUserId dao input data', id);
        try {
            const user = await PgDatabase.query(`SELECT * FROM users where _id=$1`, [id])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch user query', rows);
                    if (rows.length > 0) return rows[0];
                    return null;
                })
                .catch((error) => {
                    Log.error('Error in fetch user query', error);
                    return null;
                });
            Log.info('return of getUserByUserId dao', user);
            return user;
        } catch (error) {
            Log.error('Error in getUserByUserId dao', error);
            return error.message;
        }
    }
    public async updateUserPassword(id: string, data: UserPassword): Promise<any> {
        Log.info('updateUserPassword dao input id', id);
        Log.info('updateUserPassword dao input data', data);
        try {
            const user = await PgDatabase.query(`UPDATE users SET password=$1 where _id=$2`, [data.password, id])
                .then(async () => {
                    Log.info('Success updated query user');
                    const user = await this.getUserByUserId(id);
                    Log.info('Return value from getUserByUserId: user: ', user);
                    return user;
                })
                .catch((error) => {
                    Log.error('Error in updated query user', error);
                    return null;
                });
            Log.info('return of updateUserPassword dao', user);
            return user;
        } catch (error) {
            Log.error('Error in updateUserPassword dao', error);
            return error.message;
        }
    }
    public async deleteUserById(id: string): Promise<any> {
        Log.info('deleteUserById dao input id', id);
        try {
            const deletedId = await PgDatabase.query(`DELETE FROM users where _id=$1 RETURNING *`, [id])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success deleted query user', rows);
                    return id;
                })
                .catch((error) => {
                    Log.error('Error in deleted query user', error);
                    return null;
                });
            Log.info('return of deleteUserById dao', deletedId);
            return deletedId;
        } catch (error) {
            Log.error('Error in deleteUserById dao', error);
            return error.message;
        }
    }
}