export default class AuthUsecase {
	authRepository

	constructor({ authRepository }) {
		this.authRepository = authRepository;
	}

	checkUser(user) {
		return this.authRepository.checkUser(user);
	}
}