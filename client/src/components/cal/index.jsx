import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Form, Col, Row } from 'react-bootstrap';
import API from '../../api'
import './calstyle.css'


export default class DayInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            selectedDay: null,
            dates: []
        };
    }

    componentDidMount() {
        this.loadCalendar();
    }

    loadCalendar = () => {
        API.getDates()
            .then(res =>
                console.log(res.data)
                // this.setState(
                //     {
                //         dates: res.data
                //     }
                // )
            )
            .catch(err => console.log(err));
    };

    handleDayClick(day, modifiers = {}) {
        if (modifiers.disabled) {
            return;
        }
        this.setState({
            selectedDay: modifiers.selected ? undefined : day,
        });
    }

    render() {
        const disabledDays = {
            daysOfWeek: [0, 6],
            after: new Date(2020, 3, 20),
            before: new Date(2020, 3, 25),
        };



        return (

            <Row className="justify-content-center" >
                <Col md={6}>
                    <DayPicker
                        month={new Date(2020, 1)}
                        fromMonth={new Date(2020, 1)}
                        toMonth={new Date(2020, 12)}
                        fixedWeeks
                        selectedDays={this.state.selectedDay}
                        onDayClick={this.handleDayClick}
                        disabledDays={disabledDays}
                    />
                    <p>
                        {this.state.selectedDay
                            ? this.state.selectedDay.toLocaleDateString()
                            : 'Please select a day 👻'}
                    </p>
                </Col>

                <Col md={6}>
                    <Form noValidate >
                        <Form.Label>Date</Form.Label>
                        <Form.Group as={Col} md="6" controlId="date">
                            <Form.Control
                                placeholder="02/01/2020"
                                value={this.state.selectedDay}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Group as={Col} md="6" controlId="location">
                            <Form.Control
                                placeholder="Stamford, CT" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="startTime">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control as="select">
                                <option>8:00</option>
                                <option>9:00</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="endTime">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control as="select">
                                <option>2:00</option>
                                <option>3:00</option>
                                <option>4:00</option>
                                <option>5:00</option>
                                <option>6:00</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>

            </Row>


        );
    }
}