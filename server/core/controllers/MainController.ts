export class MainController {

    //If succes function
    protected static successFunc(req: Request, res: any, response: object): any{
        res.status(response.code).json(
            {
                "result": true,
                "code": response.code,
                "response": response.response
            }
        )
    }

    //If error function
    protected static errorFunc(req: Request, res: any, error: object): any{
        res.status(error.code).json(
            {
                "result": false,
                "code": error.code,
                "response": error.response
            }
        )
    }   
}