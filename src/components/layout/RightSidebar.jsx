import { useState, useEffect, useContext } from 'react';
import { Offcanvas, Button, Row, Col, OverlayTrigger, Tooltip, Tab, Nav } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { useSidebar } from '../../contexts/SidebarContext';
import { UIContext } from '../../contexts/UIContext';
import { useRTL } from '../../contexts/RTLContext';

const RightSidebar = () => {
    const { isRTL, toggleRTL } = useRTL()
    const [isOpen, setIsOpen] = useState(false);
    const { sidebarSize, toggleSidebar, sidebarColor, changeSidebarColor, colors, isColorDisabled } = useSidebar();
    const { uitheme, setUitheme } = useContext(UIContext);
    const [activeTab, setActiveTab] = useState('color')


    // Add animation class to body when sidebar opens
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('settings-open');
        } else {
            document.body.classList.remove('settings-open');
        }
        return () => {
            document.body.classList.remove('settings-open');
        };
    }, [isOpen]);

    const toggleRightbar = () => {
        setIsOpen(!isOpen);
    };

    const renderTooltip = (props) => (
        <Tooltip id="settings-tooltip" {...props}>Theme Settings</Tooltip>
    );

    return (
        <>
            {/* Floating Settings Button */}
            <OverlayTrigger placement={isRTL ? "right" : "left"} delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                <div className='position-fixed top-50 translate-middle-y end-0 z-3'>
                    <div className='avatar avatar-lg bg-gradient-primary text-white rounded-start-pill shadow-lg cursor-pointer' onClick={toggleRightbar} aria-controls="offcanvasRight">
                        <i className="bi bi-gear-wide-connected rotate-icon fs-4"></i>
                    </div>
                </div>
            </OverlayTrigger>

            {/* Settings Panel */}
            <Offcanvas
                show={isOpen}
                onHide={toggleRightbar}
                placement="end"
                className={`shadow-lg border-end}`}
            >
                <Offcanvas.Header className="border-bottom">
                    <div className="d-flex align-items-center w-100">
                        <i className="bi bi-sliders text-primary me-2 fs-4"></i>
                        <h5 className="mb-0 fw-bold">Theme Settings</h5>
                        <Button variant="link" className="ms-auto p-0 text-muted" onClick={toggleRightbar} aria-label="Close">
                            <i className="bi bi-x-lg"></i>
                        </Button>
                    </div>
                </Offcanvas.Header>

                <Offcanvas.Body className="p-0">
                    <SimpleBar style={{ maxHeight: 'calc(100vh - 140px)' }} className="px-3 py-3">
                        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                            <Nav variant="pills" className="nav-justified mb-3">
                                <Nav.Item className="my-2 my-sm-0">
                                    <Nav.Link eventKey="color" className="p-3 text-center bg-soft-primary">
                                        <i className="ri-palette-line me-2"></i> Colors
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="my-2 my-sm-0">
                                    <Nav.Link eventKey="layout" className="p-3 text-center bg-soft-primary">
                                        <i className="ri-layout-line me-2"></i> Layout
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="color">
                                    <div className='mb-4'>
                                        <h6 className="mb-3 fw-semibold text-uppercase text-muted small">Theme Colors</h6>
                                        <div className="p-3 bg-light bg-opacity-10 rounded-3">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="bg-primary bg-opacity-10 avatar avatar-sm rounded-circle me-3">
                                                    <i className="bi bi-palette text-primary"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-semibold">Primary Color</h6>
                                                    <small className="text-muted">Choose your preferred theme color</small>
                                                </div>
                                            </div>
                                            <Row className="g-2">
                                                {[
                                                    { value: 'default', color: '#0d6efd', label: 'Blue', icon: 'bi-droplet-fill' },
                                                    { value: 'purple', color: '#7069F8', label: 'Purple', icon: 'bi-droplet-fill' },
                                                    { value: 'orange', color: '#CD5E3F', label: 'Orange', icon: 'bi-droplet-fill' },
                                                    { value: 'green', color: '#01BC86', label: 'Green', icon: 'bi-droplet-fill' },
                                                    { value: 'red', color: '#FB6E6E', label: 'Red', icon: 'bi-droplet-fill' }
                                                ].map((theme) => (
                                                    <Col xs={6} key={theme.value}>
                                                        <Button
                                                            variant={uitheme === theme.value ? 'primary' : 'outline-secondary'}
                                                            className={`w-100 d-flex align-items-center justify-content-start position-relative ${uitheme === theme.value ? 'shadow-sm' : ''}`}
                                                            onClick={() => setUitheme(theme.value)}
                                                            style={{
                                                                borderColor: uitheme === theme.value ? theme.color : undefined,
                                                                backgroundColor: uitheme === theme.value ? theme.color : undefined
                                                            }}
                                                        >
                                                            <i className={`${theme.icon} me-2`} style={{ color: uitheme === theme.value ? 'white' : theme.color }}></i>
                                                            <span className="small fw-medium">{theme.label}</span>
                                                            {uitheme === theme.value && (
                                                                <i className="bi bi-check-circle-fill ms-auto"></i>
                                                            )}
                                                        </Button>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h6 className="mb-3 fw-semibold text-uppercase text-muted small">Sidebar Color Scheme</h6>
                                        <Row className="g-3">
                                            {colors.map((color) => {
                                                const disabled = isColorDisabled(color);

                                                // Decide background + text color
                                                let bgClass = "";
                                                let textClass = "text-dark";

                                                switch (color) {
                                                    case "primary":
                                                        bgClass = "bg-primary";
                                                        textClass = "text-white";
                                                        break;
                                                    case "dark":
                                                        bgClass = "left-sidebar-bg";
                                                        textClass = "text-white";
                                                        break;
                                                    case "gradient":
                                                        bgClass = "bg-gradient-primary";
                                                        textClass = "text-white";
                                                        break;
                                                    default:
                                                        bgClass = "background-white";
                                                        textClass = "text-secondary";
                                                        break;
                                                }

                                                return (
                                                    <Col xs={6} key={color}>
                                                        <div
                                                            className={`color-swatch rounded-3 p-3 position-relative overflow-hidden ${bgClass} ${sidebarColor === color ? "border border-2 border-primary" : "border"} d-flex flex-column justify-content-end
                                ${disabled ? 'opacity-50 pe-none' : 'cursor-pointer'}`}
                                                            onClick={() => !disabled && changeSidebarColor(color)}
                                                            style={{ height: "90px" }}
                                                        >
                                                            {/* Disabled overlay */}
                                                            {disabled && (
                                                                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-25">
                                                                    <div className="bg-white rounded-circle p-2">
                                                                        <i className="bi bi-slash-circle text-danger fs-5"></i>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {sidebarColor === color && !disabled && (
                                                                <div className="position-absolute top-0 end-0 m-2">
                                                                    <div className="bg-white text-primary rounded-circle d-flex p-1 avatar avatar-xxxs align-items-center justify-content-center">
                                                                        <i className="bi bi-check-lg"></i>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Label */}
                                                            <span className={`position-absolute bottom-0 start-0 p-3 w-100 fw-medium d-flex align-items-center ${textClass}`}>
                                                                <i className="bi bi-circle-fill me-2 fs-10"></i>
                                                                <span className={color === 'dark' || color === 'primary' || color === 'gradient' ? 'text-white' : 'text-secondary'}>
                                                                    {color.charAt(0).toUpperCase() + color.slice(1).replace(/-/g, ' ')}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                    </div>

                                </Tab.Pane>
                                <Tab.Pane eventKey="layout">
                                    <div className="mb-4">
                                        <h6 className="mb-3 fw-semibold text-uppercase text-muted small">Layout Options</h6>
                                        <div className="p-3 bg-light bg-opacity-10 rounded-3">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="bg-primary bg-opacity-10 avatar avatar-sm rounded-circle me-3">
                                                    <i className="bi bi-layout-sidebar text-primary"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-semibold">Sidebar Layout</h6>
                                                    <small className="text-muted">Choose your preferred sidebar size</small>
                                                </div>
                                            </div>

                                            <div className="layout-selector">
                                                <div className="btn-group w-100 position-relative" role="group" aria-label="Sidebar size options">
                                                    {/* Moving overlay */}
                                                    <div className={`toggle-overlay ${sidebarSize}`} />
                                                    {[
                                                        {
                                                            value: 'sm',
                                                            icon: 'bi-layout-sidebar-inset',
                                                            label: 'Compact',
                                                            desc: 'Minimal sidebar for more content space'
                                                        },
                                                        {
                                                            value: 'lg',
                                                            icon: 'bi-layout-sidebar-inset-reverse',
                                                            label: 'Expanded',
                                                            desc: 'Wider sidebar for better navigation'
                                                        }
                                                    ].map((size) => (
                                                        <div key={size.value} className="flex-grow-1">
                                                            <input type="radio" className="btn-check" name="sidebarSize" id={`sidebar-${size.value}`} checked={sidebarSize === size.value} onChange={() => toggleSidebar(size.value)} />
                                                            <label className={`btn w-100 d-flex flex-column align-items-center py-3 ${sidebarSize === size.value ? 'active' : ''}`} htmlFor={`sidebar-${size.value}`} data-bs-toggle="tooltip" title={size.desc}>
                                                                <i className={`bi ${size.icon} mb-1`}></i>
                                                                <span className="small fw-medium">{size.label}</span>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* RTL Direction Toggle */}
                                    <div className="mb-4">
                                        <h6 className="mb-3 fw-semibold text-uppercase text-muted small">Direction</h6>
                                        <div className="p-3 bg-light bg-opacity-10 rounded-3">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="bg-primary bg-opacity-10 avatar avatar-sm rounded-circle me-3">
                                                    <i className="bi bi-text-left text-primary"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-0 fw-semibold">Layout Direction</h6>
                                                    <small className="text-muted">Switch between LTR and RTL layouts</small>
                                                </div>
                                            </div>

                                            <div className="layout-selector">
                                                <div className="btn-group w-100 position-relative" role="group" aria-label="Direction options">
                                                    {/* Moving overlay */}
                                                    <div className={`toggle-overlay ${isRTL ? 'rtl' : 'ltr'}`} />
                                                    {[
                                                        {
                                                            value: false,
                                                            icon: 'bi-text-left',
                                                            label: 'LTR',
                                                            desc: 'Left to Right (English, Spanish, etc.)'
                                                        },
                                                        {
                                                            value: true,
                                                            icon: 'bi-text-right',
                                                            label: 'RTL',
                                                            desc: 'Right to Left (Arabic, Hebrew, etc.)'
                                                        }
                                                    ].map((direction) => (
                                                        <div key={direction.value ? 'rtl' : 'ltr'} className="flex-grow-1">
                                                            <input
                                                                type="radio"
                                                                className="btn-check"
                                                                name="textDirection"
                                                                id={`direction-${direction.value ? 'rtl' : 'ltr'}`}
                                                                checked={isRTL === direction.value}
                                                                onChange={() => toggleRTL()}
                                                            />
                                                            <label
                                                                className={`btn w-100 d-flex flex-column align-items-center py-3 ${isRTL === direction.value ? 'active' : ''}`}
                                                                htmlFor={`direction-${direction.value ? 'rtl' : 'ltr'}`}
                                                                data-bs-toggle="tooltip"
                                                                title={direction.desc}
                                                            >
                                                                <i className={`bi ${direction.icon} mb-1`}></i>
                                                                <span className="small fw-medium">{direction.label}</span>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </SimpleBar>
                </Offcanvas.Body>

                <div className="border-top p-3 text-center">
                    <small className="text-muted">
                        <i className="bi bi-info-circle me-1"></i> Changes are saved automatically
                    </small>
                </div>
            </Offcanvas>
        </>
    );
}

export default RightSidebar;