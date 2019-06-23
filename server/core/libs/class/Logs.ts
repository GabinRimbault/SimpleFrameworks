const fs = require('fs')

export class Logs{

    date = new Date()
    path: string

    constructor(){
        this.path = 'server/logs/log-' + this.date.getDate() + '-' + parseInt(this.date.getMonth() + 1) + '-' + this.date.getFullYear() + '.txt'
    }

    
    private logExist(log: string){
        try {
            fs.statSync(this.path);
            this.updateLog(log)
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                this.createLog(log)
            }
        }
    }

    private createDateLog(log: string){
        return '[' + this.date.getDate() + '/' + parseInt(this.date.getMonth() + 1) + '/' + this.date.getFullYear() + ' - ' + this.date.getHours() + ':' + this.date.getMinutes() + '] : ' + log
    }
    
    private createLog(log: string){
        fs.writeFileSync(this.path,  '\r\n\n' + this.createDateLog(log) + '\r\n', function (err: string) {
            if (err) throw err;
        });
    }

    private updateLog(log: string){
        fs.appendFile(this.path, this.createDateLog(log) + '\r\n', function (err: string) {
            if (err) throw err;
        });
    }

    static tryCatch(func: any, options: object): boolean{
        try{
            func()
            options.success ? console.log(options.success) : ""
            return true
        }catch(err){
            if(process.env.SF_ENV_LOGS === '2' || process.env.SF_ENV_LOGS === '4')
                console.log(Logs.logLevel(options))
            else
                console.log(Logs.logLevel(err))

            process.exit(1);
            return false
        }
    }

    static receiveError(error: any){
        if(process.env.SF_ENV_LOGS === '2' || process.env.SF_ENV_LOGS === '4')
            console.log(this.logLevel({ error: error }))
        else
            console.log(this.logLevel(error))   
    }

    static receiveSuccess(success: any){
        if(process.env.SF_ENV_LOGS === '3' || process.env.SF_ENV_LOGS === '5')
            console.log(this.logLevel(success))   
    }

    private static logLevel(log: any): string{

        switch(parseInt(process.env.SF_ENV_LOGS)){
            case 1:
                return ''

            case 2:
                return log.error

            case 3:
                return log

            case 4:
                new Logs()
                .logExist(log.error)
                return log.error
            
            case 5:
                new Logs()
                .logExist(log)
                return log

            default:
                return ''
        }
    }
}