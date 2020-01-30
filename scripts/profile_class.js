const faker = require("faker");

class Profile {
    constructor(
        first_Name,
        last_Name,
        email,
        personal,
        enterprise,
        company,
        street_address,
        city,
        state,
        zip,
        work_phone,
        cell_phone,
        username,
        password) {
        this.first_Name = first_Name;
        this.last_Name = last_Name;
        this.email = email;
        this.personal = personal;
        this.enterprise = enterprise
        this.company = company;
        this.street_address = street_address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.work_phone = work_phone;
        this.cell_phone = cell_phone;
        this.username = username;
        this.password = password;
    }

    getProfileData() {
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
        password:${this.password}
        `;
    }

    makeProfileData() {

        this.first_Name = faker.name.firstName();
        this.last_Name = faker.name.lastName();
        this.email = faker.internet.email();
        this.personal = 0;
        this.enterprise = 1;
        this.company = faker.company.companyName();
        this.street_address = faker.address.streetAddress();
        this.city = 'Stamford';
        this.state = 'CT';
        this.zip = faker.address.zipCode("#####");
        this.work_phone = faker.phone.phoneNumber("(203)-###-####");
        this.cell_phone = faker.phone.phoneNumber("(203)-###-####");
        this.username = `${this.first_Name}.${this.last_Name}`;
        this.password = 12345678;
    };
}

module.exports = Proffile;

