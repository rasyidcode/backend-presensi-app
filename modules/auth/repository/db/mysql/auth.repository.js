export default class AuthRepsitory {
	dbClient
	tableName = 'users'

	constructor({ dbClient }) {
		this.dbClient = dbClient;
	}

	async checkUser(user) {
		try {
			const query = `SELECT * FROM ${this.tableName} WHERE username = ? LIMIT 1`;
			const [userdata, fields] = await this.dbClient.promise().execute(
				query,
				[user]
			);
			// console.log(result);
			return userdata[0];
		} catch(err) {
			throw err;
		}
	}

}