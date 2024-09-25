import React from 'react';
import { Button, Card, CardBody, CardTitle, Input, FormGroup, Form, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import { login, } from '../../types/signin';
import './signin.scss';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { loginApi } from '../../api/signin';
import addNotification from '../../utils/notification';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    userName: Yup.string()
      .email('Invalid email') // Validate as an email
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),

  });
  const handleSubmit = async (values: login) => {
    console.log('Username:', values.userName);
    console.log('Password:', values.password);
    const res = await loginApi(values);
    console.log('res...', res);
    if (res.success === true) {
      addNotification({
        type: "success",
        title: "Success",
        message: "Login Successfully!",
      });
      localStorage.setItem('userName', values.userName)
      localStorage.setItem('password', values.password)
      localStorage.setItem('userId', res?.data?._id);
      navigate('/home')
    }
    else {
      addNotification({
        type: "danger",
        title: "Error",
        message: 'Invalid userName or password'

      });
    }

  };

  return (
    <div className="d-flex justify-content-center align-items-center loginContainer">
      <Card>
        <CardBody>
          <CardTitle className="cardTitle">Login</CardTitle>
          <Formik
            initialValues={{ userName: '', password: '' }}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}

          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Username"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange} // Bind input change
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
                    onChange={handleChange} // Bind input change
                    required
                  />
                  {touched.password && errors.password ? (
                    <div className="error-msg">{errors.password}</div>
                  ) : null}
                </FormGroup>
                <FormGroup className="text-center">
                  <Button block className='loginBut' type="submit">Login</Button>
                </FormGroup>
                <Row>
                  <Col className="text-center">
                    Not registered? <Link to='/signup' className=''>Create an account</Link>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
