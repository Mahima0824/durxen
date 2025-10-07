import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar, Image, CardTitle } from 'react-bootstrap';
import Footer from '../layout/Footer';
import EventMap from '../events/EventMap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Calender from '../events/Calender';
import PageTitle from '../layout/PageTitle';
import ReactApexChart from 'react-apexcharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SimpleBar from 'simplebar-react';
import data from '../../data/dashboard/event.json';
// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Sample event data with coordinates for the map
/**
 * Events page
 *
 * This page displays a variety of event-related data, including statistics, a map of event locations, and a list of upcoming events.
 *
 * @return {ReactElement} The Events page
 */
const Events = () => {
    const eventsData = data.event.eventdata;
    const chartInstance = useRef(null);
    const cardData = data.event.cardData;
    const chartSeries = data.event.chartData.series;

    // Clean up chart on unmount
    useEffect(() => {
        const chartRef = chartInstance.current;

        return () => {
            if (chartRef) {
                try {
                    chartRef.destroy();
                } catch (error) {
                }
            }
        };
    }, []);


    // Chart data and options
    const chartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
            fontFamily: 'Nunito, sans-serif',
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
                borderRadius: 4,
                borderRadiusApplication: 'end',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 4,
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500,
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500,
                },
            },
        },
        fill: {
            opacity: 1,
        },
        colors: ['#4e73df', '#1cc88a', '#36b9cc'],
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontSize: '12px',
            markers: {
                width: 8,
                height: 8,
                radius: 4,
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + " events";
                }
            }
        }
    };

    return (
        <div className='page-wrapper'>
            <div className='page-content'>
                <PageTitle pagePrTitle="Events" pageTitle="Events" />
                <Container fluid>
                    <Row>
                        <Col xl={12} xxl={6}>
                            <Row>
                                {[
                                    {
                                        title: "Total Event",
                                        value: 32,
                                        icon: "bi-calendar3",
                                        change: "+8%",
                                        changeText: "vs last month",
                                        changeType: "up",
                                    },
                                    {
                                        title: "Ticket Sold",
                                        value: 68,
                                        icon: "bi-ticket-perforated",
                                        change: "-8%",
                                        changeText: "vs last month",
                                        changeType: "down",
                                    },
                                    {
                                        title: "Upcoming Events",
                                        value: 28,
                                        icon: "bi-camera-reels",
                                        change: "-8%",
                                        changeText: "vs last month",
                                        changeType: "down",
                                    },
                                ].map((item, index) => (
                                    <Col key={index} sm={6} lg={4}>
                                        <Card>
                                            <Card.Body>
                                                <div className={`mb-3 avatar avatar-md  bg-gradient-primary rounded`}>
                                                    <i className={`bi ${item.icon}  text-white`}></i>
                                                </div>
                                                <h3 className="fw-bold text-dark mb-1">{item.value}</h3>
                                                <p className="mb-0 text-muted">{item.title}</p>
                                                <div className="">
                                                    <small className={`d-inline-flex align-items-center fw-semibold ${item.changeType === "up" ? "text-success" : "text-danger"}`}>
                                                        <i className={`bi bi-arrow-${item.changeType === "up" ? "up" : "down"} me-1`}></i>
                                                        {item.change}
                                                    </small>
                                                    <small className="text-muted mb-0 ms-2">{item.changeText}</small>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                                <Col xs={12}>
                                    <Card>
                                        <Card.Body>
                                            <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-2'>
                                                <CardTitle className='mb-0'>Event Statistics</CardTitle>
                                                <Form.Select size="sm" style={{ width: 'auto' }}>
                                                    <option>This Year</option>
                                                    <option>Last Year</option>
                                                    <option>All Time</option>
                                                </Form.Select>
                                            </div>
                                            <div id="event-chart">
                                                <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={300} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={4} xxl={3}>
                            <Row>
                                {cardData.map((item, idx) => (
                                    <Col sm={6} lg={12} key={idx}>
                                        <Card key={idx} className={`bg-soft-${item.variant} card-hover-vertical`}>
                                            <Card.Body>
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className={`bg-soft-${item.variant} avatar avatar-lg rounded-circle me-3 d-flex align-items-center justify-content-center`}>
                                                        <i className={`bi ${item.icon} fs-4 text-${item.variant}`}></i>
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-0 fw-semibold">{item.value}</h5>
                                                        <span className="text-muted small">{item.title}</span>
                                                    </div>
                                                </div>
                                                <ProgressBar variant={`gradient-${item.variant}`} now={item.progress} animated style={{ height: '6px' }} className='bg-dark bg-opacity-10' />
                                                <div className="d-flex justify-content-between mt-2">
                                                    <small className="text-muted">{item.text}</small>
                                                    <small className={`text-${item.variant} fw-semibold`}>{item.subtext}</small>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col lg={8} xxl={3}>
                            <Card>
                                <Card.Body>
                                    <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-3'>
                                        <CardTitle className='mb-0'>Event Summary</CardTitle>
                                        <Button variant="soft-primary" size="sm">View All</Button>
                                    </div>

                                    {/* Stats Row */}
                                    <Row>
                                        <Col xs={6}>
                                            <Card className="text-center">
                                                <Card.Body className="p-3">
                                                    <h3 className="text-primary mb-1">24</h3>
                                                    <small className="text-muted">Total Events</small>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={6}>
                                            <Card className="text-center">
                                                <Card.Body className="p-3">
                                                    <h3 className="text-success mb-1">18</h3>
                                                    <small className="text-muted">Active</small>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={6}>
                                            <Card className="text-center">
                                                <Card.Body className="p-3">
                                                    <h3 className="text-warning mb-1">5</h3>
                                                    <small className="text-muted">Upcoming</small>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={6}>
                                            <Card className="text-center">
                                                <Card.Body className="p-3">
                                                    <h3 className="text-danger mb-1">1</h3>
                                                    <small className="text-muted">Cancelled</small>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                    {/* Upcoming Events */}
                                    <CardTitle className='mb-3'>Upcoming Events</CardTitle>
                                    <SimpleBar style={{ maxHeight: 244 }}>
                                        <div className="upcoming-events">
                                            {[1, 2, 3, 4].map((event, index) => (
                                                <div key={index} className="d-flex align-items-center mb-3">
                                                    <div className="event-date me-3 text-center">
                                                        <div className="fw-bold">28</div>
                                                        <small className="text-muted fs-12">JUL</small>
                                                    </div>
                                                    <div className="flex-grow-1 me-3">
                                                        <h6 className="mb-0">Tech Conference 2023</h6>
                                                        <small className="text-muted fs-12">10:00 AM - 5:00 PM</small>
                                                    </div>
                                                    <Button variant="outline-primary" size="sm"><i className="bi bi-arrow-right"></i></Button>
                                                </div>
                                            ))}
                                        </div>
                                    </SimpleBar>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xxl={6}>
                            <Row>
                                <Col xs={12}>
                                    <Card className='overflow-hidden'>
                                        <Card.Body>
                                            <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-4'>
                                                <CardTitle className='mb-0'>Events</CardTitle>
                                                <Button variant="soft-primary" size="sm" ><i className="bi bi-plus"></i> Create Event</Button>
                                            </div>
                                            <Row>
                                                <Col md={6}>
                                                    <Card className="card-hover position-relative">
                                                        <Card.Body className='card-hover-rotate bg-white rounded d-flex border justify-content-between'>
                                                            <div>
                                                                <h6 className="mb-1 fw-semibold">Future of AI</h6>
                                                                <div className="text-muted small mb-2">May 5, 2023 • 5:00 PM</div>
                                                                <div className="d-flex align-items-center">
                                                                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                                                                    <span className="small">Berlin, DE</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-end">
                                                                <div className="fw-bold text-dark">$75</div>
                                                                <small className="text-muted">/ticket</small>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>

                                                    {/* Event Item 2 */}
                                                    <Card className="card-hover position-relative mb-3">
                                                        <Card.Body className="card-hover-rotate bg-white rounded d-flex border justify-content-between">
                                                            <div>
                                                                <h6 className="mb-1 fw-semibold">City Jazz Live</h6>
                                                                <div className="text-muted small mb-2">May 5, 2023 • 8:00 PM</div>
                                                                <div className="d-flex align-items-center">
                                                                    <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                                                                    <span className="small">New York, US</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-end">
                                                                <div className="fw-bold text-dark">$60</div>
                                                                <small className="text-muted">/ticket</small>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>

                                                {/* Right: Map */}
                                                <Col md={6} className=" position-relative">
                                                    <MapContainer center={[52.52, 13.405]} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false} scrollWheelZoom={false}>
                                                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/">CARTO</a>' />
                                                        <Marker position={[52.52, 13.405]}>
                                                            <Popup>  <div className="" style={{ width: '240px' }}>
                                                                <div className="d-flex align-items-center mb-2">
                                                                    <div className="bg-primary bg-opacity-10 p-2 rounded me-2">
                                                                        <i className="bi bi-calendar3 text-primary"></i>
                                                                    </div>
                                                                    <div>
                                                                        <h6 className="mb-0 fw-semibold">Future of AI</h6>
                                                                        <small className="text-muted">Berlin, DE</small>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-between align-items-center mt-3">
                                                                    <div>
                                                                        <div className="text-muted small">Price</div>
                                                                        <div className="fw-semibold">$75 / ticket</div>
                                                                    </div>
                                                                    <Button variant="primary" size="sm" className="rounded-pill px-3">Book Now</Button>
                                                                </div>
                                                            </div></Popup>
                                                        </Marker>
                                                    </MapContainer>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} xxl={3}>
                            <Card >
                                <Card.Body>
                                    <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-4'>
                                        <CardTitle className='mb-0'>Event Engagement</CardTitle>
                                        <Button variant="link" size="sm" className="text-muted p-0">See Report</Button>
                                    </div>
                                    <Calender />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xxl={3}>
                            <Card>
                                <Card.Body>
                                    <CardTitle className='mb-3'>Event Categories</CardTitle>
                                    {/* Category List */}
                                    <div className="category-list">
                                        {[
                                            { name: 'All Events', count: 48, active: true },
                                            { name: 'Conferences', count: 12 },
                                            { name: 'Workshops', count: 8 },
                                            { name: 'Seminars', count: 6 },
                                            { name: 'Webinars', count: 15 },
                                            { name: 'Networking', count: 7 },
                                            { name: 'Exhibitions', count: 10 },
                                        ].map((category, index) => (
                                            <div
                                                key={index}
                                                className={`d-flex justify-content-between align-items-center p-2 rounded-2 mb-1 ${category.active ? 'bg-light-primary' : 'hover-bg-light'}`}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className="category-dot bg-primary me-2" style={{ width: '8px', height: '8px', borderRadius: '50%', }}></div>
                                                    <span className={category.active ? 'fw-bold text-primary' : ''}>{category.name}</span>
                                                </div>
                                                <span className={`badge ${category.active ? 'bg-primary' : 'bg-light text-dark'}`}>{category.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <Card.Body className=" overflow-hidden">
                                    <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-2'>
                                        <CardTitle className='mb-0'>Events Insights</CardTitle>
                                        <Button variant="soft-primary" size="sm">Explore Analytics</Button>
                                    </div>
                                    <Row className='odd-border'>
                                        {[
                                            { title: 'Avg. Session Duration', value: '45 mins', icon: 'bi-clock-history', color: 'info', trend: 'up', trendValue: '5%' },
                                            { title: 'Peak Attendance Time', value: '3:00 PM', icon: 'bi-graph-up-arrow', color: 'primary', trend: 'up', trendValue: '7%' },
                                            { title: 'Most Popular Topic', value: 'AI in Education', icon: 'bi-lightbulb', color: 'success', trend: 'up', trendValue: '12%' },
                                            { title: 'Sponsorship Deals', value: '14', icon: 'bi-briefcase', color: 'warning', trend: 'up', trendValue: '3%' },
                                            { title: 'Social Shares', value: '2.1K', icon: 'bi-share-fill', color: 'secondary', trend: 'up', trendValue: '25%' },
                                            { title: 'Ticket Conversion Rate', value: '18.6%', icon: 'bi-bar-chart-line', color: 'danger', trend: 'down', trendValue: '1.2%' },
                                        ].map((stat, idx) => (
                                            <Col key={idx} md={6}>
                                                <div className="p-4">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <div className={`bg-soft-${stat.color} avatar avatar-lg rounded me-3`}>
                                                            <i className={`bi ${stat.icon} text-${stat.color} `}></i>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0 fw-bold">{stat.value}</h6>
                                                            <small className="text-muted fs-12 lh-1">{stat.title}</small>
                                                        </div>
                                                    </div>
                                                    <div className={`d-flex align-items-center text-${stat.trend === 'up' ? 'success' : 'danger'}`}>
                                                        <i className={`bi bi-arrow-${stat.trend}-right me-1`}></i>
                                                        <small>{stat.trendValue} from last month</small>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={6}>
                            <Card>
                                <Card.Body>
                                    <CardTitle>Event Locations</CardTitle>
                                    <EventMap events={eventsData} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={6} xxl={3}>
                            <Card>
                                <Card.Body>
                                    <CardTitle className='mb-4'>Top Highlights</CardTitle>
                                    <ul className="list-unstyled mb-0">
                                        <li className="d-flex align-items-center border-bottom pb-3 mb-3">
                                            <div className="avatar-soft-primary avatar avatar-lg rounded-circle me-3">
                                                <i className="bi bi-person-circle fs-4"></i>
                                            </div>
                                            <div>
                                                <strong>Most Engaged Attendee:</strong><br />
                                                <small>Alice Johnson (12 sessions)</small>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-center border-bottom pb-3 mb-3">
                                            <div className="avatar-soft-success avatar avatar-lg rounded-circle me-3">
                                                <i className="bi bi-globe2 fs-4"></i>
                                            </div>
                                            <div>
                                                <strong>Top Attending Country:</strong><br />
                                                <small>India (28% attendees)</small>
                                            </div>
                                        </li>
                                        <li className="d-flex align-items-center">
                                            <div className="avatar-soft-info avatar avatar-lg rounded-circle me-3">
                                                <i className="bi bi-award fs-4"></i>
                                            </div>
                                            <div>
                                                <strong>Highest Rated Event:</strong><br />
                                                <small>“Future of Tech” – 4.9★</small>
                                            </div>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={6} xxl={3}>
                            <Card>
                                <Card.Body>
                                    <CardTitle className='mb-4'>Engagement Metrics</CardTitle>
                                    <ul className="list-unstyled mb-4 ">
                                        <li className="mb-4 d-flex align-items-center">
                                            <div className="bg-warning-subtle avatar avatar-md text-warning rounded-circle  me-3">
                                                <i className="bi bi-award fs-4"></i>
                                            </div>
                                            <div>
                                                <strong>Highest Rated Event:</strong><br />
                                                <small>“Future of Tech” – 4.9★</small>
                                            </div>
                                        </li>
                                        <li className="mb-4 d-flex align-items-center">
                                            <div className="bg-danger-subtle avatar avatar-md text-danger rounded-circle  me-3">
                                                <i className="bi bi-hourglass-split fs-4"></i>
                                            </div>
                                            <div>
                                                <strong>Avg. Time per User:</strong><br />
                                                <small>1 hr 23 mins</small>
                                            </div>
                                        </li>
                                        <li className="mb-4 d-flex align-items-center">
                                            <div className="bg-info-subtle avatar avatar-md text-info rounded-circle  me-3">
                                                <i className="bi bi-people fs-4"></i>
                                            </div>
                                            <div>
                                                <strong>Most Active Attendees:</strong><br />
                                                <small>John Doe, Jane Smith</small>
                                            </div>
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xxl={6}>
                            <Card>
                                <Card.Body className='px-0 pb-0'>
                                    <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-3 px-20'>
                                        <CardTitle className='mb-0'>Event Reviews</CardTitle>
                                        <div className="text-warning">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-half"></i>
                                            <span className="ms-2 text-dark">4.5/5.0</span>
                                        </div>
                                    </div>
                                    <SimpleBar style={{ maxHeight: 230 }}>
                                        {eventsData.map((event, index) => {
                                            const isLastEvent = index === eventsData.length - 1;
                                            const marginClass = isLastEvent ? 'mb-0' : 'mb-3';

                                            return (
                                                <div className={`d-flex gap-2 ${marginClass} px-20 py-2`} key={event.id}>
                                                    <Image className="avatar-md shadow" src={`https://ui-avatars.com/api/?name=${event.name.split(' ').join('+')}&background=random`} alt={event.name} roundedCircle />
                                                    <div className='w-100'>
                                                        <div className="d-flex justify-content-between gap-2">
                                                            <h6 className='fs-17 mb-1'>{event.name}</h6>
                                                            <p className='fs-14 mb-0 text-muted'>{event.date}</p>
                                                        </div>
                                                        <div className="text-warning small mb-1">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <i key={star} className={`bi bi-star${star <= Math.floor(event.attendees / 50) ? '-fill' : ''}`}></i>
                                                            ))}
                                                        </div>
                                                        <p className='text-muted fs-15 mb-1'>
                                                            {event.type === 'conference' && 'Attended the conference and '}
                                                            {event.type === 'summit' && 'Participated in the summit and '}
                                                            {event.type === 'workshop' && 'Joined the workshop and '}
                                                            {event.type === 'networking' && 'Attended the networking event and '}
                                                            <span className='fw-semibold'>{event.attendees} others</span> were there.
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <div className="text-center py-2 border-top">
                                            <Button variant='btn-link' className="btn-sm text-primary"> View All Reviews <i className="bi bi-arrow-right ms-1"></i></Button>
                                        </div>
                                    </SimpleBar>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div >
    );
};

export default Events;
