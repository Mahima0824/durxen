import React from 'react';
import { Badge, Card, Col, Row, Dropdown } from 'react-bootstrap';
import { AreaChart, Area, Tooltip, ResponsiveContainer, XAxis } from 'recharts';
import ChartCustomTooltip from './ChartCustomTooltip';

export default function ChartCard({ title, subText, badgeColor, badgeText, chartData, chartColor, chartId, chartDataKay }) {
    return (
        <>
            <Card className='mb-0'>
                <Card.Body>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex flex-wrap align-items-center column-gap-3 row-gap-1 mb-2'>
                            <h3 className='fw-semibold mb-0'>{title}</h3><span><Badge bg={badgeColor}>{badgeText}</Badge></span>
                        </div>
                        <Dropdown align="end">
                            <Dropdown.Toggle className='card-drop-icon mt-1' variant="" id="carddrop1"><i className="bi bi-three-dots-vertical fs-20"></i></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/view-dashboard">Day</Dropdown.Item>
                                <Dropdown.Item href="#/manage-users">Week</Dropdown.Item>
                                <Dropdown.Item href="#/settings">Year</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <h6 className='mb-3'>{subText}</h6>
                    <Row className='align-items-end'>
                        <Col md={12}>
                            <ResponsiveContainer width="100%" height={80}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id={chartId} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={chartColor} stopOpacity={0.15} />
                                            <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" hide />
                                    <Tooltip cursor={{ stroke: 'none' }} content={<ChartCustomTooltip />} />
                                    <Area type="step" dataKey={chartDataKay} stroke={chartColor} fill={`url(#${chartId})`} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}
