import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Image, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo-light.svg';
import useAnimatedSvg from '../../utlis/animatedSvg';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "john@example.com",
        password: "john",
        rememberMe: false,
    });
    useEffect(() => {
        document.title = `SignIn | Durxen | React Landing Page Template`;
    }, []);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
    };
    const animationRef = useAnimatedSvg(process.env.PUBLIC_URL + "/animation.json");

    return (
            <div className="min-vh-100 wrapper d-flex align-items-center justify-content-center">
            <div className="auth_bg" ></div>
            <Container className="z-1 mx-3">
                <Row className="justify-content-center rounded-4">
                    <Col className="">
                        <Row className="rounded-4 auth-card">
                            {/* Left Side - Image Section */}
                            <Col lg={6} className="d-none bg-primary bg-opacity-10 d-lg-block">
                                <div className=" p-5 pb-0 text-white d-flex flex-column justify-content-center">
                                    <div className="text-center">
                                        <h1 className="display-5 text-white fw-bold ">Welcome Back!</h1>
                                        <h2 className="mb-5 text-white fw-normal">Please Sign In to Your Durxen Account</h2>
                                        <div ref={animationRef} className='w-100'></div>
                                    </div>
                                </div>
                            </Col>

                            {/* Right Side - Login Form */}
                            <Col lg={6} >
                                <div className='p-md-5 p-3'>
                                    <div className="text-center mb-4">
                                        <Image src={logo} alt="Logo" height="48" className="mb-4" />
                                        <h2 className="fw-bold mb-2 text-white mt-4">Sign In</h2>
                                        <p className="text-white text-opacity-75">Welcome Back to Your Durxen Account</p>
                                    </div>

                                    <div className="d-flex align-items-center flex-wrap justify-content-center gap-3 mb-4">
                                        <Button variant="danger" className="d-flex align-items-center justify-content-center gap-2 py-2 rounded-3">
                                            <i className="fs-5 ri-google-fill" /> <span>Continue with Google</span>
                                        </Button>
                                        <Button variant="primary" className="d-flex align-items-center justify-content-center gap-2 py-2 rounded-3">
                                            <i className="fs-5 ri-facebook-fill" />  <span>Continue with Facebook</span>
                                        </Button>
                                    </div>

                                    <div className="d-flex align-items-center my-4">
                                        <div className="border-top border-white border-opacity-25 flex-grow-1"></div>
                                        <span className="px-3 text-white text-opacity-75 small">OR</span>
                                        <div className="border-top border-white border-opacity-25 flex-grow-1"></div>
                                    </div>

                                    <Form onSubmit={handleSubmit} className="mt-4 auth-form">
                                        <Form.Group className="mb-4" controlId="formEmail">
                                            <Form.Label>Email Address</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="ri-mail-fill" />
                                                </InputGroup.Text>
                                                <Form.Control type="email" name="signinEmail"  placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="formPassword">
                                            <div className="d-flex justify-content-between">
                                                <Form.Label >Password</Form.Label>
                                                <Link to="/auth/forgot_password" className="text-decoration-underline small text-white text-opacity-75">Forgot Password?</Link>
                                            </div>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="ri-lock-fill" />
                                                </InputGroup.Text>
                                                <Form.Control type="password" name="signinPassword" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                                            </InputGroup>
                                        </Form.Group>

                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <Form.Check type="checkbox" id="rememberMe" name="rememberMe" label="Remember me" checked={formData.rememberMe} onChange={handleChange} className="text-white text-opacity-75 small " />
                                        </div>

                                        <Button type="submit" onClick={handleSubmit} variant="primary" size="lg" className="w-100  mb-4 ">Sign In</Button>
                                        <p className="text-center text-white text-opacity-75 mb-0">Don't have an account?{" "}
                                            <Link to="/auth/sign_up" className="text-white text-decoration-none fw-semibold">Create an account</Link>
                                        </p>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                </Container>
            </div>
    );
};

export default SignIn;
