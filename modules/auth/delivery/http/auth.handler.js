export default class AuthHandler {
	authUsecase

	constructor({ authUsecase }) {
		this.authUsecase = authUsecase;
	}

	async signIn(req, res, usecase) {
		const userdata = await usecase.checkUser(req.body.user);
		if (userdata)

		res.setStatus(200).json(result);
	}

	async logout(req, res, usecase) {

	}

	registerRoutes(app, routerFactory) {
		const subRouter = routerFactory.Router();

		const signUserHandler = (req, res) => this.signIn(req, res, this.authUsecase);
		subRouter.post('/signIn', signUserHandler);

		app.use('/api/v1', subRouter);
	}
}