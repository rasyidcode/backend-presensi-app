export default class UserUsecase {
	userRepository

	constructor({ userRepository }) {
		this.userRepository = userRepository;
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