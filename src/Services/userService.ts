import { UserDao, UserRelationDao, PersonalInfoDao, PostDao } from "../Dao";
import { User, UserRoles } from "../Utils/types";
import { Response, RESPONSE_MEESAGE } from "../Utils/response";
import { checkPassword, hashPassword } from '../Utils/generateHasPassword';
import { Log } from "../Logger";
import { Auth } from "../Auth/Authentication";

const auth: Auth = new Auth();

export default class UserService {
    private userDao: UserDao;
    private personalInfoDao: PersonalInfoDao;
    private userRelationDao: UserRelationDao;
    private postDao: PostDao;
    constructor() {
        this.userDao = new UserDao();
        this.personalInfoDao = new PersonalInfoDao();
        this.postDao = new PostDao();
        this.userRelationDao = new UserRelationDao();
    }

    public async createAdminUser(data: User): Promise<any> {
        Log.info('createAdminUser service input', data);
        try {
            let existingUser = await this.userDao.getUserByUsername(data.username);
            Log.info('check existingUser', existingUser);
            if (existingUser && existingUser._id) {
                Log.info('return from createAdminUser service', existingUser);
                return Response.badRequest(RESPONSE_MEESAGE['USER_ALREADY_EXISTED']);
            }
            const hashedPassword = await hashPassword(data.password);
            const role = UserRoles.admin;
            const newAdmin = await this.userDao.createUser({
                ...data,
                password: hashedPassword,
                role: role,
            });
            Log.info('return of createAdminUser method', newAdmin);
            const token = auth.generateNewToken(newAdmin._id, newAdmin.role);
            Log.info('createAdminUser token', token);
            Log.info('return from createAdminUser service', { ...newAdmin, token });
            return Response.success({ ...newAdmin, token });
        } catch (error) {
            Log.error('return from createAdminUser service', error);
            return Response.badRequest(error.message);
        }
    }

    public async createUser(data: User): Promise<any> {
        Log.info('createUser service input', data);
        try {
            let existingUser = await this.userDao.getUserByUsername(data.username);
            Log.info('check existingUser', existingUser);
            if (existingUser && existingUser._id) {
                Log.info('return from createUser service', existingUser);
                return Response.badRequest(RESPONSE_MEESAGE['USER_ALREADY_EXISTED']);
            }
            const hashedPassword = await hashPassword(data.password);
            const role = UserRoles.user;
            const newUser = await this.userDao.createUser({
                ...data,
                password: hashedPassword,
                role: role,
            });
            Log.info('return of createUser method', newUser);
            const token = auth.generateNewToken(newUser._id, newUser.role);
            Log.info('createUser token', token);
            Log.info('return from createUser service', { ...newUser, token });
            return Response.success({ ...newUser, token });
        } catch (error) {
            Log.error('return from createUser service', error);
            return Response.badRequest(error.message);
        }
    }

    public async signin(username: string, password: string): Promise<any> {
        Log.info('signin service input: username: ', username);
        Log.info('signin service input: password: ', password);
        try {
            let user = await this.userDao.getUserByUsername(username);
            Log.info('return value from getUserByUsername method: user: ', user);
            if (!user) {
                Log.info('return from signin service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            if (!await checkPassword(password, user.password)) {
                Log.info('return from signin service: Password Incorrect');
                return Response.badRequest(RESPONSE_MEESAGE['PASSWORD_INCORRECT']);
            }
            //validation of password work is finished. so deleted it from user object
            delete user.password;
            const token = auth.generateNewToken(user._id, user.role);
            Log.info("checking token", token);
            Log.info('return from signin service', { ...user, token });
            return Response.success({ ...user, token });
        } catch (error) {
            Log.error('return from signin service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getUserDataByUserId(id: string): Promise<any> {
        Log.info('getUserDataByUserId service input: id: ', id);
        try {
            let user = await this.userDao.getUserDataByUserId(id);
            Log.info('return value from getUserDataByUserId method: user: ', user);
            if (!user) {
                Log.info('return from getUserDataByUserId service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            Log.info('return from getUserDataByUserId service', user);
            return Response.success(user);
        } catch (error) {
            Log.error('return from getUserDataByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getUsersByUserIds(ids: string[]): Promise<any> {
        Log.info('getUsersByUserIds service input: ids: ', ids);
        try {
            let users = await this.userDao.getUsersByUserIds(ids);
            Log.info('return from getUsersByUserIds service', users);
            return Response.success(users);
        } catch (error) {
            Log.error('return from getUsersByUserIds service', error);
            return Response.badRequest(error.message);
        }
    }

    public async updateUserPassword(id: string, newPassword: string): Promise<any> {
        Log.info('updateUserPassword service input id', id);
        Log.info('updateUserPassword service input newPassword', newPassword);
        try {
            const user = await this.userDao.getUserByUserId(id);
            Log.info('return of getUser method', user);
            if (!user?._id) {
                Log.info('return from updateUserPassword service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const hashedPassword = await hashPassword(newPassword);
            const updatedUser = await this.userDao.updateUserPassword(id, { password: hashedPassword });
            Log.info('return from updateUserPassword service', updatedUser);
            return Response.success(updatedUser);
        } catch (error) {
            Log.error('return from updateUserPassword service', error);
            return Response.badRequest('Update password failed');
        }
    }

    public async deleteUserRelatedAllDataByUserId(id: string): Promise<string> {
        Log.info('deleteUserRelatedAllDataByUserId service input: id: ', id);
        try {
            //delete user's personal info in the db
            Log.info('personal info going to delete id', id);
            const deletedInfo = await this.personalInfoDao.deletePersonalInfoByUserId(id);
            Log.info('return of deletePersonalInfo method', deletedInfo);
            //delete user's relationships in the db
            Log.info('user relation going to delete id', id);
            const deletedRelation = await this.userRelationDao.deleteAllUserRelationByUserId(id);
            Log.info('return of deleteAllUserRelationByUserId method', deletedRelation);
            //delete user's relationships in the db
            Log.info('user pots going to delete id', id);
            const deletedPost = await this.postDao.deleteAllPostsByUserId(id);
            Log.info('return of deleteAllPostsByUserId method', deletedPost);
            Log.info('finish deleteUserRelatedAllDataByUserId service', id);
            return id;
        } catch (error) {
            Log.error('error deleteUserRelatedAllDataByUserId service', error);
            return error.message;
        }
    }

    public async deleteUserById(id: string): Promise<any> {
        Log.info('deleteUserById service input id', id);
        try {
            const user = await this.userDao.getUserByUserId(id);
            Log.info('return of getUser method', user);
            if (!user?._id) {
                Log.info('return from deleteUserById service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const deletedId = await this.deleteUserRelatedAllDataByUserId(id);
            Log.info('return val of deleteUserRelatedAllDataByUserId method', deletedId);
            const deletedUser = await this.userDao.deleteUserById(id);
            Log.info('return from deleteUserById service', deletedUser);
            return Response.success(RESPONSE_MEESAGE['USER_DELETED_SUCCESSFULLY']);
        } catch (error) {
            Log.error('return from deleteUserById service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_USER']);
        }
    }
}