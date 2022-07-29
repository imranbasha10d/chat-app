import { Application } from "express";
import { PersonalInfoController } from '../Controllers'
import { Auth } from "../Auth/Authentication";
import { personalInfoRoutesPath } from "../Utils/routes";

class PersonalInfoRoutes {
    private personalInfoController: PersonalInfoController;
    private auth: Auth;
    constructor() {
        this.personalInfoController = new PersonalInfoController();
        this.auth = new Auth();
    }
    public initialRoutes(application: Application) {
        application.route(personalInfoRoutesPath.createPersonalInfo)
            .post(this.auth.checkUserValidation, this.personalInfoController.createPersonalInfo);
        application.route(personalInfoRoutesPath.personalInfoById)
            .get(this.auth.checkUserValidation, this.personalInfoController.getPersonalInfoByUserId);
        application.route(personalInfoRoutesPath.updatePersonalInfoById)
            .put(this.auth.checkUserValidation, this.personalInfoController.updatePersonalInfoByUserId);
    }
}

export default PersonalInfoRoutes;