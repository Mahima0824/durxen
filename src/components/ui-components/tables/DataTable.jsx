import React, { useState } from 'react';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import CustomeTable from './CustomeTable';
import Footer from '../../layout/Footer';

export default function DataTable() {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectionChange = (selected) => {
        setSelectedRows(selected);
    };

    const handleDeleteSelected = () => {
        // Handle delete action for selected rows
        alert(`Selected ${selectedRows.length} rows will be deleted`);
    };

    return (
        <div className='page-wrapper'>
            <div className='page-content'>
                <PageTitle pagePrTitle="UI Elements" pageTitle="Data Tables" />
                <Container fluid>
                    <Row className="row-cols-1">
                        {/* Default Table */}
                        <Col>
                            <Card>
                                <Card.Header><h5 className="mb-0">Default Table</h5></Card.Header>
                                <Card.Body className="p-4">
                                    <CustomeTable title="" />
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Sortable Table */}
                        <Col>
                            <Card>
                                <Card.Header><h5 className="mb-0">Sortable Table</h5></Card.Header>
                                <Card.Body className="p-4">
                                    <CustomeTable title="" sortable={true} />
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Filterable Table */}
                        <Col>
                            <Card>
                                <Card.Header><h5 className="mb-0">Filterable Table</h5></Card.Header>
                                <Card.Body className="p-4">
                                    <CustomeTable title="" filterable={true} />
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Editable Table */}
                        <Col>
                            <Card>
                                <Card.Header><h5 className="mb-0">Editable Table</h5></Card.Header>
                                <Card.Body className="p-4">
                                    <CustomeTable title="" editable={true} />
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Table with Row Selection */}
                        <Col>
                            <Card>
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Table with Row Selection</h5>
                                    {selectedRows.length > 0 && (
                                        <Button variant="danger" size="sm" onClick={handleDeleteSelected}>Delete Selected ({selectedRows.length})</Button>
                                    )}
                                </Card.Header>
                                <Card.Body className="p-4">
                                    <CustomeTable title="" enableRowSelection={true} onSelectionChange={handleSelectionChange} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
