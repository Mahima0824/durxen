import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Image, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo-light.svg';
import useAnimatedSvg from '../../utlis/animatedSvg';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "John Doe",
        email: "john.doe@example.com",
        password: "123456",
        confirmPassword: "123456",
        termsAccepted: true,
    });
    useEffect(() => {
        document.title = `SignUp | Durxen | React Landing Page Template`;
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
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        navigate("/");
        // Handle signup logic here
    };
    const animationRef = useAnimatedSvg(process.env.PUBLIC_URL + "/animation.json");

    return (
        <div className=" min-vh-100 wrapper d-flex align-items-center justify-content-center">
            <div className="auth_bg"></div>
            <Container className="z-1 mx-3">
                <Row className="justify-content-center rounded-4 ">
                    <Col>
                        <Row className="rounded-4 auth-card">
                            {/* Left Side - Image Section */}
                            <Col lg={6} className="d-none bg-primary bg-opacity-10 d-lg-block">
                                <div className="h-100 p-5 pb-0 text-white d-flex flex-column ">
                                    <div className="text-center">
                                        <h1 className="display-5 text-white fw-bold">Join Us Today!</h1>
                                        <h1 className="mb-5 text-white">Create Your Durxen Account</h1>
                                        <div ref={animationRef} className='w-100'></div>
                                    </div>
                                </div>
                            </Col>

                            {/* Right Side - Sign Up Form */}
                            <Col lg={6}>
                                <div className='p-md-5 p-3'>
                                    <div className="text-center mb-5">
                                        <Image src={logo} alt="Logo" height="48" className="mb-4" />
                                        <h2 className="fw-bold mb-2 text-white mt-4">Create Account</h2>
                                        <p className="text-white text-opacity-75">Fill in your details to get started</p>
                                    </div>

                                    <Form onSubmit={handleSubmit} className="mt-4 auth-form">
                                        <Form.Group className="mb-4" controlId="formFullName">
                                            <Form.Label>Full Name</Form.Label>
                                            <InputGroup >
                                                <InputGroup.Text>
                                                    <i className="ri-user-3-fill" />
                                                </InputGroup.Text>
                                                <Form.Control type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="formEmail">
                                            <Form.Label className="fw-medium mb-2">Email Address</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="ri-mail-fill" />
                                                </InputGroup.Text>
                                                <Form.Control type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="formPassword">
                                            <Form.Label className="fw-medium mb-2">Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="ri-lock-fill" />
                                                </InputGroup.Text>
                                                <Form.Control type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required minLength={8} />
                                            </InputGroup>
                                            <Form.Text className="text-opacity-75 small">Must be at least 8 characters</Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="formConfirmPassword">
                                            <Form.Label className="fw-medium mb-2">Confirm Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <i className="ri-lock-2-fill" />
                                                </InputGroup.Text>
                                                <Form.Control type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-5" controlId="formTerms">
                                            <Form.Check type="checkbox" id="termsAccepted" name="termsAccepted" label={<span className="small">I agree to the <a href="/terms" className="text-white text-decoration-underline fw-semibold">Terms of Service</a> and <a href="/privacy" className="text-white text-decoration-underline fw-semibold">Privacy Policy</a></span>} checked={formData.termsAccepted} onChange={handleChange} required />
                                        </Form.Group>

                                        <Button type="submit" variant="primary" size="lg" className="w-100 mb-4" disabled={!formData.termsAccepted}>Create Account</Button>

                                        <p className="text-center text-white mb-0">
                                            Already have an account?{" "}<Link to="/auth/sign_in" className="text-white text-decoration-none fw-semibold">Sign In</Link>
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

export default SignUp;
