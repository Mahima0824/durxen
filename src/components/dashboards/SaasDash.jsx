import React from 'react';
import { Col, Container, Row, Card, Badge, Dropdown, ProgressBar, Form, Table, Image } from 'react-bootstrap';
import PageTitle from '../layout/PageTitle';
import Footer from '../layout/Footer';
import data from '../../data/dashboard/saas_dash_data.json';
import { Link } from 'react-router-dom';
// impport images
import avatar1 from '../../images/user/avatar-1.jpg';
import avatar2 from '../../images/user/avatar-2.jpg';
import avatar3 from '../../images/user/avatar-3.jpg';
import avatar4 from '../../images/user/avatar-4.jpg';
import avatar5 from '../../images/user/avatar-5.jpg';
import avatar6 from '../../images/user/avatar-6.jpg';
import avatar7 from '../../images/user/avatar-7.jpg';
import avatar8 from '../../images/user/avatar-8.jpg';

// Chart
import ReactApexChart from 'react-apexcharts';

import ChipImg from '../../images/chip.svg';
import SimpleBar from 'simplebar-react';

export default function SaasDash() {
    const SaasData = data.SaasData;
    const images = {
        "avatar-1.jpg": avatar1,
        "avatar-2.jpg": avatar2,
        "avatar-3.jpg": avatar3,
        "avatar-4.jpg": avatar4,
        "avatar-5.jpg": avatar5,
        "avatar-6.jpg": avatar6,
        "avatar-7.jpg": avatar7,
        "avatar-8.jpg": avatar8,
    }
    const chartOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            floating: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '35%',
                borderRadius: 3,
                borderRadiusApplication: 'end',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 8,
            colors: ['transparent'],
        },
        grid: {
            borderColor: '#eff2f7',
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        },
        yaxis: {
            title: {
                show: false,
            },
            labels: {
                formatter: (value) => {
                    if (value >= 1000) return `${value / 1000}k`;
                    return value;
                },
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `$ ${val} thousands`,
            },
        },
        colors: ['#306fd6', '#306fd638'],
    };



    return (
        <>
            <div className='page-wrapper left-class'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="Dashboards" pageTitle="Saas Dashboard" />
                    <Container fluid>
                        <Row>
                            {SaasData.topCards.map((data, i) => (
                                <Col md={6} xxl={3} key={i}>
                                    <Card className='card-rounded-shade'>
                                        <Card.Body className='d-flex align-items-center justify-content-between gap-4 position-relative z-index-1'>
                                            <div>
                                                <h5 className='mb-4 fw-semibold '>{data.title}</h5>
                                                <div className='d-flex align-items-center gap-2 mb-2'>
                                                    <h5 className='mb-0'>{data.amount}</h5><Badge bg={`${data.badgeColor}`}>{data.percentage}</Badge>
                                                </div>
                                                <p className='mb-0 text-muted fs-14'>{data.subText}</p>
                                            </div>
                                            <i className={`bi ${data.iconName} display-5 text-${data.iconColor}`}></i>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <Col xxl={8}>
                                <Row>
                                    <Col md={6}>
                                        <Card>
                                            <Card.Body>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <Card.Title className='d-flex align-items-center gap-2'><i className="bi bi-cash-stack"></i> Total Balance</Card.Title>
                                                    <Dropdown align="end">
                                                        <Dropdown.Toggle className='card-drop-icon' variant="" id="carddrop1"><i className="bi bi-three-dots-vertical fs-20"></i></Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/view-dashboard">Day</Dropdown.Item>
                                                            <Dropdown.Item href="#/manage-users">Week</Dropdown.Item>
                                                            <Dropdown.Item href="#/settings">Year</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>

                                                <div className="d-flex align-items-center">
                                                    <h2 className='fw-semibold mb-1'>$ 104,780.25</h2>
                                                    <Badge bg="soft-success" className='ms-3'><i className="bi bi-arrow-up-circle-fill me-1"></i> 4.6%</Badge>
                                                </div>
                                                <p className='text-muted fs-14 mb-4'>Updated 5 mins ago</p>

                                                <div className="d-sm-flex align-items-center justify-content-between gap-3 px-12 py-1 border rounded-3 mb-2">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <i className="bi bi-credit-card-2-back-fill text-primary display-5 lh-1"></i>
                                                        <p className='mb-0 fs-14'>**** **** **** 3698</p>
                                                    </div>
                                                    <h6 className='mb-0 fs-18 fw-bold'>$ 64,780.00</h6>
                                                </div>
                                                <div className="d-sm-flex align-items-center justify-content-between gap-3 px-12 py-1 border rounded-3 mb-2">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <i className="bi bi-credit-card-2-back-fill text-success display-5 lh-1"></i>
                                                        <p className='mb-0 fs-14'>**** **** **** 2681</p>
                                                    </div>
                                                    <h6 className='mb-0 fs-18 fw-bold'>$ 16,620.25</h6>
                                                </div>
                                                <div className="d-sm-flex align-items-center justify-content-between gap-3 px-12 py-1 border rounded-3">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <i className="bi bi-credit-card-2-back-fill text-dark display-5 lh-1"></i>
                                                        <p className='mb-0 fs-14'>**** **** **** 4069</p>
                                                    </div>
                                                    <h6 className='mb-0 fs-18 fw-bold'>$ 23,380.25</h6>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={6}>
                                        <Card>
                                            <Card.Body>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <Card.Title className='d-flex align-items-center gap-2'><i className="bi bi-wallet2"></i> Spending Overview</Card.Title>
                                                    <Dropdown align="end">
                                                        <Dropdown.Toggle className='card-drop-icon' variant="" id="carddrop1"><i className="bi bi-three-dots-vertical fs-20"></i></Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/view-dashboard">Day</Dropdown.Item>
                                                            <Dropdown.Item href="#/manage-users">Week</Dropdown.Item>
                                                            <Dropdown.Item href="#/settings">Year</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-2">
                                                    <h3 className='fw-semibold mb-0'>$ 25,680.00</h3>
                                                    <p className='mb-0'>$80,000.00</p>
                                                </div>

                                                <div className='p-1 mb-3 rounded-pill border'>
                                                    <ProgressBar style={{ height: '12px' }}>
                                                        <ProgressBar striped animated variant="danger" now={12} key={1} />
                                                        <ProgressBar striped animated variant="primary" now={16} key={2} />
                                                        <ProgressBar striped animated variant="orange" now={10} key={3} />
                                                        <ProgressBar striped animated variant="info" now={8} key={4} />
                                                    </ProgressBar>
                                                </div>
                                                <div className='d-flex flex-wrap gap-2 align-items-center justify-content-between border-bottom py-3'>
                                                    <h5 className='mb-0 fw-normal fs-18'><i className="bi bi-egg-fried fs-16 text-danger me-1"></i> Food & Dining</h5>
                                                    <h5 className='mb-0 fw-semibold fs-18'>$6,750.00</h5>
                                                </div>
                                                <div className='d-flex flex-wrap gap-2 align-items-center justify-content-between border-bottom py-3'>
                                                    <h5 className='mb-0 fw-normal fs-18'><i className="bi bi-bag-check fs-16 text-primary me-1"></i> Shopping</h5>
                                                    <h5 className='mb-0 fw-semibold fs-18'>$8,500.00</h5>
                                                </div>
                                                <div className='d-flex flex-wrap gap-2 align-items-center justify-content-between border-bottom py-3'>
                                                    <h5 className='mb-0 fw-normal fs-18'><i className="bi bi-airplane-engines fs-16 text-orange me-1"></i> Travel</h5>
                                                    <h5 className='mb-0 fw-semibold fs-18'>$5,430.00</h5>
                                                </div>
                                                <div className='d-flex flex-wrap gap-2 align-items-center justify-content-between pt-3'>
                                                    <h5 className='mb-0 fw-normal fs-18'><i className="bi bi-controller fs-16 text-info me-1"></i> Entertainment</h5>
                                                    <h5 className='mb-0 fw-semibold fs-18'>$4,999.00</h5>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>

                                <Card>
                                    <Card.Body className='pb-0'>
                                        <div className="d-flex justify-content-between mb-2">
                                            <Card.Title className='d-flex align-items-center gap-2'><i className="bi bi-bar-chart"></i> Finance Statistics</Card.Title>
                                            <Form>
                                                <Form.Group className='input-select-icon'>
                                                    <i className="bi bi-calendar2-check input-icon"></i>
                                                    <Form.Select size='sm' name='saasDashMonthSelect' id='saasDashMonthSelect' defaultValue="Choose...">
                                                        <option>This Month</option>
                                                        <option>Last Month</option>
                                                        <option>Last 6 Month</option>
                                                        <option>Last Year</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Form>
                                        </div>

                                        <div className="saas-dash-chart">
                                            <ReactApexChart options={chartOptions} series={SaasData.chartSeries} type="bar" height={376} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xxl={4}>
                                <Row>
                                    <Col lg={6} xxl={12} className='order-1 order-xxl-1'>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>My Cards</Card.Title>
                                                <div className='card-flip' style={{ height: '275px' }}>
                                                    <div className="card-flip-inner">
                                                        <div className="card-flip-front d-flex flex-wrap flex-column rounded-2 bg-gradient-primary px-4 pb-4">
                                                            <div className="d-flex align-items-center justify-content-between">
                                                                <div className="d-flex gap-1 fs-12 opacity-75">
                                                                    <i className="bi bi-circle-fill"></i>
                                                                    <i className="bi bi-circle-fill"></i>
                                                                    <i className="bi bi-circle-fill"></i>
                                                                </div>
                                                                <i className="ri-visa-line display-1 lh-1"></i>
                                                            </div>
                                                            <h4 className='text-white card-number mb-2 d-flex align-items-center gap-1 gap-md-3'>
                                                                <span>❊❊❊❊</span> <span>❊❊❊❊</span> <span>❊❊❊❊</span> 1234
                                                            </h4>
                                                            <div className='d-flex align-items-center gap-2 mb-3'>
                                                                <img src={ChipImg} alt="" height={40} />
                                                                <i className="bi bi-wifi display-5 rotate-90"></i>
                                                            </div>
                                                            <div className="d-flex justify-content-between gap-2 mt-auto">
                                                                <div>
                                                                    <p className='fw-light fs-15 mb-1'>Card Holder Name</p>
                                                                    <h5 className='text-white mb-0'>Robert A. Werner</h5>
                                                                </div>
                                                                <div className="text-end">
                                                                    <p className='fw-light fs-15 mb-1'>Expiry Date</p>
                                                                    <h5 className='text-white mb-0'>05/28</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-flip-back rounded-2 bg-light pt-4 pb-4">
                                                            <div className='bg-dark w-100 p-4'></div>
                                                            <div className='px-4 mt-3 text-end'>
                                                                <p className='mb-1 fs-15'>CCV</p>
                                                                <div className='bg-white w-100 p-14 rounded-2'>
                                                                    <p className='mb-0 fw-semibold text-dark fs-18'>001</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-muted fs-14 px-4 mt-4">
                                                                <div className='mb-0'><strong>Note:</strong> Do not share your CVV or card details.</div>
                                                                <div><b>Bank</b> | Secure Card Services</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg={6} xxl={12} className='order-2 order-xxl-3'>
                                        <Card>
                                            <Card.Body>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <Card.Title className='d-flex align-items-center gap-2'><i className="bi bi-currency-dollar"></i> Quick Transactions</Card.Title>
                                                    <Dropdown align="end">
                                                        <Dropdown.Toggle className='card-drop-icon' variant="" id="carddrop1"><i className="bi bi-three-dots-vertical fs-20"></i></Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/transactions-today"><i className="bi bi-calendar-day me-2"></i> Today’s Transactions</Dropdown.Item>
                                                            <Dropdown.Item href="#/weekly-summary"><i className="bi bi-calendar-week me-2"></i> Weekly Summary</Dropdown.Item>
                                                            <Dropdown.Item href="#/monthly-report"><i className="bi bi-calendar3 me-2"></i> Monthly Report</Dropdown.Item>
                                                            <Dropdown.Item href="#/recurring-payments"><i className="bi bi-arrow-repeat me-2"></i> Recurring Payments</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>

                                                <Table responsive className='mb-0 align-middle table-nowrap'>
                                                    <thead>
                                                        <tr>
                                                            <th className='ps-0'>User</th>
                                                            <th>Status</th>
                                                            <th className='text-end pe-0'>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {SaasData.transData.map((row, index) =>
                                                            <tr key={index}>
                                                                <td className='ps-0'>
                                                                    <div className='d-flex align-items-center gap-2'>
                                                                        <Image src={images[row.userImg]} alt={row.userName} roundedCircle className="avatar-xxs shadow" />
                                                                        <h6 className='mb-0'>{row.userName}</h6>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <Badge bg={row.statusColor}>{row.status}</Badge>
                                                                </td>
                                                                <th className='text-end pe-0'>{row.amount}</th>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={12} className='order-3 order-xxl-2'>
                                        <Card>
                                            <Card.Body>
                                                <Row className='grid-border-md'>
                                                    <Col xs={6} md={3} className='text-center'>
                                                        <i className="bi bi-wallet2 fs-4 text-primary d-block"></i>
                                                        <p className='fs-15 mb-2'>Add Funds</p>
                                                    </Col>
                                                    <Col xs={6} md={3} className='text-center'>
                                                        <i className="bi bi-send-arrow-up fs-4 text-success d-block"></i>
                                                        <p className='fs-15 mb-2'>Pay Now</p>
                                                    </Col>
                                                    <Col xs={6} md={3} className='text-center'>
                                                        <i className="bi bi-cash-stack fs-4 text-warning d-block"></i>
                                                        <p className='fs-15 mb-2'>Ask to Pay</p>
                                                    </Col>
                                                    <Col xs={6} md={3} className='text-center'>
                                                        <i className="bi bi-clock-history fs-4 text-info d-block"></i>
                                                        <p className='fs-15 mb-2'>Activity</p>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={6} xxl={4}>
                                <Card>
                                    <Card.Body>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <Card.Title className='mb-0'>Saving Palns</Card.Title>
                                            <Link className='text-dark'><i className="bi bi-plus-lg fs-20"></i></Link>
                                        </div>

                                        {SaasData.savingPlans.map((row, index) =>
                                            <div className={`p-3 bg-soft-light border rounded ${index !== SaasData.savingPlans.length - 1 ? 'mb-2' : ''}`} key={index}>
                                                <div className='d-flex flex-wrap align-items-end justify-content-between mb-2'>
                                                    <div className="d-flex gap-3 align-items-center mb-2">
                                                        <div className={`avatar avatar-md avatar-soft-${row.color} rounded`}>
                                                            <i className={`${row.icon}`}></i>
                                                        </div>
                                                        <div>
                                                            <h6 className='mb-1'>{row.title}</h6>
                                                            <p className='text-secondary fs-15 mb-0'>{row.targetAmount}</p>
                                                        </div>
                                                    </div>
                                                    <p className='fw-medium text-dark fs-15 mb-2'>{row.progress}% Done</p>
                                                </div>
                                                <ProgressBar variant={row.color} now={row.progress} className='height-8' />
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6} xxl={4}>
                                <Card>
                                    <Card.Body>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <Card.Title className='mb-0'>Top Customers</Card.Title>
                                            <Link to="" className='text-dark'><i className="bi bi-plus-lg fs-20"></i></Link>
                                        </div>

                                        {SaasData.topCustomers.map((data, index) =>
                                            <div className={`d-flex align-items-center ${index !== SaasData.topCustomers.length - 1 ? 'border-bottom py-3' : 'pt-3'} ${index === 0 ? 'pt-0' : ''}`} key={index}>
                                                <div className="flex-shrink-0">
                                                    <Image src={images[data.custImg]} alt="Customer Img" roundedCircle className="avatar-md shadow" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h5 className='fs-17 mb-1'>{data.custTitle}</h5>
                                                    <p className='text-muted fs-14 mb-0'>{data.orderInfo} Orders | {data.spentInfo} Spent</p>
                                                </div>
                                                <Link to="" className='text-dark'><i className="bi bi-chevron-compact-right fs-22"></i></Link>
                                            </div>
                                        )}

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={12} xxl={4}>
                                <Card >
                                    <Card.Body>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <Card.Title className='mb-0'>Recent Activity</Card.Title>
                                            <Dropdown align="end">
                                                <Dropdown.Toggle className='card-drop-icon' variant="" id="carddrop1"><i className="bi bi-three-dots-vertical fs-20"></i></Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to="">Reload Activity</Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="">Refresh This Week</Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="">Clear History</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>

                                        <SimpleBar style={{ maxHeight: 430 }}>
                                            {SaasData.recentActivity.map((group, groupIndex) => (
                                                <div className='' key={groupIndex}>
                                                    <h6 className='fs-18 mb-3'>{group.dayTitle}</h6>

                                                    {group.activityItem.map((activity, index) => {
                                                        const isLastGroup = groupIndex === SaasData.recentActivity.length - 1;
                                                        const isLastActivity = index === group.activityItem.length - 1;
                                                        const marginClass = isLastGroup && isLastActivity ? 'mb-0' : 'mb-4';

                                                        return (
                                                            <div className={`d-flex activity-item gap-3 ${marginClass}`} key={index}>
                                                                <Image src={images[activity.custImg]} alt="Customer Img" roundedCircle className="avatar-md shadow" />
                                                                <div className='w-100'>
                                                                    <div className="d-flex justify-content-between gap-2">
                                                                        <h6 className='fs-17 mb-1'>{activity.custName}</h6>
                                                                        <p className='fs-14 mb-0'>{activity.time}</p>
                                                                    </div>
                                                                    <p className='text-muted fs-15 mb-1'>
                                                                        {activity.beforeText}
                                                                        {activity.highlightText && (
                                                                            <span className='fw-semibold'> {activity.highlightText}</span>
                                                                        )}
                                                                        {activity.afterText && activity.afterText}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </SimpleBar>
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
