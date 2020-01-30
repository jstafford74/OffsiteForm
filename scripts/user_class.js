const faker = require("faker");
const bcrypt = require('bcryptjs');

class Usser {
    constructor(
        firstName,
        lastName,
        username,
        email,
        passwordHash,
        role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;

    }

    getUsserData() {
        return `
        firstName: ${this.firstName}
        lastName:${this.lastName}
        username:${this.username}
        email: ${this.email}
        passwordHash:${this.passwordHash}
        role:${this.role}`;
    }

    makeUsserData() {

        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.email = faker.internet.email();
        this.username = `${this.firstName}.${this.lastName}`;
        this.passwordHash = bcrypt.hashSync('12345678', 10);
        this.role = 'user'
    };
}

module.exports = Usser;

