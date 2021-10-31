export default class IndexHandler {
	indexUseCase

	constructor({ indexUsecase }) {
		this.indexUseCase = indexUsecase;
	}

	async getIndexPage(req, res, usecase) {
		const indexPageHTML = await usecase.getIndexPage();
		res.send(indexPageHTML)
	}

	registerRoutes(app, routerFactory) {
		const subRouter = routerFactory.Router();
		const getIndexPageHandler = (req, res) => this.getIndexPage(req, res, this.indexUseCase);
		subRouter.get('/', getIndexPageHandler);

		app.use("/", subRouter);
	}
}