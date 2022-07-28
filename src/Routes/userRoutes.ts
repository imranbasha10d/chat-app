import { Application } from "express";
import { UserController } from '../Controllers'
import { Auth } from "../Auth/Authentication";
import { Log } from "../Logger";

class UserRoutes {
    private userController: UserController
    private auth: Auth;
    constructor() { 
        this.userController = new UserController();
        this.auth = new Auth();
    }

    public initialRoutes(application: Application) {
        application.route('/health-user').get((req, res) => {
            Log.error('req : ', {health: "Success"});
            res.send('user health check success')
        });
        application.route('/create-user').post(this.userController.createUser);
        application.route('/create-admin-user').post(this.userController.createAdminUser);
        application.route('/sign-in').post(this.userController.signin);
        application.route('/user/:id').get(this.auth.checkValidUser, this.userController.getUserDataByUserId);
        application.route('/update-password/:id').put(this.auth.checkValidUser, this.userController.updatePassword);
        application.route('/delete-user/:id').delete(this.auth.checkValidUser, this.userController.deleteUser);
    }
}

export default UserRoutes;