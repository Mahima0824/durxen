import React from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import PageTitle from '../layout/PageTitle';
import Footer from '../layout/Footer';
import avatar from '../../images/user/avatar-1.jpg';
import img1 from "../../images/products/prod-img/img-1.png"

const Invoice = () => {
    // Left pane: form state like the reference UI
    const [formData, setFormData] = React.useState({
        person: {
            name: 'John Smith',
            email: 'john_s@email.com',
            tag: 'On Arto+',
            avatar: avatar
        },
        subject: 'Service per June 2023',
        dueDate: new Date().toISOString().slice(0, 10),
        currency: 'IDR',
        discountPercent: 10,
        couponEnabled: false,
        notes: 'Last saved: Today at 4:30 PM'
    });

    // Products: image, qty, price, tax per item
    const [products, setProducts] = React.useState([
        {
            id: 1,
            item: 'Summer 2K23 T‑shirt',
            image: img1,
            quantity: 1,
            price: 125000,
            tax: 10
        }
    ]);

    // Handlers
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    };

    const handlePersonChange = (field, value) => {
        setFormData((prev) => ({ ...prev, person: { ...prev.person, [field]: value } }));
    };

    const handleProductChange = (id, field, value) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, [field]: field === 'quantity' || field === 'price' || field === 'tax' ? Number(value) : value } : p))
        );
    };

    const addProduct = () => {
        const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        setProducts([
            ...products,
            { id: newId, item: '', image: '', quantity: 1, price: 0, tax: 0 }
        ]);
    };

    const removeProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

    // Totals
    const lineAmount = (p) => p.quantity * p.price;
    const subtotal = products.reduce((s, p) => s + lineAmount(p), 0);
    const totalTax = products.reduce((s, p) => s + (lineAmount(p) * (p.tax || 0)) / 100, 0);
    const discountAmount = (subtotal * (formData.discountPercent || 0)) / 100;
    const total = subtotal - discountAmount + totalTax;

    return (
        <div className="page-wrapper">
            <div className="page-content">
                <PageTitle pageTitle="Invoice" pagePrTitle="E-commerce" />

                <Container fluid>
                    <Row>
                        {/* Left Column - Form (like image) */}
                        <Col lg={7}>
                            <Card>
                                <Card.Header className="bg-white border-0">
                                    <h5 className="mb-0 fw-bold">Invoice Details</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        {/* People */}
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-semibold">People *</Form.Label>
                                            <div className="d-flex align-items-center gap-3 p-2 rounded border">
                                                <img src={formData.person.avatar} alt="avatar" className="rounded-circle" width={40} height={40} />
                                                <div className="flex-grow-1">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <Form.Control type="text" value={formData.person.name} onChange={(e) => handlePersonChange('name', e.target.value)} className="border-0 p-0 bg-transparent shadow-none"/>
                                                        <Badge bg="gradient-primary">{formData.person.tag}</Badge>
                                                    </div>
                                                    <Form.Control type="email" value={formData.person.email} onChange={(e) => handlePersonChange('email', e.target.value)} className="border-0 p-0 fs-14 bg-transparent shadow-none text-muted"/>
                                                </div>
                                                <Button variant="light" size="sm" className="border"><i className="ri-edit-line"></i></Button>
                                            </div>
                                        </Form.Group>

                                        {/* Subject */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-semibold">Subject</Form.Label>
                                            <Form.Control type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" />
                                        </Form.Group>

                                        {/* Due date + Currency */}
                                        <Row >
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">Due date</Form.Label>
                                                    <Form.Control type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="fw-semibold">Currency</Form.Label>
                                                    <Form.Select name="currency" value={formData.currency} onChange={handleInputChange}>
                                                        <option value="IDR">IDR Indonesian Rupiah</option>
                                                        <option value="INR">INR Indian Rupee</option>
                                                        <option value="USD">USD US Dollar</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {/* Product section */}
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <h6 className="fw-bold mb-0">Product</h6>
                                        </div>
                                        <Table responsive className="align-middle table-hover" size='sm'>
                                            <thead className="text-muted">
                                                <tr>
                                                    <th className="w-50">Item</th>
                                                    <th>Qty</th>
                                                    <th>Tax</th>
                                                    <th className="text-end">Amount</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map((p) => (
                                                    <tr key={p.id} className="border-top">
                                                        <td>
                                                            <div className="d-flex align-items-center gap-3">
                                                                {p.image ? (
                                                                    <img src={p.image} alt="item" className="rounded" width={38} height={38} />
                                                                ) : (
                                                                    <div className="rounded bg-light d-inline-flex align-items-center justify-content-center" style={{ width: 38, height: 38 }}> <i className="ri-image-2-line text-muted"></i> </div>
                                                                )}
                                                                <div>
                                                                    <Form.Control className='w-auto' type="text" value={p.item} placeholder="Item name" onChange={(e) => handleProductChange(p.id, 'item', e.target.value)}/>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <Form.Control type="number" min={0} value={p.quantity} onChange={(e) => handleProductChange(p.id, 'quantity', e.target.value)} />
                                                        </td>
                                                        <td>
                                                            <InputGroup>
                                                                <Form.Select value={p.tax} className='w-auto' onChange={(e) => handleProductChange(p.id, 'tax', e.target.value)}>
                                                                    <option value={0}>0%</option>
                                                                    <option value={5}>5%</option>
                                                                    <option value={10}>10%</option>
                                                                    <option value={18}>18%</option>
                                                                </Form.Select>
                                                            </InputGroup>
                                                        </td>
                                                        <td className="text-end fw-semibold">
                                                            {formData.currency} {(lineAmount(p)).toLocaleString()}
                                                        </td>
                                                        <td className="text-end">
                                                            <Button variant="link" className="text-danger p-0" onClick={() => removeProduct(p.id)}><i className="ri-delete-bin-line"></i></Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <Button variant="soft-danger" size="sm" className="mb-3" onClick={addProduct}><i className="ri-add-line me-1"></i> Add New Line</Button>

                                        <Card className="">
                                            <Card.Body>
                                                <Form.Check type="switch" id="couponEnabled" label="Add Coupon" checked={formData.couponEnabled} onChange={(e) => setFormData((prev) => ({ ...prev, couponEnabled: e.target.checked }))}/>
                                                <Row>
                                                    <Col md={7}>
                                                        <Form.Group>
                                                            <Form.Label className="small text-muted mt-3">Add Discount</Form.Label>
                                                            <InputGroup>
                                                                <Form.Control type="text" placeholder="e.g., Summer Sale 10th" disabled />
                                                                <InputGroup.Text className="bg-white">%</InputGroup.Text>
                                                                <Form.Control type="number" min={0} max={100} name="discountPercent" value={formData.discountPercent} onChange={handleInputChange} style={{ maxWidth: 90 }}/>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>

                                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                                            <div className="text-muted small">{formData.notes}</div>
                                            <div className="d-flex flex-wrap gap-2">
                                                <Button variant="soft-danger">Cancel</Button>
                                                <Button variant="gradient-primary"><span className="me-2">●</span> Processing Invoice</Button>
                                            </div>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Right Column - Preview */}
                        <Col lg={5}>
                            <Card>
                                <Card.Header className="bg-white fle border-0 d-flex flex-wrap align-items-center justify-content-between gap-3">
                                    <div className="fw-semibold">Preview <i className="ri-information-line ms-1 text-muted"></i></div>
                                    <div className="d-flex flex-wrap gap-2">
                                        <Button size="sm" variant="soft-danger"><i className="ri-file-download-line me-1"></i> PDF</Button>
                                        <Button size="sm" variant="soft-primary"><i className="ri-mail-line me-1"></i> Email</Button>
                                        <Button size="sm" variant="soft-success"><i className="ri-bank-card-line me-1"></i> Payment page</Button>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Card className='mb-0'>
                                        <Card.Body className="p-4">
                                            <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center border-bottom pb-3 mb-4">
                                                <div>
                                                    <h5 className="fw-bold text-primary">Mantraksh Devs</h5>
                                                    <p className="text-muted small mb-0">123 Business Street, Mumbai</p>
                                                    <p className="text-muted small mb-0">support@company.com</p>
                                                </div>
                                                <div className="text-end ms-auto">
                                                    <h6 className="mb-1 fw-bold">
                                                        INV{new Date().getFullYear()}-{String(Math.floor(Math.random() * 900) + 100)}
                                                    </h6>
                                                    <div className="text-muted small">{new Date().toLocaleDateString()}</div>
                                                    <Badge bg="success" className="mt-2">PAID</Badge>
                                                </div>
                                            </div>
                                            <Row className="mb-4">
                                                <Col md={6}>
                                                    <div className="text-uppercase text-muted small mb-1">Due date</div>
                                                    <div className="fw-semibold">{new Date(formData.dueDate).toLocaleDateString()}</div>
                                                    <div className="text-uppercase text-muted small mt-3 mb-1">Billed to</div>
                                                    <div className="fw-semibold text-truncate">{formData.person.name}</div>
                                                </Col>
                                                <Col md={6}>
                                                    <div className="text-uppercase text-muted small mb-1">Subject</div>
                                                    <div className="fw-semibold">{formData.subject}</div>
                                                    <div className="text-uppercase text-muted small mt-3 mb-1">Currency</div>
                                                    <div className="fw-semibold">{formData.currency}</div>
                                                </Col>
                                            </Row>

                                            {/* Table */}
                                            <Table responsive className="align-middle table-nowrap rounded-3 overflow-hidden shadow-sm">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Description</th>
                                                        <th className="text-center">Qty</th>
                                                        <th className="text-end">Unit Price</th>
                                                        <th className="text-end">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products.map((p) => (
                                                        <tr key={p.id}>
                                                            <td>
                                                                <div className="d-flex align-items-center gap-2">
                                                                    {p.image && (
                                                                        <img src={p.image} alt="item" width={32} height={32} className="rounded border"/>
                                                                    )}
                                                                    <span className="fw-semibold">{p.item || "Item"}</span>
                                                                </div>
                                                            </td>
                                                            <td className="text-center">{p.quantity}</td>
                                                            <td className="text-end text-muted">
                                                                {formData.currency} {p.price.toLocaleString()}
                                                            </td>
                                                            <td className="text-end fw-semibold">
                                                                {formData.currency} {lineAmount(p).toLocaleString()}
                                                            </td>
                                                        </tr>
                                                    ))}

                                                    <tr>
                                                        <td colSpan={3} className="text-end text-muted">Subtotal</td>
                                                        <td className="text-end fw-semibold">{formData.currency} {subtotal.toLocaleString()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} className="text-end text-muted">Discount -{formData.discountPercent}%</td>
                                                        <td className="text-end fw-semibold text-danger">
                                                            - {formData.currency} {discountAmount.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={3} className="text-end text-muted">Tax</td>
                                                        <td className="text-end fw-semibold">{formData.currency} {totalTax.toLocaleString()}</td>
                                                    </tr>
                                                    <tr className="table-active">
                                                        <td colSpan={3} className="text-end fw-bold fs-5">Total</td>
                                                        <td className="text-end fw-bold fs-5 text-primary">{formData.currency} {total.toLocaleString()}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <div className="border-top pt-3 mb-3">
                                                <h6 className="fw-bold">Notes</h6>
                                                <p className="text-muted small mb-0">Thank you for your business. Please make the payment by the due date. For any queries, contact support@company.com.</p>
                                            </div>

                                            {/* Attachments */}
                                            <div className="mt-4 p-3 border rounded d-flex flex-wrap align-items-center justify-content-between gap-3 bg-light">
                                                <div className="d-flex align-items-center gap-3">
                                                    <i className="ri-attachment-2 text-primary fs-4"></i>
                                                    <div>
                                                        <div className="fw-semibold">Product list.PDF</div>
                                                        <div className="text-muted small">512kb</div>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="primary"><i className="ri-download-2-line me-1"></i> Download</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default Invoice;
