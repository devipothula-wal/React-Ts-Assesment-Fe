import React from 'react';
import { Button, Card, CardBody, CardTitle, Input, FormGroup, Form, Row, Col } from 'reactstrap';
import { signUp } from '../../types/signin';
import { Link } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUser } from '../../api/signin';
import addNotification from '../../utils/notification';

const SignUp: React.FC = () => {
    const validationSchema = Yup.object({
        firstName: Yup.string().required('Firstname is required'),
        lastName: Yup.string().required('Lastname is required'),
        userName: Yup.string()
            .email('Invalid email') // Validate as an email
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long'),
        phoneNumber: Yup.number()
            .required('Phone number is required')
            .typeError('Phone number must be a valid number')
            .min(1000000000, 'Phone number must be at least 10 digits long')
            .max(9999999999, 'Phone number cannot be more than 10 digits'),
    });
    const handleSubmit = async (values: signUp) => {
        console.log('values on submission of signup', values);
        const res = await createUser(values);
        if (res?.success === true) {
            addNotification({
                type: "success",
                title: "Success",
                message: "User Created Successfully!",
            });
        }
    };
    return (
        <div className="d-flex justify-content-center align-items-center loginContainer">
            <Card>
                <CardBody>
                    <CardTitle className="cardTitle">Sign Up</CardTitle>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', userName: '', password: '', phoneNumber: 0 }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                    >
                        {
                            ({ handleChange, handleSubmit, values, errors, touched }) => (

                                <Form onSubmit={handleSubmit}>

                                    <FormGroup>
                                        <Input
                                            type="text"
                                            placeholder="First Name"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                        {touched.firstName && errors.firstName ? (
                                            <div className="error-msg">{errors.firstName}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            placeholder="Lastname"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                        {touched.lastName && errors.lastName ? (
                                            <div className="error-msg">{errors.lastName}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="text"
                                            placeholder="Username"
                                            name="userName"
                                            value={values.userName}
                                            onChange={handleChange}
                                            required
                                        />
                                        {touched.userName && errors.userName ? (
                                            <div className="error-msg">{errors.userName}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        {touched.password && errors.password ? (
                                            <div className="error-msg">{errors.password}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="tel"
                                            placeholder="Phone Number"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                        {touched.phoneNumber && errors.phoneNumber ? (
                                            <div className="error-msg">{errors.phoneNumber}</div>
                                        ) : null}
                                    </FormGroup>
                                    <FormGroup className="text-center">
                                        <Button className='loginBut' block type='submit'>Sign Up</Button>
                                    </FormGroup>
                                    <Row>
                                        <Col className="text-center">
                                            Not registered? <Link to='/' className=''>Login</Link>
                                        </Col>
                                    </Row>
                                </Form>
                            )
                        }

                    </Formik>
                </CardBody>
            </Card>
        </div>
    );
};

export default SignUp;
