module.exports = {
    "up": `
		CREATE TABLE absensi(
			id INT(11) PRIMARY KEY AUTO_INCREMENT, 
			dosenId INT(11),
			mhsId INT(11),
			kelasId INT(11),
			pertemuanKe SMALLINT(4),
	 		createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
			updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),

			FOREIGN KEY (mhsId) REFERENCES users(id),
			FOREIGN KEY (dosenId) REFERENCES users(id),
			FOREIGN KEY (kelasId) REFERENCES kelas(id)
		)
	`,
    "down": 'DROP TABLE absensi'
}