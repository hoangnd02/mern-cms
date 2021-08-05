import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signup } from "../../actions/user.action";

export default function Signup() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const checkUser = useSelector((state) => state.user);
  const [user, setUser] = useState(checkUser);

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = registerForm;
  const onChangeRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const userSignup = (e) => {
    e.preventDefault();

    dispatch(signup(registerForm));
  };

  if (auth.authenticate) {
    return <Redirect to={`/`} />;
  }
  if (user.loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Container>
        {/* {user.message} */}
        <Row style={{ marginTop: "100px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userSignup}>
              <Row>
                <Col md={6}>
                  <input
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={onChangeRegisterForm}
                  />
                </Col>
                <Col md={6}>
                  <input
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={onChangeRegisterForm}
                  />
                </Col>
              </Row>
              <input
                label="Email"
                placeholder="Email"
                type="email"
                name="email"
                value={email}
                onChange={onChangeRegisterForm}
              />
              <input
                label="Password"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onChangeRegisterForm}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
