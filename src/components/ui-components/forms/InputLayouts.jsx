import React from 'react';
import { Card, Col, Container, Row, Form, Button, InputGroup } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import formGroupsData from '../../../data/form/inputlayout.json';

export default function InputLayouts() {
    const formGroups = formGroupsData.formGroups;
    const formGrid1 = formGroupsData.formGrid1;
    const formGrid2 = formGroupsData.formGrid2;
    const horizontalForm = formGroupsData.horizontalForm;
    const horizontalForm2 = formGroupsData.horizontalForm2;
    const columnsizing = formGroupsData.columnsizing;
    const autosizing = formGroupsData.autosizing;
    const colWidths = [7, null, null];

    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="Forms" pageTitle="Input Layouts" />
                    <Container fluid>
                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{formGroups.title}</Card.Title>
                                        <Form>
                                            {formGroups.controls.map((control, index) => (
                                                <Form.Group key={index} className={control.className || 'mb-3'} controlId={control.controlId}>
                                                    <Form.Label>{control.label}</Form.Label>
                                                    <Form.Control type={control.type} placeholder={control.placeholder} />
                                                </Form.Group>
                                            ))}
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{formGrid1.title}</Card.Title>
                                        <Form>
                                            <Row>
                                                {
                                                    formGrid1.controls.map((control, index) => (
                                                        <Form.Group key={index} className={control.className || 'mb-3'} controlId={control.controlId}>
                                                            <Form.Control type={control.type} placeholder={control.placeholder} />
                                                        </Form.Group>
                                                    ))
                                                }
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{formGrid2.title}</Card.Title>
                                        <Form>
                                            <Row>
                                                {formGrid2.controls.map((control, index) => (
                                                    <div key={index} className={control.className || 'mb-3'}>
                                                        <Form.Group controlId={control.controlId}>
                                                            <Form.Label>{control.label}</Form.Label>

                                                            {control.type === 'select' ? (
                                                                <Form.Select>
                                                                    {control.options?.map((option, idx) => (
                                                                        <option key={idx} value={option.value}>
                                                                            {option.value}
                                                                        </option>
                                                                    ))}
                                                                </Form.Select>
                                                            ) : (
                                                                <Form.Control type={control.type} placeholder={control.placeholder} />
                                                            )}
                                                        </Form.Group>
                                                    </div>
                                                ))}
                                            </Row>
                                            <Form.Group className="mb-3" id="formGridCheckbox">
                                                <Form.Check type="checkbox" label="Check me out" />
                                            </Form.Group>

                                            <Button variant="primary" type="submit">Submit</Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{horizontalForm.title}</Card.Title>
                                        <Form>
                                            {horizontalForm.controls.map((control, index) => {
                                                // Email and Password
                                                if (control.type === 'email' || control.type === 'password') {
                                                    return (
                                                        <Form.Group as={Row} className="mb-3" controlId={control.controlId} key={index}>
                                                            <Form.Label column sm={3}>
                                                                {control.label}
                                                            </Form.Label>
                                                            <Col sm={9}>
                                                                <Form.Control type={control.type} placeholder={control.placeholder} />
                                                            </Col>
                                                        </Form.Group>
                                                    );
                                                }

                                                // Radio group
                                                if (control.type === 'radio') {
                                                    return (
                                                        <fieldset key={index}>
                                                            <Form.Group as={Row} className="mb-3">
                                                                <Form.Label as="legend" column sm={3}>
                                                                    {control.label}
                                                                </Form.Label>
                                                                <Col sm={9}>
                                                                    {control.radios?.map((radio, i) => (
                                                                        <Form.Check key={i} type="radio" label={radio.label} name="formHorizontalRadios" id={radio.id} value={radio.value}/>
                                                                    ))}
                                                                </Col>
                                                            </Form.Group>
                                                        </fieldset>
                                                    );
                                                }

                                                // Checkbox
                                                if (control.type === 'checkbox') {
                                                    return (
                                                        <Form.Group as={Row} className="mb-3" controlId={control.controlId} key={index}>
                                                            <Col sm={{ span: 9, offset: 3 }}>
                                                                <Form.Check label={control.label} />
                                                            </Col>
                                                        </Form.Group>
                                                    );
                                                }
                                                return null;
                                            })}

                                            <Form.Group as={Row}>
                                                <Col sm={{ span: 9, offset: 3 }}>
                                                    <Button type="submit">Sign in</Button>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{horizontalForm2.title}</Card.Title>

                                        {horizontalForm2.size.map((sizeGroup, groupIndex) =>
                                            sizeGroup.controls.map((control, index) => (
                                                <Row className="mb-3" key={`${groupIndex}-${index}`}>
                                                    <Form.Label column lg={3}>{control.label}</Form.Label>
                                                    <Col>
                                                        <Form.Control type={control.type} placeholder={control.placeholder} size={sizeGroup.size !== 'md' ? sizeGroup.size : undefined} controlId={control.controlId}/>
                                                    </Col>
                                                </Row>
                                            ))
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{columnsizing.title}</Card.Title>
                                        <Form>
                                            <Row>
                                                {columnsizing.controls.map((control, index) => (
                                                    <Col key={index} xs={colWidths[index] || true}>
                                                        <Form.Control type={control.type} placeholder={control.placeholder} controlId={control.controlId}/>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{autosizing.title}</Card.Title>
                                        <Form>
                                            <Row className="align-items-center">
                                                {autosizing.controls.map((control, index) => (
                                                    <Col xs="auto" key={index}>
                                                        {/* Visually hidden label */}
                                                        {control.type !== "checkbox" && <Form.Label htmlFor={control.controlId} visuallyHidden>{control.label}</Form.Label>}

                                                        {/* Email field wrapped with InputGroup */}
                                                        {control.label === "Email" ? (
                                                            <InputGroup className="mb-2">
                                                                <InputGroup.Text>@</InputGroup.Text>
                                                                <Form.Control id={control.controlId} placeholder={control.placeholder}/>
                                                            </InputGroup>
                                                        ) : control.type === "text" ? (
                                                            <Form.Control className="mb-2" id={control.controlId} placeholder={control.placeholder}/>
                                                        ) : control.type === "checkbox" ? (
                                                            <Form.Check type="checkbox" id={control.controlId} className="mb-2" label={control.label}/>
                                                        ) : null}
                                                    </Col>
                                                ))}
                                                <Col xs="auto">
                                                    <Button type="submit" className="mb-2">Submit</Button>
                                                </Col>
                                            </Row>
                                        </Form>
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
