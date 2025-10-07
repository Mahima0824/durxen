import React from 'react';
import { Card, Col, Container, Row, Button, ListGroup, CardGroup } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import cardsJson from '../../../data/ui/cards.json';

import CardImg1 from '../../../images/card-img/card-img-1.jpg';
import CardImg2 from '../../../images/card-img/card-img-2.jpg';
import CardImg3 from '../../../images/card-img/card-img-3.jpg';
import CardImg4 from '../../../images/card-img/card-img-4.jpg';

const cardImages = {
    'card-img-1.jpg': CardImg1,
    'card-img-2.jpg': CardImg2,
    'card-img-3.jpg': CardImg3,
    'card-img-4.jpg': CardImg4
};

const getCardById = (id) => {
    return cardsJson.cards.find(card => card.id === id);
};

export default function Cards() {
    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="UI Elements" pageTitle="Cards" />
                    <Container fluid>
                        {/* First Row - Basic Cards */}
                        <Row>
                            <Col xl={4}>
                                <Card>
                                    <Card.Img variant="top" src={cardImages[getCardById('basic-1').image.src]} />
                                    <Card.Body>
                                        <Card.Title>{getCardById('basic-1').title}</Card.Title>
                                        <Card.Text>{getCardById('basic-1').text}</Card.Text>
                                        <Button variant={getCardById('basic-1').button.variant}>{getCardById('basic-1').button.text}</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{getCardById('basic-2').title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{getCardById('basic-2').subtitle}</Card.Subtitle>
                                        <Card.Text>{getCardById('basic-2').text}</Card.Text>
                                        {getCardById('basic-2').links.map((link, i) => (
                                            <Card.Link key={i} href={link.href}>{link.text}</Card.Link>
                                        ))}
                                    </Card.Body>
                                    <Card.Img variant="bottom" src={cardImages[getCardById('basic-2').image.src]} />
                                </Card>
                            </Col>
                            <Col xl={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title className='mb-0'>{getCardById('basic-3').title}</Card.Title>
                                    </Card.Body>
                                    <Card.Img variant="middle" src={cardImages[getCardById('basic-3').image.src]} />
                                    <Card.Body>
                                        <Card.Text>{getCardById('basic-3').text}</Card.Text>
                                        <Button variant={getCardById('basic-3').button.variant}>{getCardById('basic-3').button.text}</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{getCardById('normal-1').title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{getCardById('normal-1').subtitle}</Card.Subtitle>
                                        <Card.Text>{getCardById('normal-1').text}</Card.Text>
                                        {getCardById('normal-1').links.map((link, i) => (
                                            <Card.Link key={i} href={link.href}>{link.text}</Card.Link>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <ListGroup variant="flush" className='rounded'>
                                            {getCardById('list-1').listItems.map((item, i) => (
                                                <ListGroup.Item key={i}>{item}</ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Header>{getCardById('list-2').header}</Card.Header>
                                        <ListGroup variant="flush" className='rounded'>
                                            {getCardById('list-2').listItems.map((item, i) => (
                                                <ListGroup.Item key={i}>{item}</ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Img variant="top" src={cardImages[getCardById('complex-1').image.src]} />
                                    <Card.Body>
                                        <Card.Title>{getCardById('complex-1').title}</Card.Title>
                                        <Card.Text>{getCardById('complex-1').text}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        {getCardById('complex-1').listItems.map((item, i) => (
                                            <ListGroup.Item key={i}>{item}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Card.Body className='d-flex flex-wrap gap-2'>
                                        {getCardById('complex-1').buttons.map((btn, i) => (
                                            <Button key={i} variant={btn.variant}>
                                                {btn.text} {btn.icon && <i className={btn.icon}></i>}
                                            </Button>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Img src={cardImages[getCardById('complex-2').image.src]} className='rounded' />
                                        <Card.Title className='mt-4'>{getCardById('complex-2').title}</Card.Title>
                                        <Card.Text>{getCardById('complex-2').text}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        {getCardById('complex-2').listItems.map((item, i) => (
                                            <ListGroup.Item key={i}>{item}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Card.Body className='d-flex flex-wrap gap-2'>
                                        {getCardById('complex-2').buttons.map((btn, i) => (
                                            <Button key={i} variant={btn.variant}>
                                                {btn.text} {btn.icon && <i className={btn.icon}></i>}
                                            </Button>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{getCardById('complex-3').title}</Card.Title>
                                        <Card.Text>{getCardById('complex-3').text}</Card.Text>
                                        <Card.Img src={cardImages[getCardById('complex-3').image.src]} className='rounded' />
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        {getCardById('complex-3').listItems.map((item, i) => (
                                            <ListGroup.Item key={i}>{item}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Card.Body className='d-flex flex-wrap gap-2'>
                                        {getCardById('complex-3').buttons.map((btn, i) => (
                                            <Button key={i} variant={btn.variant}>
                                                {btn.text} {btn.icon && <i className={btn.icon}></i>}
                                            </Button>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Header>{getCardById('featured-1').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('featured-1').title}</Card.Title>
                                        <Card.Text>{getCardById('featured-1').text}</Card.Text>
                                        <Button variant={getCardById('featured-1').button.variant}>{getCardById('featured-1').button.text}</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Header as={getCardById('featured-2').header.as}>{getCardById('featured-2').header.text}</Card.Header>
                                    <Card.Body>
                                        <Card.Title className={getCardById('featured-2').title.className}>{getCardById('featured-2').title.text}</Card.Title>
                                        <Card.Text>{getCardById('featured-2').text}</Card.Text>
                                        <Button variant={getCardById('featured-2').button.variant}>{getCardById('featured-2').button.text}</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        {/* Quote Cards */}
                        <Row>
                            <Col md={12}>
                                <h5>Quote Card Color</h5>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Header>{getCardById('quote-1').header}</Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote mb-0">
                                            <p className='mb-4'>{getCardById('quote-1').quote}</p>
                                            <footer className="blockquote-footer">
                                                {getCardById('quote-1').author} in <cite title={getCardById('quote-1').location}>{getCardById('quote-1').location}</cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card className={`bg-${getCardById('quote-2').bgColor} text-${getCardById('quote-2').textColor}`}>
                                    <Card.Header className='text-white'>{getCardById('quote-2').header}</Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote text-white mb-0">
                                            <p className='mb-4'>{getCardById('quote-2').quote}</p>
                                            <footer className="blockquote-footer text-white">
                                                {getCardById('quote-2').author} in <cite title={getCardById('quote-2').location}>{getCardById('quote-2').location}</cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card className={`bg-${getCardById('quote-3').bgColor} text-${getCardById('quote-3').textColor}`}>
                                    <Card.Header className='text-white'>{getCardById('quote-3').header}</Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote text-white mb-0">
                                            <p className='mb-4'>{getCardById('quote-3').quote}</p>
                                            <footer className="blockquote-footer text-white">
                                                {getCardById('quote-3').author} in <cite title={getCardById('quote-3').location}>{getCardById('quote-3').location}</cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card className={`bg-${getCardById('quote-4').bgColor} text-${getCardById('quote-4').textColor}`}>
                                    <Card.Header className='text-white'>{getCardById('quote-4').header}</Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote text-white mb-0">
                                            <p className='mb-4'>{getCardById('quote-4').quote}</p>
                                            <footer className="blockquote-footer text-white">
                                                {getCardById('quote-4').author} in <cite title={getCardById('quote-4').location}>{getCardById('quote-4').location}</cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card className={`bg-${getCardById('quote-5').bgColor} text-${getCardById('quote-5').textColor}`}>
                                    <Card.Header className='text-white'>{getCardById('quote-5').header}</Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote text-white mb-0">
                                            <p className='mb-4'>{getCardById('quote-5').quote}</p>
                                            <footer className="blockquote-footer text-white">
                                                {getCardById('quote-5').author} in <cite title={getCardById('quote-5').location}>{getCardById('quote-5').location}</cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card className={`bg-${getCardById('quote-6').bgColor} text-${getCardById('quote-6').textColor}`}>
                                    <Card.Header className='text-white'>{getCardById('quote-6').header}</Card.Header>
                                    <Card.Body>
                                        <blockquote className="blockquote text-white mb-0">
                                            <p className='mb-4'>{getCardById('quote-6').quote}</p>
                                            <footer className="blockquote-footer text-white">
                                                {getCardById('quote-6').author} in <cite title={getCardById('quote-6').location}>{getCardById('quote-6').location}</cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        {/* Centered Cards */}
                        <Row>
                            <Col lg={4}>
                                <Card className="text-center">
                                    <Card.Header>{getCardById('centered-1').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('centered-1').title}</Card.Title>
                                        <Card.Text>{getCardById('centered-1').text}</Card.Text>
                                        <Button variant={getCardById('centered-1').button.variant}>{getCardById('centered-1').button.text}</Button>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">{getCardById('centered-1').footer}</Card.Footer>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card className="text-center">
                                    <Card.Header className={getCardById('centered-2').header.className}>{getCardById('centered-2').header.text}</Card.Header>
                                    <Card.Body>
                                        <Card.Title className={getCardById('centered-2').title.className}>{getCardById('centered-2').title.text}</Card.Title>
                                        <Card.Text>{getCardById('centered-2').text}</Card.Text>
                                        <Button variant={getCardById('centered-2').button.variant}>{getCardById('centered-2').button.text}</Button>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">{getCardById('centered-2').footer}</Card.Footer>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card className={`text-center bg-${getCardById('centered-3').bgColor} text-${getCardById('centered-3').textColor}`}>
                                    <Card.Header className='text-white'>{getCardById('centered-3').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title className='text-white'>{getCardById('centered-3').title}</Card.Title>
                                        <Card.Text className='text-white'>{getCardById('centered-3').text}</Card.Text>
                                        <Button variant={getCardById('centered-3').button.variant}>{getCardById('centered-3').button.text}</Button>
                                    </Card.Body>
                                    <Card.Footer className="text-white">{getCardById('centered-3').footer}</Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                        {/* Image Only Cards */}
                        <Row>
                            <Col lg={4}>
                                <Card>
                                    <Card.Img variant="top" src={cardImages[getCardById('image-only-1').image.src]} />
                                    <Card.Body>
                                        <Card.Text>{getCardById('image-only-1').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Text>{getCardById('image-only-2').text}</Card.Text>
                                    </Card.Body>
                                    <Card.Img variant="bottom" src={cardImages[getCardById('image-only-2').image.src]} />
                                </Card>
                            </Col>
                            <Col lg={4}>
                                <Card className={`bg-${getCardById('image-only-3').bgColor} text-${getCardById('image-only-3').textColor}`}>
                                    <Card.Img src={cardImages[getCardById('image-only-3').image.src]} alt="Card image" />
                                    <Card.ImgOverlay>
                                        <Card.Title>{getCardById('image-only-3').overlay.title}</Card.Title>
                                        <Card.Text>{getCardById('image-only-3').overlay.text}</Card.Text>
                                        <Card.Text>{getCardById('image-only-3').overlay.updateText}</Card.Text>
                                    </Card.ImgOverlay>
                                </Card>
                            </Col>
                        </Row>
                        {/* Color Cards */}
                        <Row>
                            <Col md={12}>
                                <h5>Card Colors</h5>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-1').bgColor} text={getCardById('color-1').textColor}>
                                    <Card.Header>{getCardById('color-1').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-1').title}</Card.Title>
                                        <Card.Text>{getCardById('color-1').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-2').bgColor} text={getCardById('color-2').textColor}>
                                    <Card.Header>{getCardById('color-2').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-2').title}</Card.Title>
                                        <Card.Text>{getCardById('color-2').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-3').bgColor} text={getCardById('color-3').textColor}>
                                    <Card.Header>{getCardById('color-3').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-3').title}</Card.Title>
                                        <Card.Text>{getCardById('color-3').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-4').bgColor} text={getCardById('color-4').textColor}>
                                    <Card.Header>{getCardById('color-4').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-4').title}</Card.Title>
                                        <Card.Text>{getCardById('color-4').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-5').bgColor} text={getCardById('color-5').textColor}>
                                    <Card.Header>{getCardById('color-5').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-5').title}</Card.Title>
                                        <Card.Text>{getCardById('color-5').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-6').bgColor} text={getCardById('color-6').textColor}>
                                    <Card.Header>{getCardById('color-6').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-6').title}</Card.Title>
                                        <Card.Text>{getCardById('color-6').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-7').bgColor} text={getCardById('color-7').textColor}>
                                    <Card.Header>{getCardById('color-7').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-7').title}</Card.Title>
                                        <Card.Text>{getCardById('color-7').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-8').bgColor} text={getCardById('color-8').textColor}>
                                    <Card.Header>{getCardById('color-8').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-8').title}</Card.Title>
                                        <Card.Text>{getCardById('color-8').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-9').bgColor} text={getCardById('color-9').textColor}>
                                    <Card.Header>{getCardById('color-9').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-9').title}</Card.Title>
                                        <Card.Text>{getCardById('color-9').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card bg={getCardById('color-10').bgColor} text={getCardById('color-10').textColor}>
                                    <Card.Header>{getCardById('color-10').header}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('color-10').title}</Card.Title>
                                        <Card.Text>{getCardById('color-10').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        {/* Border Cards */}
                        <Row>
                            <Col md={12}>
                                <h5>Card Border & Header Colors</h5>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card border={getCardById('border-1').border}>
                                    <Card.Header className={getCardById('border-1').headerClass}>
                                        {getCardById('border-1').header}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('border-1').title}</Card.Title>
                                        <Card.Text>{getCardById('border-1').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card border={getCardById('border-2').border}>
                                    <Card.Header className={getCardById('border-2').headerClass}>
                                        {getCardById('border-2').header}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('border-2').title}</Card.Title>
                                        <Card.Text>{getCardById('border-2').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card border={getCardById('border-3').border}>
                                    <Card.Header className={getCardById('border-3').headerClass}>
                                        {getCardById('border-3').header}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('border-3').title}</Card.Title>
                                        <Card.Text>{getCardById('border-3').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card border={getCardById('border-4').border}>
                                    <Card.Header className={getCardById('border-4').headerClass}>
                                        {getCardById('border-4').header}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('border-4').title}</Card.Title>
                                        <Card.Text>{getCardById('border-4').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card border={getCardById('border-5').border}>
                                    <Card.Header className={getCardById('border-5').headerClass}>
                                        {getCardById('border-5').header}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('border-5').title}</Card.Title>
                                        <Card.Text>{getCardById('border-5').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card border={getCardById('border-6').border}>
                                    <Card.Header className={getCardById('border-6').headerClass}>
                                        {getCardById('border-6').header}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('border-6').title}</Card.Title>
                                        <Card.Text>{getCardById('border-6').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card border={getCardById('border-7').border}>
                                    <Card.Header className={getCardById('border-7').headerClass}>
                                        {getCardById('border-7').header}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('border-7').title}</Card.Title>
                                        <Card.Text>{getCardById('border-7').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card border={getCardById('border-8').border}>
                                    <Card.Header className={getCardById('border-8').headerClass}>
                                        {getCardById('border-8').header}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('border-8').title}</Card.Title>
                                        <Card.Text>{getCardById('border-8').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Card border={getCardById('border-9').border}>
                                    <Card.Header className={getCardById('border-9').headerClass}>
                                        {getCardById('border-9').header}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{getCardById('border-9').title}</Card.Title>
                                        <Card.Text>{getCardById('border-9').text}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        {/* Card Groups */}
                        <Row>
                            <Col md={12}>
                                <h5>Card Groups</h5>
                            </Col>
                            <Col xl={12}>
                                <CardGroup className='mb-4'>
                                    {getCardById('group-1').cards.map((card, index) => (
                                        <Card key={index}>
                                            <Card.Img variant="top" src={cardImages[card.image.src]} />
                                            <Card.Body>
                                                <Card.Title>{card.title}</Card.Title>
                                                <Card.Text>{card.text}</Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <small className="text-muted">{card.footer}</small>
                                            </Card.Footer>
                                        </Card>
                                    ))}
                                </CardGroup>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    );
}
