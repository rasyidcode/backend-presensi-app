module.exports = {
    "up": `
		CREATE TABLE semester(
			id INT(11) PRIMARY KEY AUTO_INCREMENT,  
			name VARCHAR(255),
			year SMALLINT(4),
			startAt DATE,
			endAt DATE,
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
			updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
		)
	`,
    "down": 'DROP TABLE semester'
}