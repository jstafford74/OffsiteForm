import React from 'react';
import { connect } from 'react-redux'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { onLogin } from '../../redux/actions'
import API from '../../api'
import { ServerError } from '../../components/Form';


const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
});

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
    input: {
        borderBottom: 'solid black 1px',

    }
}


const Login = (props) => {

    return <Modal
        show={true}
        onHide={() => props.history.push('/')}
        animation={false}
        size="md"
        aria-labelledby="login-form"
        centered
    >
        <Modal.Header closeButton style={Style.header}>
            <Modal.Title id="login-form" className="text-align-center">
                Melanoscan Profile Login
        </Modal.Title>
        </Modal.Header>
        <Modal.Body style={Style.body}>
            <h5 className="card-title" style={Style.title}>Please enter username & password</h5>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={schema}
                onSubmit={async (values, formikBag) => {
                    try {
                        const data = await API.login(values);
                        data.success ? props.onLogin(data.tokens) : formikBag.setErrors(data.errors);

                    } catch (err) {
                        formikBag.setStatus(err);
                    }
                    return;
                }}
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
                        <Form noValidate onSubmit={handleSubmit}>
                            <ServerError axiosError={status} />
                            <Form.Row className="justify-content-center">
                                <Col sm={10} ml={2} >
                                    <Form.Group controlId="username">

                                        {/* <Form.Label>Username</Form.Label> */}
                                        <Form.Control
                                            required
                                            name='username'
                                            placeholder='Username'
                                            type='text'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                            isInvalid={!!errors.username}
                                            style={Style.input}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username && touched.username && errors.username}
                                        </Form.Control.Feedback>

                                    </Form.Group>
                                </Col>
                            </Form.Row >
                            <Form.Row className="justify-content-center">
                                <Col sm={10} ml={2}>
                                    <Form.Group controlId="password">
                                        {/* <Form.Label>Password</Form.Label> */}
                                        <Form.Control
                                            autoComplete='current-password'
                                            required
                                            name='password'
                                            type="text"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            isInvalid={!!errors.password}
                                            style={Style.input}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password && touched.password && errors.password}
                                        </Form.Control.Feedback>

                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row className="justify-content-center">
                                <Col sm={10} ml={2}>
                                    <Button size="md" variant="btn btn-outline-primary" type="submit" block disabled={isSubmitting}>Login</Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    )}
            </Formik>
            <Link className="link" to="/signup">Don't have an account? <span className="link-signup">Signup</span></Link>
        </Modal.Body>
    </Modal >;

};

export default connect(
    // mapStateToProps
    null,
    // mapDispatchToProps
    { onLogin }
)(Login);

