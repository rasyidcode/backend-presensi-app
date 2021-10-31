import Joi from 'joi';

export default class UserMiddleware {
	userUsecase
	userSchema
	userValidationOptions

	constructor({ userUsecase }) {
		this.userUsecase = userUsecase;

		this.userSchema = Joi.object({
			username: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			level: Joi.string().valid('admin', 'mhs', 'dosen').required(),
			fullname: Joi.string().required(),
			gender: Joi.string().valid('L', 'P').required(),
			address: Joi.string().required(),
			tahunMasuk: Joi.string().required()
		});
		this.userValidationOptions = {
			abortEarly: false, // include all errors
	        allowUnknown: true, // ignore unknown props
	        stripUnknown: true // remove unknown props
		};
	}

	async checkDuplicateUsername(req, res, next) {
		try {
			const resCheckUser = await this.userUsecase.checkUser(req.body.username);
			if (resCheckUser.count > 0) {
				res.status(400).json({
					success: false,
					message: 'Dulicate entries {username}'
				});
			} else {
				next();
			}
		} catch (err) {
			res.status(500).json({
				success: false,
				message: 'Something went wrong!',
				error: err.message
			});
		}
	}

	async checkDuplicateEmail(req, res, next) {
		try {
			const resCheckEmail = await this.userUsecase.checkEmail(req.body.email);
			if (resCheckEmail.count > 0) {
				res.status(400).json({
					success: false,
					message: 'Duplicate entry {email}'
				});
			} else {
				next();
			}
		} catch(err) {
			res.status(500).json({
				success: false,
				message: 'Something went wrong!',
				error: err.message
			});
		}
	}

	validateCreateUser(req, res, next) {
		const { error, value } = this.userSchema.validate(req.body, this.userValidationOptions);

		if (error) {
			return res.status(400).json({
				success: false,
				message: 'Validation error!',
				errors: error.details
			});
		}

		req.body = value;
		this.checkDuplicateUsername(req, res, () => {
			this.checkDuplicateEmail(req, res, () => {
				next();
			})
		});
	}

}