const bcrypt = require('bcrypt')
import { options } from './../../config/config';
import { IOptions } from '../libs/interface/IOptions';
import { DB_FACTORY } from './../libs/db/DB_FACTORY';
import { DB_MYSQL } from './../libs/db/DB_MYSQL';

const DB = DB_FACTORY.loadDB('MySQL')

export class MainModel {

    //res.affectedRows >= 1
    protected addMainModel(options: IOptions,  paramsArray: any): Promise<any>{
        return new Promise((resolve, reject) => {
            DB.simpleQuery(
                options, 
                this.prepareDataforInsert(options, paramsArray)
            )
            .then((res: Response) => resolve(res))
            .catch((err: Response) => reject(err)) 
        })
    }

    //
    protected prepareDataforInsert(options: IOptions, paramsArray: any): any{
        let preFixData: string = "", 
        suFixData: string = "", 
        i: number = 1

        for(let key in paramsArray){
            if(i < Object.keys(paramsArray).length){
                preFixData = preFixData + "`" + key + "`, "
                suFixData = suFixData + "'" + paramsArray[key] + "', "
            }else{
                preFixData = preFixData + "`" + key + "`"
                suFixData = suFixData + "'" + paramsArray[key] + "'"
                return "INSERT INTO " + options.table + " (" + preFixData + ") VALUES (" + suFixData + ")"
            }
            i++
        }
    }

    //
    protected findAllMainModel(options: IOptions): Promise<any>{
        return new Promise((resolve, reject) => {
            DB.simpleQuery(
                `SELECT ${options.field} FROM ${options.table}`,
                options
            )
            .then((res: Response) => resolve(res))
            .catch((err: Response) => reject(err))
        })
    } 

    //Fonction qui permet de rechercher une information
    //Object.keys(res).length >= 1
    protected findMainModel(options: IOptions): Promise<any>{
        return new Promise((resolve, reject) => {  
            DB.simpleQuery(
                `SELECT ${options.field} 
                FROM ${options.table} 
                WHERE ${options.search}='${options.content}'`, 
                options
            )
            .then((res: Response) => resolve(res))
            .catch((err: Response) => reject(err))
        })
    }

    //Object.keys(res).length >= 1
    protected findMainModelWithJoin(options: IOptions): Promise<any>{
        return new Promise((resolve, reject) => {
            DB.simpleQuery(
                `SELECT ${options.field} 
                FROM ${options.table} 
                INNER JOIN ${options.tableJoin} 
                ON ${options.table}.${options.searchTable} = ${options.tableJoin}.${options.searchJoin} 
                WHERE ${options.where} = '${options.search}'`, 
                options
            )
            .then((res: Response) => resolve(res))
            .catch((err: Response) => reject(err))
        })
    }

    //Object.keys(res).length >= 1
    protected findMainModelWithMultipleCondition(options: IOptions, paramsArray: any): Promise<any>{
        return new Promise((resolve, reject) => {
            DB.simpleQuery(
                this.prepareDataCondition(options, paramsArray), 
                options
            )
            .then((res: Response) => resolve(res))
            .catch((err: Response) => reject(err))
        })
    }

    //Function qui prepare la requete multiplecondition
    private prepareDataCondition(options: IOptions, paramsArray: any): any{
        let data: string = ""
        var i: number = 1

        for(let key in paramsArray){
            if(i < Object.keys(paramsArray).length)
                data = data + key + '=' + '"' + paramsArray[key] + '"' + ' && '
            else{
                data = data + key + '=' + "'" + paramsArray[key] + "'"
                return 'SELECT ' + options.field + ' FROM ' + options.table + ' WHERE ' + data
            }
            i++
        }
    }

    //Fonction qui permet de récupérer le dernier item d'une table
    /*
        method, table, condition = false, search = 'id', content = '1', item = 'id'
    */
    protected lastItemMainModel(options: IOptions): Promise<any>{
        return new Promise((resolve, reject) => {
            if(options.condition){
                DB.simpleQuery(
                    `SELECT MAX(${options.item}) 
                    AS lastid FROM ${options.table} 
                    WHERE ${options.search}='${options.content}'`,
                    options
                )
                //res[0].lastid === null
                .then((res: Response) => resolve(res))
                .catch((err: Response) => reject(err))
            }else{
                DB.simpleQuery(
                    `SELECT MAX(${options.item}) 
                    AS lastid FROM ${options.table} `,
                    options
                )
                //res[0].lastid === null
                .then((res: Response) => resolve(res))
                .catch((err: Response) => reject(err))
            }
        })
    }

    //Fonction qui permet de compter un item
    //res[0].count >= 1
    protected countItemModel(options: IOptions): Promise<any>{
        return new Promise((resolve, reject) => {
            DB.simpleQuery(
                `SELECT COUNT(${options.item}) 
                FROM ${options.table}`, 
                options
            )
            .then((res: Response) => resolve(res))
            .catch((err: Response) => reject(err))
        })
    }

    //res[0].count >= 1
    protected countItemASCountModel(options: IOptions): Promise<any>{
        return new Promise((resolve, reject) => {
            DB.simpleQuery(
                `SELECT COUNT(*) AS count 
                FROM ${options.table} 
                WHERE ${options.item}='${options.content}'`,
                options
            )
            .then((res: Response) => resolve(res))
            .catch((err: Response) => reject(err))
        })
    }

    //Function qui permet de mettre a jour une entrer 
    protected updateMainModel(options: IOptions, paramsArray: any): Promise<any>{
        return new Promise((resolve, reject) => {
            return new Promise((resolve, reject) => {
                this.findMainModel(options)
                .then(() => {
                    DB.simpleQuery(
                        this.prepareDataUpdate(options, paramsArray), 
                        options
                    )
                    //res.affectedRows >= 1
                    .then((res: Response) => resolve(res))
                    .catch((err: Response) => reject(err))
                })
                .catch((err: Response) => reject(err))
            })
        })
    }

    //Function qui prepare la requete update
    protected prepareDataUpdate(options: IOptions, paramsArray: any): any{
        let data: string = ""
        var i: number = 1
        for(let key in paramsArray){
            if(i < Object.keys(paramsArray).length){
                data = data + key + '=' + '"' + paramsArray[key] + '"' + ', '
            }else{
                data = data + key + '=' + "'" + paramsArray[key] + "'"
                return "UPDATE " + options.table + " SET " + data + " WHERE " + options.where + "=" + options.search
            }
            i++
        }
    }

//----------------------------------------------- Delete
    
    //Fonction qui permet de supprimer une entrer via sont id
    protected deleteMainModel(options: IOptions): Promise<any>{
        return new Promise((resolve, reject) => {
            this.findMainModel(options)
            .then(() => {
                DB.simpleQuery(
                    `DELETE FROM ${options.table} 
                    WHERE ${options.search}='${options.id}'`, 
                    options
                )
                //res.affectedRows >= 1
                .then((res: Response) => resolve(res))
                .catch((err: Response) => reject(err))
            })
            .catch((err: Response) => reject(err))
        })
    }

    //Fonction qui permet d'encrypter une information
    protected hashBcrypt(params: any): string{
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(options.sf_salt + params, salt);
    }

    //Fonction qui permet de vérifier si une information encrypté est identique avec un autre passé en parametre
    protected verifBcrypt(params: any, hash: any): boolean{
        if(bcrypt.compareSync(options.sf_salt + params, hash)) 
            return true
        else 
            return false
    }

    //
    public sendRequest(result: boolean, http: number, nbResult: number, response: Response ): object{
        return { 
            result: result,
            http: http,
            nbResult: nbResult,
            object: response
        }
    }

    //
    protected executePersonnalRequest(options: IOptions): Promise<any>{
        return new Promise((resolve, reject) => {
            DB.simpleQuery(
                options.requestSQL, 
                options
            )
            .then((res: Response) => resolve(res))
            .catch((err: Response) => reject(err))
        })
    }

}