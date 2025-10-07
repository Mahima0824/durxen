import React, { useEffect, useState } from 'react';
import PageTitle from '../../layout/PageTitle';
import { Container, Row, Col, Card, Tooltip, Badge, ProgressBar, Image, Dropdown, Table, Button, CardTitle, ListGroup } from 'react-bootstrap';
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import ChartCard from '../../dashboards/ChartCard';
import ChartCustomTooltip from '../../dashboards/ChartCustomTooltip';
import CardChip from '../../../images/chip.svg';
import ChipImg from '../../../images/chip.svg';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import Calender from '../../events/Calender';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Footer from '../../layout/Footer';
import data from '../../../data/dashboard/e-commerce.json';
import event from '../../../data/dashboard/event.json';
import management from '../../../data/dashboard/management.json';
import saasdata from '../../../data/dashboard/saas_dash_data.json';
import prod1 from '../../../images/products/prod-1.jpg';
import prod2 from '../../../images/products/prod-2.jpg';
import prod3 from '../../../images/products/prod-3.jpg';
import prod4 from '../../../images/products/prod-4.jpg';
import english from "../../../images/flag/english.png";
import france from "../../../images/flag/france.png";
import japanese from "../../../images/flag/japanese.png";
import spanish from "../../../images/flag/spanish.png";
import user1 from "../../../images/user/avatar-1.jpg";
import user2 from "../../../images/user/avatar-2.jpg";
import user3 from "../../../images/user/avatar-3.jpg";
import user4 from "../../../images/user/avatar-4.jpg";
import user5 from "../../../images/user/avatar-5.jpg";
import user6 from "../../../images/user/avatar-6.jpg";
import user7 from "../../../images/user/avatar-7.jpg";
import user8 from "../../../images/user/avatar-8.jpg";

const Widgets = () => {
  const images ={
    "prod-1.jpg":prod1,
    "prod-2.jpg":prod2,
    "prod-3.jpg":prod3,
    "prod-4.jpg":prod4
}
const flags = {
    "english.png":english,
    "france.png":france,
    "japanese.png":japanese,
    "spanish.png":spanish
}
const users = {
    "avatar-1.jpg":user1,
    "avatar-2.jpg":user2,
    "avatar-3.jpg":user3,
    "avatar-4.jpg":user4,
    "avatar-5.jpg":user5,
    "avatar-6.jpg":user6,
    "avatar-7.jpg":user7,
    "avatar-8.jpg":user8,
}
  const e_commerce = data.e_commerce;
   const SaasData = saasdata.SaasData;
  const cardData = event.event.cardData;
  const { stats, teamMembers, resourceAllocationData, performanceMetrics, projectTimeline } = management.managementdata;

  // Map of stat titles to color keys
  const statColorMap = {
    'Total Tasks': 'primary',
    'In Progress': 'purple',
    'Completed': 'success',
    'Overdue': 'danger'
  };
  const gradientColor = {
    'Development': 'primary',
    'Design': 'purple',
    'Marketing': 'success',
    'QA': 'danger',
    'DevOps': 'info'
  };
  const [colors, setColors] = useState({});

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setColors({
      primary: root.getPropertyValue('--bs-primary').trim() || '',
      secondary: root.getPropertyValue('--bs-secondary').trim() || '',
      success: root.getPropertyValue('--bs-success').trim() || '',
      warning: root.getPropertyValue('--bs-warning').trim() || '',
      info: root.getPropertyValue('--bs-info').trim() || '',
      danger: root.getPropertyValue('--bs-danger').trim() || '',
      light: root.getPropertyValue('--bs-light').trim() || '',
      dark: root.getPropertyValue('--bs-dark').trim() || '',
      purple: root.getPropertyValue('--bs-purple').trim() || '',
      orange: root.getPropertyValue('--bs-orange').trim() || '',
    });
  }, []);
 
  const chartData = {
    'Total Tasks': [
      { name: 'Jan', value: 20 },
      { name: 'Feb', value: 24 },
      { name: 'Mar', value: 22 },
      { name: 'Apr', value: 26 },
      { name: 'May', value: 24 },
      { name: 'Jun', value: 24 },
    ],
    'In Progress': [
      { name: 'Jan', value: 12 },
      { name: 'Feb', value: 10 },
      { name: 'Mar', value: 14 },
      { name: 'Apr', value: 8 },
      { name: 'May', value: 9 },
      { name: 'Jun', value: 8 },
    ],
    'Completed': [
      { name: 'Jan', value: 6 },
      { name: 'Feb', value: 8 },
      { name: 'Mar', value: 10 },
      { name: 'Apr', value: 12 },
      { name: 'May', value: 14 },
      { name: 'Jun', value: 14 },
    ],
    'Overdue': [
      { name: 'Jan', value: 2 },
      { name: 'Feb', value: 1 },
      { name: 'Mar', value: 3 },
      { name: 'Apr', value: 2 },
      { name: 'May', value: 1 },
      { name: 'Jun', value: 2 },
    ]
  };
  const prodItemsChart = [
    { name: 'Electronics', value: 12450 , color: 'primary' },
    { name: 'Fashion', value: 9340 , color: 'success' },
    { name: 'Home Decor', value: 7810 , color: 'warning' },
    { name: 'Health & Beauty', value: 6980 , color: 'danger' }
];
  return (

    <div className="page-wrapper">
      <div className="page-content">
        <PageTitle pageTitle="Widgets" pagePrTitle="UI Elements" />
        <Container fluid>
          <Row>
            <Col>
              <Row>
                <Col sm={6} lg={3}>
                  <ChartCard title="$1,25,000" subText="Total Revenue" badgeColor="soft-primary" badgeText="+8.2%" chartData={e_commerce.totalRevenueData} chartDataKay="Products" chartId="totalRevenue" chartColor="#306fd6" />
                </Col>
                <Col sm={6} lg={3}>
                  <ChartCard title="2,650" subText="Total Customer" badgeColor="soft-success" badgeText="+4.7%" chartData={e_commerce.totalCustomerData} chartDataKay="Customer" chartId="totalCustomer" chartColor="#22cdc6" />
                </Col>
                <Col sm={6} lg={3}>
                  <ChartCard title="₹62,400" subText="Total Profit" badgeColor="soft-info" badgeText="+5.5%" chartData={e_commerce.totalProfitData} chartDataKay="Profit" chartId="totalProfit" chartColor="#1fc2fb" />
                </Col>
                <Col sm={6} lg={3}>
                  <ChartCard title="₹62,400" subText="Total Profit" badgeColor="soft-info" badgeText="+5.5%" chartData={e_commerce.analyticsChartData} chartDataKay="Sales" chartId="analytics" chartColor="#1fc2fb" />
                </Col>
              </Row>
            </Col>
          </Row>
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
            {cardData.map((item, idx) => (
              <Col lg={4} xxl={3} key={idx}>
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
          <Row>
            {stats.map((stat, index) => (
              <Col key={index} xl={3} md={6}>
                <Card className="mb-3">
                  <Card.Body className="py-3 px-4">
                    <div className='d-flex flex-wrap gap-3 justify-content-between align-items-start'>
                      {/* Left: Icon + Text */}
                      <div className="d-flex align-items-center">
                        <div className={`avatar avatar-md bg-gradient-${stat.color} text-white rounded-3 me-3 d-flex align-items-center justify-content-center`}>
                          <i className={`bi ${stat.icon} fs-4`} ></i>
                        </div>
                        <div>
                          <h6 className="text-muted mb-1">{stat.title}</h6>
                          <h4 className="mb-0">{stat.value}</h4>
                        </div>
                      </div>
                      <div>
                        <Badge bg={`soft-${stat.badgeColor}`} className="d-inline-flex  align-items-center">
                          <i className="bi bi-clock me-1" /> {stat.badgetitle}
                        </Badge>
                      </div>
                    </div>
                    <div style={{ height: '100px', width: '100%' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData[stat.title]}>
                          <defs>
                            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(0, 0, 0, 0.15)" floodOpacity="1" />
                            </filter>
                            <linearGradient id={`gradient-${statColorMap[stat.title]}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={colors[statColorMap[stat.title]]} stopOpacity="0.4" />
                              <stop offset="50%" stopColor={colors[statColorMap[stat.title]]} stopOpacity="0.9" />
                              <stop offset="100%" stopColor={colors[statColorMap[stat.title]]} stopOpacity="0.6" />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="name" hide />
                          <YAxis hide />
                          <Area type="monotone" opacity={0.5} dataKey="value" stroke={colors[statColorMap[stat.title]]} strokeWidth={2} dot={false} style={{ filter: 'url(#shadow)' }} fill={`url(#gradient-${statColorMap[stat.title]})`} />
                          <Tooltip content={<ChartCustomTooltip />} cursor={{ fill: 'transparent' }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col md={4} >
              <Card>
                <Card.Body className='p-lg-40'>
                  <div className="debit-card bg-primary position-relative rounded-4">
                    <div className="debit-inner p-4 rounded-4 position-relative z-1">
                      <div className='d-flex justify-content-between gap-3 mb-3'>
                        <div>
                          <h5 className='text-white-50 fw-normal'>Current Balance</h5>
                          <h2 className='text-white text-shadow-sm'>$1,25,000.00</h2>
                        </div>
                        <div className='text-center'>
                          <div className='d-flex align-items-center'>
                            <i className="bi bi-circle-fill display-5 text-danger opacity-75 z-1 position-relative"></i>
                            <i className="bi bi-circle-fill display-5 text-orange ms-n3"></i>
                          </div>
                          <p className='text-white-50 fs-13 lh-1 mb-0'>Mastercard</p>
                        </div>
                      </div>
                      <Image src={CardChip} alt="Card" className='opacity-50' height={40} />
                      <h4 className='text-white fw-light text-shadow-sm mt-4'>1234 4567 8901 2345</h4>
                      <div className='d-flex flex-wrap justify-content-between align-items-center'>
                        <h5 className='text-white fw-light text-shadow-sm mb-0'>Harriet Sykes</h5>
                        <h6 className='text-white fw-light text-shadow-sm mb-0'>12/24 <span className='ms-4'>11/30</span></h6>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
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
            <Col md={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
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
                              <Image src={users[row.userImg]} alt={row.userName} roundedCircle className="avatar-xxs shadow" />
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
          </Row>
          <Row>
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
                        <Image src={users[data.custImg]} alt="Customer Img" roundedCircle className="avatar-md shadow" />
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
                              <Image src={users[activity.custImg]} alt="Customer Img" roundedCircle className="avatar-md shadow" />
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
          <Row>
            <Col md={6} xl={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>Active User</Card.Title>
                    <Dropdown align="end">
                      <Dropdown.Toggle className='card-drop-icon' variant="" id="carddrop1"><i className="bi bi-three-dots fs-20"></i></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#"><i className="bi bi-arrow-clockwise me-2"></i> Refresh Users</Dropdown.Item>
                        <Dropdown.Item href="#"><i className="bi bi-person-lines-fill me-2"></i> View User List</Dropdown.Item>
                        <Dropdown.Item href="#"><i className="bi bi-bar-chart-line me-2"></i> User Analytics</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className='d-flex justify-content-between gap-3'>
                    <div>
                      <h4 className='fw-semibold mb-0'>78,492</h4>
                      <p className='text-muted fs-14 mb-0'>Total Active Users</p>
                    </div>
                    <div className='text-end'>
                      <Badge bg="soft-success">+8.6% Growth</Badge>
                      <p className='text-muted fs-14 mt-2 mb-0'>Compared to last week</p>
                    </div>
                  </div>

                  {e_commerce.activeUsers.map((user, index) => (
                    <div className={`${index === e_commerce.activeUsers.length - 1 ? 'pt-3 border-0' : 'pb-4 pt-3 border-bottom'}`} key={index}>
                      <div className='d-flex justify-content-between align-items-center mb-2'>
                        <div className="d-flex align-items-center gap-2">
                          <Image src={flags[user.flagImg]} alt="Avatar Img" className="avatar-xxs" />
                          <h5 className='mb-0 fs-18'>{user.title}</h5>
                        </div>
                        <h5 className='mb-0 fs-18 fw-semibold'>{user.percentage}%</h5>
                      </div>
                      <ProgressBar variant={user.color} now={user.percentage} className='height-8' />
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xl={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>Most Popular Items</Card.Title>
                    <Dropdown align="end">
                      <Dropdown.Toggle className='card-drop-icon' variant="" id="carddrop1"><i className="bi bi-three-dots fs-20"></i></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#"><i className="bi bi-arrow-clockwise me-2"></i> Refresh Report</Dropdown.Item>
                        <Dropdown.Item href="#"><i className="bi bi-tags me-2"></i> View All Categories</Dropdown.Item>
                        <Dropdown.Item href="#"><i className="bi bi-bar-chart-line me-2"></i> Sales Analytics</Dropdown.Item>
                        <Dropdown.Item href="#"><i className="bi bi-download me-2"></i> Export Report</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className="w-100 h-100">
                    <ResponsiveContainer width="100%" height={242}>
                      <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <defs>
                          <filter id="prodItemsChartShadow" x="-20%" y="0%" width="140%" height="140%">
                            <feDropShadow dx="8" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.2" />
                          </filter>
                        </defs>
                        <Pie data={prodItemsChart}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="48%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={4}
                          startAngle={90}
                          endAngle={-270}
                          style={{ filter: 'url(#prodItemsChartShadow)', outline: 'none' }}
                        >
                          {prodItemsChart.map((entry, index) => (
                            <Cell key={`cell-${index}`}  fill={colors[entry.color]}/>
                          ))}
                        </Pie>
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="28" fontWeight="bold">$36K+</text>
                        {/* <Tooltip /> */}
                        <Tooltip cursor={{ stroke: '#306fd6', strokeWidth: 2, strokeDasharray: '5 5', }} content={<ChartCustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <Row>
                    {e_commerce.popularItems.map((item, index) => (
                      <Col sm={6} key={index}>
                        <div className='d-flex align-items-center gap-3 mt-3'>
                          <div className={`avatar avatar-xl avatar-${item.color} rounded`}>
                            <i className={item.icon}></i>
                          </div>
                          <div>
                            <h5 className='fw-semibold mb-0'>{item.value}</h5>
                            <p className='fs-15 mb-0'>{item.subTitle}</p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xl={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>Traffic Overview</Card.Title>
                    <Dropdown align="end">
                      <Dropdown.Toggle className='card-drop-icon' variant="" id="carddrop1"><i className="bi bi-three-dots fs-20"></i></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#"><i className="bi bi-arrow-clockwise me-2"></i> Refresh Stats</Dropdown.Item>
                        <Dropdown.Item href="#"><i className="bi bi-people me-2"></i> View Traffic Sources</Dropdown.Item>
                        <Dropdown.Item href="#"><i className="bi bi-graph-up-arrow me-2"></i> Traffic Trends</Dropdown.Item>
                        <Dropdown.Item href="#"><i className="bi bi-download me-2"></i> Download Report</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <ResponsiveContainer width="100%" height={108}>
                    <BarChart data={e_commerce.trafficData} barSize={12}>
                      <XAxis dataKey="date" hide />
                      <Tooltip background='none' label="false" cursor={{ stroke: 'none', fill: 'transparent' }} content={<ChartCustomTooltip />} />
                      <Bar dataKey="value" fill='#306fd6' radius={[8, 8, 8, 8]} />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className='text-center mt-4'>
                    <h2 className='fw-semibold mb-1'>56,480</h2>
                    <p className='text-muted'>[Overall Visitors]</p>
                  </div>

                  <Table responsive size='lg' className='mb-0 table-last-br-none table-nowrap'>
                    <tbody>
                      {e_commerce.userTrafficData.map((item, index) => (
                        <tr key={index}>
                          <td className='ps-0'>
                            <div className='d-flex align-items-center gap-2'>
                              <i className={`bi bi-record-circle-fill fs-12 text-${item.color}`}></i>
                              <h6 className='fs-16 mb-0'>{item.title}</h6>
                            </div>
                          </td>
                          <td className='text-end'>{item.value}</td>
                          <td className='text-end pe-0'>{item.percentage} <i className="bi bi-graph-up text-success"></i></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={4}>
              <Card>
                <Card.Header className="bg-white border-0 py-2 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Team Members</h5>
                  <Button variant="outline-primary" size="sm">View All</Button>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="list-group list-group-flush">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="list-group-item border-0 py-2">
                        <div className="d-flex align-items-center">
                          <div className="position-relative me-3">
                            <div className="avatar avatar-md bg-soft-primary rounded-circle d-flex align-items-center justify-content-center">
                              <span className="text-primary fw-semibold">{member.avatar}</span>
                            </div>
                            {member.online && (
                              <span className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" style={{ width: '12px', height: '12px' }}></span>
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">{member.name}</h6>
                            <small className="text-muted">{member.role}</small>
                          </div>
                          <Badge bg={member.status === 'Active' ? 'soft-success' : 'soft-secondary'} className="text-uppercase">{member.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xl={4} >
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>Recent Orders</Card.Title>
                    <Dropdown align="end">
                      <Dropdown.Toggle className='card-drop-icon' variant="" id="carddrop1"><i className="bi bi-three-dots-vertical fs-20"></i></Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/view-dashboard">Today</Dropdown.Item>
                        <Dropdown.Item href="#/manage-users">Tomorrow</Dropdown.Item>
                        <Dropdown.Item href="#/settings">Last Week</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  {e_commerce.recentOrders.map((data, i) =>
                    <div className={`d-flex align-items-center ${i === e_commerce.recentOrders.length - 1 ? 'pt-3 border-0' : 'py-3 border-bottom'}`} key={i} >
                      <div className="flex-shrink-0">
                        <Image src={images[data.prodImg]} alt="Product Img" className='avatar-xxl shadow rounded' />
                      </div>
                      <div className="flex-grow-1 text-truncate ms-3">
                        <h5 className='mb-1 fs-18 text-truncate w-75'>{data.title}</h5>
                        <p className='text-muted fs-14 mb-0'>{data.time}</p>
                      </div>
                      <h5 className='ms-2 mb-0 fs-18 fw-semibold'>{data.price}</h5>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} xl={4} >
              <Card>
                <Card.Body>
                  <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-lg-2'>
                    <CardTitle className='mb-0'>Income</CardTitle>
                    <Badge bg="light" className='badge-lg'>Today</Badge>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className='avatar avatar-xxxl avatar-success rounded'>
                      <i className="ri-hand-coin-fill"></i>
                    </div>
                    <div>
                      <div className='d-flex flex-wrap align-items-center column-gap-3 row-gap-1'>
                        <h3 className='fw-semibold mb-0'>$62,400</h3><span><Badge bg='soft-success'>+4.3% <i className="bi bi-caret-up-square"></i></Badge></span>
                      </div>
                      <p className='text-muted mb-0'>Compared to $50,800 yesterday</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-lg-2'>
                    <CardTitle className='mb-0'>Expenses</CardTitle>
                    <Badge bg="light" className='badge-lg'>Today</Badge>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className='avatar avatar-xxxl avatar-danger rounded'>
                      <i className="ri-cash-line"></i>
                    </div>
                    <div>
                      <div className='d-flex flex-wrap align-items-center column-gap-3 row-gap-1'>
                        <h3 className='fw-semibold mb-0'>$40,200</h3><span><Badge bg='soft-danger'>−3.1% <i className="bi bi-caret-down-square"></i></Badge></span>
                      </div>
                      <p className='text-muted mb-0'>Compared to $45,600 yesterday</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Row className='grid-border-md'>
                    <Col xs={6} md={3} className='text-center'>
                      <i className="bi bi-wallet2 fs-5 text-primary d-block"></i>
                      <p className='fs-15 mb-2'>Add Funds</p>
                    </Col>
                    <Col xs={6} md={3} className='text-center'>
                      <i className="bi bi-send-arrow-up fs-5 text-success d-block"></i>
                      <p className='fs-15 mb-2'>Pay Now</p>
                    </Col>
                    <Col xs={6} md={3} className='text-center'>
                      <i className="bi bi-cash-stack fs-5 text-warning d-block"></i>
                      <p className='fs-15 mb-2'>Ask to Pay</p>
                    </Col>
                    <Col xs={6} md={3} className='text-center'>
                      <i className="bi bi-clock-history fs-5 text-info d-block"></i>
                      <p className='fs-15 mb-2'>Activity</p>
                    </Col>
                  </Row>
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
                          <div className="category-dot bg-primary me-2" style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',

                          }}></div>
                          <span className={category.active ? 'fw-bold text-primary' : ''}>
                            {category.name}
                          </span>
                        </div>
                        <span className={`badge ${category.active ? 'bg-primary' : 'bg-light text-dark'}`}>
                          {category.count}
                        </span>
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
                <Card.Header className="bg-white border-0 py-3">
                  <h5 className="mb-0">Team Performance Overview</h5>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="p-3 border rounded-3 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="mb-0">Overall Progress</h6>
                          <span className="badge bg-soft-primary">78%</span>
                        </div>
                        <ProgressBar now={78} className="mb-2 height-8" />
                        <small className="text-muted">12% increase from last month</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-3 border rounded-3 h-100">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="mb-0">Tasks Completed</h6>
                          <span className="badge bg-soft-success">156/200</span>
                        </div>
                        <ProgressBar now={78} variant="success" className="mb-2 height-8" />
                        <small className="text-muted">44 tasks remaining</small>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0">Top Performers</h6>
                      <Button variant="link" size="sm" className="p-0">View All</Button>
                    </div>
                    <ListGroup variant="flush">
                      {teamMembers.slice(0, 3).map((member, index) => (
                        <ListGroup.Item key={index} className="border-0 px-0">
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-sm me-3">
                              <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-0">{member.name}</h6>
                              <small className="text-muted">{member.role}</small>
                            </div>
                            <div className="text-end">
                              <div className="fw-medium">{member.completedTasks} tasks</div>
                              <small className="text-success">
                                <i className="ri-arrow-up-line align-middle"></i> {Math.floor(Math.random() * 15) + 5}%
                              </small>
                            </div>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            {/* Resource Allocation */}
            <Col lg={6} xl={4}>
              <Card>
                <Card.Header className="bg-white border-0 py-3">
                  <h5 className="mb-0">Resource Allocation</h5>
                </Card.Header>
                <Card.Body>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          {resourceAllocationData.map((entry, index) => (
                            <linearGradient key={`gradient-${index}`} id={`gradient-${entry.name}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={colors[gradientColor[entry.name]]} stopOpacity="0.8" />
                              <stop offset="50%" stopColor={colors[gradientColor[entry.name]]} stopOpacity="1" />
                              <stop offset="100%" stopColor={colors[gradientColor[entry.name]]} stopOpacity="0.6" />
                            </linearGradient>
                          ))}
                        </defs>
                        <Pie
                          data={resourceAllocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {resourceAllocationData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={`url(#gradient-${entry.name})`}
                              stroke="#fff"
                              strokeWidth={1}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-3">
                    {resourceAllocationData.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                          <span className={`badge-dot me-2 p-1 rounded-circle bg-${item.color}`} ></span>
                          <span>{item.name}</span>
                        </div>
                        <span className="fw-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Performance Metrics */}
            <Col lg={6} xl={4}>
              <Card>
                <Card.Header className="bg-white border-0 py-3">
                  <h5 className="mb-0">Performance Metrics</h5>
                </Card.Header>
                <Card.Body>
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-muted">{metric.metric}</span>
                        <span className={`badge bg-soft-${metric.trend === 'up' ? 'success' : 'danger'} text-${metric.trend === 'up' ? 'success' : 'danger'}`}>
                          <i className={`bi bi-arrow-${metric.trend === 'up' ? 'up' : 'down'}`}></i>
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">
                          {typeof metric.current === 'number' && metric.current % 1 !== 0
                            ? metric.current.toFixed(1)
                            : metric.current}
                          {typeof metric.current === 'number' && metric.current <= 100 ? '%' : ''}
                        </h4>
                        <small className="text-muted">Target: {metric.target}{typeof metric.target === 'number' && metric.target <= 100 ? '%' : ''}</small>
                      </div>
                      <ProgressBar
                        now={metric.current}
                        max={metric.target}
                        variant={metric.trend === 'up' ? 'success' : 'danger'}
                        className="mt-2 height-8"
                        style={{ height: '8px' }}
                      />
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            {/* Project Timeline */}
            <Col xl={4}>
              <Card>
                <Card.Header className="bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Project Timeline</h5>
                  <Button variant="outline-primary" size="sm">View All</Button>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="list-group list-group-flush">
                    {projectTimeline.map((item, index) => (
                      <div key={index} className="list-group-item border-0 py-3">
                        <div className="d-flex">
                          <div className="me-3 text-center" style={{ minWidth: '24px' }}>
                            <div className={`icon-shape icon-xs rounded-circle ${item.status === 'completed' ? 'bg-soft-success text-success' : item.status === 'in-progress' ? 'bg-soft-warning text-warning' : 'bg-soft-secondary text-secondary'}`}>
                              <i className={`bi ${item.status === 'completed' ? 'bi-check' : item.status === 'in-progress' ? 'bi-arrow-repeat' : 'bi-clock'}`}></i>
                            </div>
                            {index < projectTimeline.length - 1 && (
                              <div className="vr h-100 my-1 opacity-25"></div>
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="mb-0">{item.title}</h6>
                              <small className="text-muted">{item.date}</small>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-1">
                              <small className="text-muted">
                                {item.completed} of {item.tasks} tasks
                              </small>
                              <ProgressBar now={(item.completed / item.tasks) * 100} className="height-8" variant={item.status === 'completed' ? 'success' : item.status === 'in-progress' ? 'warning' : 'secondary'}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={8}>
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
                  <Col key={index} md={6} lg={4}>
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
              </Row>
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
            </Col>
            <Col xl={4}>
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
                  <CardTitle>Upcoming Events</CardTitle>
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
        </Container>
      </div>
      <Footer />
    </div>
  )
}

export default Widgets;
