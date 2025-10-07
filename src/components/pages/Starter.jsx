import React from 'react';
import PageTitle from '../layout/PageTitle';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../layout/Footer';

const Starter = () => {
  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pageTitle="Starter" pagePrTitle="Pages" />
        <Container fluid>
          <Row>
            <Col lg={6}></Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </div>
  )
}

export default Starter;
