import React, { useState } from 'react';
import { Card, Col, Container, Row, Alert } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import alertData from '../../../data/ui/alert.json';

export default function AlertsRefactored() {
  const [visibleAlerts, setVisibleAlerts] = useState({});

  const handleDismiss = (alertType, index) => {
    setVisibleAlerts(prev => ({
      ...prev,
      [`${alertType}-${index}`]: false
    }));
  };

  const renderAlert = (alertTypeData, alert, alertIndex) => {
    const alertKey = `${alertTypeData.type}-${alertIndex}`;
    const isVisible = visibleAlerts[alertKey] !== false;

    if (!isVisible) return null;

    const fullVariant = alertTypeData.variantPrefix 
      ? `${alertTypeData.variantPrefix}${alert.variant}` 
      : alert.variant;

    // Alert with additional content
    if (alertTypeData.withContent) {
      return (
        <Alert key={alertKey} variant={fullVariant} dismissible onClose={() => handleDismiss(alertTypeData.type, alertIndex)}>
          <Alert.Heading>{alert.heading}</Alert.Heading>
          <p>{alert.message}</p>
          <hr />
          <p className="mb-0">{alert.additionalText}</p>
        </Alert>
      );
    }

    // Alert with icon
    if (alertTypeData.withIcon) {
      return (
        <Alert key={alertKey} variant={fullVariant} dismissible onClose={() => handleDismiss(alertTypeData.type, alertIndex)} className="d-flex align-items-center">
          <i className={`${alert.icon} fs-5 me-2`}></i>
          <div>{alert.message}</div>
        </Alert>
      );
    }

    // Alert with links
    if (alertTypeData.withLinks) {
      return (
        <Alert key={alertKey} variant={fullVariant} dismissible onClose={() => handleDismiss(alertTypeData.type, alertIndex)}>
          {alert.message} <Alert.Link href="#">{alert.linkText}</Alert.Link>
        </Alert>
      );
    }

    // Default alert
    return (
      <Alert key={alertKey} variant={fullVariant} dismissible onClose={() => handleDismiss(alertTypeData.type, alertIndex)}>
        {alert.message}
      </Alert>
    );
  };

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="UI Elements" pageTitle="Alerts" />
        <Container fluid>
          <Row className="g-3">
            {alertData.alertTypes.map((alertType, typeIndex) => {
              const colClass = alertType.withContent ? 12 : 6;
              
              return (
                <Col key={typeIndex} md={colClass}>
                  <Card>
                    <Card.Body className='pb-1'>
                      <Card.Title>{alertType.title}</Card.Title>
                      {alertType.alerts.map((alert, alertIndex) => 
                        renderAlert(alertType, alert, alertIndex)
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}