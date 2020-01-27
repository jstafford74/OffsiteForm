import React, { Component } from "react";
import { onLoginData } from '../redux/actions'
import API from "../api";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { } from "react-bootstrap";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Example from '../components/cal'

import {
  Card,
  Button,
  Col,
  Row,
  Container,
  Nav,
  Table,
  Jumbotron
} from "react-bootstrap";

const Style = {
  jumbo: {
    minHeight: '60vh',
    backgroundColor: 'white',
    border: 'black solid',
    marginTop: '15px',
    marginLeft: '80px',
    maxWidth: '770px',
    justifyContent: 'center'
  },
  card: {
    maxWidth: '700px'
  }
}
class Profile extends Component {
  state = {
    first_Name: "",
    last_Name: "",
    email: "",
    personal: "",
    enterprise: "",
    company: "",
    street_address: "",
    city: "",
    st: "",
    zip: "",
    work_phone: "",
    cell_phone: "",
    username: "",
    calendarOpen: false
  };
  componentDidMount() {
    this.loadProfile();
  }
  loadProfile = () => {
    API.getProfile()
      .then(res => {
        this.props.onLoginData(res.data)
        this.setState(
          res.data
        )
      }
      )
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
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };


  render() {
    const {
      first_Name,
      last_Name,
      email,
      company,
      street_address,
      city,
      st,
      zip,
      work_phone,
      cell_phone,
      username,
      calendarOpen,
    } = this.state;

    return (
      <Container className="mt-4">
        <Row className="justify-content-center ">
          <Col md={10}>
            <Card border="success">
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                  <Nav.Item>
                    <Nav.Link href="#first">Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Button className="text-warning" onClick={() => this.setState({ calendarOpen: true })}>Schedule </Button>
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
                        <td>{city}, {st} {zip}</td>
                        <td></td>
                        <td>Work</td>
                        <td>{work_phone}</td>
                      </tr>
                    </tbody>
                  </Table>

                </Card.Text>

              </Card.Body>
            </Card>

          </Col>
        </Row>
        <Jumbotron style={Style.jumbo}>
          <Row >
            <h4 style={{ color: 'black' }}>Mobile Scheduler</h4>
          </Row>


          {
            calendarOpen && <Example />
          }


        </Jumbotron>

      </Container >
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.user.profile }
}

export default connect(
  mapStateToProps,
  { onLoginData })(Profile)

