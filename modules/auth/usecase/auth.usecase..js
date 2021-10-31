export default class AuthUsecase {
	authRepository

	constructor(repository) {
		this.authRepository = repository;
	}

	checkUser(user) {
		return this.authRepository.checkUser(user);
	}
}