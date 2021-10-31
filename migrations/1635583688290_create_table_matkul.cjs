module.exports = {
    "up": `
		CREATE TABLE matkul(
			id INT(11) PRIMARY KEY AUTO_INCREMENT, 
			namaMatkul VARCHAR(255), 
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
			updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
		)
	`,
    "down": 'DROP TABLE matkul'
}