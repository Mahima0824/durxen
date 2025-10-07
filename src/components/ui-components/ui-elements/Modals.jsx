import React, { useState } from 'react';
import { Card, Col, Container, Row, Button, Modal } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import modalData from '../../../data/ui/modal.json';

const GridModalContent = () => (
  <>
    <Row>
      <Col xs={12} md={8}>
        <div className="bg-soft-primary border-soft-primary text-primary border rounded p-3 mb-3 text-center">.col-xs-12 .col-md-8</div>
      </Col>
      <Col xs={6} md={4}>
        <div className="bg-soft-secondary border-soft-secondary text-secondary border rounded p-3 mb-3 text-center">.col-xs-6 .col-md-4</div>
      </Col>
    </Row>
    <Row>
      <Col xs={6} md={4}>
        <div className="bg-soft-success border-soft-success text-success border rounded p-3 mb-3 text-center">.col-xs-6 .col-md-4</div>
      </Col>
      <Col xs={6} md={4}>
        <div className="bg-soft-warning border-soft-warning text-warning border rounded p-3 mb-3 text-center">.col-xs-6 .col-md-4</div>
      </Col>
      <Col xs={6} md={4}>
        <div className="bg-soft-danger border-soft-danger text-danger border rounded p-3 mb-3 text-center">.col-xs-6 .col-md-4</div>
      </Col>
    </Row>
    <Row>
      <Col xs={6} sm={4} lg={3}>
        <div className="bg-soft-info border-soft-info text-info border rounded p-3 mb-3 text-center">.col-xs-6 .col-sm-4 .col-lg-3</div>
      </Col>
      <Col xs={6} sm={4} lg={3}>
        <div className="bg-soft-dark border-soft-dark text-dark border rounded p-3 mb-3 text-center">.col-xs-6 .col-sm-4 .col-lg-3</div>
      </Col>
      <Col xs={6} sm={4} lg={3}>
        <div className="bg-soft-orange border-soft-orange text-orange border rounded p-3 mb-3 text-center">.col-xs-6 .col-sm-4 .col-lg-3</div>
      </Col>
      <Col xs={6} sm={4} lg={3}>
        <div className="bg-soft-primary border-soft-primary text-primary border rounded p-3 mb-3 text-center">.col-xs-6 .col-sm-4 .col-lg-3</div>
      </Col>
    </Row>
  </>
);

export default function Modals() {
  const [modalStates, setModalStates] = useState({});
  const [fullscreen, setFullscreen] = useState(true);

  const handleModalShow = (modalId) => {
    setModalStates(prev => ({
      ...prev,
      [modalId]: true
    }));
  };

  const handleModalClose = (modalId) => {
    setModalStates(prev => ({
      ...prev,
      [modalId]: false
    }));
  };

  const handleFullscreenShow = (modalId, breakpoint) => {
    setFullscreen(breakpoint);
    handleModalShow(modalId);
  };

  const renderModal = (modal, index) => {
    if (modal.id === 'sizes') {
      return (
        <Col md={6} key={index}>
          <Card>
            <Card.Body>
              <Card.Title>{modal.title}</Card.Title>
              <div className='d-flex align-items-center flex-wrap gap-2'>
                {modal.sizes.map((size, sizeIndex) => (
                  <React.Fragment key={sizeIndex}>
                    <Button variant="primary" onClick={() => size.fullscreen ? handleFullscreenShow(`size-${size.id}`, true) : handleModalShow(`size-${size.id}`)}>{size.buttonText}</Button>
                    <Modal show={modalStates[`size-${size.id}`] || false} onHide={() => handleModalClose(`size-${size.id}`)} size={size.size} fullscreen={size.fullscreen} centered={size.centered} animation={size.animation !== false} backdrop={size.backdrop} keyboard={size.keyboard !== false}>
                      <Modal.Header closeButton={size.showClose !== false}>
                        <Modal.Title>{size.modalTitle}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {size.id === 'fullscreen' ? (
                          <>
                            <p>{size.modalBody}</p>
                            <p>The current `fullscreen` value is set to: <b>{String(fullscreen)}</b>.</p>
                            <p>Use the buttons outside the modal to control its behavior and test its responsiveness.</p>
                          </>
                        ) : (
                          size.modalBody
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleModalClose(`size-${size.id}`)}>Close</Button>
                        <Button variant="primary" onClick={() => handleModalClose(`size-${size.id}`)}>Save Changes</Button>
                      </Modal.Footer>
                    </Modal>
                  </React.Fragment>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    }

    return (
      <Col md={modal.id === 'grid' || modal.id === 'noAnimation' ? 3 : 4} key={index}>
        <Card>
          <Card.Body>
            <Card.Title>{modal.title}</Card.Title>
            <Button variant={modal.buttonVariant || 'primary'} onClick={() => handleModalShow(modal.id)}>{modal.buttonText}</Button>
            <Modal show={modalStates[modal.id] || false} onHide={() => handleModalClose(modal.id)} size={modal.size} centered={modal.centered} animation={modal.animation !== false} backdrop={modal.backdrop} keyboard={modal.keyboard !== false}>
              <Modal.Header closeButton={modal.showClose !== false}>
                <Modal.Title>{modal.modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {modal.id === 'grid' ? <GridModalContent /> : modal.modalBody}
              </Modal.Body>
              {modal.footer && (
                <Modal.Footer>
                  {modal.footer.map((button, btnIndex) => (
                    <Button key={btnIndex} variant={button.variant} onClick={() => {
                      if (button.onClick) {
                        button.onClick();
                      } else {
                        handleModalClose(modal.id);
                      }
                    }}
                    >
                      {button.text}
                    </Button>
                  ))}
                </Modal.Footer>
              )}
            </Modal>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="UI Elements" pageTitle="Modals" />
        <Container fluid>
          <Row>
            {modalData.modals.map((modal, index) => renderModal(modal, index))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
