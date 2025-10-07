import React from 'react';
import { Card, Col, Container, Row, Accordion, Badge, Image } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import accordionData from '../../../data/ui/accordian.json';

// Import user images
import User1 from '../../../images/user/avatar-1.jpg';
import User2 from '../../../images/user/avatar-2.jpg';
import User3 from '../../../images/user/avatar-3.jpg';

const userImages = {
  'avatar-1.jpg': User1,
  'avatar-2.jpg': User2,
  'avatar-3.jpg': User3
};

export default function Accordions() {
  const renderAccordionItem = (item, type, index) => {
    // Common accordion item props
    const accordionItemProps = {
      eventKey: index.toString()
    };

    // Add class for bordered variant
    if (type === 'bordered') {
      accordionItemProps.className = `accordion-${item.variant}`;
    }

    // Render header based on accordion type
    const renderHeader = () => {
      switch (type) {
        case 'withIcons':
          return (
            <>
              <i className={`${item.icon} fs-22 me-2`}></i>
              {item.title}
            </>
          );

        case 'withBadges':
          return (
            <>
              <Badge bg={item.badge.variant} className='me-2'>{item.badge.text}</Badge>
              {item.title}
            </>
          );

        case 'withImages':
          return (
            <div className="d-flex align-items-center">
              <Image src={userImages[item.image]} alt="avatar-img" rounded className="avatar-img-sm me-2" />
              <div>
                <span className='d-block mb-1'>{item.title}</span>
                <p className='text-muted fw-normal fs-14 mb-0'>{item.subtitle}</p>
              </div>
            </div>
          );

        default:
          return item.title;
      }
    };

    return (
      <Accordion.Item key={item.id} {...accordionItemProps}>
        <Accordion.Header>{renderHeader()}</Accordion.Header>
        <Accordion.Body>{item.content}</Accordion.Body>
      </Accordion.Item>
    );
  };

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="UI Elements" pageTitle="Accordions" />
        <Container fluid>
          <Row>
            {accordionData.accordionTypes.map((accordionType, idx) => (
              <Col md={6} key={idx}>
                <Card>
                  <Card.Body>
                    <Card.Title>{accordionType.title}</Card.Title>
                    <Accordion className={accordionType.type !== 'default' ? 'custom-accordion' : ''} defaultActiveKey="0">
                      {accordionType.items.map((item, index) => renderAccordionItem(item, accordionType.type, index))}
                    </Accordion>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {/* Add shadow variant manually since it's not in the JSON */}
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Accordion with Shadow Effects</Card.Title>
                  <Accordion className='custom-accordion accordion-shadow' defaultActiveKey="0">
                    {accordionData.accordionTypes[0].items.map((item, index) => (
                      <Accordion.Item key={`shadow-${index}`} eventKey={index.toString()}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>{item.content}</Accordion.Body>
                      </Accordion.Item>
                    )).slice(0, 3)}
                  </Accordion>
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
