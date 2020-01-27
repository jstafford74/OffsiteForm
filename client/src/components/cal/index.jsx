import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Form, Col, Row } from 'react-bootstrap';
import './style.css'


// export default function Example() {
//     const [disabledDays,setDisabledDays] = useState ()


//     return <DayPicker
//         month={new Date(2018, 8)}
//         fromMonth={new Date(2018, 8)}
//         toMonth={new Date(2018, 11)}
//         fixedWeeks
//     />
// }


export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {

            selectedDay: null,
        };
    }

    handleDayClick(day, { selected }) {
        this.setState({
            selectedDay: selected ? undefined : day,
        });
    }

    render() {
        return (

            <Row>
                <Col md={6}>
                    <DayPicker
                        month={new Date(2020, 1)}
                        fromMonth={new Date(2020, 1)}
                        toMonth={new Date(2020, 12)}
                        fixedWeeks
                        selectedDays={this.state.selectedDay}
                        onDayClick={this.handleDayClick}
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
                                placeholder="02/01/2020" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Group as={Col} md="6" controlId="location">
                            <Form.Control
                                placeholder="Stamford, CT" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Group as={Col} md="6" controlId="startTime">
                            <Form.Control
                                placeholder="8:00AM" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Label>End Time</Form.Label>
                        <Form.Group as={Col} md="6" controlId="endTime">
                            <Form.Control
                                placeholder="4:00PM" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Col>

            </Row>


        );
    }
}