import { PostModel } from "../Models";
import { Post } from '../Utils/Types'

export class PostDao {
    public async createPost(data: Post): Promise<any> {
        console.log('createPost dao input data', data);
        try {
            const newPost = new PostModel({
                caption: data.caption,
                mediaUrl: data.mediaUrl,
                ownerId: data.ownerId,
            });
            const postData = await newPost.save();
            console.log('createPost dao successfully', postData);
            return postData && postData.toObject();
        } catch (error) {
            console.log('Error in createPost dao', error);
            return error.message;
        }
    }
    public async getAllPostsByOwnerId(ownerId: string): Promise<any> {
        console.log('getPostByOwnerId dao input ownerId', ownerId);
        try {
            const posts = await PostModel.find({ ownerId });
            console.log('return of find all dao', posts);
            return posts;
        } catch (error) {
            console.log('Error in getPostByOwnerId dao', error);
            return error.message;
        }
    }
    public async getAllPostsByUserIds(userIds: string[]): Promise<any> {
        console.log('getAllPostsByUserIds dao input ownerId', userIds);
        try {
            const posts = await PostModel.find().where('ownerId').in(userIds).exec();
            console.log('return of getAllPostsByUserIds dao', posts);
            return posts;
        } catch (error) {
            console.log('Error in getAllPostsByUserIds dao', error);
            return error.message;
        }
    }
    public async getPostById(id: string): Promise<any> {
        console.log('getPostById dao input id', id);
        try {
            const post = await PostModel.findById(id);
            console.log('return from findById dao', post);
            return post && post.toObject();
        } catch (error) {
            console.log('Error in getPostById dao', error);
            return error.message;
        }
    }
    public async updatePostCaptionById(id: string, caption: string): Promise<any> {
        console.log('updatePostCaptionById dao input id', id);
        console.log('updatePostCaptionById dao input caption', caption);
        try {
            await PostModel.findByIdAndUpdate(id, { caption });
            const updatedPost = await PostModel.findById(id);
            console.log('Return from findByIdAndUpdate', updatedPost);
            return updatedPost && updatedPost.toObject();
        } catch (error) {
            console.log('Error in updatePostCaptionById dao', error);
            return error.message;
        }
    }
    public async deletePostById(id: string): Promise<any> {
        console.log('deletePostById dao input id', id);
        try {
            const deletedPost = await PostModel.findByIdAndDelete(id);
            console.log('Return from deleteOne', deletedPost);
            return deletedPost;
        } catch (error) {
            console.log('Error in deletePostById dao', error);
            return error.message;
        }
    }
    public async deleteAllPostsByUserId(userId: string): Promise<any> {
        console.log('deleteAllPostsByUserId dao input userId', userId);
        try {
            const deletedPosts = await PostModel.deleteMany({ ownerId: userId });
            console.log('Return from deleteAllPostsByUserId', deletedPosts);
            return deletedPosts;
        } catch (error) {
            console.log('Error in deleteAllPostsByUserId dao', error);
            return error.message;
        }
    }
}