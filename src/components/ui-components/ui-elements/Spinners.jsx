import React from 'react';
import { Card, Col, Container, Row, Spinner, Button } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import spinnerData from '../../../data/ui/spinner.json';

const SpinnerGroup = ({ title, type, variants, items, animation, buttonGroups, buttons }) => {
  // Render default spinners with variants
  if (variants) {
    return (
      <div className='d-flex align-items-center flex-wrap gap-2'>
        {variants.map((variant, idx) => (
          <Spinner key={`${variant}-${idx}`} animation={type} variant={variant} className={items ? 'mb-3' : ''}/>
        ))}
      </div>
    );
  }

  // Render spinners with sizes
  if (items) {
    return (
      <div className='d-flex align-items-center flex-wrap gap-2'>
        {items.map((item, idx) => (
          <Spinner key={`${item.variant}-${item.size || 'default'}-${idx}`} animation={type} variant={item.variant} size={item.size} className='mb-3'/>
        ))}
      </div>
    );
  }

  // Render button groups with spinners
  if (buttonGroups) {
    return (
      <Row>
        {buttonGroups.map((group, groupIdx) => (
          <Col md={6} key={`group-${groupIdx}`}>
            <div className='d-flex align-items-center flex-wrap gap-2 mb-3'>
              {group.buttons.map((btn, btnIdx) => {
                const variant = btn.gradient 
                  ? `gradient-${btn.variant}`
                  : btn.soft 
                    ? `soft-${btn.variant}`
                    : btn.outline
                      ? `outline-${btn.variant}`
                      : btn.variant;

                return (
                  <Button variant={variant} key={`btn-${groupIdx}-${btnIdx}`}>
                    <Spinner as="span" animation={animation} size="sm" role="status" aria-hidden="true" />
                  </Button>
                );
              })}
            </div>
          </Col>
        ))}
      </Row>
    );
  }

  // Render text buttons with spinners
  if (buttons) {
    const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < buttons.length; i += chunkSize) {
      chunks.push(buttons.slice(i, i + chunkSize));
    }

    return (
      <>
        {chunks.map((chunk, chunkIdx) => (
          <div key={`chunk-${chunkIdx}`} className={`d-flex align-items-center flex-wrap gap-2 ${chunkIdx < chunks.length - 1 ? 'mb-3' : ''}`}>
            {chunk.map((btn, btnIdx) => {
              const variant = btn.gradient 
                ? `gradient-${btn.variant}`
                : btn.soft 
                  ? `soft-${btn.variant}`
                  : btn.outline
                    ? `outline-${btn.variant}`
                    : btn.variant;

              return (
                <Button key={`btn-${chunkIdx}-${btnIdx}`} variant={variant} disabled={btn.disabled}>
                  <Spinner as="span" animation={animation} size="sm" role="status" aria-hidden="true" className='me-2' />
                  {btn.disabled ? 'Loading...' : 'Loading...'}
                </Button>
              );
            })}
          </div>
        ))}
      </>
    );
  }

  return null;
};

export default function Spinners() {
  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="UI Elements" pageTitle="Spinners" />
        <Container fluid>
          <Row>
            {spinnerData.spinners.map((spinner, index) => (
              <Col lg={6} key={spinner.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{spinner.title}</Card.Title>
                    <SpinnerGroup type={spinner.type} variants={spinner.variants} items={spinner.items} animation={spinner.animation} buttonGroups={spinner.buttonGroups} buttons={spinner.buttons}/>
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
