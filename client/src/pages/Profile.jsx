import React, { Component } from "react";
import { onLoginData, onLogin } from '../redux/actions'
import API from "../api/protectedAPI";
import { connect } from 'react-redux'
import DayInput from '../components/cal';
import 'react-day-picker/lib/style.css';

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
    // marginTop: '15px',
    // marginLeft: '80px',
    // maxWidth: '770px',
    justifyContent: 'center'
  },
  card: {
    maxWidth: '700px'
  }
}
class Profile extends Component {
  state = {
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
    calendarOpen: false
  };

  componentDidMount() {
    // this.loadProfile();

  }

  loadProfile = () => {
    API.getProfile()
      .then(res =>
        console.log(res.data)
        // this.props.onLoginData(res.data)
        // this.setState(res.data)
        // }
      )
      .catch(err => console.log(err));
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
      calendarOpen,
    } = this.state;

    // const { profile } = this.props;
    // if (!profile) {
    //   return
    // };

    return (
      <Container className="mt-4">
        <Row className="justify-content-center ">
          <Col md={10}>
            <Card border="success">
              <Card.Header>
                <Row className="justify-content-between">
                  <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item style={{ marginLeft: '1rem' }}>
                      <Nav.Link href="#first">Profile</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Button style={{ marginRight: '1rem' }} className="text-warning" onClick={() => this.setState({ calendarOpen: true })}>Schedule </Button>
                </Row>
              </Card.Header>
              <Card.Body className="justify-content-center">
                <Card.Title >
                  <Row >
                    <Col className="text-info" md={6}></Col>
                    <Col className="text-info" md={6}></Col>
                  </Row>
                </Card.Title>

                <Table responsive="sm" bordered hover size="sm">
                  <thead >
                    <tr>
                      <th sm={6}>Address</th>
                      <th className="colspan-2">Email</th>
                      <th></th>
                      <th className="colspan-2">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td className="colspan-2"></td>
                      <td>Cell</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Work</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>



              </Card.Body>
            </Card>

          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <Jumbotron style={Style.jumbo}>
              <Row >
                <h4 style={{ color: 'black' }}>Mobile Scheduler</h4>
              </Row>


              {
                calendarOpen && <DayInput />
              }


            </Jumbotron>
          </Col>
        </Row>
      </Container >
    );
  }
}

// function mapStateToProps(state) {
//   return { profile: state.profile }
// }

export default connect(
  null,
  { onLogin, onLoginData })(Profile)

