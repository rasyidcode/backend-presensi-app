module.exports = {
    "up": "ALTER TABLE users ADD UNIQUE (username)",
    "down": "ALTER TABLE users DROP INDEX username;"
}