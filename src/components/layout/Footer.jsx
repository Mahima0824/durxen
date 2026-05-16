import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer className='footer'>
                <Container fluid>
                    <Row className=''>
                       
                        <Col md={12} className='text-center text-md-end'>
                            <div className='d-flex justify-content-center flex-wrap align-items-center'>
                                <p className='fs-15 text-muted mb-0'>© {(new Date().getFullYear())} DurXen. All Rights Reserved.</p>
                            
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}
