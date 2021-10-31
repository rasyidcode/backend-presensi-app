export default class UserUsecase {
	userRepository

	constructor(repository) {
		this.userRepository = repository;
	}

	createUser(data) {
		return this.userRepository.createUser(data);
	}

	checkUser(user) {
		return this.userRepository.checkUser(user);
	}

	checkEmail(email) {
		return this.userRepository.checkEmail(email);
	}
}