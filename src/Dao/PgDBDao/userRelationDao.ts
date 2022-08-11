import PgDatabase from "../../PgDatabase/pgDatabase";
import { RelationType, UserRelation, UserRelationIds } from '../../Utils/types';
import { Log } from "../../Logger";
import { v4 as uuid } from "uuid";

export class UserRelationDao {
    public async createUserRelation(data: UserRelation): Promise<any> {
        Log.info('createUserRelation dao: data', data);
        try {
            const id = uuid();
            await PgDatabase.query("INSERT INTO users_relation (_id, \"userId\", \"followerId\", type) VALUES ($1,$2,$3,$4)", [
                id,
                data.userId,
                data.followerId,
                data.type
            ]);
            const newUserRelation = await this.getUserRelationById(id);
            Log.info('return value from getUserRelationById method', newUserRelation);
            Log.info('return of createUserRelation dao', newUserRelation);
            return newUserRelation;
        } catch (error) {
            Log.error('Error in createUserRelation dao', error);
            return error.message;
        }
    }
    public async getUserRelationById(id: string): Promise<any> {
        Log.info('getUserRelationById dao input id', id);
        try {
            const userRelation = await PgDatabase.query(`SELECT * FROM users_relation where _id=$1`, [id])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch userRelation query', rows);
                    if (rows.length > 0) return rows[0];
                    return null;
                })
                .catch((error) => {
                    Log.error('Error in fetch userRelation query', error);
                    return null;
                });
            Log.info('return of getUserRelationById dao', userRelation);
            return userRelation;
        } catch (error) {
            Log.error('Error in getUserRelationById dao', error);
            return error.message;
        }
    }
    public async getUserRelationByIds(data: UserRelationIds): Promise<any> {
        Log.info('getUserRelationByIds dao input data', data);
        try {
            const userRelation = await PgDatabase.query(`SELECT * FROM users_relation where \"userId\"=$1, \"followerId\"=$2`, [data.userId, data.followerId])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success fetch userRelation query', rows);
                    if (rows.length > 0) return rows[0];
                    return null;
                })
                .catch((error) => {
                    Log.error('Error in fetch userRelation query', error);
                    return null;
                });
            Log.info('return of getUserRelationByIds dao', userRelation);
            return userRelation;
        } catch (error) {
            Log.error('Error in getUserRelationByIds dao', error);
            return error.message;
        }
    }
    public async getFollowersIdByUserId(userId: string, limit: number, offset: number): Promise<any> {
        Log.info('getFollowersIdByUserId dao input userId', userId);
        Log.info('getFollowersIdByUserId dao input limit', limit);
        Log.info('getFollowersIdByUserId dao input offset', offset);
        try {
            const type = RelationType.following;
            const followersId = await PgDatabase.query(`SELECT * FROM users_relation where \"followerId\"=$1 AND type=$2 LIMIT $3 OFFSET $4`, [
                userId,
                type,
                limit,
                offset
            ]).then((result) => {
                const { rows } = result;
                Log.info('Success fetch userRelation query', rows);
                if (rows.length > 0) return rows.map(follower => follower.userId);
                return [];
            }).catch((error) => {
                Log.error('Error in fetch userRelation query', error);
                return null;
            });
            Log.info('return of getFollowersIdByUserId dao', followersId);
            return followersId;
        } catch (error) {
            Log.error('Error in getFollowersIdByUserId dao', error);
            return error.message;
        }
    }
    public async getRequestersByUserId(userId: string, limit: number, offset: number): Promise<any> {
        Log.info('getRequestersByUserId dao input userId', userId);
        Log.info('getRequestersByUserId dao input limit', limit);
        Log.info('getRequestersByUserId dao input offset', offset);
        try {
            const type = RelationType.requested;
            const requestersId = await PgDatabase.query(`SELECT * FROM users_relation where \"followerId\"=$1 AND type=$2 LIMIT $3 OFFSET $4`, [
                userId,
                type,
                limit,
                offset
            ]).then((result) => {
                const { rows } = result;
                Log.info('Success fetch userRelation query', rows);
                if (rows.length > 0) return rows.map(userRelation => userRelation.userId);
                return [];
            }).catch((error) => {
                Log.error('Error in fetch userRelation query', error);
                return null;
            });
            Log.info('return of getRequestersByUserId dao', requestersId);
            return requestersId;
        } catch (error) {
            Log.error('Error in getRequestersByUserId dao', error);
            return error.message;
        }
    }
    public async getFollowingUsersByUserId(userId: string, limit: number, offset: number): Promise<any> {
        Log.info('getFollowingUsersByUserId dao input userId', userId);
        Log.info('getFollowingUsersByUserId dao input limit', limit);
        Log.info('getFollowingUsersByUserId dao input offset', offset);
        try {
            const type = RelationType.following;
            const followingUsersId = await PgDatabase.query(`SELECT * FROM users_relation where \"userId\"=$1 AND type=$2 LIMIT $3 OFFSET $4`, [
                userId,
                type,
                limit,
                offset
            ]).then((result) => {
                const { rows } = result;
                Log.info('Success fetch userRelation query', rows);
                if (rows.length > 0) return rows.map(userRelation => userRelation.followerId);
                return [];
            }).catch((error) => {
                Log.error('Error in fetch userRelation query', error);
                return null;
            });
            Log.info('return of getFollowingUsersByUserId dao', followingUsersId);
            return followingUsersId;
        } catch (error) {
            Log.error('Error in getFollowingUsersByUserId dao', error);
            return error.message;
        }
    }
    public async getFollowingUserIdsByUserId(userId: string): Promise<any> {
        Log.info('getFollowingUsersByUserId dao input userId', userId);
        try {
            const type = RelationType.following;
            const followingUsersId = await PgDatabase.query(`SELECT * FROM users_relation where \"userId\"=$1 AND type=$2`, [
                userId,
                type
            ]).then((result) => {
                const { rows } = result;
                Log.info('Success fetch userRelation query', rows);
                if (rows.length > 0) return rows.map(userRelation => userRelation.followerId);
                return [];
            }).catch((error) => {
                Log.error('Error in fetch userRelation query', error);
                return null;
            });
            Log.info('return of getFollowingUsersByUserId dao', followingUsersId);
            return followingUsersId;
        } catch (error) {
            Log.error('Error in getFollowingUsersByUserId dao', error);
            return error.message;
        }
    }
    public async updateUserRelationTypeById(id: string, type: RelationType): Promise<any> {
        Log.info('updateUserRelationTypeById dao input id', id);
        Log.info('updateUserRelationTypeById dao input type', type);
        try {
            const updatedUserRelation = await PgDatabase.query(`UPDATE users_relation SET type=$1 where _id=$2`, [type, id])
                .then(async () => {
                    Log.info('Success updated userRelation query');
                    const userRelation = await this.getUserRelationById(id);
                    Log.info('Return value from getUserRelationById: userRelation: ', userRelation);
                    return userRelation;
                })
                .catch((error) => {
                    Log.error('Error in updated userRelation query', error);
                    return null;
                });
            Log.info('return of updateUserRelationTypeById dao', updatedUserRelation);
            return updatedUserRelation;
        } catch (error) {
            Log.error('Error in updateUserRelationTypeById dao', error);
            return error.message;
        }
    }
    public async deleteUserRelationById(id: string): Promise<any> {
        Log.info('deleteUserRelationById dao input id', id);
        try {
            const deletedId = await PgDatabase.query(`DELETE FROM users_relation where _id=$1 RETURNING *`, [id])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success deleted userRelation query', rows);
                    return id;
                })
                .catch((error) => {
                    Log.error('Error in deleted userRelation query', error);
                    return null;
                });
            Log.info('return of deleteUserRelationById dao', deletedId);
            return deletedId;
        } catch (error) {
            Log.error('Error in deleteUserRelationById dao', error);
            return error.message;
        }
    }
    public async deleteAllUserRelationByUserId(userId: string): Promise<any> {
        Log.info('deleteAllUserRelationByUserId dao input userId', userId);
        try {
            const deletedId = await PgDatabase.query(`DELETE FROM users_relation where \"userId\"=$1 OR \"followerId\"=$1 RETURNING *`, [userId])
                .then((result) => {
                    const { rows } = result;
                    Log.info('Success deleted userRelation query', rows);
                    return userId;
                })
                .catch((error) => {
                    Log.error('Error in deleted userRelation query', error);
                    return null;
                });
            Log.info('return of deleteAllUserRelationByUserId dao', deletedId);
            return deletedId;
        } catch (error) {
            Log.error('Error in deleteAllUserRelationByUserId dao', error);
            return error.message;
        }
    }
}