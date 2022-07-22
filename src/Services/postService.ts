import { PostDao, UserDao, UserRelationDao } from "../Dao";
import { Post } from "../Utils/Types";
import { Response, RESPONSE_MEESAGE } from "../Utils/Response";
import { Log } from "../Logger";

export default class PostService {
    private postDao: PostDao;
    private userDao: UserDao;
    private userRelationDao: UserRelationDao;
    constructor() {
        this.postDao = new PostDao();
        this.userDao = new UserDao();
        this.userRelationDao = new UserRelationDao();
    }

    public async createPost(data: Post): Promise<any> {
        Log.info('createPost service input', data);
        try {
            let user = await this.userDao.getUserByUserId(data.ownerId);
            Log.info('return value from getUserByUserId: user: ', user);
            if (!user?._id) {
                Log.info('return from createPost service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const newPost = await this.postDao.createPost(data);
            Log.info('return from createPost service', newPost);
            return Response.success(newPost);
        } catch (error) {
            Log.error('return from createPost service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_CREATE_POST']);
        }
    }

    public async getPostById(id: string): Promise<any> {
        Log.info('getPostById service input ownerId', id);
        try {
            let post = await this.postDao.getPostById(id);
            if (!post?._id) {
                Log.info('return from getPostById service', post);
                return Response.notFound(RESPONSE_MEESAGE['POST_NOT_FOUND']);
            }
            Log.info('return from getPostById service', post);
            return Response.success(post);
        } catch (error) {
            Log.error('return from getPostById service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getAllPostsByOwnerId(ownerId: string, limit?: number, offset?: number): Promise<any> {
        Log.info('getAllPostsByOwnerId service input ownerId', ownerId);
        Log.info('getAllPostsByOwnerId service input limit', limit);
        Log.info('getAllPostsByOwnerId service input offset', offset);
        try {
            let user = await this.userDao.getUserByUserId(ownerId);
            Log.info('return value from getUserByUserId: user: ', user);
            if (!user?._id) {
                Log.info('return from getAllPostsByOwnerId service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const posts = await this.postDao.getAllPostsByOwnerId(ownerId, limit, offset);
            Log.info('return from getAllPostsByOwnerId service', posts);
            return Response.success(posts);
        } catch (error) {
            Log.error('return from getAllPostsByOwnerId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getAllPostsByUserIds(userIds: string[]): Promise<any> {
        Log.info('getAllPostsByUserIds service input userIds', userIds);
        try {
            const posts = await this.postDao.getAllPostsByUserIds(userIds);
            Log.info('return from getAllPostsByUserIds service', posts);
            return Response.success(posts);
        } catch (error) {
            Log.error('return from getAllPostsByUserIds service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getUserFeedsByUserId(userId: string, limit?: number, offset?: number): Promise<any> {
        Log.info('getUserFeedsByUserId service input userId', userId);
        Log.info('getUserFeedsByUserId service input limit', limit);
        Log.info('getUserFeedsByUserId service input offset', offset);
        try {
            let user = await this.userDao.getUserByUserId(userId);
            Log.info('return value from getUserByUserId: user: ', user);
            if (!user?._id) {
                Log.info('return from getUserFeedsByUserId service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const followingUserIds = await this.userRelationDao.getFollowingUsersByUserId(userId);
            Log.info('return value from getFollowingUsersByUserId method', followingUserIds);
            const feeds = await this.postDao.getAllPostsByUserIds(followingUserIds, limit, offset);
            Log.info('return from getUserFeedsByUserId', feeds);
            return Response.success(feeds);
        } catch (error) {
            Log.error('return from getUserFeedsByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async updatePostCaptionById(id: string, caption: string): Promise<any> {
        Log.info('updatePostCaptionById service input id', id);
        Log.info('updatePostCaptionById service input caption', caption);
        try {
            let existingPost = await this.postDao.getPostById(id);
            Log.info('return value from getPostById: existingPost: ', existingPost);
            if (!existingPost?._id) {
                Log.info('return from updatePostCaptionById service', existingPost);
                return Response.notFound(RESPONSE_MEESAGE['POST_NOT_FOUND']);
            }
            const updatedPost = await this.postDao.updatePostCaptionById(id, caption);
            Log.info('return from updatePostCaptionById service', updatedPost);
            return Response.success(updatedPost);
        } catch (error) {
            Log.error('return from updatePostCaptionById service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_UPDATE_POST']);
        }
    }

    public async deletePostById(id: string): Promise<any> {
        Log.info('deletePostById service input id', id);
        try {
            let existingPost = await this.postDao.getPostById(id);
            Log.info('return value from getPostById: existingPost: ', existingPost);
            if (!existingPost?._id) {
                Log.info('return from deletePostById service', existingPost);
                return Response.notFound(RESPONSE_MEESAGE['POST_NOT_FOUND']);
            }
            const deletedPost = await this.postDao.deletePostById(id);
            Log.info('return from deletePostById service', deletedPost);
            return Response.success(RESPONSE_MEESAGE['POST_DELETED_SUCCESSFULLY']);
        } catch (error) {
            Log.error('return from deletePostById service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_POST']);
        }
    }

    public async deleteAllPostsByUserId(userId: string): Promise<any> {
        Log.info('deleteAllPostsByUserId service input userId', userId);
        try {
            let user = await this.userDao.getUserByUserId(userId);
            Log.info('return value from getUserByUserId: existingPost: ', user);
            if (!user?._id) {
                Log.info('return from deleteAllPostsByUserId service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const deletedPosts = await this.postDao.deleteAllPostsByUserId(userId);
            Log.info('return from deleteAllPostsByUserId service', deletedPosts);
            return Response.success(RESPONSE_MEESAGE['POSTS_DELETED_SUCCESSFULLY']);
        } catch (error) {
            Log.error('error from deleteAllPostsByUserId service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_POSTS']);
        }
    }

}