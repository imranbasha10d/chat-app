import mongoose from "mongoose";
import { UserModel } from "../Models";
import { User, UserPassword } from '../Utils/Types'

export class UserDao {
    public async createUser(data: User): Promise<any> {
        console.log('createUser dao input data', data);
        try {
            const newUser = new UserModel({
                username: data.username,
                email: data.email,
                password: data.password,
                role: data.role
            });
            await newUser.save();
            const user = await UserModel.findOne({ username: data.username });
            console.log('createUser dao successfully', user);
            return user && user.toObject();
        } catch (error) {
            console.log('Error in createUser dao', error);
            return error.message;
        }
    }
    public async getUserByUsername(data: string) {
        console.log('getUserByUsername dao input data', data);
        try {
            const user = await UserModel.findOne({ username: data }).select("+password");
            console.log('return of findOne dao', user);
            return user && user.toObject();
        } catch (error) {
            console.log('Error in getUserByUsername dao', error);
            return error.message;
        }
    }
    public async getUsersByUserIds(ids: string[]) {
        console.log('getUsersByUserIds dao input ids', ids);
        try {
            const users = await UserModel.find().where('_id').in(ids).exec();
            console.log('return from getUsersByUserIds dao', users);
            return users;
        } catch (error) {
            console.log('Error in getUsersByUserIds dao', error);
            return error.message;
        }
    }
    public async getUserByUserId(id: string) {
        console.log('getUserByUserId dao input id', id);
        try {
            const user = await UserModel.findById(id);
            console.log('return from findById dao', user);
            return user && user.toObject();
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
            return updatedUser && updatedUser.toObject();
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
            return deletedUser && deletedUser.toObject();
        } catch (error) {
            console.log('Error in deleteUserById dao', error);
            return error.message;
        }
    }
}