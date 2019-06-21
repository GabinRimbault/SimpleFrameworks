import { IDBFactory } from "../interface/IDBFactory"
const mysql = require('mysql')

import {fopen, fgets, eof, fclose} from "../../bin/func_files"


import { Logs } from './../class/Logs';
import { mysqlError } from "../../../config/error/mysql.error";

export class DB_MYSQL implements IDBFactory {

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

    init(): void{
        Logs.tryCatch(() => {
            //Search Files
            var r=fopen('server/config/db/configMySQL.conf',"r")
            var i = 0
            var data = []

            do
            {
                var line=fgets(r)  
                data.push(line)
                i++
            }
            while (!eof(r))

            fclose(r)

            this.host = data[2].split('=')[1]
            this.user = data[3].split('=')[1]
            this.password = data[4].split('=')[1]
            this.database = data[5].split('=')[1]
        }, mysqlError.initDB)
    }

    reloadDB(): any{
        Logs.tryCatch(() => {
            this.init()

            this.objMysql = mysql.createConnection({
                host     : this.host,
                user     : this.user,
                password : this.password,
                database : this.database,
                multipleStatements: true
            })

            this.haveInstance = true
            console.log('MySQL is Reloading !')
            return this.objMysql
        }, mysqlError.reloadDB)
    }

    isConnected(): any{
        Logs.tryCatch(() => {
            if(this.haveInstance){
                console.log('MySQL is already loading')
                return this.objMysql
              }else{
                Logs.tryCatch(() => {
                    this.objMysql = mysql.createConnection({
                        host     : this.host,
                        user     : this.user,
                        password : this.password,
                        database : this.database,
                        multipleStatements: true
                      })
        
                      console.log('MySQL is loading')
                      console.log('----------------')
                      this.haveInstance = true
            
                      return this.objMysql
                }, mysqlError.createConnection)
              }
        }, mysqlError.createConnection)


        
    }

    simpleQuery(method: string, ip_user: string, table: string, req: string, name: string): any{
        Logs.tryCatch(() => {}, {})
    }

    complexQuery(method: string, ip_user: string, req: string, name: string): any{
        Logs.tryCatch(() => {}, {})
    }

    checkTable(table: string): any{
        Logs.tryCatch(() => {}, {})
    }
}