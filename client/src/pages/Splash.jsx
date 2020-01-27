import React from "react";

import { Button, Col, Row, Container, Jumbotron } from 'react-bootstrap';
import MainTyping from "../components/typed";
import PLX from "../components/Plx";

export default function Splash(props) {
    return (
        <>
            <Container className='text-center'>
                <Row className="mt-4">
                    <Col >
                        <Jumbotron  >
                            <h1 >Melanoscan:</h1>
                            <MainTyping />
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Container>

                <PLX />
            </Container>

            <Container>
                <Row className="text-center">
                    <Col >
                        <Button
                            type="submit"
                            className="btn btn-success"
                            onClick={() => props.history.push('/signup')}

                        >Signup</Button>
                    </Col>
                    <Col >
                        <Button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => props.history.push('/login')}
                        >Login</Button>
                    </Col>
                </Row>

            </Container >

        </>
    );
}