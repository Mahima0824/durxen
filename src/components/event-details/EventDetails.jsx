import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Image, ProgressBar, ListGroup } from 'react-bootstrap';
import UpComingEventsMap from './UpComingEventsMap';
import PageTitle from '../layout/PageTitle';
import data from '../../data/events/events.json';

// Import images
import img1 from '../../images/card-img/card-img-1.jpg';
import img2 from '../../images/card-img/card-img-2.jpg';
import img3 from '../../images/card-img/card-img-3.jpg';
import img4 from '../../images/card-img/card-img-4.jpg';
import Footer from '../layout/Footer';

const images = {
  "img1": img1,
  "img2": img2,
  "img3": img3,
  "img4": img4
}

const EventDetails = () => {
  const { id } = useParams()
  const eventsData = data.eventsdata.events;
  const eventId = Number(id)
  const event = eventsData.find(e => e.id === eventId) || eventsData[0]
  const upcoming = eventsData.filter(e => e.id !== event.id)

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pageTitle="Event Details" pagePrTitle="Event" />
        <Container fluid >
          {/* Header */}
          <Row>
            <Col xl={8}>
              <Card className="overflow-hidden ">
                <div className="position-relative" >
                  <Image src={images[event.image]} alt={event.title} className="w-100 object-fit-cover" height={400} />
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{

                  }}></div>
                  <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-between p-4">

                    <div>
                      <Badge bg="gradient-primary" className="rounded-pill px-3 py-2 fw-semibold border-0">{event.category}</Badge>
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <h1 className="text-white mb-2 fw-bold">{event.title}</h1>
                        <div className="d-flex flex-wrap gap-3 text-white-50">
                          <span className="d-flex align-items-center"><i className="ri-map-pin-line me-1"></i> {event.location}</span>
                          <span className="d-flex align-items-center"><i className="ri-calendar-event-line me-1"></i> {event.datetime}</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end gap-2 mb-3">
                        <Button variant="secondary" size="sm" className="d-flex align-items-center gap-1"><i className="ri-share-line"></i> Share</Button>
                        <Button variant="danger" size="sm" className="d-flex align-items-center gap-1"><i className="ri-heart-line"></i> Save</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Card.Body>
                  <Row>
                    <Col xxl={6}>
                      <Card>
                        <Card.Body>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <h5 className="mb-0 fw-semibold d-flex align-items-center">
                              <i className="ri-ticket-2-line text-primary me-2"></i> Tickets Status
                            </h5>
                            <Badge bg={event.soldPct >= 80 ? 'success' : event.soldPct >= 50 ? 'primary' : 'warning'} className="px-2 py-1">
                              {event.soldPct}% Sold
                            </Badge>
                          </div>

                          <div className="mb-1">
                            <div className="d-flex justify-content-between mb-1">
                              <span className="small text-muted">Tickets Sold</span>
                              <span className="small fw-medium">{event.soldPct}%</span>
                            </div>
                            <ProgressBar now={event.soldPct} variant={event.soldPct >= 80 ? 'gradient-success' : event.soldPct >= 50 ? 'gradient-primary' : 'gradient-warning'} className="rounded-pill height-6" />
                          </div>

                          <div className=" small">
                            <div className="d-flex align-items-center">
                              <i className="ri-alarm-warning-line text-warning me-2 mt-1"></i>
                              <span className="small text-muted">Hurry! Only {event.ticketsLeft} tickets left at this price</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col lg={6} xxl={3}>
                      <Card>
                        <Card.Body>
                          <div className="d-flex align-items-center mb-3">
                            <div className="bg-soft-primary text-primary rounded-2 avatar avatar-md me-3">
                              <i className="ri-price-tag-3-line"></i>
                            </div>
                            <div>
                              <div className="text-muted small">Price starts from</div>
                              <h6 className="mb-0 fw-bold text-primary">${event.price}</h6>
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="bg-soft-success text-success rounded-2 avatar avatar-md me-3">
                              <i className="ri-group-line"></i>
                            </div>
                            <div>
                              <div className="text-muted small">Tickets Available</div>
                              <h6 className="mb-0 fw-bold">{event.ticketsLeft}</h6>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col lg={6} xxl={3}>
                      <Card>
                        <Card.Body className="d-flex flex-column">
                          <div className="text-center">
                            <Badge bg="primary" className="mb-2 px-3 py-2"><i className="ri-flashlight-fill me-1"></i> Limited Time Offer</Badge>
                            <h4 className="mb-1 fw-bold">${event.price}</h4>
                            <p className="text-muted small mb-2">Per person</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    <Col xxl={7}>
                      <Card>
                        <Card.Body>
                          <h5 className="mb-3 fw-semibold">About This Event</h5>
                          <div className="text-muted">
                            <p className="mb-3">Join us for an extraordinary experience that brings together industry leaders, innovators, and enthusiasts. This event is designed to inspire, educate, and connect professionals from around the globe.</p>

                            <h6 className="mt-4 mb-3 fw-semibold">What to Expect:</h6>
                            <ul className="list-unstyled">
                              <li className="mb-2">
                                <div className="d-flex">
                                  <i className="ri-checkbox-circle-fill text-success me-2 mt-1"></i>
                                  <span>Keynote presentations from industry experts</span>
                                </div>
                              </li>
                              <li className="mb-2">
                                <div className="d-flex">
                                  <i className="ri-checkbox-circle-fill text-success me-2 mt-1"></i>
                                  <span>Hands-on workshops and interactive sessions</span>
                                </div>
                              </li>
                              <li className="mb-2">
                                <div className="d-flex">
                                  <i className="ri-checkbox-circle-fill text-success me-2 mt-1"></i>
                                  <span>Networking opportunities with like-minded professionals</span>
                                </div>
                              </li>
                              <li className="mb-2">
                                <div className="d-flex">
                                  <i className="ri-checkbox-circle-fill text-success me-2 mt-1"></i>
                                  <span>Exclusive access to new products and services</span>
                                </div>
                              </li>
                            </ul>

                            <h6 className="mt-4 mb-3 fw-semibold">Additional Information</h6>
                            <p>Doors open 30 minutes before the event starts. Please bring your ticket (digital or printed) and a valid ID. Food and beverages will be available for purchase on-site.</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xxl={5}>
                      <Card>
                        <Card.Body>
                          <h5 className="mb-3 fw-semibold">Event Details</h5>
                          <ListGroup className="border-0 bg-transparent">
                            <ListGroup.Item className="px-0 py-3 border-0 bg-transparent">
                              <div className="d-flex">
                                <div className="bg-soft-primary text-primary rounded-circle d-flex align-items-center justify-content-center avatar avatar-md" >
                                  <i className="ri-calendar-2-line"></i>
                                </div>
                                <div className="ms-3">
                                  <div className="text-muted small">Date & Time</div>
                                  <div className="fw-semibold">{event.datetime}</div>
                                </div>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="px-0 py-3 border-0 bg-transparent">
                              <div className="d-flex">
                                <div className="bg-soft-success text-success rounded-circle d-flex align-items-center justify-content-center avatar avatar-md" >
                                  <i className="ri-map-pin-2-line"></i>
                                </div>
                                <div className="ms-3">
                                  <div className="text-muted small">Location</div>
                                  <div className="fw-semibold">{event.location}</div>
                                  <button className="btn btn-link p-0 text-primary small mt-1 d-inline-block text-decoration-none" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`, '_blank')}>
                                    View on map
                                  </button>
                                </div>
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="px-0 py-3 border-0 bg-transparent">
                              <div className="d-flex">
                                <div className="bg-soft-warning text-warning rounded-circle d-flex align-items-center justify-content-center avatar avatar-md" >
                                  <i className="ri-price-tag-3-line"></i>
                                </div>
                                <div className="ms-3">
                                  <div className="text-muted small">Category</div>
                                  <Badge bg="primary" className="rounded-pill px-3 py-1">{event.category}</Badge>
                                </div>
                              </div>
                            </ListGroup.Item>
                          </ListGroup>
                        </Card.Body>
                      </Card>

                      <Button variant="outline-primary" className="w-100 mb-3"><i className="ri-calendar-line me-2"></i> Add to Calendar</Button>
                      <Button variant="outline-secondary" className="w-100"><i className="ri-share-line me-2"></i> Share Event</Button>
                    </Col>
                  </Row>

                  <div className="d-flex flex-wrap mt-xxl-0 mt-4 gap-2">
                    <Button variant="gradient-primary"  ><i className="ri-shopping-bag-3-line me-1" />Buy Ticket</Button>
                    <Button as={Link} to="/event/event_list" variant="outline-primary">Back to Events</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Sidebar Info */}
            <Col xl={4}>
              <Card>
                <Card.Body>
                  <h5 className="mb-3 fw-semibold">Organizer</h5>
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className='bg-soft-primary text-primary rounded-circle d-flex align-items-center justify-content-center avatar avatar-xxl' >
                      <i className="ri-building-4-line fs-4"></i>
                    </div>
                    <div>
                      <h6 className="mb-0 fw-semibold">Durxen Events</h6>
                      <div className="text-muted small">Professional Event Organizer</div>
                      <div className="d-flex gap-2 mt-2">
                        <Button variant="outline-primary" size="sm" className="rounded-pill"><i className="ri-chat-1-line me-1"></i> Message</Button>
                        <Button variant="outline-secondary" size="sm" className="rounded-pill"><i className="ri-phone-line me-1"></i> Call</Button>
                      </div>
                    </div>
                  </div>
                  <div className="border-top pt-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="ri-mail-line text-muted me-2"></i>
                      <a href="mailto:contact@durxen.com" className="text-decoration-none">contact@durxen.com</a>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="ri-global-line text-muted me-2"></i>
                      <a href="https://durxen.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">www.durxen.com</a>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="ri-phone-line text-muted me-2"></i>
                      <a href="tel:+1234567890" className="text-decoration-none">+1 (234) 567-890</a>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <h5 className="mb-3 fw-semibold">Event Tags</h5>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge bg="light" text="dark" className="rounded-pill px-3 py-2 border"><i className="ri-group-line me-1"></i> Networking</Badge>
                    <Badge bg="light" text="dark" className="rounded-pill px-3 py-2 border"><i className="ri-lightbulb-line me-1"></i> Workshop</Badge>
                    <Badge bg="light" text="dark" className="rounded-pill px-3 py-2 border"><i className="ri-mic-line me-1"></i> Conference</Badge>
                    <Badge bg="light" text="dark" className="rounded-pill px-3 py-2 border"><i className="ri-calendar-todo-line me-1"></i> {event.category}</Badge>
                  </div>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0 fw-semibold">Location</h5>
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${event.location}`, '_blank')}>
                        <i className="ri-navigation-line me-1"></i> Get Directions
                      </Button>
                      <Button variant="outline-secondary" size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          // You might want to add a toast notification here
                        }}
                      >
                        <i className="ri-share-line me-1"></i> Share
                      </Button>
                    </div>
                  </div>
                  <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
                    <UpComingEventsMap
                      events={[{
                        name: event.title,
                        location: event.location,
                        date: event.date,
                        coordinates: [event.lat || 20.5937, event.lng || 78.9629] // Default to India center if no coords
                      }]}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Upcoming Events */}
          <Card>
            <Card.Body className='pb-0'>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                <div>
                  <h5 className="mb-1 fw-semibold">You might also like</h5>
                  <p className="text-muted mb-0">Check out these upcoming events you might be interested in</p>
                </div>
                <Button as={Link} to="/event/event_list" variant="outline-primary" className="mt-2 mt-md-0">View All Events <i className="ri-arrow-right-line ms-1"></i></Button>
              </div>
              <Row className="g-4">
                {upcoming.slice(0, 4).map(evt => (
                  <Col key={evt.id} xl={3} lg={6} md={6} sm={12}>
                    <Card className='overflow-hidden'>
                      <Link to={`/event/event_details?id=${evt.id}`} className="text-decoration-none text-reset">
                        <div className="position-relative">
                          <Image src={images[evt.image]} alt={evt.title} className="w-100 object-fit-cover " height={"160px"} />
                          <Badge bg="primary" className="position-absolute top-0 start-0 m-3" >{evt.category}</Badge>
                          <Badge pill bg="light" className="position-absolute bottom-0 end-0 m-3">${evt.price}</Badge>
                        </div>
                      </Link>
                      <Card.Body className="p-3">
                        <h6 className="mb-1 fw-semibold">
                          <Link to={`/event/event_details?id=${evt.id}`} className="text-decoration-none text-dark hover-text-primary">
                            {evt.title.length > 40 ? `${evt.title.substring(0, 40)}...` : evt.title}
                          </Link>
                        </h6>
                        <div className="d-flex flex-wrap gap-2 text-muted small mb-2">
                          <span className="d-flex align-items-center">
                            <i className="ri-map-pin-line me-1"></i> {evt.location.split(',')[0]}
                          </span>
                          <span className="d-flex align-items-center">
                            <i className="ri-calendar-event-line me-1"></i> {evt.datetime.split('—')[0].trim()}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1 me-3">
                            <div className="d-flex justify-content-between small text-muted mb-1">
                              <span>Tickets Sold</span>
                              <span className="fw-semibold text-dark">{evt.soldPct}%</span>
                            </div>
                            <ProgressBar now={evt.soldPct} variant={evt.soldPct >= 80 ? 'gradient-success' : evt.soldPct >= 50 ? 'gradient-primary' : 'gradient-warning'} className="mb-2 height-6"/>
                          </div>
                          <Button variant="outline-primary" size="sm" >
                            <i className="ri-add-line"></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <Footer />
    </div>
  )
}

export default EventDetails;
