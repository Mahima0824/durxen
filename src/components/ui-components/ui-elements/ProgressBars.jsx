import React from 'react';
import { Card, Col, Container, Row, ProgressBar } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import progressBarData from '../../../data/ui/progressbar.json';

const ProgressBarGroup = ({ title, items }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {items.map((item, index) => {
          if (item.bars) {
            // Handle stacked progress bars
            return (
              <ProgressBar key={index} className={item.className}>
                {item.bars.map(bar => (
                  <ProgressBar key={bar.key} variant={bar.variant} now={bar.now} label={bar.label} striped={bar.striped} animated={bar.animated} />
                ))}
              </ProgressBar>
            );
          } else {
            // Handle regular progress bars
            return (
              <ProgressBar key={index} variant={item.variant} now={item.now} label={item.label} className={item.className} striped={item.striped} animated={item.animated} />
            );
          }
        })}
      </Card.Body>
    </Card>
  );
};

export default function ProgressBars() {
  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="UI Elements" pageTitle="Progress Bars" />
        <Container fluid>
          <Row>
            {progressBarData.progressBars.map((group, index) => (
              <Col lg={6} key={index}>
                <ProgressBarGroup title={group.title} items={group.items} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
