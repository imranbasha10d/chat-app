import { Application } from "express";
import { UserRelationController } from '../Controllers';
import { Auth } from "../Auth/Authentication";
import { userRelationRoutesPath } from "../Utils/routes";

class UserRelationRoutes {
    private userRelationController: UserRelationController;
    private auth: Auth;
    constructor() {
        this.userRelationController = new UserRelationController();
        this.auth = new Auth();
    }
    public initialRoutes(application: Application) {
        application.route(userRelationRoutesPath.userRequestSend)
            .post(this.auth.checkUserValidation, this.userRelationController.sendUserRequest);
        application.route(userRelationRoutesPath.userRequestAcceptById)
            .post(this.auth.checkUserValidation, this.userRelationController.acceptUserRequest);
        application.route(userRelationRoutesPath.followersById)
            .get(this.auth.checkUserValidation, this.userRelationController.getFollowersByUserId); //pagination: {limit, offset}
        application.route(userRelationRoutesPath.followingById)
            .get(this.auth.checkUserValidation, this.userRelationController.getFollowingUsersByUserId); //pagination: {limit, offset}
        application.route(userRelationRoutesPath.requestById)
            .get(this.auth.checkUserValidation, this.userRelationController.getRequestersByUserId); //pagination: {limit, offset}
        application.route(userRelationRoutesPath.deleteUserRelation)
            .delete(this.userRelationController.deleteUserRelationByIds);   //It should bypass the auth through either userId or followerId only. Need to add.
        application.route(userRelationRoutesPath.deleteUserRelationAllById)
            .delete(this.auth.checkUserValidation, this.userRelationController.deleteAllUserRelationByUserId);
    }
}

export default UserRelationRoutes;