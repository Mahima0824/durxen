import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../images/logo-light.svg';

const Verification = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTime, setResendTime] = useState(30);
    const [isResending, setIsResending] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || 'your email';

    // Handle resend countdown
    useEffect(() => {
        let timer;
        if (resendTime > 0) {
            timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [resendTime]);

    useEffect(() => {
        document.title = `Verification | Durxen | React Landing Page Template`;
    }, []);
    // Focus first input on mount
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        
        // Only allow numbers
        if (value && !/^\d*$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last character
        setOtp(newOtp);
        
        // Auto focus to next input if a digit is entered
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
        
        // Clear any previous errors
        if (error) setError('');
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on backspace if current is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = otp.join('');
        
        if (code.length !== 4) {
            setError('Please enter a valid 4-digit code');
            return;
        }
        
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            
            // For demo purposes, assume code is valid if all digits are the same
            if (code === '1111') {
                setIsVerified(true);
                // Redirect to success page or dashboard after a delay
                setTimeout(() => {
                    navigate('/auth/sign_in');
                }, 2000);
            } else {
                setError('Invalid verification code. Please try again.');
            }
        }, 1500);
    };

    const handleResendCode = () => {
        if (resendTime > 0) return;
        
        setIsResending(true);
        setError('');
        
        // Simulate API call
        setTimeout(() => {
            setResendTime(30);
            setIsResending(false);
            
            // Show success message
            setError('Verification code has been resent to your email.');
            
            // Clear success message after 5 seconds
            setTimeout(() => setError(''), 5000);
        }, 1000);
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
                                <h2 className="h3 fw-bold text-white mb-2">Verify Your Email</h2>
                                <p className="text-white text-opacity-75 mb-0">
                                    {isVerified 
                                        ? 'Verification successful! Redirecting...'
                                        : 'Enter the 4-digit code sent to your email'}
                                </p>
                            </div>

                            <div className="p-3 p-md-5">
                                {isVerified ? (
                                    <div className="text-center py-4">
                                        <div className="mb-4 ">
                                            <div className="mx-auto bg-soft-success text-center rounded-circle avatar-xxxl avatar">
                                                <i className="ri-checkbox-circle-line text-success fs-1" ></i>
                                            </div>
                                        </div>
                                        <h3 className="text-white mb-3">Email Verified!</h3>
                                        <p className="text-white text-opacity-75 mb-0">Your email has been successfully verified. Redirecting to login...</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-center text-white text-opacity-75 mb-4">We've sent a verification code to <span className="fw-medium text-white">{email}</span>. Please enter the code below to verify your email address.</p>

                                        {error && (
                                            <Alert variant={error.includes('resent') ? 'success' : 'danger'} className="text-white small">{error}</Alert>
                                        )}

                                        <Form onSubmit={handleSubmit} className="mb-4">
                                            <div className="d-flex justify-content-center gap-3 mb-4">
                                                {otp.map((digit, index) => (
                                                    <Form.Control key={index} ref={el => inputRefs.current[index] = el} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} className={`text-center avatar-xxxl avatar rounded-3 py-3 fw-bold ${error ? 'border-danger' : 'border-secondary'}`} disabled={isLoading} autoFocus={index === 0}/>
                                                ))}
                                            </div>

                                            <Button type="submit" variant="primary" className="w-100 py-2 mb-3" disabled={isLoading || otp.some(digit => !digit)}>
                                                {isLoading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Verifying...
                                                    </>
                                                ) : (
                                                    'Verify Account'
                                                )}
                                            </Button>

                                            <div className="text-center mt-4 pt-3">
                                                <p className="mb-2 small text-white text-opacity-75">Didn't receive the code?</p>
                                                <Button variant="primary" size="sm" className="text-decoration-none" onClick={handleResendCode} disabled={resendTime > 0 || isResending}>
                                                    {isResending ? (
                                                        'Sending...'
                                                    ) : resendTime > 0 ? (
                                                        `Resend code in ${resendTime}s`
                                                    ) : (
                                                        'Resend Code'
                                                    )}
                                                </Button>
                                            </div>
                                        </Form>

                                        <hr className="mt-4 opacity-25" />

                                        <div className="text-center pt-3">
                                            <p className="mb-0 small text-white text-opacity-75">
                                                Wrong email address?{' '} <Link to="/auth/sign_up" className="text-white text-decoration-none">Change email</Link>
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-white text-opacity-75 small mb-0">
                                Having trouble?{' '} <Link to="/support" className=" text-white text-decoration-none">Contact Support</Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Verification;
