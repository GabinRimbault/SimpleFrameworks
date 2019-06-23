import { IResponseController } from './../libs/interface/IResponseController';

export class MainController{

    //If succes function
    static response(req: Request, res: any, response: IResponseController): void{
        res.status(response.code).json(
            {
                "result": response,
                "code": response.code,
                "response": response.response
            }
        )
    } 
}