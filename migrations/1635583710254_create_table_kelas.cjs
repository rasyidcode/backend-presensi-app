module.exports = {
    "up": `
		CREATE TABLE kelas(
			id INT(11) PRIMARY KEY AUTO_INCREMENT,
			mhsId INT(11),
			dosenId INT(11),
			matkulId INT(11),
			semesterId INT(11),
			jumlahPertemuan SMALLINT(4),
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
			updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),

			FOREIGN KEY (mhsId) REFERENCES users(id),
			FOREIGN KEY (dosenId) REFERENCES users(id),
			FOREIGN KEY (matkulId) REFERENCES matkul(id),
			FOREIGN KEY (semesterId) REFERENCES semester(id)
		)
	`,
    "down": 'DROP TABLE kelas'
}