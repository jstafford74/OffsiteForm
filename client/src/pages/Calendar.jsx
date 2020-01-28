import React from "react";
import API from '../api'

import { connect } from 'react-redux';
import Example from '../components/cal'


import {
    Card,

    Col,
    Row,
    Container,
    Nav,
    Table,

} from "react-bootstrap";



class Calendar extends React.Component {


    state = {
        dates: [],
        first_Name: "",
        last_Name: "",
        email: "",
        personal: "",
        enterprise: "",
        company: "",
        street_address: "",
        city: "",
        state: "",
        zip: "",
        work_phone: "",
        cell_phone: "",
        username: ""
    };

    componentDidMount() {
        this.loadCalendar();

    }

    loadCalendar = () => {
        API.getDates()
            .then(res =>
                // console.log(res.data)                
                this.setState(
                    {
                        exclDates: res.data
                    }
                )

            )
            .catch(err => console.log(err));
    };

    selectDate = id => {
        API.setDate(id)

            .catch(err => console.log(err));
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.date && this.state.company) {
            API.selectDate({
                date_n: this.state.date_n,
                company: this.state.company,
                first_name: this.state.first_name,
                last_Name: this.state.last_Name,
                email: this.state.email,
                phone: this.state.phone,
                location: this.state.location,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                start_time: this.state.start_time,
                end_time: this.state.end_time,
                num_avail: this.state.num_avail
            })

                .catch(err => console.log(err));
        }
    };


    render() {
        const {
            date_n,
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
            exclDates
        } = this.state;
        return (
            <Container className="mt-4">
                <Row className="justify-content-center ">
                    <Col md={10}>
                        <Card border="success">
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="/Calendar/">
                                    <Nav.Item>
                                        <Nav.Link href="/profile/">Profile</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link className="text-warning" href="/Calendar/">Schedule</Nav.Link>
                                    </Nav.Item>

                                </Nav>

                            </Card.Header>
                            <Card.Body className="justify-content-center">
                                <Card.Title >

                                    <Row >
                                        <Col className="text-info" md={6}>{first_Name} {last_Name}</Col>
                                        <Col className="text-info" md={6}>{company}</Col>
                                    </Row>

                                </Card.Title>
                                <Card.Text>
                                    <Table bordered hover size="sm">
                                        <thead >
                                            <tr>
                                                <th >Address</th>
                                                <th className="colspan-2">Email</th>
                                                <th></th>
                                                <th className="colspan-2">Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{street_address}</td>
                                                <td className="colspan-2">{email}</td>
                                                <td>Cell</td>
                                                <td>{cell_phone}</td>
                                            </tr>
                                            <tr>
                                                <td>{city}, {state} {zip}</td>
                                                <td></td>
                                                <td>Work</td>
                                                <td>{work_phone}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Col md={4}>

                                    </Col>
                                    <Col md={4}>

                                    </Col>
                                    <Col md={4}>
                                        {
                                            !exclDates.length ? null : exclDates[0].date
                                        }
                                    </Col>

                                    <Row>
                                        <Col md={4}>

                                        </Col>
                                        <Col md={4}>

                                        </Col>
                                        <Col md={4}>

                                        </Col>
                                    </Row>
                                </Card.Text>

                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
                <Row>
                    <Example />

                </Row>
            </Container >
        );
    }
}


export default connect(

    // mapStateToProps
    state => ({ profile: state.user.profile }),
    // mapDispatchToProps

)(Calendar);
