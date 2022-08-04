import { UserModel } from "../Models";
import { User, UserPassword } from '../Utils/types';
import { Log } from "../Logger";

export class UserDao {
    public async createUser(data: User): Promise<any> {
        Log.info('createUser dao input data', data);
        try {
            const newUser = new UserModel({
                username: data.username,
                email: data.email,
                password: data.password,
                role: data.role
            });
            const createdUser = await newUser.save().then(async (data) => {
                Log.info('Checking value of save method: data: ', data);
                await UserModel.findByIdAndUpdate(data._id, { personalInfo: data._id });
                return data;
            });
            Log.info('Return value of save method: data: ', createdUser);
            const user = await UserModel.findById(createdUser._id);
            Log.info('createUser dao successfully', user);
            return user && user.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in createUser dao', error);
            return error.message;
        }
    }
    public async getUserByUsername(data: string) {
        Log.info('getUserByUsername dao input data', data);
        try {
            const user = await UserModel.findOne({ username: data }).select("+password");
            Log.info('return of findOne dao', user);
            return user && user.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in getUserByUsername dao', error);
            return error.message;
        }
    }
    public async getUserDataByUserId(id: string) {
        Log.info('getUserDataByUserId dao input id', id);
        try {
            const user = await UserModel.findOne({ '_id': id }).populate({ path: 'personalInfo' }).exec();
            Log.info('return of findOne dao', user);
            return user && user.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in getUserDataByUserId dao', error);
            return error.message;
        }
    }
    public async getUsersByUserIds(ids: string[]) {
        Log.info('getUsersByUserIds dao input ids', ids);
        try {
            const users = await UserModel.find().where('_id').in(ids).exec();
            Log.info('return from getUsersByUserIds dao', users);
            return users;
        } catch (error) {
            Log.error('Error in getUsersByUserIds dao', error);
            return error.message;
        }
    }
    public async getUserByUserId(id: string) {
        Log.info('getUserByUserId dao input id', id);
        try {
            const user = await UserModel.findById(id);
            Log.info('return from findById dao', user);
            return user && user.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in getUserByUserId dao', error);
            return error.message;
        }
    }
    public async updateUserPassword(id: string, data: UserPassword): Promise<any> {
        Log.info('updateUserPassword dao input id', id);
        Log.info('updateUserPassword dao input data', data);
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, data);
            Log.info('Return from findByIdAndUpdate', updatedUser);
            return updatedUser && updatedUser.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in updateUserPassword dao', error);
            return error.message;
        }
    }
    public async deleteUserById(id: string): Promise<any> {
        Log.info('deleteUserById dao input id', id);
        try {
            const deletedUser = await UserModel.findByIdAndDelete(id);
            Log.info('Return from deleteOne', deletedUser);
            return deletedUser && deletedUser.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in deleteUserById dao', error);
            return error.message;
        }
    }
}