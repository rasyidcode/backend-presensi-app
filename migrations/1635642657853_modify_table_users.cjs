module.exports = {
    "up": "ALTER TABLE users ADD UNIQUE (email)",
    "down": "ALTER TABLE users DROP INDEX email;"
}