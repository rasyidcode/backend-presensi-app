import bcrypt from 'bcryptjs';

export default class UserMysqlRepository {
	dbClient
	tableName = 'users'

	constructor(dbClient) {
		this.dbClient = dbClient;
	}

	async createUser(data) {
		try {
			let query = `INSERT INTO ${this.tableName}
				(username, email, password, level, fullname, gender, address, tahunMasuk)
				VALUES(?,?,?,?,?,?,?,?)`;

			// encrypt password
			const hashedPassword = await bcrypt.hash(data.password, 10);

			const [queryRes, fields] = await this.dbClient.promise().execute(
				query,
				[
					data.username,
					data.email,
					hashedPassword,
					data.level,
					data.fullname,
					data.gender,
					data.address,
					data.tahunMasuk
				]
			);
			
			return queryRes;
		} catch(err) {
			console.log(err);
			throw err;
		}
	}

	async checkUser(user) {
		try {
			const query = `SELECT COUNT(*) as count FROM ${this.tableName} WHERE username = ?`;
			const [queryRes, fields] = await this.dbClient.promise().execute(
				query,
				[user]
			);
			
			return queryRes[0];
		} catch(err) {
			throw err;
		}
	}

	async checkEmail(email) {
		try {
			const query = `SELECT COUNT(*) as count FROM ${this.tableName} WHERE email = ?`;
			const [queryRes, fields] = await this.dbClient.promise().execute(
				query,
				[email]
			);
			
			return queryRes[0];
		} catch(err) {
			throw err;
		}
	}
}