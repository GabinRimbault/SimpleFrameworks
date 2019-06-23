const bcrypt = require('bcrypt')
import { options } from './../../config/config';
import { IDBObject } from '../libs/interface/IDBObject';
import { IOptions } from '../libs/interface/IOptions';
import { DB_FACTORY } from './../libs/db/DB_FACTORY';
import { DB_MYSQL } from './../libs/db/DB_MYSQL';


export class MainModel {

    protected addMainModel(options: IOptions,  paramsArray: any): Promise<Object>{
        return new Promise((resolve, reject) => {
            this.DB.simpleQuery(
                options, 
                this.prepareDataforInsert(options, paramsArray)
            )
            .then((res: any) => res.affectedRows >= 1 ? resolve(true) : resolve(false))
            .catch((err: any) => reject(err)) 
        })
    }

    //
    private prepareDataforInsert(options: IOptions, paramsArray: any): any{
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

    public findAllMainModel(options: IOptions){
        return new Promise((resolve, reject) => {
            const mysql = new DB_MYSQL()
            mysql.init()
            mysql.isConnected()

            mysql.simpleQuery(
                `SELECT ${options.field} 
                FROM ${options.table}`,
                options
            )
            .then((res: any) => {
                if(Object.keys(res).length >= 1){
                    console.log('RESPONSE DE MAINMODEL1 = ', res)
                    resolve(res)
                }else{
                    console.log('RESPONSE DE MAINMODEL2 = ', res)
                    resolve(res)
                }
                
            })
            .catch((err: any) => reject(err))
        })


        /*

        simpleQuery(
                `SELECT ${options.field} 
                FROM ${options.table}`,
                options
            )
            .then((res: any) => Object.keys(res).length >= 1 ? resolve(res) : resolve(res))
            .catch((err: any) => reject(err))

            */
    } 

    //Fonction qui permet de rechercher une information
    protected findMainModel(options: IOptions){
        return new Promise((resolve, reject) => {  
            this.DB.simpleQuery(
                `SELECT ${options.field} 
                FROM ${options.table} 
                WHERE ${options.search}='${options.content}'`, 
                options
            )
            .then((res: any) => Object.keys(res).length >= 1 ? resolve(res) : resolve(res))
            .catch((err: any) => reject(err))
        })
    }

    //
    protected findMainModelWithJoin(options: IOptions){
        return new Promise((resolve, reject) => {
            this.DB.simpleQuery(
                `SELECT ${options.field} 
                FROM ${options.table} 
                INNER JOIN ${options.tableJoin} 
                ON ${options.table}.${options.searchTable} = ${options.tableJoin}.${options.searchJoin} 
                WHERE ${options.where} = '${options.search}'`, 
                options
            )
            .then((res: any) => Object.keys(res).length >= 1 ? resolve(res) : resolve(res))
            .catch((err: any) => reject(err))
        })
    }

    protected findMainModelWithMultipleCondition(options: IOptions, paramsArray: any){
        return new Promise((resolve, reject) => {
            this.DB.simpleQuery(
                this.prepareDataCondition(options, paramsArray), 
                options
            )
            .then((res: any) => Object.keys(res).length >= 1 ? resolve(res) : resolve(res))
            .catch((err: any) => reject(err))
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
    protected lastItemMainModel(options: IOptions){
        return new Promise((resolve, reject) => {
            if(options.condition){
                this.DB.simpleQuery(
                    `SELECT MAX(${options.item}) 
                    AS lastid FROM ${options.table} 
                    WHERE ${options.search}='${options.content}'`,
                    options
                )
                .then((res: any) => res[0].lastid === null ? resolve(res) : resolve(res))
                .catch((err: any) => reject(err))
            }else{
                this.DB.simpleQuery(
                    `SELECT MAX(${options.item}) 
                    AS lastid FROM ${options.table} `,
                    options
                )
                .then((res: any) => res[0].lastid === null ? resolve(res) : resolve(res))
                .catch((err: any) => reject(err))
            }
        })
    }

    //Fonction qui permet de compter un item
    protected countItemModel(options: IOptions){
        return new Promise((resolve, reject) => {
            this.DB.simpleQuery(
                `SELECT COUNT(${options.item}) 
                FROM ${options.table}`, 
                options
            )
            .then((res: any) => res[0].count >= 1 ? resolve(res) : resolve(res))
            .catch((err: any) => reject(err))
        })
    }

    //
    protected countItemASCountModel(options: IOptions){
        return new Promise((resolve, reject) => {
            this.DB.simpleQuery(
                `SELECT COUNT(*) AS count 
                FROM ${options.table} 
                WHERE ${options.item}='${options.content}'`,
                options
            )
            .then((res: any) => res[0].count >= 1 ? resolve(res) : resolve(res))
            .catch((err: any) => reject(err))
        })
    }

    //Function qui permet de mettre a jour une entrer 
    protected updateMainModel(options: IOptions, paramsArray: any){
        return new Promise((resolve, reject) => {
            return new Promise((resolve, reject) => {
                this.findMainModel(options)
                .then(() => {
                    this.DB.simpleQuery(
                        this.prepareDataUpdate(options, paramsArray), 
                        options
                    )
                    .then((res: any) => res.affectedRows >= 1 ? resolve(res) : resolve(res))
                    .catch((err: any) => reject(err))
                })
                .catch((err: any) => reject(err))
            })
        })
    }

    //Function qui prepare la requete update
    protected prepareDataUpdate(options: IOptions, paramsArray: any){
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
    protected deleteMainModel(options: IOptions){
        return new Promise((resolve, reject) => {
            this.findMainModel(options)
            .then(() => {
                this.DB.simpleQuery(
                    `DELETE FROM ${options.table} 
                    WHERE ${options.search}='${options.id}'`, 
                    options
                )
                .then((res: any) => res.affectedRows >= 1 ? resolve(res) : resolve(res))
                .catch((err: any) => reject(err))
            })
            .catch((err: any) => reject(err))
        })
    }

    //Fonction qui permet d'encrypter une information
    protected hashBcrypt(params: any){
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(options.sf_salt + params, salt);
    }

    //Fonction qui permet de vérifier si une information encrypté est identique avec un autre passé en parametre
    protected verifBcrypt(params: any, hash: any){
        if(bcrypt.compareSync(options.sf_salt + params, hash)) 
            return true
        else 
            return false
    }

    //FIXME A CHANGER
    private sendRequest(code: any, response: any){
        return { code, response }
    }

    //
    protected executePersonnalRequest(options: IOptions){
        return new Promise((resolve, reject) => {
            this.DB.simpleQuery(
                options.requestSQL, 
                options
            )
            .then((res: any) => resolve(res))
            .catch((err: any) => reject(err))
        })
    }

}