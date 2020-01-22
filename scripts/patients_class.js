const faker = require("faker");

class Patient {
    constructor(
        patient_ID,
        patient_Number,
        patient_firstName,
        patient_lastName,
        pAddr_Home,
        pAppt_Date) {
        this.patient_ID = patient_ID;
        this.patient_Number = patient_Number;
        this.patient_firstName = patient_firstName;
        this.patient_lastName = patient_lastName;
        this.pAddr_Home = pAddr_Home;
        this.pAppt_Date = pAppt_Date;
    }

    getPatientData() {
        return `
        ID: ${this.patient_ID}
        MRN:${this.patient_Number}
        Name: ${ this.patient_firstName + ' ' + this.patient_lastName}
        First_Name: ${ this.patient_firstName}
        Last_Name: ${ this.patient_lastName}
        Address: ${ this.patient_Addr_Home}
        Appt_Date:${this.pAppt_Date}
        `;
    }

    makePatientData() {
        this.patient_ID = faker.random.number();
        this.patient_Number = faker.random.number();
        this.patient_firstName = faker.name.firstName();
        this.patient_lastName = faker.name.lastName();
        this.pAddr_Home = faker.address.streetAddress();
        this.pAppt_Date = faker.date.between('01/01/2009','12/31/2012')
    };
}

module.exports =  Patient;