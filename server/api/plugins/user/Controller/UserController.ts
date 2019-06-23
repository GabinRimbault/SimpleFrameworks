import { UserModel } from './../Model/UserModel';
import { MainController } from './../../../../core/controllers/MainController';
import { IResponseController } from '../../../../core/libs/interface/IResponseController';
import { IOptions } from '../../../../core/libs/interface/IOptions';
const ip = require('ip');


export class UserController extends UserModel{

    public findAllUserController(req: Request, res: Response){
        let options: IOptions = {
            "table": "sf_users",
            "field": "*",
            "name": "findAllUser",
            "method": req.method,
            "ip": ip.address()
        }

        super.findAllUserModel(options)
        .then((response: IResponseController) => MainController.response(req, res, response))
        .catch((error: IResponseController) => MainController.response(req, res, error))
    }


}
