import mysql from 'mysql2';
import migrate from 'mysql-migrations';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const connection = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'presensi_app_db'
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

migrate.init(connection, __dirname + '/../migrations');