import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { Form, Col, Row, Button, Jumbotron, Container } from 'react-bootstrap';
import API from '../../api'
import './calstyle.css'
import { Formik } from 'formik';


export default class DayInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleChange = this.handleDayClick.bind(this);
        this.state = {
            selectedDay: null,
            exclDates: [],
            first_Name: '',
            last_Name: '',
            email: '',
            company: '',
            street_address: '',
            city: '',
            state: '',
            zip: '',
            work_phone: '',
            cell_phone: '',
            submitFormOpen: false
        };
    }

    componentDidMount() {
        this.loadCalendar();
        this.loadProfile();
    }

    loadCalendar = () => {
        const xDates = []
        API.getDates()
            .then(res =>

                res.data.forEach(item => {
                    xDates.push(item.date_n)
                }),
                this.setState({ exclDates: xDates })
            )
            .catch(err => console.log(err));
    };
    loadProfile = () => {
        API.getProfile()
            .then(res => {
                this.setState(res.data[0])
            }
            )
            .catch(err => console.log(err));
    };

    handleDayClick(day, modifiers = {}) {
        if (modifiers.disabled) {
            return;
        }
        // console.log(moment(day).format('MM-DD-YYYY'));
        this.setState({
            selectedDay: modifiers.selected ? undefined : moment(day).format('MM-DD-YYYY'),
        });
    }



    render() {
        const {
            first_Name,
            last_Name,
            email,
            company,
            location,
            street_address,
            city,
            state,
            zip,
            work_phone,
            cell_phone,
            selectedDay,
            submitFormOpen,
            exclDates
        } = this.state;

        const modifiers = {
            month: new Date(2020, 1),
            fromMonth: new Date(2020, 1),
            toMonth: new Date(2020, 12),
            disabled:
                [{ daysOfWeek: [0, 6] },
                { exclDates },
                {
                    after: new Date(2020, 3, 20),
                    before: new Date(2020, 3, 25)
                }],
            selected: this.state.selectedDay
        }
        const Style = {
            header: {
                padding: 0,
                margin: 0,
                backgroundColor: '#2A9FD6',

            },
            body: {
                backgroundColor: 'white',
            },
            title: {
                color: 'black',
            },
            label: {
                marginBottom: 4,
            },
            input: {
                border: 'solid black 1px',

            }
        }

        const modifiersStyles = {
            selected: {
                color: 'red'
            },
            month: {
                backgroundColor: 'green'
            },
            disabled: {
                color: 'red',
                backgroundColor: '#fdfefe'
            }

        }
        return (
            <>
                <Row className="justify-content-center" >
                    <Col md={6}>
                        <DayPicker
                            selectedDays={this.state.selectedDay}
                            onDayClick={this.handleDayClick}
                            fixedWeeks
                            modifiers={modifiers}
                            modifiersStyles={modifiersStyles}
                            styles={{
                                container: { color: "salmon " },
                                weekNumber: { color: "violet" }
                            }}
                        />
                        <p>
                            {this.state.selectedDay
                                ? this.state.selectedDay
                                : 'Please select a day'}
                        </p>
                    </Col>

                    <Formik
                        initialValues={{
                            first_Name: this.state.first_Name,
                            last_Name: this.state.last_Name,
                            email: this.state.email,
                            location: this.state.location,
                            street_address: this.state.street_address,
                            city: this.state.city,
                            state: this.state.state,
                            zip: this.state.zip,
                            work_phone: this.state.work_phone,
                            cell_phone: this.state.cell_phone,
                            company: this.state.company,
                            start_time: '8:00 AM',
                            end_time: '4:00 PM',
                            num_avail: 100,
                            check: false
                        }}
                        validationSchema=''

                    >
                        {({
                            status,
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                                <Col md={6}>
                                    <Form noValidate >
                                        <Form.Group as={Col} md="8" controlId="date">
                                            <Form.Label style={Style.label}>Event Date</Form.Label>
                                            <Form.Control
                                                style={Style.input}
                                                placeholder="Date"
                                                value={this.state.selectedDay}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group as={Col} md="8" controlId="location">
                                            <Form.Label style={Style.label}>Event Location</Form.Label>
                                            <Form.Control
                                                placeholder="Location"
                                                value={values.location}
                                                onChange={handleChange}
                                                style={Style.input}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={Col} md="8" controlId="startTime">
                                            <Form.Label style={Style.label}>Start Time</Form.Label>
                                            <Form.Control as="select"
                                                onChange={handleChange}
                                                style={Style.input}
                                                value={values.start_time}
                                            >
                                                <option>8:00</option>
                                                <option>9:00</option>
                                                <option>10:00</option>
                                                <option>11:00</option>
                                                <option>12:00</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} md="8" controlId="endTime">
                                            <Form.Label style={Style.label}>End Time</Form.Label>
                                            <Form.Control as="select"
                                                onChange={handleChange}
                                                value={values.end_time}
                                                style={Style.input}
                                            >
                                                <option>2:00</option>
                                                <option>3:00</option>
                                                <option>4:00</option>
                                                <option>5:00</option>
                                                <option>6:00</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} md="8" controlId="num_avail">
                                            <Form.Label style={Style.label}>Number of Onsite Employees</Form.Label>
                                            <Form.Control
                                                value={values.num_avail}
                                                onChange={handleChange}
                                                style={Style.input}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Row className="justify-content-center">
                                            <Col sm={10} ml={2}>
                                                <Button size="md"
                                                    variant="btn btn-outline-primary"
                                                    type="submit"
                                                    block
                                                    disabled={isSubmitting}
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        this.setState({
                                                            location: values.location,
                                                            start_time: values.start_time,
                                                            end_time: values.end_time,
                                                            numavail: values.numavail,

                                                        })
                                                    }
                                                    }
                                                >
                                                    Review Event Details
                                    </Button>
                                            </Col>
                                        </Form.Row>
                                    </Form>
                                </Col>

                            )}
                    </Formik>
                </Row>
                <Container>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}> Company </Form.Label>
                                <Form.Control
                                    style={Style.input}
                                    defaultValue={this.state.company}
                                    ref={this.input}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}> Contact Name</Form.Label>
                                <Form.Control
                                    style={Style.input}
                                    defaultValue={this.state.first_Name}
                                    ref={this.input}
                                />

                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}> Location </Form.Label>
                                <Form.Control style={Style.input}
                                    defaultValue={this.state.location}
                                    ref={this.input}
                                />

                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}>Contact Email</Form.Label>
                                <Form.Control
                                    style={Style.input}
                                    defaultValue={this.state.email}
                                    ref={this.input}
                                />


                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}>Contact Phone</Form.Label>
                                <Form.Control
                                    style={Style.input}
                                    defaultValue={this.state.work_phone}
                                    ref={this.input}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}> Onsite Employees </Form.Label>
                                <Form.Control
                                    style={Style.input}
                                    defaultValue='100'
                                    type='number'
                                    ref={this.input}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}>Street Address</Form.Label>
                                <Form.Control
                                    style={Style.input}
                                    defaultValue={this.state.street_address}
                                    ref={this.input}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}>City</Form.Label>
                                <Form.Control
                                    style={Style.input}
                                    defaultValue={this.state.city}
                                    ref={this.input}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}>State</Form.Label>
                                <Form.Control
                                    style={Style.input}
                                    defaultValue={this.state.state}
                                    ref={this.input}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}>Start Time</Form.Label>
                                <Form.Control style={Style.input}
                                    defaultValue={this.state.start_time}
                                    ref={this.input}
                                />

                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}>End Time</Form.Label>
                                <Form.Control style={Style.input}
                                    defaultValue={this.state.end_time}
                                    ref={this.input}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label style={Style.label}>Date</Form.Label>
                                <Form.Control style={Style.input}
                                    defaultValue={this.state.selectedDay}
                                    ref={this.input}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <Row>
                        <Col>
                            Company: {this.state.company}
                        </Col>
                        <Col>
                            Date: {this.state.selectedDay}
                        </Col>
                        <Col>
                            Location:{this.state.location}
                        </Col>
                    </Row>
                    <div>
                        You have selected {this.state.selectedDay} at {this.state.location}
                    </div>


                </Container>
            </>
        );
    }
}