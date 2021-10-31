module.exports = {
    "up": `
    	CREATE TABLE users(
			id INT(11) PRIMARY KEY AUTO_INCREMENT, 
			username VARCHAR(255), 
			email VARCHAR(255), 
			password VARCHAR(255), 
			level ENUM('admin', 'mhs', 'dosen'),
			fullname VARCHAR(255),
			gender ENUM('P', 'L'),
			address TEXT,
			tahunMasuk char(4),
			createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
			updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
		)
    `,
    "down": 'DROP TABLE users'
}