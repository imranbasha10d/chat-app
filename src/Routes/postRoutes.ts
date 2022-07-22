import { Application } from "express";
import { PostController } from '../Controllers';
import { Auth } from "../Auth/Authentication";

class PostRoutes {
    private postController: PostController
    private auth: Auth;
    constructor() {
        this.postController = new PostController();
        this.auth = new Auth();
    }

    public initialRoutes(application: Application) {
        application.route('/create-post').post(this.auth.checkValidUser, this.postController.createPost);
        application.route('/post/:id').get(this.auth.checkValidUser, this.postController.getPostById);
        application.route('/user-feeds/:id').get(this.auth.checkValidUser, this.postController.getUserFeedsByUserId); //pagination: {limit, offset}
        application.route('/all-posts/:id').get(this.auth.checkValidUser, this.postController.getAllPostsByOwnerId); //pagination: {limit, offset}
        application.route('/update-post/:id').put(this.auth.checkValidUser, this.postController.updatePostCaptionById);
        application.route('/delete-post/:id').delete(this.auth.checkValidUser, this.postController.deletePostById);
        application.route('/delete-posts/all/:id').delete(this.auth.checkValidUser, this.postController.deleteAllPostsByUserId);
    }
}

export default PostRoutes;