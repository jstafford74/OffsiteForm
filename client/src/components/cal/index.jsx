import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Form, Col, Row, Button, Jumbotron } from 'react-bootstrap';
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


                // this.setState({ exclDates: res.data })
            )
            .catch(err => console.log(err));
    };
    loadProfile = () => {
        API.getProfile()
            .then(res => {
                // this.props.onLoginData(res.data)
                console.log(res.data[0]);
                this.setState(res.data[0])
            }
            )
            .catch(err => console.log(err));
    };

    handleDayClick(day, modifiers = {}) {
        if (modifiers.disabled) {
            return;
        }
        console.log(this.state.selectedDay);
        this.setState({
            selectedDay: modifiers.selected ? undefined : day,
        });
    }

    handleChange(e) {
        e.preventDefault();
        console.log(e.target.value)
    }

    render() {
        const {
            first_Name,
            last_Name,
            email,
            company,
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
            input: {
                borderBottom: 'solid black 1px',
                padding: 0,
                maxWidth: '80%'
            },
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
                                ? this.state.selectedDay.toLocaleDateString()
                                : 'Please select a day 👻'}
                        </p>
                    </Col>

                    <Formik
                        initialValues=''
                        validationSchema=''
                    // onSubmit={async (values, formikBag) => {
                    //     try {
                    //         const data = await API.setDates(values);
                    //         data.success ? props.onLogin(data.tokens) : formikBag.setErrors(data.errors);

                    //     } catch (err) {
                    //         formikBag.setStatus(err);
                    //     }
                    //     return;
                    // }}
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
                                        <Form.Group style={Style.input} as={Col} md="6" controlId="date">
                                            <Form.Control
                                                placeholder="Date"
                                                value={this.state.selectedDay}
                                                onChange={this.state.handleChange}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group style={Style.input} as={Col} md="6" controlId="location">
                                            <Form.Control
                                                placeholder="Location"
                                                onChange={this.state.handleChange}
                                            />
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group style={Style.input} as={Col} md="6" controlId="startTime">
                                            <Form.Label>Start Time</Form.Label>
                                            <Form.Control as="select"
                                                onChange={this.state.handleChange}
                                            >
                                                <option>8:00</option>
                                                <option>9:00</option>
                                                <option>10:00</option>
                                                <option>11:00</option>
                                                <option>12:00</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group style={Style.input} as={Col} md="6" controlId="endTime">
                                            <Form.Label>End Time</Form.Label>
                                            <Form.Control as="select"
                                                onChange={this.state.handleChange}
                                            >
                                                <option>2:00</option>
                                                <option>3:00</option>
                                                <option>4:00</option>
                                                <option>5:00</option>
                                                <option>6:00</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Row className="justify-content-center">
                                            <Col sm={10} ml={2}>
                                                <Button size="md"
                                                    variant="btn btn-outline-primary"
                                                    type="submit"
                                                    block
                                                    disabled={isSubmitting}
                                                    onClick={() => this.setState({ submitFormOpen: true, submitFormDisp: 'd-block' })}
                                                >
                                                    Schedule Event
                                    </Button>
                                            </Col>
                                        </Form.Row>
                                    </Form>
                                </Col>

                            )}
                    </Formik>
                </Row>
                <Jumbotron>
                    {
                        submitFormOpen && <div>Form Goes Here</div>
                    }
                </Jumbotron>
            </>
        );
    }
}