import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo-light.svg';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('john@durxen.com');
    const [isSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        let timer;
        if (isSubmitted && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [isSubmitted, countdown]);

    useEffect(() => {
        document.title = `ForgotPassword | Durxen | React Landing Page Template`;
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        return navigate('/auth/reset_password');
    };

    return (
        <div className="min-vh-100 d-flex align-items-center wrapper justify-content-center">
            <div className="auth_bg" ></div>
            <Container className="z-1 mx-3">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div className="auth-card rounded-4 shadow-lg overflow-hidden">
                            <div className="bg-primary bg-opacity-10 p-3 p-md-5 text-center">
                                <Link to="/" className="d-inline-block mb-3">
                                    <Image src={logo} alt="Logo" height="40" />
                                </Link>
                                <h2 className="h3 fw-bold text-white mb-2">Reset Your Password</h2>
                                <p className="text-white text-opacity-75 mb-0">
                                    {isSubmitted
                                        ? 'Check your email for further instructions.'
                                        : 'Enter your email to receive a password reset link.'
                                    }
                                </p>
                            </div>

                            <div className=" p-3 p-md-5">
                                <Form onSubmit={handleSubmit} className="mt-3 auth-form">
                                    <Form.Group className="mb-4" controlId="formEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text >
                                                <i className="ri-mail-line"></i>
                                            </InputGroup.Text>
                                            <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </InputGroup>
                                        <Form.Text className="d-block mt-2">We'll send you a link to reset your password</Form.Text>
                                    </Form.Group>

                                    <Button type="submit" variant="primary" className="w-100 mb-4" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...
                                            </>
                                        ) : (
                                            'Send Reset Link'
                                        )}
                                    </Button>

                                    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                                        <p className="mb-0 small text-white text-opacity-75">
                                            Remember your password?{' '}<Link to="/auth/sign_in" className="text-white text-decoration-none">Sign In</Link>
                                        </p>
                                        <Link to="/support" className="small text-white">
                                            <i className="ri-customer-service-line me-1"></i> Help
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-white text-opacity-75 small mb-0">
                                By continuing, you agree to our{' '}
                                <Link to="/terms" className="text-white text-decoration-underline">Terms of Service</Link> and{' '}
                                <Link to="/privacy" className="text-white text-decoration-underline">Privacy Policy</Link>.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ForgotPassword;
