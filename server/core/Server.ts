const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

import { DB_FACTORY } from './libs/db/DB_FACTORY';
import { Router } from './Router';
import { Plugins } from './../core/libs/class/Plugins';

//------------- Require for logs
import { serverError } from './../config/error/server.error';
import { Logs } from './libs/class/Logs';
import { options } from './../config/config';

export class Server{
    
    env: any
    options: any
    http: any
    expressServer: any
    server: any
    DB: any

    constructor(env: any, options: any){
        this.env = env
        this.options = options
        this.DB = DB_FACTORY.loadDB('MySQL')
    }

    public init(): void{
        console.log(chalk.yellow(
            figlet.textSync('SF', { horizontalLayout: 'full' }),
            chalk.magenta(this.env.mode)
        ))
       
        //Init Environments Variable
        Logs.tryCatch(this.initEnvVar.bind(this), serverError.variableEnv)
                
        //
        this.env.mode === 'Prod' ? 
        Logs.tryCatch(this.loadDepProd.bind(this), serverError.loadDep) : 
        Logs.tryCatch(this.loadDepDev.bind(this), serverError.loadDep)

        //
        Logs.tryCatch(this.loadDB.bind(this), serverError.loadDB)
        
        //
        Logs.tryCatch(this.launchServer.bind(this), serverError.serverNotLaunch)        
    }

    private initEnvVar(): void{
        this.env.mode === 'Prod' ? 
        /* TRUE */ process.env.NODE_ENV = 'production' : 
        /* FALSE */ process.env.NODE_ENV = 'development'
        
        //Declare LogsLevel
        process.env.SF_ENV_LOGS = this.env.logLevel
    }

    private loadDepProd(): void{
        //Load Server
        const express = require('express')
        const bodyParser = require('body-parser')
        const cors = require('cors')

        this.http = require('http')
        
        this.expressServer = new express()

        //MiddleWare
        this.expressServer.use(bodyParser.json({type: '*/*'}))
        this.expressServer.use(bodyParser.urlencoded({ extended: true }))
        this.expressServer.use(cors())

        console.log(chalk.green('----------------'))
        console.log(chalk.green('All dependancies load'))
        console.log(chalk.green('----------------'))
    }

    private loadDepDev(): void{
        //Load Server
        const express = require('express')
        const bodyParser = require('body-parser')
        const morgan = require('morgan')('dev')
        const cors = require('cors')

        this.http = require('http')
        
        this.expressServer = new express()

        //MiddleWare
        this.expressServer.use(morgan)
        this.expressServer.use(bodyParser.json({type: '*/*'}))
        this.expressServer.use(bodyParser.urlencoded({ extended: true }))
        this.expressServer.use(cors())

        console.log(chalk.green('----------------'))
        console.log(chalk.green('All dependancies load'))
        console.log(chalk.green('----------------'))
    }

    private loadDB(): void{
        //le MySQL devra être lu depuis le fichier config
        //Init DB
        this.DB.init()
        this.DB.isConnected()
    }

    private launchServer(): void{
        //Launch Server
        console.log(chalk.green('Launch Server...'))

        //Start Server
        this.server = this.http.createServer(this.expressServer)

        //Server launching...
        this.server.listen(this.options.port, () => {
            console.log('----------------')
            console.log('Server Start listen on: ', chalk.green(this.options.port))
            console.log('Access Server: http://localhost:', chalk.green(this.options.port))
            console.log('Version: ', chalk.green(this.options.version))
            console.log('----------------');
            
            new Router(this.env, this.expressServer, this.DB, Plugins.init(options.activePlugins))
            .init()
        })
    }
}