import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Error from '../../images/animatedsvgs/Error';

const Error404 = () => {
    useEffect(() => {
        document.title = `Error404 | Durxen | React Landing Page Template`;
    }, []);
    return (
        <div className="auth-page">
            <Container className="z-1">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div className="auth-card rounded-4 overflow-hidden">
                            <div className=" p-4 text-center">
                                <Error />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Error404;
