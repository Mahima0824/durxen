import React from 'react';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import Footer from '../../layout/Footer';
import PageTitle from '../../layout/PageTitle';
import inputData from '../../../data/form/input.json';

// Input Group Component
const InputGroup = ({ inputs, className = '' }) => (
  <Form className={className}>
    {inputs.map((input, idx) => (
      <Form.Group key={input.id || idx} className={input.className}>
        {input.label && <Form.Label>{input.label}</Form.Label>}
        <Form.Control type={input.type || 'text'} placeholder={input.placeholder} size={input.size} disabled={input.disabled} readOnly={input.readOnly} aria-label={input.ariaLabel} as={input.as} rows={input.rows} />
      </Form.Group>
    ))}
  </Form>
);

// Plain Text Group Component
const PlainTextGroup = ({ groups }) => (
  <Form>
    {groups.map((group, idx) => (
      <Form.Group className={`mb-3 ${group.className || ''}`}
        key={group.controlId || idx}
        as={Row}
        controlId={group.controlId}
      >
        <Form.Label column sm={group.labelCol}>{group.label}</Form.Label>
        <Col sm={12 - parseInt(group.labelCol)}>
          <Form.Control type={group.type} plaintext={group.plaintext} readOnly={group.readOnly} defaultValue={group.defaultValue} placeholder={group.placeholder} />
        </Col>
      </Form.Group>
    ))}
  </Form>
);

// File Input Group Component
const FileInputGroup = ({ fileInputs }) => (
  <>
    {fileInputs.map((fileInput, idx) => (
      <Form.Group className={fileInput.className}
        key={fileInput.controlId || idx}
        controlId={fileInput.controlId}
      >
        <Form.Label>{fileInput.label}</Form.Label>
        <Form.Control type="file" multiple={fileInput.multiple} disabled={fileInput.disabled} size={fileInput.size} />
      </Form.Group>
    ))}
  </>
);

// Color Picker Group Component
const ColorPickerGroup = ({ colorPickers }) => (
  <Row>
    {colorPickers.map((picker, idx) => (
      <Col sm={6} key={idx}>
        <Form.Group className={picker.className || 'mb-3'}>
          <Form.Label>{picker.label}</Form.Label>
          <Form.Control type="color" defaultValue={picker.defaultValue} title="Choose your color" className='w-100' />
        </Form.Group>
      </Col>
    ))}
  </Row>
);

export default function BasicInputs() {
  const renderSection = (section) => {
    switch (section.id) {
      case 'plaintext-inputs':
        return <PlainTextGroup groups={section.groups} />;
      case 'file-inputs':
        return <FileInputGroup fileInputs={section.fileInputs} />;
      case 'color-pickers':
        return <ColorPickerGroup colorPickers={section.colorPickers} />;
      default:
        if (section.inputs) {
          return <InputGroup inputs={section.inputs} />;
        } else if (section.as) {
          return (
            <Form>
              <Form.Group>
                <Form.Control as={section.as} rows={section.rows} />
              </Form.Group>
            </Form>
          );
        }
        return null;
    }
  };

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="Forms" pageTitle="Basic Inputs" />
        <Container fluid>
          <Row>
            {inputData.sections.map((section, index) => (
              <Col lg={6} key={section.id || index}>
                <Card>
                  <Card.Body>
                    <Card.Title>{section.title}</Card.Title>
                    {renderSection(section)}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  )
}
