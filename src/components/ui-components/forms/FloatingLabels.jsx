import React from 'react';
import { Card, Col, Container, Row, FloatingLabel, Form } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import floatingLabelsData from '../../../data/form/floatinglables.json';

const FloatingLabels = () => {
  const renderOptions = (options) => {
    return options.map((option, index) => {
      if (typeof option === 'string') {
        return <option key={index}>{option}</option>;
      }
      return (
        <option key={option.value} value={option.value}>{option.label}</option>
      );
    });
  };

  const renderControl = (control, index) => {
    const commonProps = {
      key: control.controlId || control.id || `control-${index}`,
      label: control.label,
      className: control.className || '',
      style: control.style || {}
    };

    if (control.custom) {
      return (
        <Form.Floating key={commonProps.key} className={commonProps.className}>
          <Form.Control id={control.id} type={control.type} placeholder={control.placeholder} />
          <label htmlFor={control.id}>{control.label}</label>
        </Form.Floating>
      );
    }

    if (control.type === 'select') {
      return (
        <FloatingLabel key={commonProps.key} controlId={control.controlId} label={control.label} className={commonProps.className}>
          <Form.Select aria-label={control.label}>
            {renderOptions(control.options)}
          </Form.Select>
        </FloatingLabel>
      );
    }

    if (control.type === 'textarea') {
      return (
        <FloatingLabel key={commonProps.key} controlId={control.controlId} label={control.label} className={commonProps.className}>
          <Form.Control as="textarea" placeholder={control.placeholder} style={commonProps.style} />
        </FloatingLabel>
      );
    }

    return (
      <FloatingLabel key={commonProps.key} controlId={control.controlId} label={control.label} className={commonProps.className}>
        <Form.Control type={control.type} placeholder={control.placeholder} style={commonProps.style} />
      </FloatingLabel>
    );
  };

  const renderFormSection = (section, sectionKey) => {
    const { title, controls, grid, size } = section;
    const colSize = size || 6;

    if (grid) {
      return (
        <Col md={size || 12} key={sectionKey}>
          <Card>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Row className="g-2">
                {controls.map((control, index) => (
                  <Col md key={`grid-col-${index}`}>
                    {renderControl(control, index)}
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      );
    }

    return (
      <Col lg={colSize} md={12} key={sectionKey}>
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            {controls.map((control, index) => renderControl(control, index))}
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="Forms" pageTitle="Floating Labels" />
        <Container fluid>
          <Row>
            {Object.entries(floatingLabelsData).map(([key, section]) =>
              renderFormSection(section, key)
            )}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default FloatingLabels;
