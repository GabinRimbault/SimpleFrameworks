import { routerError } from '../config/error/router.error';
import { IPluginsVar } from './libs/interface/IPluginsVar';
import { Plugins } from './libs/class/Plugins';
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
        this.loadPlugin()
        console.log('NB Plugins load : ', this.path.length)
    }

    private loadPlugin(): boolean{

        let plugins: any = {
            name: '',
            get: [],
            post: []
        }


        for(let i = 0; i !=  this.path.length; i++){

            plugins['name'] = this.path[i].name

            console.log('[ ' + this.path[i].name.toUpperCase() + ' ]')

            for(let n = 0; n != this.path[i].path.length; n++){
                //METHODS GET
                this.path[i].path[n].method === 'get' ? 
                Logs.tryCatch(() => {
                    this.loadMethodGet(this.path[i].path[n])
                }, {}) : ''
                
                //METHODS ¨POST
                this.path[i].path[n].method === 'post' ? 
                Logs.tryCatch(() => {
                    this.loadMethodPost(this.path[i].path[n], this)
                }, {}) : ''

                //METHODS PUT
                this.path[i].path[n].method === 'put' ? 
                Logs.tryCatch(() => {
                    this.loadMethodPut(this.path[i].path[n], this)
                }, {}) : ''

                //METHODS DEL
                this.path[i].path[n].method === 'del' ? 
                Logs.tryCatch(() => {
                    this.loadMethodDel(this.path[i].path[n], this)
                }, {}) : ''

                //METHODS PATCH
                this.path[i].path[n].method === 'patch' ? 
                Logs.tryCatch(() => {
                    this.loadMethodPatch(this.path[i].path[n], this)
                }, {}) : ''
            }
            console.log("---------------------------------------")
        }
        
        return true
    }

    private loadMethodGet(path: object): any {
        //If not protected
        if(!path.protected){
            console.log("GET { " + path.path + " }")
            this.server.get('/' + path.path, ((req, res) => {
                console.log('Debugger ')
              }))
        }else{
            console.log("Protected [ GET { " + path.path + " } ]")
            this.server.get('/' + path.path, ((req, res) => {}))
        }
    }

    private loadMethodPost(path: object, self: any): void {
        //If not protected
        if(!path.protected){
            console.log("POST { " + path.path + " }")
            this.server.post('/' + path.path, ((req, res) => {}))
        }else{
            console.log("Protected [ POST { " + path.path + " } ]")
            this.server.post('/' + path.path, ((req, res) => {}))
        }
    }

    private loadMethodPut(path: object, self: any): void {
        //If not protected
        if(!path.protected){
            console.log("PUT { " + path.path + " }")
            this.server.put('/' + path.path, ((req, res) => {}))
        }else{
            console.log("Protected [ PUT { " + path.path + " } ]")
            this.server.put('/' + path.path, ((req, res) => {}))
        }
    }

    private loadMethodDel(path: object, self: any): void {
        //If not protected
        if(!path.protected){
            console.log("DEL { " + path.path + " }")
            this.server.del('/' + path.path, ((req, res) => {}))
        }else{
            console.log("Protected [ DEL { " + path.path + " } ]")
            this.server.del('/' + path.path, ((req, res) => {}))
        }
    }

    private loadMethodPatch(path: object, self: any): void {
        //If not protected
        if(!path.protected){
            console.log("Patch { " + path.path + " }")
            this.server.post('/' + path.path, ((req, res) => {}))
        }else{
            console.log("Protected [ Patch { " + path.path + " } ]")
            this.server.patch('/' + path.path, ((req, res) => {}))
        }
    }





}