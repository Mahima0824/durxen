import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button, ToggleButton, ButtonGroup } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import buttonData from '../../../data/ui/buttons.json';

export default function Buttons() {
    // Loading states for buttons
    const [loadingStates, setLoadingStates] = useState({});
    const [data, setData] = useState({});

    // Load button data
    useEffect(() => {
        setData(buttonData);
    }, []);

    // Handle button click for loading state
    const handleClick = (buttonId) => {
        setLoadingStates((prev) => ({ ...prev, [buttonId]: true }));
        function simulateNetworkRequest() {
            return new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });
        }
        simulateNetworkRequest().then(() => {
            setLoadingStates((prev) => ({ ...prev, [buttonId]: false }));
        });
    };

    // Render button group
    const renderButtonGroup = (buttons, size = '', className = '') => {
        return (
            <div className={`d-flex align-items-center flex-wrap gap-2 ${className}`}>
                {buttons.map((btn, idx) => (
                    <Button key={idx} variant={btn.variant} size={size} className={btn.rounded ? 'rounded-pill' : ''}>
                        {btn.icon && btn.iconPosition === 'start' && <i className={`${btn.icon} me-1`}></i>}
                        {btn.label}
                        {btn.icon && btn.iconPosition === 'end' && <i className={`${btn.icon} ms-1`}></i>}
                    </Button>
                ))}
            </div>
        );
    };

    // Render icon only buttons
    const renderIconButtons = (buttons) => {
        return (
            <div className='d-flex align-items-center flex-wrap gap-2'>
                {buttons.map((btn, idx) => (
                    <Button key={idx} variant={btn.variant} className={`avatar avatar-md p-0 ${btn.rounded ? 'rounded-circle' : ''}`}>
                        <i className={btn.icon}></i>
                    </Button>
                ))}
            </div>
        );
    };

    // Checkboxes Button
    const options = [
        { id: 'option1', label: 'Option 1', variant: 'outline-primary' },
        { id: 'option2', label: 'Option 2', variant: 'outline-success' },
        { id: 'option3', label: 'Option 3', variant: 'outline-danger' },
    ];
    const [checkedStates, setCheckedStates] = useState(
        Object.fromEntries(options.map((option) => [option.id, false]))
    );
    const handleToggle = (key) => {
        setCheckedStates((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // Radio Button
    const [selectedOption, setSelectedOption] = useState(null);
    const radioOptions = [
        { name: 'Option 1', value: 'option1' },
        { name: 'Option 2', value: 'option2' },
        { name: 'Option 3', value: 'option3' },
    ];

    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="UI Elements" pageTitle="Buttons" />
                    <Container fluid>
                        <Row>
                            {/* Button Types */}
                            {data.buttonTypes && data.buttonTypes.map((section, idx) => (
                                <Col xl={section.variant === 'gradient' ? 12 : 6} key={idx}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{section.title}</Card.Title>
                                            {renderButtonGroup(
                                                section.buttons.map(btn => ({
                                                    ...btn,
                                                    variant: `${section.variant ? section.variant + '-' : ''}${btn.variant}`,
                                                    rounded: section.rounded
                                                }))
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                            {/* Button Sizes */}
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Buttons Size</Card.Title>
                                        <Row>
                                            {data.buttonSizes && data.buttonSizes.map((size, idx) => (
                                                <Col lg={6} key={idx}>
                                                    <h6>{size.label}</h6>
                                                    {renderButtonGroup(size.buttons, size.size, 'mb-3')}
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {/* Disabled Buttons */}
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Buttons Disabled</Card.Title>
                                        <Row>
                                            {data.disabledButtons && data.disabledButtons.map((group, idx) => (
                                                <Col lg={6} key={idx}>
                                                    <h6>{group.label}</h6>
                                                    <div className='d-flex align-items-center flex-wrap gap-2 mb-3'>
                                                        {group.buttons.map((btn, btnIdx) => (
                                                            <Button key={btnIdx} variant={btn.variant} disabled>{btn.label}</Button>
                                                        ))}
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Buttons with Icons */}
                            {data.iconButtons && data.iconButtons.map((section, idx) => (
                                <Col lg={6} key={idx}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{section.title}</Card.Title>
                                            {renderButtonGroup(section.buttons.map(btn => ({
                                                ...btn,
                                                icon: `bi ${btn.icon}`,
                                                iconPosition: 'start'
                                            })))}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}

                            {/* Icon Only Buttons */}
                            {data.iconOnlyButtons && data.iconOnlyButtons.map((section, idx) => (
                                <Col lg={6} key={idx}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{section.title}</Card.Title>
                                            {renderIconButtons(section.buttons)}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                            {/* Loading Buttons */}
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Buttons Loading</Card.Title>
                                        <Row>
                                            {data.loadingButtons && data.loadingButtons.map((group, idx) => (
                                                <Col md={6} key={idx}>
                                                    <div className='d-flex align-items-center flex-wrap gap-2 mb-3'>
                                                        {group.buttons.map((btn, btnIdx) => (
                                                            <Button key={btnIdx} variant={btn.variant} disabled={loadingStates[`loading-${idx}-${btnIdx}`]} onClick={() => handleClick(`loading-${idx}-${btnIdx}`)}>
                                                                {loadingStates[`loading-${idx}-${btnIdx}`] ? (
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                                                                        Loading...
                                                                    </>
                                                                ) : (
                                                                    'Click Me'
                                                                )}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Block Buttons */}
                            <Col md={12}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Buttons Block</Card.Title>
                                        <Row>
                                            {data.blockButtons && data.blockButtons.map((group, idx) => (
                                                <Col md={3} key={idx}>
                                                    {group.buttons.map((btn, btnIdx) => (
                                                        <Button key={btnIdx} variant={btn.variant} className='w-100 mb-2'>
                                                            {btn.icon && btn.iconPosition === 'start' && <i className={`${btn.icon} me-1`}></i>}
                                                            {btn.label}
                                                            {btn.icon && btn.iconPosition === 'end' && <i className={`${btn.icon} ms-1`}></i>}
                                                        </Button>
                                                    ))}
                                                </Col>
                                            ))}
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            {/* Outline Buttons */}
                            {data.buttonTypes && data.buttonTypes
                                .filter(type => type.variant === 'outline' && !type.rounded)
                                .map((type, idx) => (
                                    <Col xl={6} key={`outline-${idx}`}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{type.title}</Card.Title>
                                                {renderButtonGroup(type.buttons.map(btn => ({
                                                    ...btn,
                                                    variant: `outline-${btn.variant}`
                                                })))}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}

                            {/* Outline Rounded Buttons */}
                            {data.buttonTypes && data.buttonTypes
                                .filter(type => type.variant === 'outline' && type.rounded)
                                .map((type, idx) => (
                                    <Col xl={6} key={`outline-rounded-${idx}`}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{type.title}</Card.Title>
                                                {renderButtonGroup(type.buttons.map(btn => ({
                                                    ...btn,
                                                    variant: `outline-${btn.variant}`,
                                                    rounded: true
                                                })))}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            {/* Soft Buttons */}
                            {data.buttonTypes && data.buttonTypes
                                .filter(type => type.variant === 'soft' && !type.rounded)
                                .map((type, idx) => (
                                    <Col xl={6} key={`soft-${idx}`}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{type.title}</Card.Title>
                                                {renderButtonGroup(type.buttons.map(btn => ({
                                                    ...btn,
                                                    variant: `soft-${btn.variant}`
                                                })))}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}

                            {/* Soft Rounded Buttons */}
                            {data.buttonTypes && data.buttonTypes
                                .filter(type => type.variant === 'soft' && type.rounded)
                                .map((type, idx) => (
                                    <Col xl={6} key={`soft-rounded-${idx}`}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{type.title}</Card.Title>
                                                {renderButtonGroup(type.buttons.map(btn => ({
                                                    ...btn,
                                                    variant: `soft-${btn.variant}`,
                                                    rounded: true
                                                })))}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            {/* Gradient Buttons */}
                            {data.buttonTypes && data.buttonTypes
                                .filter(type => type.variant === 'gradient' && !type.rounded)
                                .map((type, idx) => (
                                    <Col md={12} key={`gradient-${idx}`}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>{type.title}</Card.Title>
                                                {renderButtonGroup(type.buttons.map(btn => ({
                                                    ...btn,
                                                    variant: `gradient-${btn.variant}`
                                                })))}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}

                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Buttons Checkbox</Card.Title>
                                        <ButtonGroup>
                                            {options.map(({ id, label, variant }) => (
                                                <ToggleButton key={id} id={id} type="checkbox" variant={variant} checked={checkedStates[id]} value={id} onChange={() => handleToggle(id)}>
                                                    {label} {checkedStates[id] && '✓'}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Buttons Radio</Card.Title>
                                        <ButtonGroup>
                                            {radioOptions.map((radio, idx) => (
                                                <ToggleButton key={idx} id={`radio-${idx}`} type="radio"
                                                    variant="outline-primary" name="radio" value={radio.value} checked={selectedOption === radio.value}
                                                    onChange={(e) => setSelectedOption(e.currentTarget.value)}
                                                >
                                                    {radio.name}
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    )
}
