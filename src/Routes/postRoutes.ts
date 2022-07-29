import { Application } from "express";
import { PostController } from '../Controllers';
import { Auth } from "../Auth/Authentication";
import { postRoutesPath } from "../Utils/routes";

class PostRoutes {
    private postController: PostController
    private auth: Auth;
    constructor() {
        this.postController = new PostController();
        this.auth = new Auth();
    }
    public initialRoutes(application: Application) {
        application.route(postRoutesPath.createPost)
            .post(this.auth.checkUserValidation, this.postController.createPost);
        application.route(postRoutesPath.postById)
            .get(this.auth.checkUserValidation, this.postController.getPostById);
        application.route(postRoutesPath.userFeedsById)
            .get(this.auth.checkUserValidation, this.postController.getUserFeedsByUserId); //pagination: {limit, offset}
        application.route(postRoutesPath.allPostsById)
            .get(this.auth.checkUserValidation, this.postController.getAllPostsByOwnerId); //pagination: {limit, offset}
        application.route(postRoutesPath.updatePostCaptionById)
            .put(this.auth.checkUserValidation, this.postController.updatePostCaptionById);
        application.route(postRoutesPath.deletePostById)
            .delete(this.auth.checkUserValidation, this.postController.deletePostById);
        application.route(postRoutesPath.deleteAllPostsById)
            .delete(this.auth.checkUserValidation, this.postController.deleteAllPostsByUserId);
    }
}

export default PostRoutes;