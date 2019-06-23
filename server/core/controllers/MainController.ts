import { IResponseController } from "./../libs/interface/IResponseController";

export class MainController {
	//If succes function
	static response(req: Request, res: any, response: IResponseController): void {
		res.status(response.http).json({
			result: response.result,
			type: req.method,
			HTTP: response.http,
			nbResult: response.nbResult,
			Response: response.object,
		});
	}
}
