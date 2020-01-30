const faker = require("faker");

class Patient {
    constructor(
        patient_ID,
        patient_Number,
        patient_first_Name,
        patient_last_Name,
        pAddr_Home,
        pAppt_Date) {
        this.patient_ID = patient_ID;
        this.patient_Number = patient_Number;
        this.patient_first_Name = patient_first_Name;
        this.patient_last_Name = patient_last_Name;
        this.pAddr_Home = pAddr_Home;
        this.pAppt_Date = pAppt_Date;
    }

    getPatientData() {
        return `
        ID: ${this.patient_ID}
        MRN:${this.patient_Number}
        Name: ${ this.patient_first_Name + ' ' + this.patient_last_Name}
        First_Name: ${ this.patient_first_Name}
        Last_Name: ${ this.patient_last_Name}
        Address: ${ this.patient_Addr_Home}
        Appt_Date:${this.pAppt_Date}
        `;
    }

    makePatientData() {
        this.patient_ID = faker.random.number();
        this.patient_Number = faker.random.number();
        this.patient_first_Name = faker.name.first_Name();
        this.patient_last_Name = faker.name.last_Name();
        this.pAddr_Home = faker.address.streetAddress();
        this.pAppt_Date = faker.date.between('01/01/2009','12/31/2012')
    };
}

module.exports =  Patient;