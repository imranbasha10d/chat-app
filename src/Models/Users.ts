import mongoose, { Schema } from 'mongoose';
import { UserRoles } from '../Utils/Types';

const UserSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: UserRoles,
        required: true
    },
    personalInfo: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'personalInfo'
    }
}, { timestamps: true })

export default mongoose.model('users', UserSchema)