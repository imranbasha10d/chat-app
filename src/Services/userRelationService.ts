import { UserRelationDao, UserDao } from "../Dao";
import { UserRelationIds, RelationType } from "../Utils/types";
import { Response, RESPONSE_MEESAGE } from "../Utils/response";
import { Log } from "../Logger";

export default class UserRelationService {
    private userRelationDao: UserRelationDao;
    private userDao: UserDao;
    constructor() {
        this.userRelationDao = new UserRelationDao();
        this.userDao = new UserDao();
    }

    public async sendUserRequest(data: UserRelationIds): Promise<any> {
        Log.info('createUserRelation service input', data);
        try {
            let user = await this.userDao.getUserByUserId(data.userId);
            let follower = await this.userDao.getUserByUserId(data.followerId);
            Log.info('check user and follower: user: ', user);
            Log.info('check user and follower: follower: ', follower);
            if (!user?._id || !follower?._id) {
                Log.info('return from createUserRelation service');
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            let existingRelation = await this.userRelationDao.getUserRelationByIds(data);
            Log.info('return value from getUserRelationByUserId: existingRelation: ', existingRelation);
            if(existingRelation && existingRelation._id){
                if(existingRelation.type == RelationType.requested){
                    Log.info('return from createUserRelation service');
                    return Response.badRequest(RESPONSE_MEESAGE['REQUEST_ALREADY_SENT']);
                }
                Log.info('return from createUserRelation service');
                return Response.badRequest(RESPONSE_MEESAGE['USER_CURRENTLY_FOLLOWING_THIS_ACCOUNT']);
            }
            const type: RelationType = RelationType.requested;
            const userRelation = await this.userRelationDao.createUserRelation({...data, type });
            Log.info('return from createUserRelation service', userRelation);
            return Response.success(userRelation);
        } catch (error) {
            Log.error('return from createUserRelation service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_CREATE_REQUEST']);
        }
    }

    public async acceptUserRequestById(id: string): Promise<any> {
        Log.info('acceptUserRequest service id', id);
        try {
            let existingRelation = await this.userRelationDao.getUserRelationById(id);
            Log.info('return value from getUserRelationById: existingRelation: ', existingRelation);
            if (!existingRelation?._id) {
                Log.info('return from acceptUserRequest service');
                return Response.badRequest(RESPONSE_MEESAGE['REQUEST_NOT_FOUND']);
            }
            if (existingRelation && existingRelation.type == RelationType.following) {
                Log.info('return from createUserRelation service');
                return Response.badRequest(RESPONSE_MEESAGE['USER_CURRENTLY_FOLLOWING_THIS_ACCOUNT']);
            }
            const type: RelationType = RelationType.following;
            const userRelation = await this.userRelationDao.updateUserRelationTypeById(existingRelation._id, type);
            Log.info('return from acceptUserRequest service', userRelation);
            return Response.success(userRelation);
        } catch (error) {
            Log.error('return from acceptUserRequest service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_ACCEPT_REQUEST']);
        }
    }

    public async getFollowersByUserId(userId: string, limit?: number, offset?: number): Promise<any> {
        Log.info('getFollowersByUserId service input userId', userId);
        Log.info('getFollowersByUserId service input limit', limit);
        Log.info('getFollowersByUserId service input offset', offset);
        try {
            let user = await this.userDao.getUserByUserId(userId);
            Log.info('check user: user: ', user);
            if (!user?._id) {
                Log.info('return from getFollowersByUserId service');
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            let followers = await this.userRelationDao.getFollowersIdByUserId(userId, limit, offset);
            Log.info('return value from getFollowersByUserId method', followers);
            if(!followers){
                Log.info('return from getFollowersByUserId service', followers);
                return [];
            }
            const users = await this.userDao.getUsersByUserIds(followers);
            Log.info('return from getFollowersByUserId service', users);
            return Response.success(users);
        } catch (error) {
            Log.error('return from getFollowersByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getFollowingUsersByUserId(userId: string, limit?: number, offset?: number): Promise<any> {
        Log.info('getFollowingUsersByUserId service input userId', userId);
        Log.info('getFollowingUsersByUserId service input limit', limit);
        Log.info('getFollowingUsersByUserId service input offset', offset);
        try {
            let user = await this.userDao.getUserByUserId(userId);
            Log.info('check user: user: ', user);
            if (!user?._id) {
                Log.info('return from getFollowingUsersByUserId service');
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            let followingUsers = await this.userRelationDao.getFollowingUsersByUserId(userId, limit, offset);
            Log.info('return value from getFollowingUsersByUserId method', followingUsers);
            if(!followingUsers){
                Log.info('return from getFollowingUsersByUserId service', followingUsers);
                return [];
            }
            const users = await this.userDao.getUsersByUserIds(followingUsers);
            Log.info('return from getFollowingUsersByUserId service', users);
            return Response.success(users);
        } catch (error) {
            Log.error('return from getFollowingUsersByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getRequestersByUserId(userId: string, limit?: number, offset?: number): Promise<any> {
        Log.info('getRequestersByUserId service input userId', userId);
        Log.info('getRequestersByUserId service input limit', limit);
        Log.info('getRequestersByUserId service input offset', offset);
        try {
            let user = await this.userDao.getUserByUserId(userId);
            Log.info('check user: user: ', user);
            if (!user?._id) {
                Log.info('return from getRequestersByUserId service');
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            let requesters = await this.userRelationDao.getRequestersByUserId(userId, limit, offset);
            Log.info('return value from getRequestersByUserId method', requesters);
            if(!requesters){
                Log.info('return from getRequestersByUserId service', requesters);
                return [];
            }
            const users = await this.userDao.getUsersByUserIds(requesters);
            Log.info('return from getRequestersByUserId service', users);
            return Response.success(users);
        } catch (error) {
            Log.error('return from getRequestersByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async deleteUserRelationByIds(data: UserRelationIds): Promise<any> {
        Log.info('deleteUserRelationById service input data', data);
        try {
            let existingRelation = await this.userRelationDao.getUserRelationByIds(data);
            Log.info('return val from getUserRelationByIds method', existingRelation);
            if (!existingRelation?._id) {
                Log.info('return deleteUserRelationById service', existingRelation);
                return Response.notFound(RESPONSE_MEESAGE['USER_RELATION_NOT_FOUNT']);
            }
            const deletedRelation = await this.userRelationDao.deleteUserRelationById(existingRelation._id);
            Log.info('return from deleteUserRelationById service', deletedRelation);
            return Response.success(deletedRelation);
        } catch (error) {
            Log.error('return from deleteUserRelationById service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_USER_RELATION']);
        }
    }

    public async deleteAllUserRelationByUserId(userId: string): Promise<any> {
        Log.info('deleteAllUserRelationByUserId service input userId', userId);
        try {
            let existingUser = await this.userDao.getUserByUserId(userId);
            Log.info('return val from getUserByUserId method: existingUser: ', existingUser);
            if (!existingUser?._id) {
                Log.info('return deleteAllUserRelationByUserId service', existingUser);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const deletedRelations = await this.userRelationDao.deleteAllUserRelationByUserId(existingUser._id);
            Log.info('return from deleteAllUserRelationByUserId service', deletedRelations);
            return Response.success(RESPONSE_MEESAGE['USER_RELATION_DELETED_SUCCESSFULLY']);
        } catch (error) {
            Log.error('error from deleteAllUserRelationByUserId service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_USER_RELATION']);
        }
    }
}