import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer className='footer'>
                <Container fluid>
                    <Row>
                        <Col md={6} className='text-center text-md-start'>
                            <p className='fs-15 text-muted mb-0'>© {(new Date().getFullYear())} DurXen. All Rights Reserved.</p>
                        </Col>
                        <Col md={6} className='text-center text-md-end'>
                            <p className='fs-15 text-muted mb-0'>Expertly Designed & Developed by <Link to="https://mantrakshdevs.com/" target="_blank" className='fw-medium'>Mantraksh Devs</Link>.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}
