import fs from 'fs'
import { Logs } from './Logs';

export class Plugins{
    
    dirPlugins: string = "server/api/plugins"
    pathPlugins: string = '../../../api/plugins/'

    PLUGINS: Array<Object> = []


    public init(): void{
        //Init Plugins
        Logs.tryCatch(this.loadPlugins.bind(this), {})
    }

    private loadPlugins(): void{
        for(let i = 0; i !== fs.readdirSync(this.dirPlugins).length; i++){
            const plugins = require(this.pathPlugins + fs.readdirSync(this.dirPlugins)[i] + '/path')
            this.PLUGINS.push(plugins)
        }
    }

}