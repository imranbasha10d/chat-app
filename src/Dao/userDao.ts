import UserModel from "../Models/Users";
import { User, UserPassword } from '../Utils/Types'

export class UserDao {
    public async createUser(data: User): Promise<any> {
        console.log('createUser dao input data', data);
        try {
            const newUser = new UserModel({
                username: data.username,
                email: data.email,
                password: data.password,
            });
            const user = await newUser.save();
            console.log('createUser dao successfully', user);
            return user;
        } catch (error) {
            console.log('Error in createUser dao', error);
            return error.message;
        }
    }
    public async getUserByUsername(data: string) {
        console.log('getUserByUsername dao input data', data);
        try {
            const user = await UserModel.findOne({ username: data });
            console.log('return of findOne dao', user);
            return user;
        } catch (error) {
            console.log('Error in getUserByUsername dao', error);
            return error.message;
        }
    }
    public async getUserByUserId(id: string) {
        console.log('getUserByUserId dao input id', id);
        try {
            const user = await UserModel.findById(id);
            console.log('return from findById dao', user);
            return user;
        } catch (error) {
            console.log('Error in getUserByUserId dao', error);
            return error.message;
        }
    }
    public async updateUserPassword(id: string, data: UserPassword): Promise<any> {
        console.log('updateUserPassword dao input id', id);
        console.log('updateUserPassword dao input data', data);
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(id, data);
            console.log('Return from findByIdAndUpdate', updatedUser);
            return updatedUser;
        } catch (error) {
            console.log('Error in updateUserPassword dao', error);
            return error.message;
        }
    }
    public async deleteUserById(id: string): Promise<any> {
        console.log('deleteUserById dao input id', id);
        try {
            const deletedUser = await UserModel.findByIdAndDelete(id);
            console.log('Return from deleteOne', deletedUser);
            return deletedUser;
        } catch (error) {
            console.log('Error in deleteUserById dao', error);
            return error.message;
        }
    }
}