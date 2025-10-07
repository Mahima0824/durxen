import React from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge, Image, OverlayTrigger, Tooltip, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../layout/PageTitle';
import img1 from '../../images/card-img/card-img-1.jpg';
import img2 from '../../images/card-img/card-img-2.jpg';
import img3 from '../../images/card-img/card-img-3.jpg';
import img4 from '../../images/card-img/card-img-4.jpg';
import Footer from '../layout/Footer';
import NewEventModal from './NewEventModal';
import data from '../../data/events/events.json';
const eventsData = data.eventsdata.events;

const EventList = () => {
  const [search, setSearch] = React.useState('')
  const [category, setCategory] = React.useState('all')
  const [viewMode, setViewMode] = React.useState('card')
  const [page, setPage] = React.useState(1)
  const [pageSize] = React.useState(5)
  const [total, setTotal] = React.useState(eventsData.length)
  const [showNewEventModal, setShowNewEventModal] = React.useState(false)
  const [events, setEvents] = React.useState(eventsData);

  const images = React.useMemo(() => ({
    img1,
    img2,
    img3,
    img4
  }), []);

  // Map events to include the actual image component
  const mappedEvents = React.useMemo(() =>
    events.map(event => {
      // Get the image key (e.g., 'img1', 'img2', etc.)
      const imageKey = event.image;
      const imageSrc = images[imageKey] || img1;

      return {
        ...event,
        image: imageSrc
      };
    }),
    [events, images]
  );

  const filtered = React.useMemo(() => {
    return mappedEvents.filter(e =>
      (category === 'all' || e.category === category) &&
      (e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, category, mappedEvents]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleAddEvent = (newEvent) => {
    const eventWithImage = {
      ...newEvent,
      image: images[newEvent.image] || img1
    };
    setEvents(prevEvents => [eventWithImage, ...prevEvents]);
    setTotal(prevTotal => prevTotal + 1);
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <PageTitle pageTitle="Event List" pagePrTitle="Event" />
        <Container fluid>
          {/* Toolbar: search + filters + view toggle */}
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-3 flex-grow-1">
                      <div className="" >
                        <InputGroup className="border rounded-3 overflow-hidden">
                          <InputGroup.Text className="bg-white border-0">
                            <i className="ri-search-line text-muted" />
                          </InputGroup.Text>
                          <Form.Control type="text" className="border-0" placeholder="Search events or location..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </InputGroup>
                      </div>

                    </div>
                    <div className="d-flex align-items-center flex-wrap  gap-2">
                      <div>
                        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                          <option value="all">All categories</option>
                          {[...new Set(eventsData.map(m => m.category))].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className="d-lg-flex d-none border rounded overflow-hidden">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Table View</Tooltip>}>
                          <Button variant={viewMode === 'table' ? 'primary' : 'light'} className="btn-icon rounded-0" onClick={() => setViewMode('table')}><i className="ri-table-line" /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Card View</Tooltip>}>
                          <Button variant={viewMode === 'card' ? 'primary' : 'light'} className="btn-icon rounded-0" onClick={() => setViewMode('card')}><i className="ri-layout-grid-line" /></Button>
                        </OverlayTrigger>
                      </div>
                      <Button variant="primary" className="d-flex align-items-center" onClick={() => setShowNewEventModal(true)}><i className="ri-add-line me-1" /> New Event</Button>
                    </div>
                  </div>
                  {/* List */}
                  {viewMode === 'table' ? (
                    <div className="d-lg-flex d-none flex-column gap-3">
                      {filtered.map(evt => (
                        <Card key={evt.id} className="overflow-hidden shadow-sm">
                          <Card.Body className="p-0">
                            <Row className="g-0">
                              {/* Thumbnail - Full width on mobile, then column on larger screens */}
                              <Col xs={12} md={3} lg={2} className="position-relative">
                                <div className="ratio ratio-16x9 h-100">
                                  <Image src={evt.image} alt={evt.title} className="object-fit-cover"/>
                                </div>
                                <Badge bg="primary" className="position-absolute top-0 m-2 start-0">{evt.category}</Badge>
                              </Col>

                              {/* Event Details */}
                              <Col xs={12} md={6} className="p-3">
                                <div className="d-flex flex-column h-100">
                                  <div className="mb-2">
                                    <Link to={`/event/event_details?id=${evt.id}`} className="text-decoration-none">
                                      <h5 className="fw-bold text-dark mb-1 text-truncate">{evt.title}</h5>
                                    </Link>
                                    <p className="text-muted small mb-2 d-none d-md-block">Top brands showcase latest gear. Demos, discounts & expert sessions.</p>
                                  </div>
                                  <div className="mt-auto">
                                    <div className="d-flex flex-wrap gap-2">
                                      <Badge pill bg="light" className="text-dark border d-flex align-items-center">
                                        <i className="ri-map-pin-line me-1 text-primary" />
                                        <span className="d-none d-sm-inline">{evt.location}</span>
                                        <span className="d-inline d-sm-none">Map</span>
                                      </Badge>
                                      <Badge pill bg="light" className="text-dark border d-flex align-items-center">
                                        <i className="ri-calendar-event-line me-1 text-primary" />
                                        <span className="d-none d-sm-inline">{evt.datetime}</span>
                                        <span className="d-inline d-sm-none">Date</span>
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </Col>

                              {/* Tickets - Stack on mobile, side by side on larger screens */}
                              <Col xs={6} md={3} lg={2} className="border-top border-md-top-0 border-md-start d-flex align-items-center p-3">
                                <div className="text-center w-100">
                                  <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-2">
                                    <div className="avatar avatar-lg rounded-circle bg-soft-danger text-danger " >
                                      <i className="ri-ticket-2-line fs-5" />
                                    </div>
                                    <div>
                                      <h5 className="fw-bold mb-0">{evt.ticketsLeft}</h5>
                                      <small className="text-muted">Tickets Left</small>
                                    </div>
                                  </div>
                                </div>
                              </Col>

                              {/* Price - Full width on mobile, auto on larger screens */}
                              <Col xs={6} md={3} lg={2} className="bg-soft-primary d-flex align-items-center p-3">
                                <div className="text-center w-100">
                                  <small className="text-muted d-block mb-1">
                                    <i className="ri-price-tag-3-line me-1" /> Starting at
                                  </small>
                                  <div className="d-flex flex-column flex-md-row align-items-baseline justify-content-center gap-1">
                                    <span className="h5 fw-bold text-primary mb-0">${evt.price}</span>
                                    <small className="text-muted text-decoration-line-through">${Math.ceil(evt.price * 1.2)}</small>
                                  </div>
                                  <Badge bg="success" className="rounded-pill mt-1 d-inline-flex align-items-center">
                                    <i className="ri-arrow-down-line me-1" />20%
                                  </Badge>
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Row>
                      {filtered.map(evt => (
                        <Col key={evt.id} lg={4} md={6} sm={12}>
                          <Card className="overflow-hidden">
                            {/* Thumbnail with Category Badge */}
                            <div className="position-relative">
                              <Link to={`/event/event_details?id=${evt.id}`} className="text-decoration-none text-reset">
                                <div className="ratio ratio-16x9">
                                  <Image src={evt.image} alt={evt.title} className="object-fit-cover"/>
                                </div>
                                <div className="position-absolute top-0 start-0 m-2" >
                                  <Badge bg="primary" >{evt.category}</Badge>
                                </div>
                              </Link>
                            </div>

                            {/* Content */}
                            <Card.Body className="p-4 d-flex flex-column">
                              {/* Header with Title and Price */}
                              <div className='d-flex justify-content-between align-items-start mb-3'>
                                <h5 className="fw-bold mb-0 flex-grow-1 pe-2">
                                  <Link to={`/event/event_details?id=${evt.id}`} className="text-decoration-none text-dark hover-text-primary">{evt.title}</Link>
                                </h5>
                              </div>

                              {/* Location & Date */}
                              <div className="d-flex flex-column gap-2 small text-muted mb-3">
                                <div className="d-flex align-items-center">
                                  <i className="ri-map-pin-line me-2 text-primary" />
                                  <span>{evt.location}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <i className="ri-calendar-event-line me-2 text-danger" />
                                  <span>{evt.datetime}</span>
                                </div>
                              </div>

                              {/* Tickets & Price Section */}
                              <div className="mt-auto pt-3 border-top">
                                <div className="d-flex align-items-center justify-content-between">
                                  {/* Tickets Left */}
                                  <div className="d-flex align-items-center gap-3">
                                    <div className="position-relative">
                                      <div className="avatar avatar-lg rounded-circle bg-soft-danger text-danger" >
                                        <i className="ri-ticket-2-line" />
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="fw-bold mb-0">{evt.ticketsLeft}</h6>
                                      <small className="text-muted">Tickets Left</small>
                                    </div>
                                  </div>

                                  {/* Price */}
                                  <div className="text-end">
                                    <div className="d-flex align-items-baseline justify-content-end">
                                      <span className="h5 fw-bold text-primary mb-0">${evt.price}</span>
                                      <small className="text-muted ms-2 text-decoration-line-through">${Math.ceil(evt.price * 1.2)}</small>
                                    </div>
                                    {evt.ticketsLeft < 20 && (
                                      <Badge bg="danger" pill className="mt-1"><i className="ri-flashlight-fill me-1" />Selling Fast!</Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}

                  {/* Pagination */}
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-centergap-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="text-muted small">
                        Showing <strong className="text-primary">{page * pageSize + 1}</strong> to{' '}
                        <strong className="text-primary">
                          {Math.min(
                            (page + 1) * pageSize,
                            total
                          )}
                        </strong>{' '}
                        of <strong>{total}</strong> entries
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Pagination className="mb-0">
                        <Pagination.First className="border-0" />
                        <Pagination.Prev className="border-0" />
                        {Array.from({ length: Math.min(5, Math.ceil(total / pageSize)) }).map((_, i) => {
                          const pageNum = Math.max(0, Math.min(
                            Math.ceil(total / pageSize) - 5,
                            page - 2
                          )) + i;
                          if (pageNum >= 0 && pageNum < Math.ceil(total / pageSize)) {

                            return (
                              <Pagination.Item key={pageNum} active={page === pageNum} onClick={() => handlePageChange(pageNum)} className="border-0">{pageNum + 1}</Pagination.Item>
                            );
                          }
                          return null;
                        })}
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page >= Math.ceil(total / pageSize) - 1} className="border-0" />
                        <Pagination.Last onClick={() => handlePageChange(Math.ceil(total / pageSize) - 1)} disabled={page >= Math.ceil(total / pageSize) - 1} className="border-0" />
                      </Pagination>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />

      <NewEventModal show={showNewEventModal} onHide={() => setShowNewEventModal(false)} onSave={handleAddEvent}/>
    </div>
  )
}

export default EventList;
