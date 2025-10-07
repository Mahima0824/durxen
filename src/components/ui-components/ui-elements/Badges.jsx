import React from 'react';
import { Card, Col, Container, Row, Badge, Button } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import badgeSections from '../../../data/ui/badges.json';

export default function Badges() {
    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="UI Elements" pageTitle="Badges" />
                    <Container fluid>
                        <Row>
                            {badgeSections.map((section, sectionIndex) => (
                                <Col key={sectionIndex} md={section.type === 'size' ? 12 : 6}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{section.title}</Card.Title>
                                            {section.type === 'size' ? (
                                                <Row>
                                                    {section.columns.map((col, colIndex) => (
                                                        <Col key={colIndex} md={4}>
                                                            <div className='d-flex align-items-center flex-wrap gap-2'>
                                                                {col.items.map((item, itemIndex) => (
                                                                    <Badge key={itemIndex} bg={item.bg} className={`badge-${item.size}`}>{item.text}</Badge>
                                                                ))}
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            ) : section.type === 'button' ? (
                                                <div className='d-flex align-items-center flex-wrap gap-3'>
                                                    {section.items.map((item, itemIndex) => (
                                                        <Button key={itemIndex} variant={item.variant} className='badge-center'>
                                                            {item.badge.position === 'left' ? (
                                                                <>
                                                                    <Badge bg={item.badge.bg} className={item.badge.pill ? 'pill' : ''}>{item.badge.text}</Badge>
                                                                    {item.text}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {item.text}
                                                                    <Badge bg={item.badge.bg} className={`ms-2 ${item.badge.pill ? 'pill' : ''}`}>{item.badge.text}</Badge>
                                                                </>
                                                            )}
                                                        </Button>
                                                    ))}
                                                </div>
                                            ) : section.type === 'positioned' ? (
                                                <div className='d-flex align-items-center flex-wrap gap-4'>
                                                    {section.items.map((item, itemIndex) => (
                                                        <Button key={itemIndex} variant={item.variant} className="position-relative">
                                                            {item.text}
                                                            <Badge bg={item.badge.bg} pill className={`position-absolute ${getPositionClass(item.badge.position)} border border-white border-3 shadow-lg`}>{item.badge.text}</Badge>
                                                            {item.badge.icon && <i className={item.badge.icon}></i>}
                                                        </Button>
                                                    ))}
                                                </div>
                                            ) : section.type === 'dot-positioned' ? (
                                                <div className='d-flex align-items-center flex-wrap gap-4'>
                                                    {section.items.map((item, itemIndex) => (
                                                        <Button key={itemIndex} variant={item.variant} className="position-relative">
                                                            {item.text}
                                                            <span className={`position-absolute ${getPositionClass(item.dot.position)} ${getDotClasses(item.dot)}`}></span>
                                                        </Button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className='d-flex align-items-center flex-wrap gap-2'>
                                                    {section.items.map((item, itemIndex) => (
                                                        <Badge key={itemIndex} bg={item.bg} className={section.type === 'pill' || section.type === 'soft-pill' ? 'pill' : ''}>{item.text}</Badge>
                                                    ))}
                                                </div>
                                            )}
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
    );

    function getPositionClass(position) {
        const positionMap = {
            'top-right': 'top-0 start-100 translate-middle',
            'top-left': 'top-0 start-0 translate-middle',
            'middle-right': 'top-50 start-100 translate-middle',
            'middle-left': 'top-50 start-0 translate-middle',
            'top-center': 'top-0 start-50 translate-middle',
            'bottom-right': 'bottom-0 start-100 translate-middle',
            'bottom-left': 'bottom-0 start-0 translate-middle',
            'right': 'top-50 start-100 translate-middle',
            'left': 'top-50 start-0 translate-middle'
        };
        return positionMap[position] || '';
    }

    function getDotClasses(dot) {
        const classes = [];
        classes.push(`p-${dot.size === 'lg' ? '3' : '2'}`);
        classes.push(`bg-${dot.color}`);
        classes.push('border border-white border-3');
        classes.push(dot.shape || 'rounded-circle');
        return classes.join(' ');
    }
}
