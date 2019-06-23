import { MainModel } from './../../../../core/models/MainModel';
import { IDBObject } from '../../../../core/libs/interface/IDBObject';
import { IOptions } from '../../../../core/libs/interface/IOptions';

export class UserModel extends MainModel{

    protected findAllUserModel(options: IOptions): any{
        return new Promise((resolve, reject) => {
            super.findAllMainModel(options)
            .then((res: any) => {
                console.log('RESPONSE DE USERMODEL = ', res)
                resolve(res)
            })
            .catch((err: any) => reject(err))
        })
    }
}