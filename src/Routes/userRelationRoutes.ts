import { Application } from "express";
import { UserRelationController } from '../Controllers';
import { Auth } from "../Auth/Authentication";

class UserRelationRoutes {
    private userRelationController: UserRelationController;
    private auth: Auth;
    constructor() {
        this.userRelationController = new UserRelationController();
        this.auth = new Auth();
    }

    public initialRoutes(application: Application) {
        application.route('/user-request/send').post(this.auth.checkValidUser, this.userRelationController.sendUserRequest);
        application.route('/user-request/accept/:id').post(this.auth.checkValidUser, this.userRelationController.acceptUserRequest);
        application.route('/followers/:id').get(this.auth.checkValidUser, this.userRelationController.getFollowersByUserId); //pagination: {limit, offset}
        application.route('/following/:id').get(this.auth.checkValidUser, this.userRelationController.getFollowingUsersByUserId); //pagination: {limit, offset}
        application.route('/requests/:id').get(this.auth.checkValidUser, this.userRelationController.getRequestersByUserId); //pagination: {limit, offset}
        application.route('/delete-user-relation').delete(this.auth.checkValidUser, this.userRelationController.deleteUserRelationByIds);
        application.route('/delete-user-relation/all/:id').delete(this.auth.checkValidUser, this.userRelationController.deleteAllUserRelationByUserId);
    }
}

export default UserRelationRoutes;