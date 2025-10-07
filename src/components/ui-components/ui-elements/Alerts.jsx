import React, { useState } from 'react';
import { Card, Col, Container, Row, Alert } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import alertData from '../../../data/ui/alert.json';

export default function AlertsRefactored() {
  const [visibleAlerts, setVisibleAlerts] = useState({});

  // Handle dismissible alerts
  const handleDismiss = (alertType, index) => {
    setVisibleAlerts(prev => ({
      ...prev,
      [`${alertType}-${index}`]: false
    }));
  };

  // Render alert content based on type
  const renderAlertContent = (alert, variant, index, alertType) => {
    const fullVariant = alert.variantPrefix ? `${alert.variantPrefix}${variant}` : variant;
    const alertKey = `${alertType}-${index}`;
    const isVisible = visibleAlerts[alertKey] !== false; // Show by default

    if (!isVisible) return null;

    // Alert with icon
    if (alert.withIcon) {
      return (
        <Alert variant={fullVariant} className="alert-with-icon" dismissible onClose={() => handleDismiss(alertType, index)}>
          <div className="alert-icon"><i className={alert.icon}></i></div>
          <div className="alert-text">{alert.message}</div>
        </Alert>
      );
    }

    // Alert with links
    if (alert.withLinks) {
      return (
        <Alert variant={fullVariant} dismissible onClose={() => handleDismiss(alertType, index)}>{alert.message} <Alert.Link href="#">{alert.linkText}</Alert.Link></Alert>
      );
    }

    // Alert with additional content
    if (alert.withContent) {
      return (
        <Alert variant={fullVariant} dismissible onClose={() => handleDismiss(alertType, index)}>
          <Alert.Heading>{alert.heading}</Alert.Heading>
          <p>{alert.message}</p>
          <hr />
          <p className="mb-0">{alert.additionalText}</p>
        </Alert>
      );
    }

    // Default alert
    return <Alert variant={fullVariant} dismissible onClose={() => handleDismiss(alertType, index)}>{alert.message}</Alert>;
  };

  // Render a column of alerts
  const renderAlertColumn = (alertType, index) => {
    // Skip if it's an odd index (we'll show two alert types per row)
    if (index % 2 !== 0) return null;

    const nextAlertType = alertData.alertTypes[index + 1];

    return (
      <Row key={index}>
        {/* First alert type in the row */}
        <Col md={6}>
          <Card>
            <Card.Body className='pb-1'>
              <Card.Title>{alertType.title}</Card.Title>
              {alertType.alerts.map((alert, alertIndex) => (
                <div key={`${alertType.type}-${alertIndex}`}>
                  {renderAlertContent(alert, alert.variant, alertIndex, alertType.type)}
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Second alert type in the row (if exists) */}
        {nextAlertType && (
          <Col md={6}>
            <Card>
              <Card.Body className='pb-1'>
                <Card.Title>{nextAlertType.title}</Card.Title>
                {nextAlertType.alerts.map((alert, alertIndex) => (
                  <div key={`${nextAlertType.type}-${alertIndex}`}>
                    {renderAlertContent(alert, alert.variant, alertIndex, nextAlertType.type)}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    );
  };

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="UI Elements" pageTitle="Alerts" />
        <Container fluid>
          {alertData.alertTypes.map((alertType, index) =>
            renderAlertColumn(alertType, index)
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}
