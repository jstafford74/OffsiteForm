const faker = require("faker");
const bcrypt = require('bcryptjs');

class Usser {
    constructor(
        first_Name,
        last_Name,
        username,
        email,
        passwordHash,
        role) {
        this.first_Name = first_Name;
        this.last_Name = last_Name;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;

    }

    getUsserData() {
        return `
        first_Name: ${this.first_Name}
        last_Name:${this.last_Name}
        username:${this.username}
        email: ${this.email}
        passwordHash:${this.passwordHash}
        role:${this.role}`;
    }

    makeUsserData() {

        this.first_Name = faker.name.first_Name();
        this.last_Name = faker.name.last_Name();
        this.email = faker.internet.email();
        this.username = `${this.first_Name}.${this.last_Name}`;
        this.passwordHash = bcrypt.hashSync('12345678', 10);
        this.role = 'user'
    };
}
class Proffile extends Usser {
    constructor(first_Name, last_Name, email, username,
        enterprise,
        company,
        street_address,
        city,
        state,
        zip,
        work_phone,
        cell_phone,
    ) {
        super(first_Name,
            last_Name,
            email, username);
        this.enterprise = enterprise;
        this.company = faker.company.companyName();
        this.street_address = faker.address.streetAddress();
        this.city = 'Stamford';
        this.state = 'CT';
        this.zip = faker.address.zipCode("#####");
        this.work_phone = faker.phone.phoneNumber("(203)-###-####");
        this.cell_phone = faker.phone.phoneNumber("(203)-###-####");
    }

    getProffileData() {
        return `
       first_Name: ${this.first_Name}
        last_Name:${this.last_Name}
        email: ${this.email}
        personal:${this.personal}
        enterprise:${this.enterprise}
        company:${this.company}
        street_address:${this.address}
        city:${this.city}
        state:${this.state}
        zip:${this.zip}
        work_phone:${this.work_phone}
        cell_phone:${this.cell_phone}
        username:${this.username}
        
        `;
    }

    makeProffileData(first_Name, last_Name, email, username) {

        this.first_Name = first_Name;
        this.last_Name = last_Name;
        this.email = email;
        this.username = username;
        this.enterprise = 1;
        this.company = faker.company.companyName();
        this.street_address = faker.address.streetAddress();
        this.city = 'Stamford';
        this.state = 'CT';
        this.zip = faker.address.zipCode("#####");
        this.work_phone = faker.phone.phoneNumber("(203)-###-####");
        this.cell_phone = faker.phone.phoneNumber("(203)-###-####");

    };
}

module.exports.Usser = Usser;
module.exports.Proffile = Proffile;

