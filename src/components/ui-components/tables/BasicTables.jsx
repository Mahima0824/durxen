import React from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';

export default function BasicTables() {
    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="Tables" pageTitle="Basic Tables" />
                    <Container fluid>
                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Default Table</Card.Title>
                                        <Table striped bordered hover className='mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Item Name</th>
                                                    <th>Category</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Modern Sofa</td>
                                                    <td>Living Room</td>
                                                    <td>$499</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Dining Table</td>
                                                    <td>Dining Room</td>
                                                    <td>$899</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>King Bed</td>
                                                    <td>Bedroom</td>
                                                    <td>$1,299</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Small Table</Card.Title>
                                        <Table striped bordered hover size="sm" className='mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Username</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colSpan={2}>Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Dark Table</Card.Title>
                                        <Table striped bordered hover variant="dark" className='mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Username</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colSpan={2}>Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Striped rows</Card.Title>
                                        <Table striped className='mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Username</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colSpan={2}>Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Striped columns</Card.Title>
                                        <Table striped="columns" className='mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Username</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>Thornton</td>
                                                    <td>@fat</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colSpan={2}>Larry the Bird</td>
                                                    <td>@twitter</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Responsive Table</Card.Title>
                                        <Table responsive className='mb-0'>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    {Array.from({ length: 12 }).map((_, index) => (
                                                        <th key={index}>Table heading</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    {Array.from({ length: 12 }).map((_, index) => (
                                                        <td key={index}>Table cell {index}</td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    {Array.from({ length: 12 }).map((_, index) => (
                                                        <td key={index}>Table cell {index}</td>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    {Array.from({ length: 12 }).map((_, index) => (
                                                        <td key={index}>Table cell {index}</td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    )
}
