import { routerError } from '../config/error/router.error';
import { Logs } from './libs/class/Logs';

export class Router {

    env: any
    server: any
    DB: any
    path: Array<Object>

    constructor(env: any, server: any, DB: any, path: Array<Object>){
        this.env = env
        this.server = server
        this.DB = DB
        this.path = path
    }

    public init(): void{
        console.log(this.path)
    }


}