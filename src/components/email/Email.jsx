import React, { useState, useMemo, useRef, useEffect, forwardRef } from 'react';
import { Container, Row, Col, ListGroup, Button, Form, Badge, Dropdown, InputGroup, Modal, Offcanvas, OverlayTrigger, Tooltip, ButtonGroup, Card, Image, } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PageTitle from '../layout/PageTitle';
import Footer from '../layout/Footer';
import EmailSidebar from './EmailSidebar';
import data from '../../data/emails.json';
import EmailItem from './EmailItem';
import avatar1 from '../../images/user/avatar-1.jpg';
import avatar2 from '../../images/user/avatar-2.jpg';
import avatar3 from '../../images/user/avatar-3.jpg';
import avatar4 from '../../images/user/avatar-4.jpg';
import avatar5 from '../../images/user/avatar-5.jpg';
import avatar6 from '../../images/user/avatar-6.jpg';
import avatar7 from '../../images/user/avatar-7.jpg';
import avatar8 from '../../images/user/avatar-8.jpg';
const emails = data.emailsData.emails;

// Custom Quill Editor component to fix findDOMNode and DOMNodeInserted warnings
const QuillEditor = forwardRef(({ value, onChange, modules, formats, ...props }, ref) => {
    const editorRef = useRef(null);

    // Pass the ref up to parent component
    useEffect(() => {
        if (ref) {
            ref.current = {
                getEditor: () => editorRef.current?.getEditor(),
                // Add any other methods you need to expose
            };
        }
    }, [ref]);

    return (
        <ReactQuill ref={editorRef} value={value} onChange={onChange} modules={modules} formats={formats} {...props} />
    );
});

export default function Email() {
    const [activeTab, setActiveTab] = useState('inbox');
    const [emailList, setEmailList] = useState(emails);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [composeOpen, setComposeOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [emailDetailOpen, setEmailDetailOpen] = useState(false);
    const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });
    const quillRef = useRef(null);
    const quillEditorRef = useRef(null);

    const modules = useMemo(() => ({
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image']
        ],
        clipboard: {
            // Toggle to add extra line breaks when pasting HTML
            matchVisual: false
        }
    }), []);

    // Prevent memory leaks and fix DOM mutation warnings
    useEffect(() => {
        // Create a custom event handler for Quill editor
        const setupQuillEditor = () => {
            if (quillRef.current) {
                const editor = quillRef.current.getEditor();
                quillEditorRef.current = editor;
            }
        };

        // Setup when component mounts or quillRef changes
        if (composeOpen) {
            // Small delay to ensure the editor is mounted
            const timer = setTimeout(() => {
                setupQuillEditor();
            }, 100);

            return () => {
                clearTimeout(timer);
                // Clean up event listeners
                if (quillEditorRef.current) {
                    quillEditorRef.current.off('text-change');
                }
            };
        }
    }, [composeOpen]);

    const handleComposeSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the email

        // Reset form and close modal
        setComposeData({ to: '', subject: '', body: '' });
        setComposeOpen(false);
    };

    const toggleStar = (emailId) => {
        setEmailList(emailList.map(email =>
            email.id === emailId ? { ...email, starred: !email.starred } : email
        ));
    };

    const toggleSelectEmail = (emailId) => {
        setSelectedEmails(prev =>
            prev.includes(emailId)
                ? prev.filter(id => id !== emailId)
                : [...prev, emailId]
        );
    };

    // Handle viewing email details
    const handleViewDetail = (email) => {
        setSelectedEmail(email);
        setEmailDetailOpen(true);
    };

    const selectAllEmails = () => {
        if (selectedEmails.length === filteredEmails.length) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(filteredEmails.map(email => email.id));
        }
    };

    const filteredEmails = emailList.filter(email =>
        email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const images = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

    return (
        <div className='page-wrapper email-app'>
            <div className='page-content'>
                <PageTitle pageTitle="Email" pagePrTitle="Email" />

                <Container fluid className="email-container">
                    <Row>
                        <Col md={12}>
                            <Card>
                                <Card.Body>
                                    {/* Compose Button - Mobile */}
                                    <Button variant="primary" className="compose-btn d-md-none position-fixed bottom-0 end-0 m-4 rounded-circle shadow" style={{ width: '56px', height: '56px' }} onClick={() => setComposeOpen(true)}><i className="ri-mail-line fs-5" /></Button>

                                    {/* Header */}
                                    <div className="email-header">
                                        <div className="d-flex align-items-center">
                                            <Button variant="light" className="d-md-none me-3 border-0" onClick={() => setSidebarOpen(true)}><i className="ri-menu-line fs-5" /></Button>

                                            <div className="search-box flex-grow-1">
                                                <InputGroup className="rounded-pill overflow-hidden border">
                                                    <InputGroup.Text className="border-0 ps-3 pe-2"><i className="ri-search-line text-muted" /></InputGroup.Text>
                                                    <Form.Control type="search" placeholder="Search mail..." className="border-0 py-2" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                                </InputGroup>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        {/* Sidebar */}
                        <Col md={4} lg={3} className='mb-4'>
                            <Card className='h-100 mb-0'>
                                <Card.Body>
                                    <EmailSidebar handleClose={() => setSidebarOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} setComposeOpen={setComposeOpen} />
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Email list */}
                        <Col md={8} lg={9} className='mb-4'>
                            <Card className='h-100 mb-0'>
                                <Card.Body>
                                    <div className='d-flex flex-column'>
                                        {/* Email actions toolbar */}
                                        <div className="email-actions border-bottom bg-white d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3 pb-3">
                                            <div className="d-flex align-items-center flex-wrap">
                                                <div className="d-flex align-items-center gap-3">
                                                    <Form.Check className="" checked={selectedEmails.length > 0 && selectedEmails.length === filteredEmails.length} onChange={selectAllEmails}
                                                        ref={input => {
                                                            if (input) {
                                                                input.indeterminate =
                                                                    selectedEmails.length > 0 &&
                                                                    selectedEmails.length < filteredEmails.length;
                                                            }
                                                        }}
                                                    />

                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="light" size="sm" className="px-2 py-1 border-0 rounded-3"><i className="ri-arrow-down-s-line" /></Dropdown.Toggle>
                                                        <Dropdown.Menu className="">
                                                            <Dropdown.Item><i className="ri-check-line me-2" />All</Dropdown.Item>
                                                            <Dropdown.Item><i className="ri-close-line me-2" />None</Dropdown.Item>
                                                            <Dropdown.Divider className="my-1" />
                                                            <Dropdown.Item><i className="ri-mail-open-line me-2" />Read</Dropdown.Item>
                                                            <Dropdown.Item><i className="ri-mail-line me-2" />Unread</Dropdown.Item>
                                                            <Dropdown.Divider className="my-1" />
                                                            <Dropdown.Item><i className="ri-star-fill text-warning me-2" />Starred</Dropdown.Item>
                                                            <Dropdown.Item><i className="ri-star-line me-2" />Unstarred</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>

                                                <div className="vr mx-4 opacity-25"></div>
                                                <ButtonGroup className="me-2">
                                                    <Button variant="light" size="sm" className="border-0" title="Refresh"><i className="ri-refresh-line" /></Button>
                                                    <Button variant="light" size="sm" className="border-0" title="Archive"><i className="ri-archive-line" /></Button>
                                                    <Button variant="light" size="sm" className="border-0" title="Mark as read"><i className="ri-mail-open-line" /></Button>
                                                    <Button variant="light" size="sm" className="border-0" title="Delete"><i className="ri-delete-bin-line" /></Button>
                                                    <Button variant="light" size="sm" className="border-0" title="Snooze"><i className="ri-time-line" /></Button>
                                                </ButtonGroup>
                                            </div>

                                            <div className="d-flex align-items-center mt-2 mt-md-0">
                                                <small className="text-muted me-3">
                                                    {selectedEmails.length > 0
                                                        ? `${selectedEmails.length} selected`
                                                        : `${filteredEmails.length} messages`}
                                                </small>

                                                <ButtonGroup className="me-2">
                                                    <Button variant="light" size="sm" className="border-0" disabled={filteredEmails.length === 0} title="Previous"><i className="ri-arrow-left-s-line" /></Button>
                                                    <Button variant="light" size="sm" className="border-0" disabled={filteredEmails.length === 0} title="Next"><i className="ri-arrow-right-s-line" /></Button>
                                                </ButtonGroup>

                                                <Dropdown>
                                                    <Dropdown.Toggle variant="light" size="sm" className="border-0" title="Settings">
                                                        <i className="ri-settings-3-line" />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu align="end">
                                                        <Dropdown.Header>Display density</Dropdown.Header>
                                                        <Dropdown.Item>Comfortable</Dropdown.Item>
                                                        <Dropdown.Item>Cozy</Dropdown.Item>
                                                        <Dropdown.Item>Compact</Dropdown.Item>
                                                        <Dropdown.Divider className="my-1" />
                                                        <Dropdown.Item>Settings</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email list */}
                                    <div className="flex-grow-1 overflow-auto">
                                        {filteredEmails.length > 0 ? (
                                            <ListGroup variant="flush" className="border-0">
                                                {filteredEmails.map((email) => (
                                                    <EmailItem key={email.id} email={email} onStar={toggleStar} onSelect={toggleSelectEmail} selected={selectedEmails.includes(email.id)} onViewDetail={handleViewDetail} />
                                                ))}
                                            </ListGroup>
                                        ) : (
                                            <div className="text-center py-5">
                                                <div className="mb-3">
                                                    <i className="ri-inbox-line" />
                                                </div>
                                                <h5>No emails found</h5>
                                                <p className="text-muted">Try adjusting your search or filter to find what you're looking for.</p>
                                            </div>
                                        )}
                                        <div className="d-flex justify-content-between mt-4">
                                            <small className="text-muted">Showing 1 - 20 of 289</small>
                                            <div>
                                                <Button variant="light" size="sm" className="border-0 me-1"><i className="ri-arrow-left-s-line" /></Button>
                                                <Button variant="light" size="sm" className="border-0"><i className="ri-arrow-right-s-line" /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* Compose Email Modal */}
                <Modal show={composeOpen} onHide={() => setComposeOpen(false)} size="lg" centered className=" border-0">
                    <Modal.Header closeButton className="p-0 ">
                        <Modal.Title className="text-white bg-primary py-2 px-3">New Message</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={handleComposeSubmit} className="d-flex flex-column h-100">
                        <Modal.Body className="p-0 flex-grow-1 d-flex flex-column" style={{ minHeight: '400px' }}>
                            <div className="p-3 border-bottom">
                                <Form.Group className="mb-3">
                                    <div className="input-group">
                                        <span className="input-group-text bg-transparent border-0 px-2 text-muted">
                                            To:
                                        </span>
                                        <Form.Control type="email" placeholder="Recipients" className="border-0 px-0" required />
                                        <Button variant="link" className="text-muted p-0 ms-2" title="Cc & Bcc">Cc Bcc</Button>
                                    </div>
                                </Form.Group>

                                <div className="border-top pt-3">
                                    <Form.Group className="mb-0">
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-0 px-2 text-muted">Subject:</span>
                                            <Form.Control type="text" placeholder="Subject" className="border-0 px-0 fw-medium" />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="flex-grow-1 d-flex flex-column" id="scrolling-container" style={{ minHeight: '200px' }}>
                                <QuillEditor className="border-0 flex-grow-1 d-flex flex-column"
                                    ref={quillRef}
                                    theme="snow"
                                    value={composeData.body}
                                    onChange={(content) => setComposeData(prev => ({ ...prev, body: content }))}
                                    modules={modules}
                                    placeholder="Compose your email here..."
                                    style={{ minHeight: '200px' }}
                                    formats={[
                                        'header', 'font', 'size',
                                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                                        'list', 'bullet', 'indent',
                                        'link', 'image', 'color', 'code-block'
                                    ]}
                                />
                            </div>
                        </Modal.Body>

                        <Modal.Footer className="bg-light p-3 border-top d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <Button variant="primary" type="submit" className="px-3 d-flex align-items-center">
                                    <i className="ri-send-plane-line me-2"></i> <span>Send</span>
                                </Button>

                                <div className="btn-group ms-2">
                                    <Button variant="light" className="text-muted border" title="Attach files"><i className="ri-attachment-line"></i></Button>
                                    <Button variant="light" className="text-muted border" title="Insert emoji"><i className="ri-emotion-line"></i></Button>
                                    <Button variant="light" className="text-muted border" title="More options"><i className="ri-more-2-fill"></i></Button>
                                </div>

                                <Button variant="light" className="text-muted ms-2" title="Discard draft" onClick={() => setComposeOpen(false)}><i className="ri-delete-bin-line"></i></Button>
                            </div>

                            <div className="d-flex align-items-center">
                                <small className="text-muted me-3 d-none d-md-block">
                                    <i className="ri-information-line me-1"></i>
                                    Press Ctrl+Enter to send
                                </small>
                                <Button variant="light" className="text-muted" onClick={() => setComposeOpen(false)}><i className="ri-fullscreen-exit-line"></i></Button>
                            </div>
                        </Modal.Footer>
                    </Form>
                </Modal>


                {/* Email Detail Offcanvas */}
                <Offcanvas show={emailDetailOpen} onHide={() => setEmailDetailOpen(false)} placement="end" className="email-detail-offcanvas shadow-lg" >
                    <Offcanvas.Header className="border-bottom bg-light py-3">
                        <div className="d-flex w-100 align-items-center">
                            <div className="me-2 avatar avatar-sm rounded-circle avatar-soft-primary cursor" onClick={() => setEmailDetailOpen(false)}>
                                <i className="ri-arrow-left-line text-primary"></i>
                            </div>
                            <div className="d-flex align-items-center flex-grow-1">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Delete</Tooltip>}>
                                    <div className="me-2 rounded-circle avatar avatar-sm avatar-soft-danger cursor">
                                        <i className="ri-delete-bin-line text-danger"></i>
                                    </div>
                                </OverlayTrigger>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Archive</Tooltip>}>
                                    <div className="me-2 rounded-circle avatar avatar-sm avatar-soft-secondary cursor">
                                        <i className="ri-archive-line text-secondary"></i>
                                    </div>
                                </OverlayTrigger>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Mark as sent</Tooltip>}>
                                    <div className="me-2 rounded-circle avatar avatar-sm">
                                        <i className="ri-mail-send-line"></i>
                                    </div>
                                </OverlayTrigger>
                                <ButtonGroup className="ms-auto">
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Snooze</Tooltip>}>
                                        <div className="me-2 rounded-circle avatar avatar-sm avatar-soft-primary cursor">
                                            <i className="ri-time-line text-primary"></i>
                                        </div>
                                    </OverlayTrigger>
                                    <Dropdown as={ButtonGroup}>
                                        <Dropdown.Toggle variant="outline-secondary" size="sm" className="rounded-circle avatar avatar-sm" id="dropdown-more-options">
                                            <i className="ri-more-2-fill"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu align="end">
                                            <Dropdown.Item><i className="ri-mail-unread-line me-2"></i>Mark as unread</Dropdown.Item>
                                            <Dropdown.Item><i className="ri-spam-2-line me-2"></i>Report spam</Dropdown.Item>
                                            <Dropdown.Item><i className="ri-printer-line me-2"></i>Print</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item><i className="ri-settings-3-line me-2"></i>Settings</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </ButtonGroup>
                            </div>
                        </div>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="p-0">
                        {selectedEmail && (
                            <div className="d-flex flex-column min-h-100 p-4">
                                {/* Email Header */}
                                <div className='mb-4'>
                                    <div className="d-flex align-items-start">
                                        <div className="position-relative me-3">
                                            <Image src={images[selectedEmail.id % images.length]} alt={selectedEmail.sender}
                                                className="avatar-img-lg rounded-circle shadow-sm" />
                                            {selectedEmail.category === 'work' && (
                                                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle p-1 border border-2 border-white rounded-circle"
                                                    style={{ fontSize: '8px' }}
                                                >
                                                    <i className="ri-check-line"></i>
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <div>
                                                    <h5 className="mb-0 d-flex align-items-center">
                                                        {selectedEmail.sender}
                                                        {selectedEmail.category === 'work' && (
                                                            <Badge bg="danger" pill className="ms-2 fs-10">
                                                                <i className="ri-alert-line me-1"></i> Important
                                                            </Badge>
                                                        )}
                                                        <Button variant="link" className={`p-0 ms-2 ${selectedEmail.starred ? 'text-warning' : 'text-muted'}`} size="sm">
                                                            <i className={`fs-5 ${selectedEmail.starred ? 'ri-star-fill' : 'ri-star-line'}`}></i>
                                                        </Button>
                                                    </h5>

                                                    <div className="text-muted small d-flex align-items-center">
                                                        <span className="me-2">to me</span>
                                                        <OverlayTrigger
                                                            placement="bottom-start"
                                                            overlay={
                                                                <Tooltip className="email-metadata-tooltip">
                                                                    <div className="text-start p-2" style={{ minWidth: '250px' }}>
                                                                        <div className="mb-2">
                                                                            <div className="text-uppercase text-muted small mb-1">From</div>
                                                                            <div>{selectedEmail.sender} &lt;{selectedEmail.sender.toLowerCase().replace(' ', '.')}@example.com&gt;</div>
                                                                        </div>
                                                                        <div className="mb-2">
                                                                            <div className="text-uppercase text-muted small mb-1">To</div>
                                                                            <div>You &lt;user@example.com&gt;</div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="text-uppercase text-muted small mb-1">Date</div>
                                                                            <div>{selectedEmail.date} at {selectedEmail.time}</div>
                                                                        </div>
                                                                    </div>
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button variant="link" className="p-0 text-muted" size="sm">
                                                                <i className="ri-arrow-down-s-line"></i>
                                                            </Button>
                                                        </OverlayTrigger>
                                                        <span className="mx-2">•</span>
                                                        <span>
                                                            <i className="ri-time-line me-1"></i>
                                                            {selectedEmail.time} • {selectedEmail.date}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <h6 className="mt-3 mb-0">{selectedEmail.subject}</h6>

                                            <div className="d-flex gap-2 mt-3">
                                                <Button variant="outline-primary" size="sm" className="d-flex align-items-center"><i className="ri-reply-line me-1"></i> Reply</Button>
                                                <Button variant="outline-secondary" size="sm" className="d-flex align-items-center"><i className="ri-share-forward-line me-1"></i> Forward</Button>
                                                <Dropdown as={ButtonGroup} size="sm" className="ms-2">
                                                    <Button variant="outline-secondary" className="d-flex align-items-center">More</Button>
                                                    <Dropdown.Toggle split variant="secondary" id="email-more-actions"><i className="ri-arrow-down-s-line me-1"></i></Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item><i className="ri-file-copy-line me-2"></i> Forward as attachment</Dropdown.Item>
                                                        <Dropdown.Item><i className="ri-file-edit-line me-2"></i> Edit as new message</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item><i className="ri-delete-bin-line me-2 text-danger"></i> Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Body */}
                                <div>
                                    <Card>
                                        <Card.Body>
                                            <p className="mb-4 fs-14 lead">{selectedEmail.preview}</p>
                                            <div className="mb-4 fs-14">
                                                {selectedEmail.category === 'work' && (
                                                    <div>
                                                        <p >Thank you for your prompt response regarding the project timeline. I've reviewed the details and agree with your assessment.</p>
                                                        <p>Let's proceed with the implementation as discussed in our meeting yesterday. I've attached the updated timeline and requirements for your reference.</p>
                                                        <p>Key points to remember:</p>
                                                        <ul className="mb-3">
                                                            <li>Phase 1 deadline: <Badge bg="danger">June 15, 2023</Badge></li>
                                                            <li>Team meeting: <Badge bg="primary">Every Monday at 10 AM</Badge></li>
                                                            <li>Budget approval: <Badge bg="success">Confirmed</Badge></li>
                                                        </ul>
                                                    </div>
                                                )}
                                                {selectedEmail.category === 'personal' && (
                                                    <div>
                                                        <p>Hope you're doing well! I wanted to follow up on our conversation from last week.</p>
                                                        <p>The event was amazing and I took some great photos that I'd love to share with you soon. I've attached a couple of them to this email.</p>
                                                        <p>Let's catch up sometime next week if you're free!</p>
                                                    </div>
                                                )}
                                                {selectedEmail.category === 'social' && (
                                                    <div>
                                                        <p>Thanks for connecting! I saw your recent post about the conference and thought it was really insightful.</p>
                                                        <p>Would love to hear more about your experience there. Perhaps we could schedule a virtual coffee chat sometime?</p>
                                                        <p>I've attached some resources that might be of interest to you based on our conversation.</p>
                                                    </div>
                                                )}
                                                {selectedEmail.category === 'updates' && (
                                                    <div>
                                                        <p>We've made some important changes to our platform that we think you'll love.</p>
                                                        <p>The new features are designed to improve your experience and make navigation more intuitive:</p>
                                                        <Card>
                                                            <Card.Body>
                                                                <h6 className="card-title">New Features:</h6>
                                                                <ul className="mb-0">
                                                                    <li>Redesigned dashboard with customizable widgets</li>
                                                                    <li>Enhanced search functionality</li>
                                                                    <li>Dark mode support</li>
                                                                    <li>Improved mobile experience</li>
                                                                </ul>
                                                            </Card.Body>
                                                        </Card>
                                                        <p>Check out the attached screenshots to see these changes in action!</p>
                                                    </div>
                                                )}
                                                {selectedEmail.category === 'promotions' && (
                                                    <div>
                                                        <p>Exclusive offer just for you!</p>
                                                        <Card className="mb-3 bg-primary text-white">
                                                            <Card.Body>
                                                                <h5 className="card-title">SPECIAL DISCOUNT</h5>
                                                                <h2 className="display-4 fw-bold">25% OFF</h2>
                                                                <p>Use code: <span className="bg-white text-primary px-2 py-1 rounded">SUMMER25</span></p>
                                                                <p className="mb-0">Valid for the next 48 hours only!</p>
                                                            </Card.Body>
                                                        </Card>
                                                        <p>Check out our latest collection with special discounts available for the next 48 hours only. Don't miss out!</p>
                                                    </div>
                                                )}
                                                {selectedEmail.category === 'support' && (
                                                    <div>
                                                        <p>I've looked into the issue you reported and found a solution.</p>
                                                        <Card className="mb-3">
                                                            <Card.Body>
                                                                <h6 className="card-title">Troubleshooting Steps:</h6>
                                                                <ol className="mb-0">
                                                                    <li>Clear your browser cache and cookies</li>
                                                                    <li>Restart the application</li>
                                                                    <li>Verify your network connection</li>
                                                                    <li>Try accessing from a different device</li>
                                                                </ol>
                                                            </Card.Body>
                                                        </Card>
                                                        <p>Please try the steps outlined above and let me know if this resolves your problem. I've attached a detailed guide for reference.</p>
                                                    </div>
                                                )}
                                                {!['work', 'personal', 'social', 'updates', 'promotions', 'support'].includes(selectedEmail.category) && (
                                                    <p>Thank you for your message. I've received the information you sent and will review it shortly. Please let me know if you need any additional assistance.</p>
                                                )}
                                            </div>
                                            <div className="d-flex align-items-center border-top pt-3">
                                                <div className="flex-grow-1">
                                                    <p className="mb-0 fs-14">Best regards,<br /><strong>{selectedEmail.sender}</strong></p>
                                                </div>
                                                {selectedEmail.category === 'work' && (
                                                    <div>
                                                        <Badge bg="secondary" className="me-2">Project</Badge>
                                                        <Badge bg="info">Priority</Badge>
                                                    </div>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    {/* Attachments */}
                                    <Card>
                                        <Card.Header className="bg-white d-flex align-items-center">
                                            <i className="ri-attachment-2 me-2 text-primary fs-5"></i>
                                            <h6 className="mb-0">Attachments ({selectedEmail.category === 'work' ? '3' : '2'})</h6>
                                            <Button variant="link" size="sm" className="ms-auto p-0 text-primary">
                                                <i className="ri-download-2-line me-1"></i> Download All
                                            </Button>
                                        </Card.Header>
                                        <Card.Body>
                                            <div className="row g-3">
                                                {selectedEmail.category === 'work' && (
                                                    <div className="col-md-6">
                                                        <Card className='mb-0'>
                                                            <Card.Body className="d-flex align-items-center">
                                                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3 d-flex align-items-center justify-content-center">
                                                                    <i className="ri-file-excel-2-line fs-3 text-primary"></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <h6 className="mb-1">Project_Timeline.xlsx</h6>
                                                                    <div className="d-flex align-items-center">
                                                                        <span className="badge bg-light text-dark me-2">Excel</span>
                                                                        <span className="text-muted small">345 KB</span>
                                                                    </div>
                                                                </div>
                                                                <OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
                                                                    <div className="rounded-circle avatar-sm avatar bg-soft-primary border border-primary">
                                                                        <i className="ri-download-line text-primary"></i>
                                                                    </div>
                                                                </OverlayTrigger>
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                )}
                                                <div className="col-md-6">
                                                    <Card className='mb-0'>
                                                        <Card.Body className="p-3 d-flex align-items-center">
                                                            <div className="avatar avatar-xxxxl avatar-soft-danger rounded-circle me-3">
                                                                <i className="ri-file-pdf-line"></i>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-1">{selectedEmail.category === 'work' ? 'Requirements.pdf' : 'Document.pdf'}</h6>
                                                                <div className="d-flex align-items-center">
                                                                    <span className="badge bg-light text-dark me-2">PDF</span>
                                                                    <span className="text-muted small">{selectedEmail.category === 'work' ? '1.2' : '0.8'} MB</span>
                                                                </div>
                                                            </div>
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
                                                                <div className="rounded-circle avatar-sm avatar bg-soft-danger border border-soft-danger">
                                                                    <i className="ri-download-line text-danger"></i>
                                                                </div>
                                                            </OverlayTrigger>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                                <div className="col-md-6">
                                                    <Card className='mb-0'>
                                                        <Card.Body className="p-3 d-flex align-items-center">
                                                            <div className="avatar avatar-xxxxl avatar-soft-success rounded-circle me-3">
                                                                <i className="ri-image-line"></i>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h6 className="mb-1">{selectedEmail.category === 'work' ? 'Mockup.jpg' : 'Image.jpg'}</h6>
                                                                <div className="d-flex align-items-center">
                                                                    <span className="badge bg-light text-dark me-2">Image</span>
                                                                    <span className="text-muted small">{selectedEmail.category === 'work' ? '2.4' : '1.2'} MB</span>
                                                                </div>
                                                            </div>
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Download</Tooltip>}>
                                                                <div className="rounded-circle avatar-sm avatar bg-soft-success border border-soft-success">
                                                                    <i className="ri-download-line text-success"></i>
                                                                </div>
                                                            </OverlayTrigger>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>

                                    <Card className='mb-0'>
                                        <Card.Body className="p-3">
                                            <Form>
                                                <Form.Group className="mb-3">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <div className="position-relative">
                                                            <div className="bg-primary avatar-sm avatar rounded-circle text-white me-2 d-flex align-items-center justify-content-center">
                                                                <span className="fw-medium">U</span>
                                                            </div>
                                                            <Badge bg="success" className="position-absolute bottom-0 end-0 border border-white rounded-circle p-1">
                                                                <span className="visually-hidden">Online</span>
                                                            </Badge>
                                                        </div>
                                                        <div>
                                                            <small className="text-muted">From: <span className="text-dark fw-medium">user@example.com</span></small>
                                                            <OverlayTrigger
                                                                placement="top"
                                                                overlay={
                                                                    <Tooltip>
                                                                        <div className="text-start">
                                                                            <div><strong>Change sender</strong></div>
                                                                            <div className="text-muted">Click to select a different email address</div>
                                                                        </div>
                                                                    </Tooltip>
                                                                }
                                                            >
                                                                <Button variant="link" className="p-0 ms-2 text-muted" size="sm">
                                                                    <i className="ri-arrow-down-s-line"></i>
                                                                </Button>
                                                            </OverlayTrigger>
                                                        </div>
                                                        <div className="ms-auto">
                                                            <OverlayTrigger placement="top" overlay={<Tooltip>Minimize</Tooltip>}>
                                                                <Button variant="link" className="p-0 text-muted" size="sm">
                                                                    <i className="ri-subtract-line"></i>
                                                                </Button>
                                                            </OverlayTrigger>
                                                        </div>
                                                    </div>
                                                    <InputGroup className="mb-2">
                                                        <Form.Control placeholder="Subject: Re: {selectedEmail?.subject}" className="border bg-white" />
                                                    </InputGroup>
                                                    <Form.Control as="textarea" rows={4} placeholder="Type your reply here..." className="border rounded bg-white" />
                                                </Form.Group>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex flex-wrap gap-2">
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Attach files</Tooltip>}>
                                                            <Button variant="outline-secondary" className="d-flex align-items-center" size="sm"><i className="ri-attachment-2"></i></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Insert emoji</Tooltip>}>
                                                            <Button variant="outline-secondary" className="d-flex align-items-center" size="sm"><i className="ri-emotion-line me-1"></i></Button>
                                                        </OverlayTrigger>
                                                        <OverlayTrigger placement="top" overlay={<Tooltip>Insert images</Tooltip>}>
                                                            <Button variant="outline-secondary" className="d-flex align-items-center" size="sm"><i className="ri-image-line me-1"></i></Button>
                                                        </OverlayTrigger>

                                                        <Dropdown as={ButtonGroup}>
                                                            <Dropdown.Toggle variant="outline-secondary" size="sm" className="avatar avatar-sm" id="dropdown-more-options"><i className="ri-more-fill"></i></Dropdown.Toggle>
                                                            <Dropdown.Menu align="end">
                                                                <Dropdown.Item><i className="ri-text-wrap me-2"></i>Formatting options</Dropdown.Item>
                                                                <Dropdown.Item><i className="ri-file-line me-2"></i>Attach files from Drive</Dropdown.Item>
                                                                <Dropdown.Item><i className="ri-link me-2"></i>Insert link</Dropdown.Item>
                                                                <Dropdown.Divider />
                                                                <Dropdown.Item><i className="ri-draft-line me-2"></i>Save as draft</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <Button variant="outline-secondary" size="sm" className="me-2 d-flex align-items-center">
                                                            <i className="ri-delete-bin-line me-1"></i> Discard
                                                        </Button>
                                                        <Button variant="primary" size="sm" className="px-3 d-flex align-items-center">
                                                            <i className="ri-send-plane-line me-1"></i> Send
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Mobile Sidebar */}
                <Offcanvas show={sidebarOpen} onHide={() => setSidebarOpen(false)} placement="start" className="email-sidebar-offcanvas ">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Email</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="">
                        <EmailSidebar handleClose={() => setSidebarOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} setComposeOpen={setComposeOpen} />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            <Footer />
        </div>
    );
}
