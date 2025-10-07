import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, CardTitle, Button, Form, Image, Badge, Dropdown, Table, ProgressBar } from 'react-bootstrap';
import PageTitle from '../layout/PageTitle';
import Footer from '../layout/Footer';

// Chart
import { AreaChart, Area, BarChart, Bar, Tooltip, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import ChartCard from './ChartCard';
import ChartCustomTooltip from './ChartCustomTooltip';
import prod1 from '../../images/products/prod-1.jpg';
import prod2 from '../../images/products/prod-2.jpg';
import prod3 from '../../images/products/prod-3.jpg';
import prod4 from '../../images/products/prod-4.jpg';
import english from "../../images/flag/english.png"
import france from "../../images/flag/france.png"
import japanese from "../../images/flag/japanese.png"
import spanish from "../../images/flag/spanish.png"
import CardChip from '../../images/chip.svg';
import data from '../../data/dashboard/e-commerce.json';


export default function EcommerceDash() {
    const images = {
        "prod-1.jpg": prod1,
        "prod-2.jpg": prod2,
        "prod-3.jpg": prod3,
        "prod-4.jpg": prod4
    }
    const flags = {
        "english.png": english,
        "france.png": france,
        "japanese.png": japanese,
        "spanish.png": spanish
    }
    const e_commerce = data.e_commerce;
    const formatK = (num) => {
        return num >= 1000 ? `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k` : num;
    };

    // Products Data
    const prodItemsChart = [
        { name: 'Electronics', value: 12450 },
        { name: 'Fashion', value: 9340 },
        { name: 'Home Decor', value: 7810 },
        { name: 'Health & Beauty', value: 6980 }
    ];

    // Optional: Color palette for each pie slice
    const [colors, setColors] = useState(['#0d6efd', '#198754', '#ffc107']);
    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        setColors([
            rootStyles.getPropertyValue('--bs-primary').trim(),
            rootStyles.getPropertyValue('--bs-success').trim(),
            rootStyles.getPropertyValue('--bs-warning').trim(),
            rootStyles.getPropertyValue('--bs-info').trim(),
        ]);
    }, []);

    return (
        <>
            <div className='page-wrapper'>
                <div className='page-content'>
                    <PageTitle pagePrTitle="Dashboards" pageTitle="Ecommerce" />
                    <Container fluid>
                        <Row>
                            <Col lg={12} xl={7} xxl={8}>
                                <Row>
                                    <Col sm={6} lg={4} className='mb-4'>
                                        <ChartCard title="$1,25,000" subText="Total Revenue" badgeColor="soft-primary" badgeText="+8.2%" chartData={e_commerce.totalRevenueData} chartDataKay="Products" chartId="totalRevenue" chartColor="#306fd6" />
                                    </Col>
                                    <Col sm={6} lg={4} className='mb-4'>
                                        <ChartCard title="2,650" subText="Total Customer" badgeColor="soft-success" badgeText="+4.7%" chartData={e_commerce.totalCustomerData} chartDataKay="Customer" chartId="totalCustomer" chartColor="#22cdc6" />
                                    </Col>
                                    <Col lg={4} className='mb-4'>
                                        <ChartCard title="₹62,400" subText="Total Profit" badgeColor="soft-info" badgeText="+5.5%" chartData={e_commerce.totalProfitData} chartDataKay="Profit" chartId="totalProfit" chartColor="#1fc2fb" />
                                    </Col>
                                    <Col md={12}>
                                        <Card>
                                            <Card.Body>
                                                <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1'>
                                                    <CardTitle className='mb-0'>Analytics</CardTitle>
                                                    <div className='d-flex align-items-center flex-wrap column-gap-2'>
                                                        <Button size='sm' variant="soft-dark"><i className="bi bi-funnel me-1"></i> Filter</Button>
                                                        <Form>
                                                            <Form.Group className='input-select-icon'>
                                                                <i className="bi bi-calendar2-check input-icon"></i>
                                                                <Form.Select size='sm' id='analyticsTimeSelect' name='analyticsTimeSelect' >
                                                                    <option value={'ThisMonth'}>This Month</option>
                                                                    <option value={'LastMonth'}>Last Month</option>
                                                                    <option value={'Last6Month'}>Last 6 Month</option>
                                                                    <option value={'LastYear'}>Last Year</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Form>
                                                    </div>
                                                </div>

                                                <div className='mt-4' style={{ width: '100%', height: 368 }}>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart data={e_commerce.analyticsChartData} margin={{ left: -30, top: 10, right: 10 }}>
                                                            <defs>
                                                                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                                                    <feDropShadow dx="0" dy="20" stdDeviation="5" floodColor="#283b5c" floodOpacity="0.2" />
                                                                </filter>
                                                                <linearGradient id="analyticsChartColor" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="0%" stopColor="#306fd6" stopOpacity={0.5} />
                                                                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#dee2e6" />
                                                            <XAxis dataKey="date" />
                                                            <YAxis tickFormatter={formatK} />
                                                            <Tooltip cursor={{ stroke: '#306fd6', strokeWidth: 2, strokeDasharray: '5 5', }} content={<ChartCustomTooltip />} />
                                                            <Area type="monotone" dataKey="Sales" stroke="#306fd6" strokeWidth={3} fill="url(#analyticsChartColor)" style={{ filter: 'url(#shadow)' }} />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={12} xl={5} xxl={4}>
                                <Row>
                                    <Col md={6} xl={12}>
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

                                    <Col md={6} xl={12}>
                                        <Card>
                                            <Card.Body>
                                                <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-lg-4 mb-xl-3'>
                                                    <CardTitle className='mb-0'>Income</CardTitle>
                                                    <Badge bg="light" className='badge-lg'>Today</Badge>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className='avatar avatar-xxxl avatar-success rounded'>
                                                        <i className="ri-hand-coin-fill"></i>
                                                    </div>
                                                    <div>
                                                        <div className='d-flex flex-wrap align-items-center column-gap-3 row-gap-1 mb-2'>
                                                            <h3 className='fw-semibold mb-0'>$62,400</h3><span><Badge bg='soft-success'>+4.3% <i className="bi bi-caret-up-square"></i></Badge></span>
                                                        </div>
                                                        <p className='text-muted mb-0'>Compared to $50,800 yesterday</p>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                        <Card>
                                            <Card.Body>
                                                <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1 mb-lg-4 mb-xl-3'>
                                                    <CardTitle className='mb-0'>Expenses</CardTitle>
                                                    <Badge bg="light" className='badge-lg'>Today</Badge>
                                                </div>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className='avatar avatar-xxxl avatar-danger rounded'>
                                                        <i className="ri-cash-line"></i>
                                                    </div>
                                                    <div>
                                                        <div className='d-flex flex-wrap align-items-center column-gap-3 row-gap-1 mb-2'>
                                                            <h3 className='fw-semibold mb-0'>$40,200</h3><span><Badge bg='soft-danger'>−3.1% <i className="bi bi-caret-down-square"></i></Badge></span>
                                                        </div>
                                                        <p className='text-muted mb-0'>Compared to $45,600 yesterday</p>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xl={8} className='order-1 order-xl-2'>
                                <Card>
                                    <Card.Body>
                                        <div className="d-flex justify-content-between">
                                            <Card.Title>Stock Report</Card.Title>
                                            <Dropdown align="end">
                                                <Dropdown.Toggle className='card-drop-icon' variant="" id="carddrop1"><i className="bi bi-three-dots-vertical fs-20"></i></Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#"><i className="bi bi-arrow-clockwise me-2"></i> Refresh Report</Dropdown.Item>
                                                    <Dropdown.Item href="#"><i className="bi bi-box-seam me-2"></i> Manage Inventory</Dropdown.Item>
                                                    <Dropdown.Item href="#"><i className="bi bi-gear me-2"></i> Stock Settings</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>

                                        <Table responsive hover className='mb-0 table-nowrap align-middle'>
                                            <thead className='table-light'>
                                                <tr>
                                                    {e_commerce.stockTable.headers.map((header, index) => (
                                                        <th key={index}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {e_commerce.stockTable.rows.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className='d-flex align-items-center gap-3'>
                                                                <Image src={images[row.prodImg]} alt={row.productName} rounded className="avatar-xs shadow" />
                                                                <h6 className='mb-0'>{row.productName}</h6>
                                                            </div>
                                                        </td>
                                                        <td>{row.productId}</td>
                                                        <td>{row.price}</td>
                                                        <td>
                                                            <Badge bg={row.status === 'In Stock' ? 'success' : row.status === 'Low Stock' ? 'warning' : row.status === 'Out of Stock' ? 'danger' : 'light'}>
                                                                {row.status}
                                                            </Badge>
                                                        </td>
                                                        <td>{row.date}</td>
                                                        <td>{row.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={6} xl={4} className='order-2 order-xl-1'>
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
                            <Col md={6} xl={4} className='order-3'>
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
                            <Col md={6} xl={4} className='order-4'>
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
                                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
                            <Col md={6} xl={4} className='order-5'>
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
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    )
}
