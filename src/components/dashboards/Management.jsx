import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Table, ProgressBar, Button, Form, ListGroup, ButtonGroup } from 'react-bootstrap';
import PageTitle from '../layout/PageTitle';
import Footer from '../layout/Footer';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import ChartCustomTooltip from './ChartCustomTooltip';
import data from '../../data/dashboard/management.json';

const Management = () => {
  const { stats, teamMembers, recentActivities, projectProgressData, resourceAllocationData, performanceMetrics, projectTimeline } = data.managementdata;
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

  // Data for each stat's chart
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
  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="Dashboards" pageTitle="Management" />
        <Container fluid>
          {/* Stats Cards */}
          <Row>
            {stats.map((stat, index) => (
              <Col key={index} xl={3} md={6}>
                <Card>
                  <Card.Body className="py-3 px-4">
                    <div className='d-flex flex-wrap justify-content-between align-items-start gap-2'>
                      {/* Left: Icon + Text */}
                      <div className="d-flex align-items-center">
                        <div className={`avatar avatar-md bg-gradient-${stat.color} text-white rounded-3 me-3 d-flex align-items-center justify-content-center`}>
                          <i className={`fs-4 ${stat.icon}`}></i>
                        </div>
                        <div>
                          <h6 className="text-muted mb-1">{stat.title}</h6>
                          <h4 className="mb-0">{stat.value}</h4>
                        </div>
                      </div>
                      <div className="">
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
            {/* Project Progress */}
            <Col xl={8}>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-4">Project Progress</Card.Title>
                  <div style={{ height: '345px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={projectProgressData}>
                        <defs>
                          <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5e72e4" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#5e72e4" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip background="none" cursor={false} content={<ChartCustomTooltip />} />
                        <Bar barSize={24} dataKey="progress" fill="url(#progressGradient)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Team Members */}
            <Col xl={4}>
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Card.Title className="mb-0">Team Members</Card.Title>
                    <Button variant="outline-primary" size="sm">View All</Button>
                  </div>
                  <div className="">
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
                          <Badge bg={member.status === 'Active' ? 'soft-success' : 'soft-secondary'} className="text-uppercase">
                            {member.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Recent Activities */}
            <Col xl={12}>
              <Card>
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className='mb-0'>Recent Activities</Card.Title>
                    <Form.Select size="sm" className='w-auto' >
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>This Year</option>
                      </Form.Select>
                    </div>
                  <Table responsive hover className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0">Task</th>
                        <th className="border-0">Assigned To</th>
                        <th className="border-0">Due Date</th>
                        <th className="border-0">Status</th>
                        <th className="border-0 text-end">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities.map((activity, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="icon-shape icon-sm bg-soft-primary rounded-3 me-3">
                                <i className={`bi bi-${activity.icon} text-primary`}></i>
                              </div>
                              <div>
                                <h6 className="mb-0">{activity.task}</h6>
                                <small className="text-muted">{activity.project}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="avatar-group">
                              {activity.assignedTo.map((id, i) => {
                                const user = teamMembers.find(m => m.id === id);
                                return user ? (
                                  <div key={i} className="avatar avatar-sm text-primary me-1 bg-soft-primary rounded-circle" title={user.name}>
                                    {user.avatar}
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </td>
                          <td>{activity.dueDate}</td>
                          <td>
                            <Badge bg={activity.status === 'Completed' ? 'soft-success' :
                              activity.status === 'In Progress' ? 'soft-warning' : 'soft-secondary'}
                              className="text-uppercase">
                              {activity.status}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex align-items-center justify-content-end">
                              <div className="me-3" style={{ width: '100px' }}>
                                <ProgressBar now={activity.progress} className='height-8' variant={activity.progress === 100 ? 'success' : 'primary'} />
                              </div>
                              <small className="text-muted">{activity.progress}%</small>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Additional Management Sections */}
          <Row>
            {/* Resource Allocation */}
            <Col lg={6} xl={4}>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-2">Resource Allocation</Card.Title>
                  <div style={{ height: '285px' }}>
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
                      <div key={index} className={`d-flex justify-content-between align-items-center ${index !== resourceAllocationData.length - 1 ? "mb-3" : "mb-0"}`}>
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
                <Card.Body>
                  <Card.Title className="mb-4">Performance Metrics</Card.Title>
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className={`${index !== performanceMetrics.length - 1 ? "mb-3 pb-3 border-bottom" : ""}`}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-muted fs-15">{metric.metric}</span>
                        <span className={`badge bg-soft-${metric.trend === 'up' ? 'success' : 'danger'} text-${metric.trend === 'up' ? 'success' : 'danger'}`}>
                          <i className={`bi bi-arrow-${metric.trend === 'up' ? 'up' : 'down'}`}></i>
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-semibold">
                          {typeof metric.current === 'number' && metric.current % 1 !== 0
                            ? metric.current.toFixed(1)
                            : metric.current}
                          {typeof metric.current === 'number' && metric.current <= 100 ? '%' : ''}
                        </h5>
                        <small className="text-muted">Target: {metric.target}{typeof metric.target === 'number' && metric.target <= 100 ? '%' : ''}</small>
                      </div>
                      <ProgressBar className="mt-2 height-8"
                        now={metric.current}
                        max={metric.target}
                        variant={metric.trend === 'up' ? 'success' : 'danger'}
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
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className='mb-0'>Project Timeline</Card.Title>
                    <Button variant="outline-primary" size="sm">View All</Button>
                  </div>
                  <div>
                    {projectTimeline.map((item, index) => (
                      <div key={index} className={`list-group-item border-0 ${index !== projectTimeline.length - 1 ? "pt-3 pb-2" : "pt-3"}`}>
                        <div className="d-flex">
                          <div className="me-3 text-center" style={{ minWidth: '24px' }}>
                            <div className={`icon-shape icon-xs rounded-circle ${item.status === 'completed' ? 'bg-soft-success text-success' : item.status === 'in-progress' ? 'bg-soft-warning text-warning' : 'bg-soft-secondary text-secondary'}`}>
                              <i className={`bi ${item.status === 'completed' ? 'bi-check' : item.status === 'in-progress' ? 'bi-arrow-repeat' : 'bi-clock'}`}></i>
                            </div>
                            {index < projectTimeline.length - 1 && (
                              <div className="vr h-75 my-1 opacity-25"></div>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Team Performance */}
            <Col xl={6}>
              <Card>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className='mb-4'>Team Performance Overview</Card.Title>
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
                        <ListGroup.Item key={index} className="border-0 ">
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-sm avatar-title rounded-circle bg-soft-primary text-primary me-3">
                                {member.name.charAt(0)}
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

                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Team Activity</h6>
                      <div className="avatar-group">
                        {teamMembers.slice(0, 4).map((member, index) => (
                          <div key={index} className="avatar  avatar-sm bg-soft-primary me-1 rounded-circle text-primary" title={member.name}>
                            {member.name.charAt(0)}
                          </div>
                        ))}
                        {teamMembers.length > 4 && (
                          <div className="avatar avatar-xs rounded-circle bg-light">
                            <span className="avatar-title text-muted">
                              +{teamMembers.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Budget vs Expenses */}
            <Col xl={6}>
              <Card >
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className='mb-0'>Budget vs Expenses</Card.Title>
                    <ButtonGroup className="ms-auto" size="xs" role="group">
                      <Button variant="outline-secondary" size="xs" active>Monthly</Button>
                      <Button variant="outline-secondary" size="xs">Quarterly</Button>
                      <Button variant="outline-secondary" size="xs">Yearly</Button>
                    </ButtonGroup>
                  </div>
                  <div style={{ height: '410px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={projectProgressData} margin={{ top: 0, right: 0, left: -24, bottom: 5 }}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="progress" name="Progress" stroke="#5e72e4" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="budget" name="Budget" stroke="#2dce89" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="issues" name="Issues" stroke="#f5365c" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Management;
