import mongoose, { Schema } from 'mongoose';
import { Gender, Status } from '../Utils/types';

const PersonalInfoSchema: Schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Gender,
        required: true
    },
    status: {
        type: String,
        enum: Status,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('personalInfo', PersonalInfoSchema)