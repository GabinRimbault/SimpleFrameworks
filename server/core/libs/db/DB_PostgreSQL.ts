import { IDBFactory } from "../interface/IDBFactory"


export class DB_PostgreSQL implements IDBFactory {

    host: string
    user: string
    password: string
    database: string
    haveInstance: boolean
    objMysql: any

    constructor(){
        this.host = ''
        this.user = ''
        this.password = ''
        this.database = ''
        this.haveInstance = false
        this.objMysql = null
    }

    prepareDB(): void{
        //function prepareDB
    }

    reloadDB(): object{
        //function reloadDB
        return this.objMysql
    }

    isConnected(): object{
        //function isConnected
        return this.objMysql
    }

    simpleQuery(method: string, ip_user: string, table: string, req: string, name: string): object{
        //function simpleQuery
        return this.objMysql
    }

    complexQuery(method: string, ip_user: string, req: string, name: string): object{
        //function complexQuery
        return this.objMysql
    }

    checkTable(table: string): boolean{
        //function checkTable
        return true
    }
}