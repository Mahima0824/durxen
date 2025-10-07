import React, { useState, useEffect } from 'react';
import { Offcanvas, Button, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useSidebar } from '../../contexts/SidebarContext';

const RightSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { sidebarSize, toggleSidebar, sidebarColor, changeSidebarColor, colors } = useSidebar();

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
            <OverlayTrigger placement="left" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                <div className='position-fixed top-50 translate-middle-y end-0 z-3'>
                    <div className='avatar avatar-lg bg-gradient-primary text-white rounded-start-pill shadow-lg cursor-pointer' onClick={toggleRightbar} aria-controls="offcanvasRight">
                        <i className="bi bi-gear-wide-connected rotate-icon fs-4"></i>
                    </div>
                </div>
            </OverlayTrigger>

            {/* Settings Panel */}
            <Offcanvas show={isOpen} onHide={toggleRightbar} placement="end" className="border-start shadow-lg">
                <Offcanvas.Header className="border-bottom">
                    <div className="d-flex align-items-center w-100">
                        <i className="bi bi-sliders text-primary me-2 fs-4"></i>
                        <h5 className="mb-0 fw-bold">Theme Settings</h5>
                        <Button variant="link" className="ms-auto p-0 text-muted" onClick={toggleRightbar} aria-label="Close"><i className="bi bi-x-lg"></i></Button>
                    </div>
                </Offcanvas.Header>

                <Offcanvas.Body className="">
                    <div className="mb-4">
                        <h6 className="mb-3 fw-semibold text-uppercase text-muted small">Sidebar Color Scheme</h6>
                        <Row className="g-3">
                            {colors.map((color) => {
                                // Decide background + text color
                                let bgClass = "";
                                let textClass = "text-dark";

                                switch (color) {
                                    case "primary":
                                        bgClass = "bg-primary";
                                        textClass = "text-white";
                                        break;
                                    case "dark":
                                        bgClass = "bg-dark";
                                        textClass = "text-white";
                                        break;
                                    case "gradient":
                                        bgClass = "bg-gradient-primary";
                                        textClass = "text-white";
                                        break;
                                    default:
                                        bgClass = "bg-white";
                                        textClass = "text-dark";
                                        break;
                                }

                                return (
                                    <Col xs={6} key={color}>
                                        <div className={`color-swatch rounded-3 p-3 cursor-pointer position-relative overflow-hidden ${bgClass} ${sidebarColor === color ? "border border-2 border-primary" : "border"} d-flex flex-column justify-content-end`} onClick={() => changeSidebarColor(color)} style={{ height: "90px" }}>
                                            {sidebarColor === color && (
                                                <div className="position-absolute top-0 end-0 m-2">
                                                    <div className="bg-white text-primary rounded-circle d-flex p-1 avatar avatar-xxxs align-items-center justify-content-center">
                                                        <i className="bi bi-check-lg"></i>
                                                    </div>
                                                </div>
                                            )}

                                            {/* ✅ Label */}
                                            <span className={`position-absolute bottom-0 start-0 p-3 w-100 fw-medium d-flex align-items-center ${textClass}`}>
                                                <i className="bi bi-circle-fill me-2 fs-10"></i>
                                                <span className={color === 'dark' || color === 'primary' || color === 'gradient' ? 'text-white' : 'text-dark'}>{color.charAt(0).toUpperCase() + color.slice(1).replace(/-/g, ' ')}</span>
                                            </span>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>

                    <div className="mb-4">
                        <h6 className="mb-3 fw-semibold text-uppercase text-muted small">Layout Options</h6>
                        <div className="p-3 bg-light bg-opacity-50 rounded-3">
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
                                            <input type="radio" className="btn-check" name="sidebarSize" id={`sidebar-${size.value}`} checked={sidebarSize === size.value} onChange={() => toggleSidebar(size.value)}/>
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
