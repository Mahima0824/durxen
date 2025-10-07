import React, { useState } from 'react';
import PageTitle from '../layout/PageTitle';
import { Container, Row, Col, Form, Button, Card, Nav, Tab, Image, } from 'react-bootstrap';
import img1 from "../../images/products/prod-img/img-1.png";
import img2 from "../../images/products/prod-img/img-2.png";
import img3 from "../../images/products/prod-img/img-3.png";
import Footer from '../layout/Footer';

const CheckOut = () => {
  const [activeTab, setActiveTab] = useState('billing')
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const cartItems = [
    {
      id: 1,
      name: 'Apple iPhone 13 Pro Max',
      price: 1099.99,
      quantity: 1,
      image: img1,
      originalPrice: 514.66
    },
    {
      id: 2,
      name: 'Samsung Galaxy S22 Ultra',
      price: 1199.99,
      quantity: 1,
      image: img2,
      originalPrice: 99.00
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      price: 399.99,
      quantity: 1,
      image: img3,
      originalPrice: 129.99
    }
  ]

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)
  }

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pageTitle="CheckOut" pagePrTitle="E-commerce" />

        <Container fluid>
          <Tab.Container id="checkout-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Row>
              <Col lg={8}>
                <Nav variant="pills" className="nav-justified mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="billing" className="p-3 text-center text bg-soft-primary" active={activeTab === 'billing'}>
                      <i className="ri-user-line me-2"></i> Billing Info
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="shipping" className="p-3 text-center text bg-soft-primary" active={activeTab === 'shipping'}>
                      <i className="ri-truck-line me-2"></i> Shipping Info
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payment" className="p-3 text-center text bg-soft-primary" active={activeTab === 'payment'}>
                      <i className="ri-credit-card-line me-2"></i> Payment Info
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="billing">
                    <Card>
                      <Card.Body>
                        <h4 className="mb-3">Billing Information</h4>
                        <p className="text-muted">Fill the form below in order to send you the order's invoice.</p>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your first name" required />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your last name" required />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Email Address *</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" required />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Phone *</Form.Label>
                                <Form.Control type="text" placeholder="(xx) xxx xxxx xxx" required />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter full address" required />
                          </Form.Group>

                          <Row>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>Town / City</Form.Label>
                                <Form.Control type="text" placeholder="Enter your city name" required />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="Enter your state" required />
                              </Form.Group>
                            </Col>
                            <Col md={4}>
                              <Form.Group className="mb-3">
                                <Form.Label>Zip / Postal Code</Form.Label>
                                <Form.Control type="text" placeholder="Enter your zip code" required />
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Select required>
                              <option value="">Select Country</option>
                              <option value="US">United States</option>
                              <option value="UK">United Kingdom</option>
                              <option value="IN">India</option>
                              <option value="DE">Germany</option>
                              <option value="FR">France</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Check type="checkbox" id="ship-different-address" label="Ship to different address?" />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Order Notes:</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Write some note.." />
                          </Form.Group>

                          <div className="d-flex justify-content-between mt-4">
                            <Button variant="outline-secondary">
                              <i className="fas fa-arrow-left me-1"></i> Back to Shopping Cart
                            </Button>
                            <Button variant="danger" onClick={() => setActiveTab('shipping')}>
                              Proceed to Shipping <i className="fas fa-arrow-right ms-1"></i>
                            </Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  <Tab.Pane eventKey="shipping">
                    <Card>
                      <Card.Body>
                        <h4 className="mb-3">Shipping Information</h4>
                        <p className="text-muted">Choose your shipping method and address.</p>

                        <Form>
                          <Form.Group className="mb-4">
                            <Form.Label className="d-block fw-bold">Shipping Method</Form.Label>
                            <div className="border p-3 rounded mb-3">
                              <Form.Check type="radio" id="standard-shipping" name="shipping-method" label="Standard Delivery - FREE" defaultChecked />
                              <small className="d-block text-muted ms-4">Estimated 5-7 days shipping (Duties and tax may be due upon delivery)</small>
                            </div>
                            <div className="border p-3 rounded mb-3">
                              <Form.Check type="radio" id="express-shipping" name="shipping-method" label="Express Delivery - $24.00" />
                              <small className="d-block text-muted ms-4">Estimated 1-2 days shipping (Duties and tax may be due upon delivery)</small>
                            </div>
                            <div className="border p-3 rounded">
                              <Form.Check type="radio" id="next-day-shipping" name="shipping-method" label="Next Day Delivery - $50.00" />
                              <small className="d-block text-muted ms-4">Estimated delivery next day (Duties and tax may be due upon delivery)</small>
                            </div>
                          </Form.Group>

                          <div className="d-flex justify-content-between mt-4">
                            <Button variant="outline-secondary" onClick={() => setActiveTab('billing')}>
                              <i className="fas fa-arrow-left me-1"></i> Back to Billing Info
                            </Button>
                            <Button variant="danger" onClick={() => setActiveTab('payment')}>
                              Proceed to Payment <i className="fas fa-arrow-right ms-1"></i>
                            </Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>

                  <Tab.Pane eventKey="payment">
                    <Card>
                      <Card.Body>
                        <h4 className="mb-3">Payment Information</h4>
                        <p className="text-muted">Choose your payment method.</p>
                        <Form>
                          <Form.Group className="mb-4">
                            <Form.Label className="d-block fw-bold">Payment Method</Form.Label>
                            <div className="border p-3 rounded mb-3">
                              <Form.Check type="radio" id="credit-card" name="payment-method" label="Credit / Debit Card" defaultChecked />
                              <div className="mt-3 ms-4">
                                <Row>
                                  <Col md={6}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Name on Card</Form.Label>
                                      <Form.Control type="text" placeholder="Name on card" required />
                                    </Form.Group>
                                  </Col>
                                  <Col md={6}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Card Number</Form.Label>
                                      <Form.Control type="text" placeholder="xxxx xxxx xxxx xxxx" required />
                                    </Form.Group>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md={4}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Expiry Month</Form.Label>
                                      <Form.Select required>
                                        <option value="">Month</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                      </Form.Select>
                                    </Form.Group>
                                  </Col>
                                  <Col md={4}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Expiry Year</Form.Label>
                                      <Form.Select required>
                                        <option value="">Year</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                      </Form.Select>
                                    </Form.Group>
                                  </Col>
                                  <Col md={4}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>CVV Code</Form.Label>
                                      <Form.Control type="text" placeholder="CVV" required />
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                            <div className="border p-3 rounded mb-3">
                              <Form.Check type="radio" id="paypal" name="payment-method" label="PayPal" />
                              <small className="d-block text-muted ms-4">You will be redirected to PayPal website to complete your purchase securely.</small>
                            </div>
                            <div className="border p-3 rounded">
                              <Form.Check type="radio" id="bank-transfer" name="payment-method" label="Bank Transfer" />
                              <small className="d-block text-muted ms-4">Make your payment directly into our bank account. Please use your Order ID as the payment reference.</small>
                            </div>
                          </Form.Group>

                          <div className="d-flex justify-content-between mt-4">
                            <Button variant="outline-secondary" onClick={() => setActiveTab('shipping')}><i className="fas fa-arrow-left me-1"></i> Back to Shipping</Button>
                            <Button variant="success" type="submit">Complete Order <i className="fas fa-check ms-1"></i></Button>
                          </div>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>

              <Col lg={4}>
                <Card>
                  <Card.Header className="bg-transparent py-3">
                    <h5 className="mb-0">Order Summary</h5>
                  </Card.Header>
                  <Card.Body>
                    {cartItems.map((item) => (
                      <div key={item.id} className="d-flex mb-3">
                        <div className="flex-shrink-0">
                          <Image src={item.image} alt={item.name} width={64} height={64} className="border rounded" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">{item.name}</h6>
                          <div className="d-flex justify-content-between">
                            <small className="text-muted">1 × ${item.originalPrice}</small>
                            <span className="fw-bold">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between mb-2">
                      <span>Sub Total:</span>
                      <span className="fw-bold">${calculateTotal()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span className="text-success">FREE</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-0">
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold text-danger fs-5">${calculateTotal()}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default CheckOut;