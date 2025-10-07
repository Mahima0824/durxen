import React, { useState } from 'react';
import PageTitle from '../layout/PageTitle';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import Footer from '../layout/Footer';
import data from '../../data/plan.json';
const Pricing = () => {
    const plans = data.plans;
    const [billingCycle, setBillingCycle] = useState('monthly');

    const handleToggler = (value) => {
        setBillingCycle(value);
    }

    return (
        <div className='page-wrapper'>
            <div className='page-content'>
                <PageTitle pageTitle="Pricing" pagePrTitle="Pages" />
                <Container fluid>
                    {/* Pricing Header */}
                    <Row>
                        <Col lg={12}>
                            <div className="text-center mb-4">
                                <h2 className="fw-bold mb-2">Simple, transparent pricing</h2>
                                <p className="text-muted mb-2">Choose a plan that works best for you and your team.</p>

                                {/* Billing Toggle */}
                                <div className="billing-toggle border rounded-pill d-inline-block z-2 position-relative ">
                                    <div className={`toggle-overlay ${billingCycle === "monthly" ? "bg-gradient-primary" : "bg-gradient-danger"}  ${billingCycle}`}></div>
                                    <Button variant="link" className={`position-relative  bg-transparent billing-option ${billingCycle === "monthly" ? "text-white " : ""}`} onClick={() => handleToggler("monthly")}>Monthly</Button>
                                    <Button variant="link" className={`position-relative  bg-transparent billing-option ${billingCycle === "yearly" ? "text-white" : ""}`} onClick={() => handleToggler("yearly")}>Yearly</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            {/* Pricing Cards */}
                            <Row className="justify-content-center">
                                {plans.map((plan, index) => (
                                    <Col lg={4} md={6} key={index}>
                                        <Card className={` ${plan.popular ? 'border border-primary position-relative' : 'border'}`}>
                                            {plan.popular && (
                                                <div className="ribbon">POPULAR</div>
                                            )}

                                            <Card.Body className="d-flex flex-column">
                                                <div className="text-center mb-2">
                                                    <div className="mb-3">
                                                        <div className={`icon-wrapper mx-auto bg-soft-${plan.bg} border border-${plan.bg} rounded-circle  avatar avatar-xxxxl `}>
                                                            <i className={` text-${plan.bg} ${plan.icon}`}>
                                                            </i>
                                                        </div>
                                                    </div>
                                                    <h4 className="fw-bold mb-1">{plan.name}</h4>
                                                    <p className="text-muted mb-0">{plan.description}</p>

                                                    <div className="my-2 p-4 bg-light rounded-3">
                                                        <div className="d-flex  justify-content-center">
                                                            <span className="display-6 mb-0 text-primary fw-bold">$</span>
                                                            <span className="display-6 mb-0 fw-bold text-primary">
                                                                {billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly}
                                                            </span>
                                                            <span className="text-muted align-self-center ms-2">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                                                        </div>
                                                        {billingCycle === 'yearly' && (
                                                            <Badge bg="dark" text="white" className="mt-2">Save {Math.round((1 - (plan.price.yearly / (plan.price.monthly * 12))) * 100)}% annually</Badge>
                                                        )}
                                                    </div>
                                                </div>

                                                <ul className="list-unstyled mb-4">
                                                    {plan.features.map((feature, idx) => (
                                                        <li key={idx} className={`py-2 ${!plan.included[idx] ? 'text-muted' : ''}`}>
                                                            <div className="d-flex align-items-center">
                                                                {plan.included[idx] ? (
                                                                    <i className="ri-checkbox-circle-fill text-success me-2"></i>
                                                                ) : (
                                                                    <i className="ri-close-circle-line text-muted me-2"></i>
                                                                )}
                                                                <span>{feature}</span>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="mt-auto pt-3">
                                                    <Button variant={plan.popular ? 'gradient-primary' : 'soft-primary'} size="lg" className={`w-100 ${plan.popular ? 'shadow-sm' : ''}`}>{plan.popular ? 'Get Started' : 'Start Free Trial'}<i className={`ri-arrow-right-line ms-2 ${plan.popular ? 'text-white' : 'text-primary'}`}></i></Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            
            <Footer />
        </div>
    );
};

export default Pricing;
