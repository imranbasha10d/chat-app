import { PostModel } from "../Models";
import { Post } from '../Utils/types';
import { Log } from "../Logger";

export class PostDao {
    public async createPost(data: Post): Promise<any> {
        Log.info('createPost dao input data', data);
        try {
            const newPost = new PostModel({
                caption: data.caption,
                mediaUrl: data.mediaUrl,
                ownerId: data.ownerId,
            });
            const postData = await newPost.save();
            Log.info('createPost dao successfully', postData);
            return postData && postData.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in createPost dao', error);
            return error.message;
        }
    }
    public async getAllPostsByOwnerId(ownerId: string, limit: number, offset: number): Promise<any> {
        Log.info('getPostByOwnerId dao input ownerId', ownerId);
        Log.info('getPostByOwnerId dao input limit', limit);
        Log.info('getPostByOwnerId dao input offset', offset);
        try {
            const posts = await PostModel.find({ ownerId }).skip(offset).limit(limit);
            Log.info('return of find all dao', posts);
            return posts;
        } catch (error) {
            Log.error('Error in getPostByOwnerId dao', error);
            return error.message;
        }
    }
    public async getAllPostsByOwnerIds(ownerIds: string[], limit: number, offset: number): Promise<any> {
        Log.info('getAllPostsByOwnerIds dao input ownerId', ownerIds);
        Log.info('getAllPostsByOwnerIds dao input limit', limit);
        Log.info('getAllPostsByOwnerIds dao input offset', offset);
        try {
            const posts = await PostModel.find().where('ownerId').in(ownerIds).skip(offset).limit(limit).exec();
            Log.info('return of getAllPostsByOwnerIds dao', posts);
            return posts;
        } catch (error) {
            Log.error('Error in getAllPostsByOwnerIds dao', error);
            return error.message;
        }
    }
    public async getPostById(id: string): Promise<any> {
        Log.info('getPostById dao input id', id);
        try {
            const post = await PostModel.findById(id);
            Log.info('return from findById dao', post);
            return post && post.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in getPostById dao', error);
            return error.message;
        }
    }
    public async updatePostCaptionById(id: string, caption: string, ownerId: string): Promise<any> {
        Log.info('updatePostCaptionById dao input id', id);
        Log.info('updatePostCaptionById dao input caption', caption);
        Log.info('updatePostCaptionById dao input ownerId', ownerId);
        try {
            await PostModel.findByIdAndUpdate(id, { caption, ownerId });
            const updatedPost = await PostModel.findById(id);
            Log.info('Return from findByIdAndUpdate', updatedPost);
            return updatedPost && updatedPost.toObject({ versionKey: false });
        } catch (error) {
            Log.error('Error in updatePostCaptionById dao', error);
            return error.message;
        }
    }
    public async deletePostById(id: string): Promise<any> {
        Log.info('deletePostById dao input id', id);
        try {
            const deletedPost = await PostModel.findByIdAndDelete(id);
            Log.info('Return from deleteOne', deletedPost);
            return deletedPost;
        } catch (error) {
            Log.error('Error in deletePostById dao', error);
            return error.message;
        }
    }
    public async deleteAllPostsByUserId(userId: string): Promise<any> {
        Log.info('deleteAllPostsByUserId dao input userId', userId);
        try {
            const deletedPosts = await PostModel.deleteMany({ ownerId: userId });
            Log.info('Return from deleteAllPostsByUserId', deletedPosts);
            return deletedPosts;
        } catch (error) {
            Log.error('Error in deleteAllPostsByUserId dao', error);
            return error.message;
        }
    }
}