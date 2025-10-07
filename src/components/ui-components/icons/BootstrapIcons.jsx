import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';

export default function BootstrapIcons() {
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        // Fetch the latest icons JSON from the CDN
        const fetchIcons = async () => {
            try {
                const response = await fetch(
                    "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.json"
                );
                const data = await response.json();
                const iconNames = Object.keys(data);
                setIcons(iconNames);
            } catch (error) {
                console.error("Error fetching icons:", error);
            }
        };

        fetchIcons();
    }, []);

    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="Icons" pageTitle="Bootstrap Icons" />
                    <Container fluid>
                        <Row>
                            {icons.map((icon, index) => (
                                <Col md={4} xl={3} key={index} className='mb-4'>
                                    <Card className='h-100 mb-0'>
                                        <Card.Body className="text-center icon-box">
                                            <i className={`bi bi-${icon} icon-box-icon fs-26`}></i>
                                            <h6 className="icon-box-text mt-2 fs-16 mb-0">{icon}</h6>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    )
}
