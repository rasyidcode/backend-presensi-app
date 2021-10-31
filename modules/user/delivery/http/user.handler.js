export default class UserHandler {
	userUsecase

	constructor({userUsecase, userMiddleware}) {
		this.userUsecase = userUsecase;
	}

	async createUser(req, res, usecase) {
		try {
			const createRes = await usecase.createUser(req.body);
		
			res.status(201).json({
				success: true,
				data: {
					message: `User created with ID : ${createRes.insertId}`
				}
			});
		} catch (err) {
			res.status(500).json({
				success: false,
				data: {
					message: 'Something went wrong!',
					error: err.message
				}
			});
		}
	}

	registerRoutes(app, routerFactory) {
		const subRouter = routerFactory.Router();

		const createUserHandler = (req, res) => this.createUser(req, res, this.userUsecase);
		const createUserMiddleware = (req, res, next) => this.userMiddleware.validateCreateUser(req, res, next);
		subRouter.post('/', createUserMiddleware, createUserHandler);

		app.use('/api/v1/user', subRouter);
	}
}