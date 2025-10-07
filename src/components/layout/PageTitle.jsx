import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function PageTitle({ pageTitle, pagePrTitle }) {
    useEffect(() => {
        // Set the document title dynamically
        document.title = `${pageTitle} | Durxen | React Landing Page Template`;
    }, [pageTitle, pagePrTitle]);
    return (
        <>
            <div className='page-title py-3'>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <h4 className='mb-0'>{pageTitle}</h4>
                                <nav aria-label="breadcrumb" className='d-none d-md-block'>
                                    <ol className="breadcrumb justify-content-center mb-0">
                                        <li className="breadcrumb-item">Durxen</li>
                                        {pagePrTitle && <li className="breadcrumb-item">{pagePrTitle}</li>}
                                        <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
                                    </ol>
                                </nav>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
