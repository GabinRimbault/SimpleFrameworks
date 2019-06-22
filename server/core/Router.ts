import { routerError } from '../config/error/router.error';
import { Logs } from './libs/class/Logs';
import { IPluginsVar } from './libs/interface/IPluginsVar';
import { Plugins } from './libs/class/Plugins';

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

            console.log('[' + this.path[i].name.toUpperCase() + ']')

            for(let n = 0; n != this.path[i].path.length; n++){
                //METHODS GET
                this.path[i].path[n].method === 'get' ? this.loadMethodGet(this.path[i].path[n]) : ''
                this.path[i].path[n].method === 'post' ? this.loadMethodPost(this.path[i].path[n]) : ''

                //METHODS POST
                //this.path[i].path[n].method === 'post' ? plugins['post'].push(this.path[i].path[n].path) : ''
            }

        }


        

        //const plugins = require(this.pathPlugins + fs.readdirSync(this.dirPlugins)[i] + '/path')
            
            

        
        
        return true
    }

    private loadMethodGet(path: object): void {
        
        console.log("[GET] -> " + path.path + " -> " + path.controller)
        this.server.get('/' + path.path, ((req, res) => {
            console.log('Debugger = ', path.controller)
        }))
    }

    private loadMethodPost(path: object): void {
        
        //console.log("[POST] -> " + path.path + " -> " + path.controller)

        



    }





}