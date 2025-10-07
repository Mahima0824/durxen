import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import iconsData from "./remix-icons.json";

export default function RemixIcons() {
    const [currentCategory, setCurrentCategory] = useState("Arrows"); // Default category
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        setIcons(iconsData[currentCategory]); // Set default icons on component load
    }, [currentCategory]);

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
        setIcons(iconsData[category]);
    };

    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="Icons" pageTitle="Remix Icons" />
                    <Container fluid>
                        <Row>
                            <Col md={12}>
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {Object.keys(iconsData).map((category, index) => (
                                        <Button size='sm' key={index} onClick={() => handleCategoryChange(category)} variant={currentCategory === category ? "primary" : "outline-primary"}>
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </Col>

                            <Col md={12}>
                                <h5 className="mb-3">{currentCategory} Icons</h5>
                            </Col>

                            {icons.map((icon, index) => (
                                <Col md={4} xl={3} key={index} className="mb-4">
                                    <Card className='h-100 mb-0'>
                                        <Card.Body className="text-center icon-box">
                                            <i className={`ri-${icon} icon-box-icon fs-26`}></i>
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
