import React, { useState } from 'react';
import { Card, Col, Container, Row, Carousel } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import carouselsData from '../../../data/ui/carosels.json';

// Import all images
import CarouselImage1 from '../../../images/card-img/card-img-1.jpg';
import CarouselImage2 from '../../../images/card-img/card-img-2.jpg';
import CarouselImage3 from '../../../images/card-img/card-img-3.jpg';
import CarouselImage4 from '../../../images/card-img/card-img-4.jpg';

// Map image filenames to imported images
const imageMap = {
  'card-img-1.jpg': CarouselImage1,
  'card-img-2.jpg': CarouselImage2,
  'card-img-3.jpg': CarouselImage3,
  'card-img-4.jpg': CarouselImage4
};

export default function Carousels() {
    const [controlledIndex, setControlledIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setControlledIndex(selectedIndex);
    };

    const renderCarousel = (carousel) => {
        const carouselProps = {
            fade: carousel.type === 'fade',
            slide: carousel.type !== 'no-animation',
            ...(carousel.type === 'controlled' && {
                activeIndex: controlledIndex,
                onSelect: handleSelect
            })
        };

        return (
            <Col lg={6} key={carousel.id}>
                <Card>
                    <Card.Body>
                        <Card.Title>{carousel.title}</Card.Title>
                        <Carousel {...carouselProps}>
                            {carousel.items.map((item, idx) => (
                                <Carousel.Item key={idx}>
                                    <img className="d-block w-100" src={imageMap[item.image]} alt={`${item.title} slide`} />
                                    <Carousel.Caption>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Card.Body>
                </Card>
            </Col>
        );
    };

    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="UI Elements" pageTitle="Carousels" />
                    <Container fluid>
                        <Row>
                            {carouselsData.carousels.map(renderCarousel)}
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    )
}
