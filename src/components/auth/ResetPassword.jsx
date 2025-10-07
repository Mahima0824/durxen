import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Image, Alert, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo-light.svg';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: 'John@123456',
        confirmPassword: 'John@123456'
    });
    useEffect(() => {
        document.title = `ResetPassword | Durxen | React Landing Page Template`;
    }, []);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [setIsSuccess] = useState(false);
    const [setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword] = useState(false);


    const validatePassword = (password) => {
        let strength = 0;
        const requirements = [
            password.length >= 8,                     // at least 8 characters
            /[A-Z]/.test(password),                   // contains uppercase
            /[a-z]/.test(password),                   // contains lowercase
            /[0-9]/.test(password),                   // contains number
            /[^A-Za-z0-9]/.test(password)             // contains special char
        ];

        // Calculate strength based on met requirements
        strength = requirements.filter(Boolean).length / requirements.length * 100;
        setPasswordStrength(strength);

        // Validate password
        const newErrors = {};
        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        setErrors(prev => ({
            ...prev,
            password: newErrors.password || ''
        }));
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate password in real-time
        if (name === 'password') {
            validatePassword(value);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Show success state
            setIsSuccess(true);

            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/auth/sign_in');
            }, 3000);

        } catch (error) {
            setErrors({
                submit: 'Failed to reset password. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
        navigate('/auth/sign_in');
    };

    const passwordRequirements = [
        { text: 'At least 8 characters', validate: (pwd) => pwd.length >= 8 },
        { text: 'Uppercase letter', validate: (pwd) => /[A-Z]/.test(pwd) },
        { text: 'Lowercase letter', validate: (pwd) => /[a-z]/.test(pwd) },
        { text: 'Number', validate: (pwd) => /[0-9]/.test(pwd) },
        { text: 'Special character', validate: (pwd) => /[^A-Za-z0-9]/.test(pwd) }
    ];

    return (
        <div className="min-vh-100 d-flex align-items-center wrapper justify-content-center">
            <div className="auth_bg" ></div>
            <Container className="z-1 mx-3">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div className="auth-card rounded-4 overflow-hidden">
                            <div className="bg-primary bg-opacity-10 p-3 p-md-5 text-center">
                                <Link to="/" className="d-inline-block mb-3">
                                    <Image src={logo} alt="Logo" height="40" />
                                </Link>
                                <h2 className="h3 fw-bold text-white mb-2">Create New Password</h2>
                                <p className="text-white text-opacity-75 mb-0">Create a new password for your account</p>
                            </div>

                            <div className="p-3 p-md-5">
                                {errors.submit && (
                                    <Alert variant="danger" className="small"> {errors.submit}</Alert>
                                )}

                                <Form onSubmit={handleSubmit} className="auth-form">
                                    <Form.Group className="mb-4" controlId="password">
                                        <Form.Label>New Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <i className="ri-lock-password-line" />
                                            </InputGroup.Text>
                                            <Form.Control type={showPassword ? "text" : "password"} name="password" placeholder="Enter new password" value={formData.password} onChange={handleChange} isInvalid={!!errors.password} className=" border-end-0" required />
                                            <Button variant="link" className=" text-white border-start-0 input-group-btn" onClick={() => setShowPassword(!showPassword)}>
                                                <i className={`ri-eye${showPassword ? '-off' : ''}-line`}></i>
                                            </Button>
                                        </InputGroup>
                                        {errors.password && (
                                            <Form.Text className="text-danger">{errors.password}</Form.Text>
                                        )}

                                        {/* Password Requirements */}
                                        <div className="small text-white mt-2">
                                            <p className="mb-1">Password must include:</p>
                                            <ul className="list-unstyled fw-medium mb-0">
                                                {passwordRequirements.map((req, index) => (
                                                    <li key={index} className={`d-flex align-items-center ${formData.password ? (req.validate(formData.password) ? 'text-success' : 'text-muted') : 'text-muted'}`}>
                                                        <i className={`ri-check-${req.validate(formData.password) ? 'line' : 'blank-line'} me-2`}></i> {req.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="confirmPassword">
                                        <Form.Label>Confirm New Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <i className="ri-lock-password-line" />
                                            </InputGroup.Text>
                                            <Form.Control type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm new password" value={formData.confirmPassword} onChange={handleChange} isInvalid={!!errors.confirmPassword} required />
                                        </InputGroup>
                                        {errors.confirmPassword && (
                                            <Form.Text className="text-danger">
                                                {errors.confirmPassword}
                                            </Form.Text>
                                        )}
                                    </Form.Group>

                                    <Button type="submit" variant="primary" className="w-100" disabled={isLoading || !formData.password || !formData.confirmPassword} onClick={handleSubmit}>
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Updating...
                                            </>
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </Button>
                                </Form>

                                <hr className="mt-4 opacity-25" />
                                <div className="text-center pt-2">
                                    <p className="mb-0 small text-white text-opacity-75">
                                        Remember your password?{' '} <Link to="/auth/sign_in" className='text-white'>Sign In</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ResetPassword;
