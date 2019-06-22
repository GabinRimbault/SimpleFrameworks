import fs from 'fs'
import { Logs } from './Logs';

export class Plugins{
    
    dirPlugins: string = "server/api/plugins"
    pathPlugins: string = '../../../api/plugins/'
    PLUGINS: Array<Object> = []

    
    public static init(options: boolean): Array<Object>{

        //If activePlugins = true
        if(options)
           return new Plugins().launch()
        else return new Plugins().startDefaultRouter()
    }

    public launch(): Array<Object>{
        //Init Plugins
        Logs.tryCatch(this.loadPlugins.bind(this), {})
        return this.PLUGINS
    }

    public startDefaultRouter(): Array<Object>{
        //Init DefaultRouter
        Logs.tryCatch(this.loadDefaultRouter.bind(this), {})
        return this.PLUGINS
    }

    private loadPlugins(): void{

        //Load different plugins and push to PLUGINS
        for(let i = 0; i !== fs.readdirSync(this.dirPlugins).length; i++){

            const plugins = require(this.pathPlugins + fs.readdirSync(this.dirPlugins)[i] + '/path')
            
            this.PLUGINS.push(
                {
                    'name':  fs.readdirSync(this.dirPlugins)[i],  
                    'path': plugins
                }
            )
        }

        //try to load defaultRouter
        Logs.tryCatch(this.loadDefaultRouter.bind(this), {})
    }

    private loadDefaultRouter(): void{
        //Load Default Router
        const plugins = require('../../../api/src/path')

        this.PLUGINS.push(
            {
                'name': "defaultRouter",
                'path': plugins
            }
        )
    }
}