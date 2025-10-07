import React, { useState } from 'react';
import { Card, Col, Container, Row, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import dropdownData from '../../../data/ui/dropdown.json';

const Dropdowns = () => {
    const [activeKey, setActiveKey] = useState(null);

    const renderDropdownMenu = (items) => (
        <Dropdown.Menu>
            {items.map((item, idx) => (
                <Dropdown.Item key={idx} href={item.href}>
                    {item.label}
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
    );

    const renderDefaultDropdowns = () => (
        <Card>
            <Card.Body>
                <Card.Title>Default Dropdowns</Card.Title>
                <div className='d-flex align-items-center flex-wrap gap-2'>
                    {dropdownData.defaultDropdowns.map((dropdown) => (
                        <Dropdown key={dropdown.id} onSelect={(key) => setActiveKey(key)}>
                            <Dropdown.Toggle variant={dropdown.variant} id={dropdown.id} active={activeKey === dropdown.id}>
                                {dropdown.label} <i className="bi bi-chevron-down drop-caret"></i>
                            </Dropdown.Toggle>
                            {renderDropdownMenu(dropdownData.dropdownItems)}
                        </Dropdown>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );

    const renderVariationDropdowns = () => (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>Dropdowns Variations</Card.Title>
                <div className='d-flex align-items-center flex-wrap gap-2'>
                    {dropdownData.variationDropdowns.map((dropdown) => (
                        <Dropdown key={dropdown.id} onSelect={(key) => setActiveKey(key)}>
                            <Dropdown.Toggle variant={dropdown.variant} id={dropdown.id} active={activeKey === dropdown.id}>
                                {dropdown.label} <i className="bi bi-chevron-down drop-caret"></i>
                            </Dropdown.Toggle>
                            {renderDropdownMenu(dropdownData.dropdownItems)}
                        </Dropdown>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );

    const renderSplitButtonDropdowns = () => (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>Split Button Dropdowns</Card.Title>
                <div className='d-flex align-items-center flex-wrap gap-2'>
                    {dropdownData.splitButtonDropdowns.map((dropdown) => (
                        <Dropdown as={ButtonGroup} key={dropdown.id}>
                            <Button variant={dropdown.variant}>{dropdown.splitLabel || dropdown.label}</Button>
                            <Dropdown.Toggle split variant={dropdown.variant} id={dropdown.id} active={activeKey === dropdown.id}>
                                <i className="bi bi-chevron-down drop-caret"></i>
                            </Dropdown.Toggle>
                            {renderDropdownMenu(dropdownData.actionItems)}
                        </Dropdown>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );

    const renderDropdown = (dropdown, size = null) => (
        <Dropdown key={dropdown.id} onSelect={(key) => setActiveKey(key)}>
            <Dropdown.Toggle variant={dropdown.variant} id={dropdown.id} size={size === 'md' ? undefined : size} active={activeKey === dropdown.id}>
                {dropdown.label} <i className="bi bi-chevron-down drop-caret"></i>
            </Dropdown.Toggle>
            {renderDropdownMenu(dropdownData.dropdownItems)}
        </Dropdown>
    );

    const renderSizeDropdowns = () => (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>Dropdowns Sizing</Card.Title>
                <Row>
                    {Object.entries(dropdownData.sizeDropdowns).map(([size, dropdowns]) => (
                        <Col lg={6} key={size}>
                            <h6>Dropdown Button {size === 'md' ? 'Normal' : size === 'xs' ? 'Extra Small' : size.toUpperCase()}</h6>
                            <div className={`d-flex align-items-center flex-wrap gap-2 ${size === 'xs' ? '' : 'mb-3'}`}>
                                {dropdowns.map((dropdown) => renderDropdown(dropdown, size))}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );

    const renderDirectionDropdowns = () => (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>Dropdowns Directions</Card.Title>
                <h6>Default Dropdowns Directions</h6>
                <div className='d-flex align-items-center flex-wrap gap-2 mb-3'>
                    {dropdownData.directionDropdowns.map((dropdown) => (
                        <Dropdown key={dropdown.id} drop={dropdown.direction} onSelect={(key) => setActiveKey(key)}>
                            <Dropdown.Toggle variant={dropdown.variant} id={dropdown.id} active={activeKey === dropdown.id}>
                                {dropdown.label} <i className={`bi bi-chevron-${dropdown.icon} drop-caret`}></i>
                            </Dropdown.Toggle>
                            {renderDropdownMenu(dropdownData.dropdownItems)}
                        </Dropdown>
                    ))}
                </div>

                <h6>Split Dropdowns Directions</h6>
                <div className='d-flex align-items-center flex-wrap gap-2'>
                    {dropdownData.splitDirectionDropdowns.map((dropdown) => (
                        <Dropdown as={ButtonGroup} key={dropdown.id} drop={dropdown.direction}>
                            <Button variant={dropdown.variant}>{dropdown.label}</Button>
                            <Dropdown.Toggle split variant={dropdown.variant} id={dropdown.id} active={activeKey === dropdown.id}>
                                <i className={`bi bi-chevron-${dropdown.icon} drop-caret`}></i>
                            </Dropdown.Toggle>
                            {renderDropdownMenu(dropdownData.actionItems)}
                        </Dropdown>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );

    const renderMenuAlignDropdowns = () => (
        <Card className="mt-4">
            <Card.Body>
                <Card.Title>Dropdowns Menu Alignment</Card.Title>
                <div className='d-flex align-items-center flex-wrap gap-2'>
                    {dropdownData.menuAlignDropdowns.map((dropdown) => (
                        <Dropdown key={dropdown.id} onSelect={(key) => setActiveKey(key)}>
                            <Dropdown.Toggle variant={dropdown.variant} id={dropdown.id} active={activeKey === dropdown.id}>
                                {dropdown.label} <i className="bi bi-chevron-down drop-caret"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu align={dropdown.align}>
                                {dropdownData.actionItems.map((item, idx) => (
                                    <Dropdown.Item key={idx} href={item.href}>
                                        {item.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    ))}
                </div>
            </Card.Body>
        </Card>
    );

    return (
        <div className='page-wrapper'>
            <div className='page-content'>
                <PageTitle pagePrTitle="UI Elements" pageTitle="Dropdowns" />
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            {renderDefaultDropdowns()}
                            {renderVariationDropdowns()}
                            {renderSplitButtonDropdowns()}
                            {renderSizeDropdowns()}
                            {renderDirectionDropdowns()}
                            {renderMenuAlignDropdowns()}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
};

export default Dropdowns;