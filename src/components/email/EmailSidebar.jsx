import React, { useState } from 'react';
import {
    Button, ListGroup, Badge, ProgressBar, OverlayTrigger, Tooltip
} from 'react-bootstrap';

// SidebarItem component for email sidebar navigation
const SidebarItem = ({ icon, label, count, active, onClick, iconComponent: Icon }) => {

    return (
        <ListGroup.Item action
            className={`p-2 px-3 border-0 rounded-3 mb-1 d-flex align-items-center 
                ${active ? 'active bg-gradient-primary bg-opacity-10  fw-medium' : 'text-muted hover-bg-light'}
                transition-all`}
            onClick={onClick}
        >
            <div className={`me-3 d-flex align-items-center justify-content-center ${active ? 'text-white' : ''}`}>
                {icon || (Icon && <Icon size={20} />)}
            </div>
            <div className="flex-grow-1 text-truncate">
                {label}
            </div>
            {count !== undefined && (
                <Badge bg={active ? 'primary' : 'light'} text={active ? 'white' : 'dark'} pill className="ms-2">
                    {count > 99 ? '99+' : count}
                </Badge>
            )}
        </ListGroup.Item>
    );
};

const EmailSidebar = ({ handleClose, activeTab, setActiveTab, setComposeOpen }) => {
    const [expanded, setExpanded] = useState({
        labels: true,
        more: false
    });

    const toggleSection = (section) => {
        setExpanded(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const menuItems = [
        { icon: 'ri-inbox-line', label: 'Inbox', count: 7, id: 'inbox' },
        { icon: 'ri-star-line', label: 'Starred', id: 'starred' },
        { icon: 'ri-time-line', label: 'Snoozed', id: 'snoozed' },
        { icon: 'ri-send-plane-line', label: 'Sent', id: 'sent' },
        { icon: 'ri-file-text-line', label: 'Drafts', count: 3, id: 'drafts' },
        { icon: 'ri-delete-bin-line', label: 'Trash', id: 'trash' },
        { icon: 'ri-alert-line', label: 'Important', id: 'important' },
        { icon: 'ri-spam-2-line', label: 'Spam', count: 24, id: 'spam' },
        { icon: 'ri-price-tag-3-line', label: 'Promotions', id: 'promotions' }
    ];

    const labels = [
        { color: 'primary', name: 'Work' },
        { color: 'success', name: 'Personal' },
        { color: 'info', name: 'Social' },
        { color: 'warning', name: 'Updates' },
        { color: 'danger', name: 'Important' }
    ];

    return (
        <div className="d-flex flex-column h-100">
            {/* Compose Button */}
            <OverlayTrigger placement="right" overlay={<Tooltip id="compose-tooltip">Compose new email</Tooltip>}>
                <Button variant="primary" className="w-100 d-flex align-items-center justify-content-center py-2 shadow-sm"
                    onClick={() => {
                        setComposeOpen(true);
                        handleClose();
                    }}
                >
                    <i className="ri-edit-box-line me-2 fs-5" />
                    <span className="fw-medium">Compose</span>
                </Button>
            </OverlayTrigger>

            {/* Main Menu */}
            <div className="overflow-auto flex-grow-1 mt-4">
                <ListGroup variant="flush" className="border-0">
                    {menuItems.map((item) => (
                        <SidebarItem key={item.id} icon={<i className={`${item.icon} fs-5`} />} label={item.label} count={item.count} active={activeTab === item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                handleClose();
                            }}
                        />
                    ))}
                </ListGroup>

                {/* Labels Section */}
                <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center py-2 text-muted cursor-pointer"
                        onClick={() => toggleSection('labels')}
                    >
                        <span className="text-uppercase small fw-bold">Labels</span>
                        <i className={`ri-${expanded.labels ? 'arrow-down-s' : 'arrow-right-s'}-line`} />
                    </div>

                    {expanded.labels && (
                        <div className="label-list">
                            {labels.map((label, index) => (
                                <div
                                    key={index}
                                    className="d-flex align-items-center py-2 rounded-3 hover-bg-light"
                                >
                                    <span className={`bg-${label.color} p-1 rounded-circle me-2`} style={{ width: '12px', height: '12px' }}></span>
                                    <span className="text-truncate">{label.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Storage */}
            <div className="p-3 bg-soft-primary border border-soft-primary rounded">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small text-primary fw-medium">Storage</span>
                    <span className="badge bg-soft-primary text-primary">Free</span>
                </div>
                <ProgressBar now={46} className="mb-2 height-6 bg-white shadow" variant="primary"/>
                <div className="d-flex justify-content-between small">
                    <span className="text-muted">7.02 GB used</span>
                    <span className="text-muted">15 GB</span>
                </div>
            </div>
        </div>
    );
};

export default EmailSidebar;
