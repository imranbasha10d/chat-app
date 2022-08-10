import { UserRelationModel } from "../../Models";
import { RelationType, UserRelation, UserRelationIds } from "../../Utils/types";
import { Log } from "../../Logger";

export class UserRelationDao {
    public async createUserRelation(input: UserRelation): Promise<any> {
        Log.info('createUserRelation dao input input', input);
        try {
            const newUserRelation = new UserRelationModel({
                userId: input.userId,
                followerId: input.followerId,
                type: input.type,
            });
            const data = await newUserRelation.save();
            Log.info('createUserRelation dao successfully', data);
            return data && data.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in createUserRelation dao', error);
            return error.message;
        }
    }
    public async getUserRelationById(id: string): Promise<any> {
        Log.info('getUserRelationById dao input id', id);
        try {
            const relationData = await UserRelationModel.findById(id);
            Log.info('return of getUserRelationById dao', relationData);
            return relationData && relationData.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in getUserRelationById dao', error);
            return error.message;
        }
    }
    public async getUserRelationByIds(data: UserRelationIds): Promise<any> {
        Log.info('getUserRelationByIds dao input data', data);
        try {
            const relationData = await UserRelationModel.findOne(data);
            Log.info('return of getUserRelationByIds dao', relationData);
            return relationData && relationData.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in getUserRelationByIds dao', error);
            return error.message;
        }
    }
    public async getFollowersIdByUserId(userId: string, limit?: number, offset?: number): Promise<any> {
        Log.info('getRelationsByUserId dao input userId', userId);
        Log.info('getRelationsByUserId dao input limit', limit);
        Log.info('getRelationsByUserId dao input offset', offset);
        try {
            if(limit === undefined){
                limit = 10;
            } else if(offset === undefined){
                offset = 0;
            }
            const input = {
                followerId: userId,
                type: RelationType.following
            }
            const followers = await UserRelationModel.find(input).skip(offset).limit(limit);
            Log.info('return of getRelationsByUserId dao', followers);
            return followers.map(follower => follower.userId);
        } catch (error) {
            Log.error('Error in getRelationsByUserId dao', error);
            return error.message;
        }
    }
    public async getRequestersByUserId(userId: string, limit?: number, offset?: number): Promise<any> {
        Log.info('getRequestersByUserId dao input userId', userId);
        Log.info('getRequestersByUserId dao input limit', limit);
        Log.info('getRequestersByUserId dao input offset', offset);
        try {
            if(limit === undefined){
                limit = 10;
            } else if(offset === undefined){
                offset = 0;
            }
            const input = {
                followerId: userId,
                type: RelationType.requested
            }
            const requesters = await UserRelationModel.find(input).skip(offset).limit(limit);
            Log.info('return of getRequestersByUserId dao', requesters);
            return requesters.map(requester => requester.userId);
        } catch (error) {
            Log.error('Error in getRequestersByUserId dao', error);
            return error.message;
        }
    }

    public async getFollowingUsersByUserId(userId: string, limit?: number, offset?: number): Promise<any> {
        Log.info('getFollowingUsersByUserId dao input userId', userId);
        Log.info('getFollowingUsersByUserId dao input limit', limit);
        Log.info('getFollowingUsersByUserId dao input offset', offset);
        try {
            if(limit === undefined){
                limit = 10;
            } else if(offset === undefined){
                offset = 0;
            }
            const input = {
                userId,
                type: RelationType.following
            }
            const followingUsers = await UserRelationModel.find(input).skip(offset).limit(limit);
            Log.info('return of getFollowingUsersByUserId dao', followingUsers);
            return followingUsers.map(followingUser => followingUser.followerId);
        } catch (error) {
            Log.error('Error in getFollowingUsersByUserId dao', error);
            return error.message;
        }
    }
    public async updateUserRelationTypeById(id: string, type: RelationType): Promise<any> {
        Log.info('updateUserRelationTypeById dao input id', id);
        Log.info('updateUserRelationTypeById dao input type', type);
        try {
            await UserRelationModel.findByIdAndUpdate(id, { type });
            const updatedUserRelation = await UserRelationModel.findById(id);
            Log.info('Return from findByIdAndUpdate', updatedUserRelation);
            return updatedUserRelation && updatedUserRelation.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in updateUserRelationTypeById dao', error);
            return error.message;
        }
    }
    public async deleteUserRelationById(id: string): Promise<any> {
        Log.info('deleteUserRelationById dao input id', id);
        try {
            const deletedUserRelation = await UserRelationModel.findByIdAndDelete(id);
            Log.info('Return from findByIdAndDelete', deletedUserRelation);
            return deletedUserRelation && deletedUserRelation.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in deleteUserRelationById dao', error);
            return error.message;
        }
    }
    public async deleteAllUserRelationByUserId(userId: string): Promise<any> {
        Log.info('deleteUserRelationById dao input userId', userId);
        try {
            const deletedfollowers = await UserRelationModel.deleteMany({userId: userId});
            Log.info('Return value of deleteMany: deletedfollowers: ', deletedfollowers);
            const deletedfollowing = await UserRelationModel.deleteMany({followerId: userId});
            Log.info('Return value of deleteMany: deletedfollowing: ', deletedfollowing);
            Log.info('Return from deleteUserRelationById', userId);
            return userId;
        } catch (error) {
            Log.error('Error in deleteUserRelationById dao', error);
            return error.message;
        }
    }
}