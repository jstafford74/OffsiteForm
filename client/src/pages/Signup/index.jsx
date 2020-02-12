import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

import { onLogin } from '../../redux/actions'
import API from '../../api'
import { ServerError } from '../../components/Form';


const schema = yup.object({

    first_Name: yup.string().required(),
    last_Name: yup.string().required(),
    email: yup.string().required().email(),
    street_address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required().max(2),
    zip: yup.string().required().max(5),
    work_phone: yup.string().required(),
    cell_phone: yup.string().required(),
    company: yup.string(),
    username: yup.string().required().min(3),
    password: yup.string().required().min(8)
});

/**
 * 
 * @param {*} props 
 * 
 * autocomplete names
 * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete-given-name
 */
const Signup = (props) => {

    const [enterprise, setEnterprise] = useState(false);
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

    return <Modal
        show={true}
        onHide={() => props.history.push('/')}
        animation={false}
        size="lg"
        aria-labelledby="signup-form"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="signup-form">
                Melanoscan Signup
        </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'white' }}>
            <h5 className="card-title">Signup to Create Profile</h5>
            <Formik
                initialValues={{
                    first_Name: '',
                    last_Name: '',
                    email: '',
                    enterprise: 0,
                    street_address: '',
                    city: '',
                    state: '',
                    zip: '',
                    work_phone: '',
                    cell_phone: '',
                    company: '',
                    username: '',
                    password: '',
                    check: false
                }}
                validationSchema={schema}
                onSubmit={async (values, formikBag) => {
                    try {
                        const data = await API.signup(values);
                        console.log(data.profile);
                        if (data.success) {
                            props.onLogin(data.tokens);
                        } else {
                            formikBag.setErrors(data.errors);
                        }
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
                    // handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <ServerError axiosError={status} />

                            <Form.Row>
                                <Form.Group as={Col} controlId="signupfirst_Name">
                                    <Form.Label style={Style.label} >First name</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='given-name'
                                        name='first_Name'
                                        type='text'
                                        placeholder="First name"
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.first_Name}
                                        isInvalid={!!errors.first_Name}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.first_Name && touched.first_Name && errors.first_Name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="signuplast_Name">
                                    <Form.Label style={Style.label} >Last name</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='family-name'
                                        name='last_Name'
                                        type='text'
                                        placeholder="Last name"
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.last_Name}
                                        isInvalid={!!errors.last_Name}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.last_Name && touched.last_Name && errors.last_Name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="signupEmail">
                                    <Form.Label style={Style.label}>Email address</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='email'
                                        name='email'
                                        type='email'
                                        placeholder='Email address'
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.email}
                                        isInvalid={!!errors.email}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email && touched.email && errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="signupAddress">
                                    <Form.Label style={Style.label}>Street Address</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='address'
                                        name='street_address'
                                        type='text'
                                        placeholder='Street address'
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.street_address}
                                        isInvalid={!!errors.street_address}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.street_address && touched.street_address && errors.street_address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId='workPhone'>
                                    <Form.Label style={Style.label}>Work Phone</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='phone'
                                        name='work_phone'
                                        type='text'
                                        placeholder='Work Phone'
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.work_phone}
                                        isInvalid={!!errors.work_phone}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.work_phone && touched.work_phone && errors.work_phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId='signupCity'>
                                    <Form.Label style={Style.label}>City</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='city'
                                        name='city'
                                        type='text'
                                        placeholder="City"
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.city}
                                        isInvalid={!!errors.city}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.city && touched.city && errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} md="2" controlId="signupState">
                                    <Form.Label style={Style.label}>St</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='St'
                                        name='state'
                                        type='text'
                                        placeholder="St"
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.state}
                                        isInvalid={!!errors.state}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.state && touched.state && errors.state}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="2" controlId="signupZip">
                                    <Form.Label style={Style.label}>Zip</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='Zip'
                                        name='zip'
                                        type='text'
                                        placeholder="Zip"
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.zip}
                                        isInvalid={!!errors.zip}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.zip && touched.zip && errors.zip}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="4" controlId="cellPhone">
                                    <Form.Label style={Style.label}>Cell Phone</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='phone'
                                        name='cell_phone'
                                        type='text'
                                        placeholder="Cell Phone"
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.cell_phone}
                                        isInvalid={!!errors.cell_phone}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.cell_phone && touched.cell_phone && errors.cell_phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="company" style={{ marginTop: "2.2rem" }}>

                                    <Form.Check
                                        inline label="Enterprise"
                                        checked={values.enterprise}
                                        onChange={(event) => {
                                            const value = event.target.checked ? 1 : 0
                                            setEnterprise(value);

                                        }}
                                        id="inline-checkbox-1" />
                                </Form.Group>
                                {enterprise ?
                                    <Form.Group as={Col} md="4" controlId="company">
                                        <Form.Label style={Style.label}>Company</Form.Label>
                                        <Form.Control
                                            required
                                            autoComplete='company'
                                            name='company'
                                            type='text'
                                            placeholder="Company"
                                            onChange={handleChange}
                                            // onBlur={handleBlur}
                                            value={values.company}
                                            isInvalid={!!errors.company}
                                            style={Style.input}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cell_phone && touched.cell_phone && errors.cell_phone}
                                        </Form.Control.Feedback>
                                    </Form.Group> : null
                                }
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="username">
                                    <Form.Label style={Style.label}>Username</Form.Label>
                                    <Form.Control
                                        required
                                        name='username'
                                        autoComplete='username'
                                        placeholder="Username"

                                        type="text"
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.username}
                                        isInvalid={!!errors.username}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username && touched.username && errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="password">
                                    <Form.Label style={Style.label}>Password</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete='new-password'
                                        name='password'
                                        type='text'
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        value={values.password}
                                        isInvalid={!!errors.password}
                                        style={Style.input}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password && touched.password && errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}>Submit</Button>
                        </Form>
                    )}
            </Formik>
            <Link className="link" to="/login">Already have an account? <span className="link-signup">Login</span></Link>
        </Modal.Body>
    </Modal>;

};

export default connect(
    // mapStateToProps
    null,
    // mapDispatchToProps
    { onLogin }
)(Signup);
