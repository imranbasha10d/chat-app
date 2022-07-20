import { PostDao, UserDao, UserRelationDao } from "../Dao";
import { Post } from "../Utils/Types";
import { Response, RESPONSE_MEESAGE } from "../Utils/Response";

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
        console.log('createPost service input', data);
        try {
            let user = await this.userDao.getUserByUserId(data.ownerId);
            console.log('return value from getUserByUserId: user: ', user);
            if (!user?._id) {
                console.log('return from createPost service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const newPost = await this.postDao.createPost(data);
            console.log('return from createPost service', newPost);
            return Response.success(newPost);
        } catch (error) {
            console.log('return from createPost service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_CREATE_POST']);
        }
    }

    public async getPostById(id: string): Promise<any> {
        console.log('getPostById service input ownerId', id);
        try {
            let post = await this.postDao.getPostById(id);
            if (!post?._id) {
                console.log('return from getPostById service', post);
                return Response.notFound(RESPONSE_MEESAGE['POST_NOT_FOUND']);
            }
            console.log('return from getPostById service', post);
            return Response.success(post);
        } catch (error) {
            console.log('return from getPostById service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getAllPostsByOwnerId(ownerId: string): Promise<any> {
        console.log('getAllPostsByOwnerId service input ownerId', ownerId);
        try {
            let user = await this.userDao.getUserByUserId(ownerId);
            console.log('return value from getUserByUserId: user: ', user);
            if (!user?._id) {
                console.log('return from getAllPostsByOwnerId service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const posts = await this.postDao.getAllPostsByOwnerId(ownerId);
            console.log('return from getAllPostsByOwnerId service', posts);
            return Response.success(posts);
        } catch (error) {
            console.log('return from getAllPostsByOwnerId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getAllPostsByUserIds(userIds: string[]): Promise<any> {
        console.log('getAllPostsByUserIds service input userIds', userIds);
        try {
            const posts = await this.postDao.getAllPostsByUserIds(userIds);
            console.log('return from getAllPostsByUserIds service', posts);
            return Response.success(posts);
        } catch (error) {
            console.log('return from getAllPostsByUserIds service', error);
            return Response.badRequest(error.message);
        }
    }

    public async getUserFeedsByUserId(userId: string): Promise<any> {
        console.log('getUserFeedsByUserId service input userId', userId);
        try {
            let user = await this.userDao.getUserByUserId(userId);
            console.log('return value from getUserByUserId: user: ', user);
            if (!user?._id) {
                console.log('return from getUserFeedsByUserId service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const followingUserIds = await this.userRelationDao.getFollowingUsersByUserId(userId);
            console.log('return value from getFollowingUsersByUserId method', followingUserIds);
            const feeds = await this.postDao.getAllPostsByUserIds(followingUserIds);
            console.log('return from getUserFeedsByUserId', feeds);
            return Response.success(feeds);
        } catch (error) {
            console.log('return from getUserFeedsByUserId service', error);
            return Response.badRequest(error.message);
        }
    }

    public async updatePostCaptionById(id: string, caption: string): Promise<any> {
        console.log('updatePostCaptionById service input id', id);
        console.log('updatePostCaptionById service input caption', caption);
        try {
            let existingPost = await this.postDao.getPostById(id);
            console.log('return value from getPostById: existingPost: ', existingPost);
            if (!existingPost?._id) {
                console.log('return from updatePostCaptionById service', existingPost);
                return Response.notFound(RESPONSE_MEESAGE['POST_NOT_FOUND']);
            }
            const updatedPost = await this.postDao.updatePostCaptionById(id, caption);
            console.log('return from updatePostCaptionById service', updatedPost);
            return Response.success(updatedPost);
        } catch (error) {
            console.log('return from updatePostCaptionById service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_UPDATE_POST']);
        }
    }

    public async deletePostById(id: string): Promise<any> {
        console.log('deletePostById service input id', id);
        try {
            let existingPost = await this.postDao.getPostById(id);
            console.log('return value from getPostById: existingPost: ', existingPost);
            if (!existingPost?._id) {
                console.log('return from deletePostById service', existingPost);
                return Response.notFound(RESPONSE_MEESAGE['POST_NOT_FOUND']);
            }
            const deletedPost = await this.postDao.deletePostById(id);
            console.log('return from deletePostById service', deletedPost);
            return Response.success(RESPONSE_MEESAGE['POST_DELETED_SUCCESSFULLY']);
        } catch (error) {
            console.log('return from deletePostById service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_POST']);
        }
    }

    public async deleteAllPostsByUserId(userId: string): Promise<any> {
        console.log('deleteAllPostsByUserId service input userId', userId);
        try {
            let user = await this.userDao.getUserByUserId(userId);
            console.log('return value from getUserByUserId: existingPost: ', user);
            if (!user?._id) {
                console.log('return from deleteAllPostsByUserId service', user);
                return Response.notFound(RESPONSE_MEESAGE['USER_NOT_FOUND']);
            }
            const deletedPosts = await this.postDao.deleteAllPostsByUserId(userId);
            console.log('return from deleteAllPostsByUserId service', deletedPosts);
            return Response.success(RESPONSE_MEESAGE['POSTS_DELETED_SUCCESSFULLY']);
        } catch (error) {
            console.log('error from deleteAllPostsByUserId service', error);
            return Response.badRequest(RESPONSE_MEESAGE['FAILED_TO_DELETE_POSTS']);
        }
    }

}