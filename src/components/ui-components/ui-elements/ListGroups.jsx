import React from 'react';
import { Card, Col, Container, Row, ListGroup, Badge } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import listGroupData from '../../../data/ui/listgroup.json';

export default function ListGroups() {
    const renderBasicList = () => (
        <Col lg={4}>
            <Card>
                <Card.Body>
                    <Card.Title>{listGroupData.basicList.title}</Card.Title>
                    <ListGroup>
                        {listGroupData.basicList.items.map((item, index) => (
                            <ListGroup.Item key={index}>{item}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );

    const renderActiveItems = () => (
        <Col lg={4}>
            <Card>
                <Card.Body>
                    <Card.Title>{listGroupData.activeItems.title}</Card.Title>
                    <ListGroup as="ul">
                        {listGroupData.activeItems.items.map((item, index) => (
                            <ListGroup.Item as="li" key={index} active={item.active} disabled={item.disabled}>{item.text}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );

    const renderDisabledItems = () => (
        <Col lg={4}>
            <Card>
                <Card.Body>
                    <Card.Title>{listGroupData.disabledItems.title}</Card.Title>
                    <ListGroup>
                        {listGroupData.disabledItems.items.map((item, index) => (
                            <ListGroup.Item key={index} disabled={item.disabled}>{item.text}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );

    const renderNumberedList = () => (
        <Col lg={4}>
            <Card>
                <Card.Body>
                    <Card.Title>{listGroupData.numberedList.title}</Card.Title>
                    <ListGroup as="ol" numbered>
                        {listGroupData.numberedList.items.map((item, index) => (
                            <ListGroup.Item as="li" key={index}>{item}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );

    const renderCustomContent = () => (
        <Col lg={4}>
            <Card>
                <Card.Body>
                    <Card.Title>{listGroupData.customContent.title}</Card.Title>
                    <ListGroup as="ol" numbered>
                        {listGroupData.customContent.items.map((item, index) => (
                            <ListGroup.Item as="li" key={index} className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-semibold">{item.title}</div>
                                    <p className='text-muted mb-0'>{item.description}</p>
                                </div>
                                {item.badge && <Badge bg={item.badge.variant} pill>{item.badge.text}</Badge>}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );

    const renderHorizontalLists = () => (
        <Col lg={4}>
            <Card>
                <Card.Body>
                    <Card.Title>{listGroupData.horizontalLists.title}</Card.Title>
                    {listGroupData.horizontalLists.lists.map((list, index) => (
                        <ListGroup key={index} horizontal className='flex-wrap mb-3'>
                            {list.items.map((item, itemIndex) => (
                                <ListGroup.Item key={itemIndex}>{item}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    ))}
                </Card.Body>
            </Card>
        </Col>
    );

    const renderContextualClasses = () => (
        <Col sm={6}>
            <Card>
                <Card.Body>
                    <Card.Title>{listGroupData.contextualClasses.title}</Card.Title>
                    <ListGroup>
                        {listGroupData.contextualClasses.items.map((item, index) => (
                            <ListGroup.Item key={index} variant={item.variant} action={item.action}>
                                {item.text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );

    const renderContextualWithActions = () => (
        <Col sm={6}>
            <Card>
                <Card.Body>
                    <Card.Title>{listGroupData.contextualWithActions.title}</Card.Title>
                    <ListGroup>
                        {listGroupData.contextualWithActions.items.map((item, index) => (
                            <ListGroup.Item key={index} variant={item.variant} action={item.action}>
                                {item.text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );

    return (
        <div className='page-wrapper'>
            <div className='page-content'>
                <PageTitle pagePrTitle="UI Elements" pageTitle="List Groups" />
                <Container fluid>
                    <Row>
                        {renderBasicList()}
                        {renderActiveItems()}
                        {renderDisabledItems()}
                        {renderNumberedList()}
                        {renderCustomContent()}
                        {renderHorizontalLists()}
                    </Row>
                    <Row>
                        {renderContextualClasses()}
                        {renderContextualWithActions()}
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

