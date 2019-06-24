export default class mid_secure_api {
	static init(req: any, res: any, next: any): any {
		return new Promise((resolve, reject) => {
			console.log("Class Mid Secure CLASS - API");
			next();
		});
	}
}
