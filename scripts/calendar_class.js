class Calendar {
    constructor(
        date) {
        this.date = date;
        this.company = null;
        this.first_Name = null;
        this.last_Name = null;
        this.email = null;
        this.phone = null;
        this.location = null;
        this.address = null;
        this.city = null;
        this.state = null;
        this.zip = null;
        this.start_time = null;
        this.end_time = null;
        this.num_avail = null;
    }

    
    makeCalendar(date) {
        this.date = date;
        this.company = null;
        this.first_Name = null;
        this.last_Name = null;
        this.email = null;
        this.phone = null;
        this.location = null;
        this.address = null;
        this.city = null;
        this.state = null;
        this.zip = null;
        this.start_time = null;
        this.end_time = null;
        this.num_avail = null;
    };
}

module.exports = Calendar;