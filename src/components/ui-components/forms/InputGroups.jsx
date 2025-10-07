import React from 'react';
import { Card, Col, Container, Row, InputGroup as BSInputGroup, Form, Button, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import inputGroupsData from '../../../data/form/inputgroups.json';

// Helper component for rendering dropdown items
const DropdownItems = ({ items }) => {
  return items.map((item, idx) => {
    if (item.type === 'divider') {
      return <Dropdown.Divider key={`divider-${idx}`} />;
    }
    return (
      <Dropdown.Item key={`item-${idx}`} href={item.href}>{item.content}</Dropdown.Item>
    );
  });
};

// Helper component for rendering input group addons (prepend/append)
const InputAddon = ({ addon }) => {
  if (!addon) return null;

  // Handle array of addons
  if (Array.isArray(addon)) {
    return addon.map((a, idx) => <InputAddon key={`addon-${idx}`} addon={a} />);
  }

  const { type, content, variant = 'outline-secondary', ...rest } = addon;

  switch (type) {
    case 'text':
      return <BSInputGroup.Text {...rest}>{content}</BSInputGroup.Text>;
    case 'button':
      return (
        <Button variant={variant} {...rest}>
          {content}
        </Button>
      );
    case 'checkbox':
      return <BSInputGroup.Checkbox {...rest} />;
    case 'radio':
      return <BSInputGroup.Radio {...rest} />;
    case 'dropdown':
      return <DropdownButton as={BSInputGroup.Text} variant={variant} title={addon.title} id={addon.id} align={addon.align}>
        <DropdownItems items={addon.items} />
      </DropdownButton>;
    case 'segmented-dropdown':
      return (
        <Dropdown as={ButtonGroup}>
          <Button variant={variant}>{addon.buttonText}</Button>
          <Dropdown.Toggle split variant={variant} id={addon.id}><i className="bi bi-chevron-down drop-caret"></i></Dropdown.Toggle>
          <Dropdown.Menu>
            <DropdownItems items={addon.items} />
          </Dropdown.Menu>
        </Dropdown>
      );
    default:
      return null;
  }
};

// Main InputGroup component
const InputGroup = ({ group, className = '' }) => {
  const {
    prepend,
    append,
    control,
    controls,
    size,
    label,
    id,
    ...rest
  } = group;

  return (
    <div className={className}>
      {label && <Form.Label htmlFor={id}>{label}</Form.Label>}
      <BSInputGroup size={size} {...rest}>
        {prepend && <InputAddon addon={prepend} />}
        {control && <Form.Control {...control} aria-label={control.ariaLabel} placeholder={control.placeholder} as={control.as} rows={control.rows} />}
        {controls && controls.map((ctrl, idx) => <Form.Control key={`control-${idx}`} {...ctrl} aria-label={ctrl.ariaLabel} placeholder={ctrl.placeholder} />)}
        {append && <InputAddon addon={append} />}
      </BSInputGroup>
    </div>
  );
};

export default function InputGroups() {
  // Group sections by column
  const columns = inputGroupsData.sections.reduce((acc, section) => {
    const col = section.column || 1;
    if (!acc[col]) acc[col] = [];
    acc[col].push(section);
    return acc;
  }, {});

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="Forms" pageTitle="Input Groups" />
        <Container fluid>
          <Row>
            {Object.entries(columns).map(([colNum, colSections]) => (
              <Col lg={6} key={`col-${colNum}`}>
                {colSections.map((section) => (
                  <Card key={section.id} className="mb-4">
                    <Card.Body>
                      <Card.Title>{section.title}</Card.Title>
                      {section.inputGroups.map((group, idx) => <InputGroup key={`group-${section.id}-${idx}`} group={group} className={group.className || 'mb-3'} />)}
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
