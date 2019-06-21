import { path } from './path';

import { routerError } from './../../config/error/router.error';
import { Logs } from './../libs/class/Logs';

export class Router {

    env: any
    server: any
    DB: any
    PATH: Object = {}


    constructor(env: any, server: any, DB: any){
        this.env = env
        this.server = server
        this.DB = DB
    }

    public init(): void{
        console.log('Router is Launch')
        Logs.tryCatch(this.initPath.bind(this), routerError.initPath)

    }

    private initPath(): void{
        this.PATH = {
            "path": path
        }
    }
}