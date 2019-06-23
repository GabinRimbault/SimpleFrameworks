import { MainModel } from './../../../../core/models/MainModel';
import { IOptions } from '../../../../core/libs/interface/IOptions';

export class UserModel extends MainModel{

    protected findAllUserModel(options: IOptions): Promise<any>{
        return new Promise((resolve, reject) => {
            super.findAllMainModel(options)
            .then((res: Response) => {
                Object.keys(res).length >= 1 ? 
                resolve(super.sendRequest(true, 200, Object.keys(res).length, res)) : 
                resolve(super.sendRequest(true, 205, Object.keys(res).length, res))
            })
            .catch((err: Response) => reject(super.sendRequest(false, 400, 0, err)))
        })
    }

    
}