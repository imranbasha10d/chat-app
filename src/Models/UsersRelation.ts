import mongoose, { Schema } from 'mongoose';
import { RelationType } from '../Utils/Types';

const UsersRelationSchema: Schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    followerId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: RelationType,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('usersRelation', UsersRelationSchema)