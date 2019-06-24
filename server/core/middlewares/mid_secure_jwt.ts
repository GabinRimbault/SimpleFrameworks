export default class mid_secure_jwt {
	static init(req: any, res: any, next: any): any {
		return new Promise((resolve, reject) => {
			console.log("Class Mid Secure CLASS - JWT");
			next();
		});
	}
}
