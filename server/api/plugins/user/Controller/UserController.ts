import { UserModel } from './../Model/UserModel';
import { DB_FACTORY } from '../../../../core/libs/db/DB_FACTORY';
import { MainController } from './../../../../core/controllers/MainController';

export class UserController extends UserModel{

    public findAllUserController(req: Request, res: any){
        let options = {
            "table": "sf_users",
            "field": "*"
        }

        super.findAllUserModel(options)
        .then((response: any) => {


            console.log('Response de UserController = ', response)

            MainController.response(req, res, response = {
                "result": true,
                "code": 200,
                "response": response
            })
        })
        .catch((error: any) => MainController.response(req, res, error))
    }


}