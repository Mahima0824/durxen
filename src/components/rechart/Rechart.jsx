import PageTitle from "../layout/PageTitle";
import React, { useEffect, useState } from 'react';
import { Button, Card, CardTitle, Col, Container, Dropdown, Row } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line, CartesianGrid, LineChart, PieChart, Pie, Cell, Area, AreaChart, ReferenceLine, Brush, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Scatter } from 'recharts';
import ChartCustomTooltip from '../dashboards/ChartCustomTooltip';
import Footer from "../layout/Footer";

const data = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 2000, pv: 9800 },
  { name: 'Page D', uv: 2780, pv: 3908 },
  { name: 'Page E', uv: 1890, pv: 4800 },
  { name: 'Page F', uv: 2390, pv: 3800 },
  { name: 'Page G', uv: 3490, pv: 4300 },
];
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'C1', value: 150 },
]

// Performance data for radar chart
const performanceData = [
  { subject: 'Design', A: 85, B: 65 },
  { subject: 'Development', A: 75, B: 80 },
  { subject: 'Marketing', A: 60, B: 75 },
  { subject: 'Sales', A: 90, B: 70 },
  { subject: 'Support', A: 70, B: 85 },
  { subject: 'HR', A: 65, B: 60 },
  { subject: 'Finance', A: 80, B: 90 },
];

// Banded range chart data for user activity
const bandedRangeChartData = [
  { name: 'Week 1', min: 20, max: 80, average: 50 },
  { name: 'Week 2', min: 30, max: 90, average: 60 },
  { name: 'Week 3', min: 40, max: 100, average: 70 },
  { name: 'Week 4', min: 35, max: 95, average: 65 },
  { name: 'Week 5', min: 45, max: 105, average: 75 },
  { name: 'Week 6', min: 50, max: 110, average: 80 },
  { name: 'Week 7', min: 55, max: 115, average: 85 },
  { name: 'Week 8', min: 60, max: 120, average: 90 },
];

const data03 = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 200 },
  { name: 'May', value: 400 },
  { name: 'Jun', value: 250 },
];
const data04 = [
  { name: 'Page A', uv: 590, pv: 800, amt: 1400, cnt: 490 },
  { name: 'Page B', uv: 868, pv: 967, amt: 1506, cnt: 590 },
  { name: 'Page C', uv: 1397, pv: 1098, amt: 989, cnt: 350 },
  { name: 'Page D', uv: 1480, pv: 1200, amt: 1228, cnt: 480 },
  { name: 'Page E', uv: 1520, pv: 1108, amt: 1100, cnt: 460 },
  { name: 'Page F', uv: 1400, pv: 680, amt: 1700, cnt: 380 },
];
const data05 = [
  { name: '1', uv: 300, pv: 456 },
  { name: '2', uv: -145, pv: 230 },
  { name: '3', uv: -100, pv: 345 },
  { name: '4', uv: -8, pv: 450 },
  { name: '5', uv: 100, pv: 321 },
  { name: '6', uv: 9, pv: 235 },
  { name: '7', uv: 53, pv: 267 },
  { name: '8', uv: 252, pv: -378 },
  { name: '9', uv: 79, pv: -210 },
  { name: '10', uv: 294, pv: -23 },
  { name: '12', uv: 43, pv: 45 },
  { name: '13', uv: -74, pv: 90 },
  { name: '14', uv: -71, pv: 130 },
  { name: '15', uv: -117, pv: 11 },
  { name: '16', uv: -186, pv: 107 },
  { name: '17', uv: -16, pv: 926 },
  { name: '18', uv: -125, pv: 653 },
  { name: '19', uv: 222, pv: 366 },
  { name: '20', uv: 372, pv: 486 },
  { name: '21', uv: 182, pv: 512 },
  { name: '22', uv: 164, pv: 302 },
  { name: '23', uv: 316, pv: 425 },
  { name: '24', uv: 131, pv: 467 },
  { name: '25', uv: 291, pv: -190 },
  { name: '26', uv: -47, pv: 194 },
  { name: '27', uv: -415, pv: 371 },
  { name: '28', uv: -182, pv: 376 },
  { name: '29', uv: -93, pv: 295 },
  { name: '30', uv: -99, pv: 322 },
  { name: '31', uv: -52, pv: 246 },
  { name: '32', uv: 154, pv: 33 },
  { name: '33', uv: 205, pv: 354 },
  { name: '34', uv: 70, pv: 258 },
  { name: '35', uv: -25, pv: 359 },
  { name: '36', uv: -59, pv: 192 },
  { name: '37', uv: -63, pv: 464 },
  { name: '38', uv: -91, pv: -2 },
  { name: '39', uv: -66, pv: 154 },
  { name: '40', uv: -50, pv: 186 },
];
const data06 = [
  { subject: 'Math', A: 120, B: 110 },
  { subject: 'Science', A: 98, B: 130 },
  { subject: 'History', A: 86, B: 105 },
  { subject: 'English', A: 99, B: 90 },
  { subject: 'Art', A: 85, B: 100 },
  { subject: 'Sports', A: 65, B: 85 },
];

const CustomLegend1 = () => (
  <div className="d-flex gap-4 justify-content-center mt-2">
    <span><i className="ri-bar-chart-fill text-primary me-1" /> PV</span>
    <span><i className="ri-bar-chart-fill text-success me-1" /> UV</span>
  </div>
);

const CustomLegend2 = () => (
  <div className="d-flex gap-4 justify-content-center mt-2">
    <span><i className="ri-bar-chart-line text-success me-1" /> PV</span>
    <span><i className="ri-bar-chart-line text-danger me-1" /> UV</span>
  </div>
);

const CustomLegend3 = () => (
  <div className="d-flex gap-4 justify-content-center mt-2">
    <span><i className="bi bi-circle-fill text-primary me-1" /> Inner</span>
    <span><i className="bi bi-circle-fill text-success me-1" /> Outer</span>
  </div>
);

const Rechart = () => {
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

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <PageTitle pageTitle="Rechart" pagePrTitle="Charts" />
        <Container fluid>
          <Row className="">
            <Col md={4}>
              <Card>
                <Card.Body className="p-4">
                  <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1'>
                    <CardTitle className='mb-0'>Gradient Bar Chart</CardTitle>
                    <div className='d-flex align-items-center flex-wrap column-gap-2'>
                      <Button size='sm' variant="soft-dark"><i className="bi bi-funnel me-1"></i> Filter</Button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barCategoryGap={20}>
                      <defs>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(0, 0, 0, 0.15)" floodOpacity="1" />
                        </filter>

                        {/* Gradient for primary: soft tint → bold → soft tint */}
                        <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.4" />
                          <stop offset="50%" stopColor={colors.primary} stopOpacity="0.9" />
                          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.6" />
                        </linearGradient>

                        {/* Success gradient: light to dark */}
                        <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.success} stopOpacity="0.3" />
                          <stop offset="40%" stopColor={colors.success} stopOpacity="0.7" />
                          <stop offset="100%" stopColor={colors.success} stopOpacity="1" />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip background="none" label="false" cursor={{ fill: 'transparent' }} content={<ChartCustomTooltip />} />
                      <Legend content={<CustomLegend1 />} />
                      <Bar dataKey="pv" stackId="a" fill="url(#primaryGradient)" barSize={24} activeBar={false} radius={[0, 0, 6, 6]} filter="url(#shadow)" />
                      <Bar dataKey="uv" stackId="a" fill="url(#successGradient)" barSize={24} activeBar={false} radius={[6, 6, 0, 0]} filter="url(#shadow)" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body className="p-4">
                  <div className='d-flex align-items-center flex-wrap justify-content-between column-gap-2 row-gap-1'>
                    <CardTitle className='mb-0'>Gradient Bar Chart</CardTitle>
                    <div className='d-flex align-items-center flex-wrap column-gap-2'>
                      <Button size='sm' variant="soft-primary"><i className="bi bi-funnel me-1"></i> Filter</Button>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="linePrimaryGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={colors.success} stopOpacity="0.3" />
                          <stop offset="50%" stopColor={colors.success} stopOpacity="1" />
                          <stop offset="100%" stopColor={colors.success} stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="lineSuccessGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={colors.danger} stopOpacity="0.3" />
                          <stop offset="50%" stopColor={colors.danger} stopOpacity="1" />
                          <stop offset="100%" stopColor={colors.danger} stopOpacity="0.3" />
                        </linearGradient>
                        <filter id="lineShadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.15" />
                        </filter>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} hide />
                      <YAxis tick={{ fontSize: 12 }} hide />
                      <Tooltip content={<ChartCustomTooltip />} background="none"
                        label="false"
                        cursor={{ stroke: '#ffffff', strokeWidth: 1, }} />
                      <Legend content={<CustomLegend2 />} />

                      <Line type="monotone" dataKey="pv" stroke="url(#linePrimaryGradient)" strokeWidth={3} strokeDasharray="6 4" dot={{ fill: colors.primary, stroke: colors.primary, strokeWidth: 0, r: 0, }} filter="url(#lineShadow)" />
                      <Line type="monotone" dataKey="uv" stroke="url(#lineSuccessGradient)" strokeWidth={3} strokeDasharray="6 4" dot={{ fill: colors.primary, stroke: colors.primary, strokeWidth: 0, r: 0, }} filter="url(#lineShadow)" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <h5 className="mb-3">Two Level Pie Chart</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <defs>
                        <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.15" />
                        </filter>
                        {/* Inner ring gradient */}
                        <linearGradient id="piePrimaryGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8" />
                          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.4" />
                        </linearGradient>

                        {/* Outer ring gradient */}
                        <linearGradient id="pieSuccessGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.success} stopOpacity="0.8" />
                          <stop offset="100%" stopColor={colors.success} stopOpacity="0.4" />
                        </linearGradient>

                        {/* Drop shadow filter */}
                        <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.1)" />
                        </filter>
                      </defs>

                      {/* Inner Ring */}
                      <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={30} paddingAngle={2} stroke="#fff" strokeWidth={2} label={false}>
                        {data01.map((entry, index) => (
                          <Cell key={`cell-inner-${index}`} fill="url(#piePrimaryGradient)" stroke="#fff" strokeWidth={2} filter="url(#pieShadow)" />
                        ))}
                      </Pie>

                      {/* Outer Ring */}
                      <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2} stroke="#fff" strokeWidth={2} label={false}>
                        {data02.map((entry, index) => (
                          <Cell key={`cell-outer-${index}`} fill="url(#pieSuccessGradient)" stroke="#fff" strokeWidth={2} filter="url(#pieShadow)" />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartCustomTooltip />} contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', border: 'none', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }} />
                      <Legend content={<CustomLegend3 />} layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body className="p-4">
                  <h5 className="mb-3">Area Chart Fill By Value</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data03}>
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.orange} stopOpacity={0.7} />
                          <stop offset="60%" stopColor={colors.orange} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={colors.orange} stopOpacity={0.1} />
                        </linearGradient>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="20" stdDeviation="5" floodColor={colors.orange} floodOpacity="0.2" />
                        </filter>
                      </defs>
                      <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#dee2e6" />
                      <XAxis dataKey="name" axisLine={{ stroke: '#e9ecef' }} tickLine={false} tickMargin={12} tick={{ fill: '#6c757d', fontSize: 12, fontWeight: 500 }} padding={{ left: 10, right: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tickMargin={12} tick={{ fill: '#6c757d', fontSize: 12, fontWeight: 500 }} width={40} />
                      <Tooltip content={<ChartCustomTooltip />} background="none" label="false" cursor={{ strokeWidth: 1, stroke: colors.orange, opacity: 0.5 }} />
                      <Area type="monotone" dataKey="value" stroke={colors.orange} strokeWidth={3} fill="url(#valueGradient)" style={{ filter: 'url(#shadow)' }} dot={{ r: 4, stroke: 'white', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body className="p-4">
                  <h5 className="mb-3">Stacked Area Chart</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.danger} stopOpacity={0.7} />
                          <stop offset="50%" stopColor={colors.danger} stopOpacity={0.2} />
                          <stop offset="100%" stopColor={colors.danger} stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="pvGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.success} stopOpacity={0.7} />
                          <stop offset="50%" stopColor={colors.success} stopOpacity={0.2} />
                          <stop offset="100%" stopColor={colors.success} stopOpacity={0.1} />
                        </linearGradient>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="20" stdDeviation="5" floodColor={colors.success} floodOpacity="0.2" />
                        </filter>
                      </defs>

                      <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#dee2e6" />
                      <XAxis dataKey="name" axisLine={{ stroke: '#e9ecef' }} tickLine={false} tickMargin={12} tick={{ fill: '#6c757d', fontSize: 12, fontWeight: 500 }} padding={{ left: 10, right: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tickMargin={12} tick={{ fill: '#6c757d', fontSize: 12, fontWeight: 500 }} width={60} />
                      <Tooltip content={<ChartCustomTooltip />} background="none" label="false" cursor={{ strokeWidth: 1, stroke: colors.danger, opacity: 0.5 }} />

                      <Area type="monotone" dataKey="uv" stackId="1" stroke={colors.danger} fill="url(#uvGradient)" style={{ filter: 'url(#shadow)' }} />
                      <Area type="monotone" dataKey="pv" stackId="1" stroke={colors.success} fill="url(#pvGradient)" style={{ filter: 'url(#shadow)' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12}>
              <Card >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="mb-1 fw-semibold text-dark">Bar Chart</h5>
                      <p className="text-muted mb-0">Revenue vs Expenses</p>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm">This Year</Button>
                      <Button variant="outline-secondary" size="sm">Export</Button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={data05} margin={{ top: 10, right: 10, left: 10, bottom: 10 }} barGap={0} barCategoryGap="15%">
                      <defs>
                        {/* Gradient for Positive Values */}
                        <linearGradient id="positiveGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.primary} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={colors.primary} stopOpacity={0.3} />
                        </linearGradient>

                        {/* Gradient for Negative Values */}
                        <linearGradient id="negativeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.danger} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={colors.danger} stopOpacity={0.3} />
                        </linearGradient>

                        {/* Glow Effect */}
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f3f9" strokeWidth={1} />

                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 11, fontWeight: 500 }} tickMargin={12} tickFormatter={(value) => `W${value}`} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6c757d', fontSize: 11, fontWeight: 500 }} tickMargin={10} width={40} tickFormatter={(value) => `$${value / 1000}k`} />
                      <Tooltip content={<ChartCustomTooltip />} cursor={false} />
                      <ReferenceLine y={0} stroke="#dee2e6" strokeWidth={1.5} />
                      <Brush dataKey="name" height={24} stroke="#e9ecef" fill="#f8f9fa" strokeWidth={1} tickFormatter={() => ''} className="rounded">
                        <BarChart>
                          <Bar dataKey="pv" fill={colors.primary} fillOpacity={0.2} radius={[4, 4, 4, 4]} />
                        </BarChart>
                      </Brush>

                      <Bar dataKey="pv" name="Revenue" stackId="stack" style={{ filter: 'url(#glow)' }} radius={[4, 4, 0, 0]}>
                        {data05.map((entry, index) => (
                          <Cell key={`cell-pos-${index}`} fill={entry.pv > 0 ? 'url(#positiveGradient)' : 'url(#negativeGradient)'} />
                        ))}
                      </Bar>

                      <Bar dataKey="uv" name="Expenses" stackId="stack" style={{ filter: 'url(#glow)' }} radius={[4, 4, 0, 0]}>
                        {data05.map((entry, index) => (
                          <Cell key={`cell-neg-${index}`} fill={entry.uv < 0 ? 'url(#negativeGradient)' : 'url(#positiveGradient)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="mb-1 fw-semibold text-dark">Performance Metrics</h5>
                      <p className="text-muted mb-0">Skill assessment overview</p>
                    </div>
                    <div className="dropdown">
                      <Dropdown.Toggle variant="outline-secondary" size="sm"  >This Month <i className="ri-arrow-down-s-line ms-1"></i></Dropdown.Toggle>
                      <Dropdown.Menu className="" align="end">
                        <Dropdown.Item>This Week</Dropdown.Item>
                        <Dropdown.Item>This Month</Dropdown.Item>
                        <Dropdown.Item>This Year</Dropdown.Item>
                      </Dropdown.Menu>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data06} margin={{ top: 30, right: 20, bottom: 20, left: 20 }}>
                      {/* Gradient & Glow */}
                      <defs>
                        <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.purple} stopOpacity={0.85} />
                          <stop offset="100%" stopColor={colors.purple} stopOpacity={0.45} />
                        </linearGradient>
                        <filter id="radarGlow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="6" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                        <linearGradient id="radarGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.orange} stopOpacity={0.85} />
                          <stop offset="100%" stopColor={colors.orange} stopOpacity={0.45} />
                        </linearGradient>
                      </defs>

                      {/* Grid & Axes */}
                      <PolarGrid stroke={colors.dark} opacity={0.5} strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#6c757d', fontSize: 12, fontWeight: 500 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: '#6c757d', fontSize: 11 }} axisLine={false} tickCount={5} />

                      {/* Tooltip */}
                      <Tooltip content={<ChartCustomTooltip />} />

                      {/* Radars */}
                      <Radar name="Performance" dataKey="A" stroke={colors.purple} fill="url(#radarGradient)" fillOpacity={0.7} strokeWidth={2} dot={{
                        fill: colors.purple,
                        stroke: colors.purple,
                        strokeWidth: 1.5,
                        r: 3.5,
                      }}
                        activeDot={{
                          fill: colors.purple,
                          stroke: '#fff',
                          strokeWidth: 1.5,
                          r: 6,
                        }}
                        style={{ filter: 'url(#radarGlow)' }}
                      />
                      <Radar fill="url(#radarGradient2)" name="Target" dataKey="B" stroke={colors.orange} strokeDasharray="4 2" fillOpacity={0} strokeWidth={1} dot={{
                        fill: colors.orange,
                        stroke: colors.orange,
                        strokeWidth: 1.5,
                        r: 3.5,
                      }}
                        activeDot={{
                          fill: colors.orange,
                          stroke: '#fff',
                          strokeWidth: 1.5,
                          r: 6,
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="mb-1 fw-semibold text-dark">Performance Overview</h5>
                      <p className="text-muted mb-0">Key metrics analysis</p>
                    </div>
                    <div className="dropdown">
                      <Dropdown.Toggle variant="outline-secondary" size="sm">This Month <i className="ri-arrow-down-s-line ms-1"></i></Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Item>This Week</Dropdown.Item>
                        <Dropdown.Item>This Month</Dropdown.Item>
                        <Dropdown.Item>This Year</Dropdown.Item>
                      </Dropdown.Menu>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                      <defs>
                        <linearGradient id="radarGradient3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.primary} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={colors.primary} stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <PolarGrid stroke={colors.secondary} strokeWidth={1} opacity={0.5} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: colors.dark, fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: colors.dark, fontSize: 10 }} />
                      <Radar name="Performance" dataKey="A" stroke={colors.dark} fill="url(#radarGradient3)" fillOpacity={0.6} strokeWidth={2} dot={{ fill: colors.dark, strokeWidth: 2, r: 4 }} />
                      <Tooltip content={<ChartCustomTooltip />} />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={10} formatter={(value) => (
                        <span style={{ color: '#6c757d', fontSize: '12px' }}>
                          {value}
                        </span>
                      )}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="">
                <Card.Body className="p-4">
                  <div>
                    <h5 className="mb-1 fw-semibold text-dark">Revenue Trend</h5>
                    <p className="text-muted mb-0">Monthly revenue analysis</p>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={data04} margin={{ top: 15, right: 15, bottom: 20, left: 0 }}>
                      <defs>
                        {/* Area Gradient */}
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.primary} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={colors.primary} stopOpacity={0.1} />
                        </linearGradient>

                        {/* Bar Gradient */}
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.success} stopOpacity={0.9} />
                          <stop offset="100%" stopColor={colors.success} stopOpacity={0.6} />
                        </linearGradient>

                        {/* Glow Effects */}
                        <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>

                        <filter id="lineGlow" x="0" y="0" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: colors.dark }} axisLine={false} tickLine={false} hide />
                      <YAxis tick={{ fontSize: 12, fill: colors.dark }} axisLine={false} tickLine={false} width={40} hide />

                      <Tooltip content={<ChartCustomTooltip />} />

                      <Legend verticalAlign="bottom" iconType="circle" iconSize={10}
                        wrapperStyle={{
                          bottom: '10px'
                        }}
                        formatter={(value) => (
                          <span style={{ color: colors.dark, fontSize: '12px', marginLeft: '5px' }}>
                            {value}
                          </span>
                        )}
                      />

                      {/* Area */}
                      <Area
                        name="Area"
                        type="monotone"
                        dataKey="amt"
                        fill="url(#areaGradient)"
                        stroke={colors.primary}
                        strokeWidth={2}
                        strokeOpacity={1}
                        dot={{ r: 3, fill: colors.white, stroke: colors.primary, strokeWidth: 2 }}
                        activeDot={{ r: 5, fill: colors.white, stroke: colors.primary, strokeWidth: 2 }}
                      />

                      {/* Bar */}
                      <Bar
                        name="Bars"
                        dataKey="pv"
                        barSize={20}
                        fill="url(#barGradient)"
                        radius={[4, 4, 0, 0]}
                        filter="url(#barGlow)"
                      />

                      {/* Line */}
                      <Line
                        name="Line"
                        type="monotone"
                        dataKey="uv"
                        stroke={colors.warning}
                        strokeWidth={2}
                        dot={{
                          stroke: colors.warning,
                          strokeWidth: 2,
                          r: 3,
                          fill: colors.white
                        }}
                        activeDot={{ r: 5, fill: colors.white, stroke: colors.warning, strokeWidth: 2 }}
                        filter="url(#lineGlow)"
                      />

                      {/* Scatter */}
                      <Scatter
                        name="Points"
                        dataKey="cnt"
                        fill={colors.danger}
                        shape="circle"
                        isAnimationActive={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="mb-1 fw-semibold text-dark">Revenue Trend</h5>
                      <p className="text-muted mb-0">Monthly revenue analysis</p>
                    </div>
                    <div className="dropdown">
                      <Button variant="outline-secondary" size="sm">Export <i className="ri-download-2-line ms-1"></i></Button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                      <defs>
                        <linearGradient id="areaGradient1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.primary} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={colors.primary} stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="areaGradient2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={colors.danger} stopOpacity={0.8} />
                          <stop offset="100%" stopColor={colors.danger} stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: colors.dark, fontSize: 12 }}
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: colors.dark, fontSize: 12 }}
                        tickFormatter={(value) => `$${value}K`}
                      />
                      <Tooltip
                        content={<ChartCustomTooltip />}
                        formatter={(value, name) => [`$${value}K`, name === 'uv' ? 'Revenue' : 'Expenses']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="uv"
                        name="Revenue"
                        stroke={colors.primary}
                        fillOpacity={0.8}
                        fill="url(#areaGradient1)"
                        strokeWidth={2}
                        activeDot={{
                          r: 6,
                          fill: '#fff',
                          stroke: colors.primary,
                          strokeWidth: 2,
                          style: { filter: 'drop-shadow(0px 0px 5px rgba(93, 135, 255, 0.5))' }
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        name="Expenses"
                        stroke={colors.danger}
                        fillOpacity={0.1}
                        fill="url(#areaGradient2)"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        activeDot={{
                          r: 6,
                          fill: '#fff',
                          stroke: colors.danger,
                          strokeWidth: 2,
                          style: { filter: 'drop-shadow(0px 0px 5px rgba(250, 137, 107, 0.5))' }
                        }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={40}
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => (
                          <span style={{ color: colors.dark, fontSize: '12px', marginLeft: '5px' }}>
                            {value}
                          </span>
                        )}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
            {/* New Bar Chart */}
            <Col md={6} >
              <Card>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="mb-1 fw-semibold text-dark">User Activity</h5>
                      <p className="text-muted mb-0">Weekly user engagement</p>
                    </div>
                    <div className="dropdown">
                      <Button variant="outline-secondary" size="sm"><i className="ri-download-2-line"></i></Button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={bandedRangeChartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                      <defs>
                        <linearGradient id="rangeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={colors.purple} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={colors.purple} stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={colors.success} />
                          <stop offset="100%" stopColor={colors.warning} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: colors.dark, fontSize: 12 }}
                        padding={{ left: 20, right: 20 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: colors.dark, fontSize: 12 }}
                        domain={[0, 120]}
                      />
                      <Tooltip content={<ChartCustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="max"
                        stroke="transparent"
                        fill="url(#rangeGradient)"
                        fillOpacity={0.3}
                        activeDot={false}
                        isAnimationActive={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="min"
                        stroke="transparent"
                        fill="#fff"
                        activeDot={false}
                        isAnimationActive={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="average"
                        stroke="url(#lineGradient)"
                        strokeWidth={3}
                        dot={{
                          fill: colors.white,
                          stroke: colors.primary,
                          strokeWidth: 2,
                          r: 4,
                          strokeDasharray: '0',
                        }}
                        activeDot={{
                          r: 6,
                          fill: colors.white,
                          stroke: colors.primary,
                          strokeWidth: 3,
                        }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={50}
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => (
                          <span style={{ color: colors.dark, fontSize: '12px', marginLeft: '5px' }}>
                            {value === 'average' ? 'Average' : value === 'max' ? 'Max Range' : 'Min Range'}
                          </span>
                        )}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
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

export default Rechart;
