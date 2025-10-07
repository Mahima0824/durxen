import React, { useState, useRef } from 'react';
import PageTitle from '../layout/PageTitle';
import { Container, Row, Col, Button, Modal, Form, Card, Badge, ProgressBar } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import Flatpickr from 'react-flatpickr';
import { format } from 'date-fns';
import 'flatpickr/dist/themes/light.css';
import 'flatpickr/dist/flatpickr.min.css';
import Footer from '../layout/Footer';

const Calender = () => {
  // Event types configuration
  const eventTypes = {
    work: {
      label: 'Work',
      icon: 'bi-briefcase',
      bgColor: 'primary',
      textColor: 'white'
    },
    leave: {
      label: 'Leave',
      icon: 'bi-calendar-event',
      bgColor: 'success',
      textColor: 'white'
    },
    deadline: {
      label: 'Deadline',
      icon: 'bi-calendar-check',
      bgColor: 'danger',
      textColor: 'white'
    },
    personal: {
      label: 'Personal',
      icon: 'bi-person',
      bgColor: 'purple',
      textColor: 'white'
    },
    training: {
      label: 'Training',
      icon: 'bi-journal-bookmark',
      bgColor: 'warning',
      textColor: 'dark'
    },
    holiday: {
      label: 'Holiday',
      icon: 'bi-umbrella',
      bgColor: 'indigo',
      textColor: 'white'
    }
  };

  // Sample events with different types
  const [events, setEvents] = useState([

    {
      id: '1',
      title: 'Project Deadline',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      end: new Date(new Date().setDate(new Date().getDate() + 1)),
      allDay: true,
      backgroundColor: `var(--bs-${eventTypes.deadline.bgColor})`,
      borderColor: `var(--bs-${eventTypes.deadline.bgColor})`,
      className: `event-${eventTypes.deadline.bgColor}`,
      extendedProps: {
        type: 'deadline',
        description: 'Submit final project deliverables',
        status: 'pending',
        priority: 'high'
      }
    },
    {
      id: '2',
      title: 'Vacation',
      start: new Date(new Date().setDate(new Date().getDate() + 3)),
      end: new Date(new Date().setDate(new Date().getDate() + 7)),
      allDay: true,
      backgroundColor: `var(--bs-${eventTypes.leave.bgColor})`,
      borderColor: `var(--bs-${eventTypes.leave.bgColor})`,
      className: `event-${eventTypes.leave.bgColor}`,
      extendedProps: {
        type: 'leave',
        description: 'Summer vacation with family',
        status: 'approved',
        displayEnd: new Date(new Date().setDate(new Date().getDate() + 8)).toISOString().split('T')[0]
      }
    },
    {
      id: '3',
      title: 'React Workshop',
      start: new Date(new Date().setDate(new Date().getDate() + 2, 14, 0)),
      end: new Date(new Date().setDate(new Date().getDate() + 2, 17, 0)),
      backgroundColor: `var(--bs-${eventTypes.training.bgColor})`,
      borderColor: `var(--bs-${eventTypes.training.bgColor})`,
      className: `event-${eventTypes.training.bgColor}`,
      extendedProps: {
        type: 'training',
        description: 'Advanced React patterns and best practices',
        status: 'confirmed',
        trainer: 'Alex Johnson',
        capacity: 20
      }
    },
    {
      id: '4',
      title: 'Public Holiday',
      start: new Date(new Date().setDate(new Date().getDate() + 10)),
      end: new Date(new Date().setDate(new Date().getDate() + 10)),
      allDay: true,
      backgroundColor: `var(--bs-${eventTypes.holiday.bgColor})`,
      borderColor: `var(--bs-${eventTypes.holiday.bgColor})`,
      className: `event-${eventTypes.holiday.bgColor}`,
      extendedProps: {
        type: 'holiday',
        description: 'National Holiday - Office Closed',
        status: 'confirmed',
        recurring: 'yearly'
      }
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('work');
  const [eventColor, setEventColor] = useState('primary');
  const [leaveBalance] = useState(15);
  const [usedLeaves, setUsedLeaves] = useState(5);
  const [eventStatus, setEventStatus] = useState('pending');
  const [eventDescription, setEventDescription] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const calendarRef = useRef(null);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setShowModal(true);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    const eventData = events.find(e => e.id === event.id);

    if (eventData) {
      setCurrentEventId(event.id);
      setEventTitle(event.title);
      setEventType(eventData.extendedProps.type);
      setEventStatus(eventData.extendedProps.status);
      setEventDescription(eventData.extendedProps.description);
      setEventColor(eventData.extendedProps.color || 'primary');
      setSelectedDate(new Date(event.start));
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventTitle) return;

    const isLeave = eventType === 'leave';
    const eventData = {
      id: isEditing ? currentEventId : Date.now().toString(),
      title: eventTitle,
      start: selectedDate,
      end: isLeave ?
        new Date(new Date(selectedDate).setHours(23, 59, 59)) :
        new Date(selectedDate.getTime() + 60 * 60 * 1000), // 1 hour later for work events
      allDay: isLeave,
      backgroundColor: isLeave ? 'var(--bs-success)' : `var(--bs-${eventColor})`,
      borderColor: isLeave ? 'var(--bs-success)' : `var(--bs-${eventColor})`,
      className: isLeave ? 'event-leave' : `event-${eventColor}`,
      extendedProps: {
        description: eventDescription,
        type: eventType,
        status: eventStatus,
        color: isLeave ? 'success' : eventColor
      }
    };

    if (isEditing) {
      // Update existing event
      setEvents(events.map(event =>
        event.id === currentEventId ? eventData : event
      ));
    } else {
      // Add new event
      setEvents([...events, eventData]);
      if (isLeave) {
        setUsedLeaves(prev => prev + 1);
      }
    }

    // Reset form
    setShowModal(false);
    setEventTitle('');
    setEventDescription('');
    setEventType('work');
    setIsEditing(false);
    setCurrentEventId(null);
  };

  const handleDeleteEvent = () => {
    if (currentEventId) {
      setEvents(events.filter(event => event.id !== currentEventId));
      setShowModal(false);
      setShowDeleteModal(false);
      setEventTitle('');
      setEventDescription('');
      setEventType('work');
      setIsEditing(false);
      setCurrentEventId(null);
      setEventToDelete(null);
    }
  };

  const confirmDelete = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  // Calculate event statistics
  const eventStats = events.reduce((acc, event) => {
    const type = event.extendedProps.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, { work: 0, leave: 0 });

  const leavePercentage = Math.min(100, (usedLeaves / leaveBalance) * 100);

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="Apps" pageTitle="Calendar" />
        <Container fluid className="calendar-container">
          <Row>
            {/* Calendar */}
            <Col lg={9}>
              <Card>
                <Card.Body>
                  <Card.Title className='mb-4'>Event Calendar</Card.Title>
                  <div className="calendar-container">
                    <FullCalendar
                      ref={calendarRef}
                      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
                      initialView="dayGridMonth"
                      headerToolbar={{
                        start: 'prev,next',
                        center: 'title',
                        end: 'today dayGridMonth,timeGridWeek,timeGridDay'
                      }}
                      themeSystem='bootstrap5'
                      events={events}
                      nowIndicator={true}
                      editable={true}
                      selectMirror={true}
                      dayMaxEvents={true}
                      weekends={true}
                      dateClick={handleDateClick}
                      eventClick={handleEventClick}
                      eventContent={(arg) => {
                        // For leave events, show the date range in the tooltip
                        let tooltip = arg.event.title;
                        if (arg.event.extendedProps.type === 'leave' && arg.event.extendedProps.displayEnd) {
                          const startDate = format(arg.event.start, 'MMM d');
                          const endDate = format(new Date(arg.event.extendedProps.displayEnd), 'MMM d');
                          tooltip = `${arg.event.title} (${startDate} - ${endDate})`;
                        }

                        return (
                          <div className="fc-event-main" title={tooltip}>
                            <i className={`bi ${arg.event.extendedProps.type === 'work' ? 'bi-briefcase' : 'bi-calendar-event'} me-1`}></i>
                            <span className="fc-event-time">{!arg.event.allDay && format(arg.event.start, 'HH:mm')}</span>
                            <span className="fc-event-title">{arg.event.title}</span>
                          </div>
                        );
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* Sidebar */}
            <Col lg={3} className="">
              <Card>
                <Card.Body className="d-flex flex-column p-3">
                  {/* Add Event Button */}
                  <Button variant="primary" className="w-100 mb-4 " onClick={() => {
                    setSelectedDate(new Date());
                    setShowModal(true);
                  }}>
                    <i className="bi bi-plus-lg me-2"></i>
                    <span>Add Event</span>
                  </Button>

                  {/* Event Stats */}
                  <div className="bg-light rounded-3 p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0 text-uppercase text-muted small fw-bold">Events Summary</h6>
                      <Badge bg="light" text="dark" className="px-2 py-1">{events.length} Total</Badge>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                          <i className="bi bi-briefcase-fill text-primary"></i>
                        </div>
                        <span className="small">Work</span>
                      </div>
                      <Badge bg="primary" className="px-2 py-1">{eventStats.work || 0}</Badge>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="bg-success bg-opacity-10 p-2 rounded-circle me-2">
                          <i className="bi bi-calendar-check-fill text-success"></i>
                        </div>
                        <span className="small">Leave</span>
                      </div>
                      <Badge bg="success" className="px-2 py-1">{eventStats.leave || 0}</Badge>
                    </div>
                  </div>

                  {/* Leave Balance */}
                  <div className="bg-light rounded-3 p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-1 text-uppercase text-muted small fw-bold">Leave Balance</h6>
                      <span className="small fw-bold">
                        <span className="text-success">{leaveBalance - usedLeaves}</span> / {leaveBalance} days
                      </span>
                    </div>
                    <ProgressBar now={leavePercentage} variant="success" className="mb-2" style={{ height: '6px' }} />
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">
                        <i className="bi bi-calendar-week me-1"></i>
                        {usedLeaves} days used
                      </small>
                      <small className="text-muted">
                        {Math.round(leavePercentage)}% utilized
                      </small>
                    </div>
                  </div>

                </Card.Body>
                {/* Upcoming Events */}
                <Card.Footer className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0 text-uppercase text-muted small fw-bold">Upcoming</h6>
                    <Badge bg="light" text="muted" className="px-2 py-1">{events.filter(e => new Date(e.start) > new Date()).length}</Badge>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    {events
                      .filter(event => new Date(event.start) > new Date())
                      .sort((a, b) => new Date(a.start) - new Date(b.start))
                      .slice(0, 3)
                      .map(event => (
                        <div className="d-flex align-items-center p-2 rounded-3 hover-bg-light transition-all" key={event.id} onClick={() => handleEventClick({ event })} style={{ cursor: 'pointer' }}>
                          <div className={`p-2 rounded-3 me-3 ${event.extendedProps.type === 'work' ? 'bg-primary bg-opacity-10' : 'bg-success bg-opacity-10'}`}>
                            <i className={`bi ${event.extendedProps.type === 'work' ? 'bi-briefcase-fill text-primary' : 'bi-calendar-check-fill text-success'}`}></i>
                          </div>
                          <div className="flex-grow-1">
                            <div className="fw-medium text-truncate">{event.title}</div>
                            <small className="text-muted d-flex align-items-center">
                              <i className="bi bi-calendar3 me-1"></i>
                              {new Date(event.start).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
                            </small>
                          </div>
                          <i className="bi bi-chevron-right text-muted ms-2"></i>
                        </div>
                      ))}

                    {events.filter(e => new Date(e.start) > new Date()).length === 0 && (
                      <div className="text-center py-3 text-muted">
                        <i className="bi bi-calendar-x fs-4 d-block mb-2"></i>
                        <span className="small">No upcoming events</span>
                      </div>
                    )}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          {/* Add/Edit Event Modal */}
          <Modal show={showModal} onHide={() => { setShowModal(false); setIsEditing(false); setCurrentEventId(null); setEventTitle(''); setEventDescription(''); setEventType('work'); }} centered>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? 'Edit Event' : 'Add New Event'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter event title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Event Type</Form.Label>
                  <Form.Control type="text" placeholder="Event Type" value={eventType} onChange={(e) => setEventType(e.target.value)} required />
                </Form.Group>

                {eventType !== 'leave' && (
                  <Form.Group className="mb-3">
                    <Form.Label>Event Color</Form.Label>
                    <div className="d-flex flex-wrap gap-2">
                      {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'].map(color => (
                        <div key={color} className={`color-option avatar avatar-xs rounded-circle bg-${color}`} onClick={() => setEventColor(color)} title={color.charAt(0).toUpperCase() + color.slice(1)}>
                          {eventColor === color && <i className="bi bi-check text-white"></i>}
                        </div>
                      ))}
                    </div>
                  </Form.Group>
                )}

                {eventType === 'leave' && (
                  <Form.Group className="mb-3">
                    <Form.Label>Event Status</Form.Label>
                    <Form.Select value={eventStatus} onChange={(e) => setEventStatus(e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </Form.Select>
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Date & Time</Form.Label>
                  <Flatpickr
                    value={selectedDate}
                    onChange={([date]) => setSelectedDate(date)}
                    options={{
                      enableTime: true,
                      dateFormat: 'Y-m-d H:i',
                      minDate: 'today',
                      time_24hr: true,
                      disableMobile: true
                    }}
                    className="form-control"
                    placeholder="Select date and time"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description (Optional)</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter event description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer className="justify-content-between">
                <div>
                  {isEditing && (
                    <Button variant="outline-danger" onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(events.find(evt => evt.id === currentEventId));
                    }} className="me-2">
                      <i className="bi bi-trash me-1"></i> Delete
                    </Button>
                  )}
                </div>
                <div>
                  <Button variant="outline-secondary" onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setCurrentEventId(null);
                  }} className="me-2">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">{isEditing ? 'Update' : 'Save'} Event</Button>
                </div>
              </Modal.Footer>
            </Form>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title className="fw-bold">Delete Event</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-4">
              <div className="text-center mb-4">
                <div className="bg-danger bg-opacity-10 d-inline-flex p-3 rounded-circle mb-3">
                  <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                </div>
                <h5>Are you sure?</h5>
                <p className="text-muted mb-0">This will permanently delete the event "{eventToDelete?.title}" from the calendar.</p>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-0 pt-0">
              <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)} className="px-4">Cancel</Button>
              <Button variant="danger" onClick={handleDeleteEvent} className="px-4"><i className="bi bi-trash me-1"></i> Delete Event</Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Calender;
