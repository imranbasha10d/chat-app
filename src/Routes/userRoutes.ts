import { Application } from "express";
import { UserController } from '../Controllers'
import { Auth } from "../Auth/Authentication";
import { Log } from "../Logger";
import { userRoutesPath } from "../Utils/routes";
import PgDatabase from "../PgDatabase/pgDatabase";

class UserRoutes {
    private userController: UserController
    private auth: Auth;
    constructor() {
        this.userController = new UserController();
        this.auth = new Auth();
    }
    public initialRoutes(application: Application) {
        application.route(userRoutesPath.healthCheck).get(async (req, res) => {
            Log.info('user health check success');
            res.send('user health check success')
        });
        application.route(userRoutesPath.createUser)
            .post(this.userController.createUser);
        //Enable "create-admin-user" route when it needs..
        application.route(userRoutesPath.createAdminUser)
            .post(this.userController.createAdminUser);
        application.route(userRoutesPath.signIn)
            .post(this.userController.signin);
        application.route(userRoutesPath.userById)
            .get(this.auth.checkUserValidation, this.userController.getUserDataByUserId);
        application.route(userRoutesPath.userById)
            .post(this.userController.getUsersByUserIds);   //For testing
        application.route(userRoutesPath.updatePasswordById)
            .put(this.auth.checkUserValidation, this.userController.updateUserPassword);
        application.route(userRoutesPath.deleteUserById)
            .delete(this.auth.checkUserValidation, this.userController.deleteUser);
    }
}

export default UserRoutes;