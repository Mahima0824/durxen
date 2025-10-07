import React, { useState, useMemo } from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';
import PageTitle from '../layout/PageTitle';
import ReactApexChart from 'react-apexcharts';
import Footer from '../layout/Footer';

const Apexchart = () => {
    const [colors] = useState({
        primary: "#306fd6",
        secondary: "#5e6e86",
        success: "#22cdc6",
        warning: "#e9ce1b",
        info: "#1fc2fb",
        danger: "#f34b7e",
        light: "#e9ecf2",
        dark: "#283b5c",
        purple: "#a05ee8",
        orange: "#ff9453",
    });

    // Memoized chart configs to prevent unnecessary re-renders
    const chartConfigs = useMemo(() => [
        {
            id: 'revenue-analytics',
            title: 'Area gradient chart',
            colClass: 'col-xl-8 col-lg-12',
            type: 'area',
            series: [
                { name: 'Revenue', data: [31000, 40000, 28000, 51000, 42000, 58000, 67000, 71000, 65000, 78000, 82000, 89000] },
                { name: 'Profit', data: [11000, 18000, 12000, 25000, 19000, 32000, 41000, 38000, 35000, 49000, 52000, 61000] },
                { name: 'Expenses', data: [20000, 22000, 16000, 26000, 23000, 26000, 26000, 33000, 30000, 29000, 30000, 28000] }
            ],
            options: {
                chart: {
                    type: 'area', height: 350, toolbar: { show: false }, zoom: { enabled: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.primary,
                        opacity: 0.3
                    }
                },
                colors: [colors.primary, colors.success, colors.danger],
                stroke: { curve: 'smooth', width: 2 },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 0.5,
                        gradientToColors: [colors.primary, colors.success, colors.warning, colors.danger],
                        opacityFrom: 0.9,
                        opacityTo: 0.1,
                        stops: [0, 50, 100]
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    labels: { style: { colors: colors.primary } }
                },
                yaxis: {
                    labels: {
                        formatter: (val) => `$${(val / 1000).toFixed(0)}k`,
                        style: { colors: colors.primary }
                    }
                },
                legend: { position: 'top', horizontalAlign: 'right' },
                grid: { borderColor: '#e0e6ed', strokeDashArray: 5 },
                tooltip: {
                    y: { formatter: (val) => `$${val.toLocaleString()}` }
                }
            }
        },
        {
            id: 'market-share',
            title: 'Donut chart',
            colClass: 'col-xl-4 col-lg-6',
            type: 'donut',
            series: [32.5, 24.8, 18.2, 12.1, 8.7, 3.7],
            options: {
                chart: {
                    type: 'donut', height: 350, toolbar: { show: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.dark,
                        opacity: 0.3
                    }
                },
                labels: ['Mobile Apps', 'Web Platform', 'Desktop', 'API Services', 'Consulting', 'Others'],
                colors: [colors.primary, colors.orange, colors.success, colors.danger, colors.warning, colors.info],
                legend: { position: 'bottom', fontSize: '14px' },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '65%',
                            labels: {
                                show: true,
                                total: {
                                    show: true,
                                    label: 'Total Share',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    formatter: () => '100%'
                                }
                            }
                        }
                    }
                },

                stroke: { show: true, width: 2, colors: ['#fff'] },
                dataLabels: {
                    enabled: false,
                    formatter: (val) => `${val.toFixed(1)}%`,
                    style: {
                        colors: ['#fff'],
                        fontSize: '12px',
                    }
                }

            }
        },
        {
            id: 'performance-metrics',
            title: 'Performance Metrics',
            colClass: 'col-xl-6 col-lg-6',
            type: 'bar',
            series: [
                { name: 'Q1 2024', data: [85, 92, 78, 88, 76, 91] },
                { name: 'Q2 2024', data: [89, 87, 82, 91, 81, 94] }
            ],
            options: {
                chart: {
                    type: 'bar', height: 320, toolbar: { show: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.dark,
                        opacity: 0.3
                    }
                },
                colors: [colors.primary, colors.success],
                plotOptions: {
                    bar: {
                        borderRadius: 8,
                        columnWidth: '60%',
                        dataLabels: { position: 'top' }
                    }
                },
                tooltip: {
                    enabled: true,
                    shared: true,
                    intersect: false,
                    marker: {
                        show: true, // ✅ This shows the circular marker inside tooltip
                    },
                    y: {
                        formatter: function (val) {
                            return `${val}%`; // optional value formatter
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'vertical',
                        shadeIntensity: 0.6,
                        gradientToColors: [colors.primary, colors.success],
                        opacityFrom: 0.9,
                        opacityTo: 0.9,
                        stops: [0, 100]
                    }
                },
                xaxis: {
                    enabled: false,
                    categories: ['Speed', 'Reliability', 'Security', 'Uptime', 'Support', 'Features'],
                    labels: { show: false }
                },
                yaxis: {
                    max: 100,
                    labels: {
                        show: false
                    }
                },
                legend: {
                    position: 'top',
                    markers: {
                        width: 12,
                        height: 12,
                        radius: 6,
                        offsetX: -5,
                        offsetY: 1
                    },
                    itemMargin: {
                        horizontal: 10,
                        vertical: 5
                    },
                    onItemHover: {
                        highlightDataSeries: true
                    }
                },
                grid: { show: false },
                dataLabels: {
                    enabled: false,
                    formatter: (val) => `${val}%`,
                    offsetY: -20,
                    style: { fontSize: '12px', colors: ['#304758'] }
                }
            }
        },
        {
            id: 'user-engagement',
            title: 'Radar chart',
            colClass: 'col-xl-6 col-lg-6',
            type: 'radar',
            series: [
                { name: 'Current Month', data: [88, 76, 92, 85, 79, 94, 81] },
                { name: 'Previous Month', data: [82, 71, 85, 78, 73, 87, 76] }
            ],
            options: {
                chart: {
                    type: 'radar', height: 320, toolbar: { show: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.dark,
                        opacity: 0.3
                    }
                },
                colors: [colors.primary, colors.danger],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'horizontal',
                        shadeIntensity: 0.4,
                        gradientToColors: [colors.gradient6, colors.gradient8],
                        opacityFrom: 0.6,
                        opacityTo: 0.1
                    }
                },
                tooltip: {
                    enabled: true,
                    shared: true,
                    intersect: false,
                    marker: {
                        show: true, // ✅ This shows the circular marker inside tooltip
                    },
                    y: {
                        formatter: function (val) {
                            return `${val}%`; // optional value formatter
                        }
                    }
                },

                stroke: {
                    show: true,
                    width: 3,
                    colors: [colors.dark, colors.primary]
                },
                xaxis: {
                    categories: ['Page Views', 'Session Duration', 'Bounce Rate', 'Click Rate', 'Conversion', 'Retention', 'Satisfaction']
                },
                yaxis: { show: false },
                plotOptions: {
                    radar: {
                        size: 140,
                        polygons: {
                            strokeColors: '#e0e6ed',
                            fill: { colors: ['#f8f9fa', '#ffffff'] }
                        }
                    }
                },
                markers: { size: 4, colors: [colors.primary], strokeWidth: 2 },
                legend: { position: 'bottom' }
            }
        },
        {
            id: 'sales-pipeline',
            title: 'Line chart',
            colClass: 'col-xl-8 col-lg-12',
            type: 'line',
            series: [
                {
                    name: 'Leads Generated',
                    type: 'column',
                    data: [156, 189, 234, 198, 276, 312, 289, 345, 378, 402, 389, 456]
                },
                {
                    name: 'Conversion Rate',
                    type: 'line',
                    data: [18.5, 22.1, 19.8, 24.3, 21.7, 28.4, 26.1, 29.8, 31.2, 27.9, 33.1, 35.6]
                },
                {
                    name: 'Revenue (x1000)',
                    type: 'area',
                    data: [28.9, 41.7, 46.3, 48.2, 59.8, 88.6, 75.4, 102.8, 117.9, 112.3, 128.7, 162.4]
                }
            ],
            options: {
                chart: {
                    type: 'line', height: 350, toolbar: { show: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.dark,
                        opacity: 0.3
                    }
                },
                stroke: { width: [0, 4, 2], curve: 'smooth' },
                plotOptions: { bar: { columnWidth: '50%' } },
                colors: [colors.danger, colors.primary, colors.success],
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                yaxis: [
                    {
                        title: { text: 'Leads & Revenue' },
                        labels: { style: { colors: colors.dark } }
                    },
                    {
                        opposite: true,
                        title: { text: 'Conversion Rate (%)' },
                        labels: {
                            formatter: (val) => `${val}%`,
                            style: { colors: colors.dark }
                        }
                    }
                ],
                legend: { position: 'top', horizontalAlign: 'right' },
                fill: {
                    opacity: [0.85, 1, 0.25],
                    gradient: {
                        inverseColors: true,
                        shade: 'light',
                        type: 'vertical',
                        color: [colors.primary, colors.success],
                        reversed: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.55
                    }
                }
            }
        },
        {
            id: 'geographic-data',
            title: 'Geographic Chart',
            colClass: 'col-xl-4 col-lg-6',
            type: 'treemap',
            series: [
                {
                    data: [
                        { x: 'United States', y: 2847 },
                        { x: 'United Kingdom', y: 1923 },
                        { x: 'Germany', y: 1756 },
                        { x: 'France', y: 1432 },
                        { x: 'Canada', y: 1289 },
                        { x: 'Australia', y: 1067 },
                        { x: 'Japan', y: 945 },
                        { x: 'Brazil', y: 834 },
                        { x: 'India', y: 712 },
                        { x: 'Others', y: 1567 }
                    ]
                }
            ],
            options: {
                chart: {
                    type: 'treemap', height: 350, toolbar: { show: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.dark,
                        opacity: 0.3
                    }
                },
                colors: [
                    colors.primary, colors.success, colors.warning, colors.danger,
                    colors.info, colors.orange, colors.purple,
                    colors.light, colors.dark
                ],
                plotOptions: {
                    treemap: {
                        enableShades: true,
                        shadeIntensity: 0.7,
                        distributed: true,
                        colorScale: {
                            ranges: [
                                { from: 0, to: 1000, color: colors.primary },
                                { from: 1001, to: 1500, color: colors.success },
                                { from: 1501, to: 2000, color: colors.purple },
                                { from: 2001, to: 3000, color: colors.orange }
                            ]
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: { fontSize: '12px', fontWeight: 'bold' },
                    formatter: (text, op) => [text, op.value]
                },
                legend: { show: false }
            }
        },
        {
            id: 'customer-satisfaction',
            title: 'Radial Bar',
            colClass: 'col-xl-4 col-lg-6',
            type: 'radialBar',
            series: [92, 87, 78, 85],
            options: {
                chart: {
                    type: 'radialBar', height: 320, toolbar: { show: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.dark,
                        opacity: 0.2
                    }
                },
                plotOptions: {
                    radialBar: {
                        offsetY: 0,
                        startAngle: 0,
                        endAngle: 270,
                        hollow: { margin: 5, size: '30%' },
                        dataLabels: {
                            name: { show: false },
                            value: { show: false }
                        },
                        track: {
                            background: '#f2f2f2',
                            strokeWidth: '97%'
                        }
                    }
                },
                colors: [colors.primary, colors.success, colors.warning, colors.danger],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'horizontal',
                        shadeIntensity: 0.5,
                        gradientToColors: [colors.primary, colors.success, colors.warning, colors.danger],
                        opacityFrom: 1,
                        opacityTo: 0.7,
                        stops: [0, 100]
                    }
                },
                labels: ['Overall', 'Product', 'Support', 'Delivery'],
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '14px',
                    position: 'left',
                    offsetX: 50,
                    offsetY: 10,
                    labels: { useSeriesColors: true },
                    formatter: (seriesName, opts) => `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}%`
                }
            }
        },
        {
            id: 'financial-breakdown',
            title: 'Polar Area Chart',
            colClass: 'col-xl-4 col-lg-6',
            type: 'polarArea',
            series: [2847, 1923, 1756, 1432, 1289],
            options: {
                chart: {
                    type: 'polarArea', height: 320, toolbar: { show: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.dark,
                        opacity: 0.2
                    }
                },
                labels: ['Revenue', 'Expenses', 'Profit', 'Tax', 'Investments'],
                fill: {
                    type: 'gradient',
                    opacity: 0.8,
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 0.5,
                        gradientToColors: [colors.primary, colors.success, colors.warning, colors.danger],
                        opacityFrom: 0.9,
                        opacityTo: 0.5,
                        stops: [0, 100]
                    }
                },
                stroke: { width: 2, colors: ['#fff'] },
                colors: [colors.primary, colors.success, colors.warning, colors.danger],
                legend: { position: 'bottom' },
                plotOptions: {
                    polarArea: {
                        rings: { strokeWidth: 1, strokeColor: '#e0e6ed' },
                        spokes: { strokeWidth: 1, connectorColors: '#e0e6ed' }
                    }
                },
                yaxis: {
                    labels: { formatter: (val) => `$${(val / 1000).toFixed(0)}k` }
                }
            }
        },
        {
            id: 'sales-by-category',
            title: 'Stacked Bar Chart',
            colClass: 'col-xl-4 col-lg-6',
            type: 'bar',
            series: [
                { name: 'Electronics', data: [30, 40, 35, 50, 49, 60, 70, 91, 125] },
                { name: 'Fashion', data: [20, 29, 37, 36, 44, 45, 56, 58, 76] },
                { name: 'Home & Kitchen', data: [25, 35, 45, 55, 40, 50, 60, 70, 85] }
            ],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: { show: false },
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 4,
                        color: colors.dark,
                        opacity: 0.32
                    }
                },
                colors: [colors.primary, colors.success, colors.orange],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '60%',
                        borderRadius: 8,
                        dataLabels: {
                            position: 'top',
                        },
                    }
                },
                dataLabels: {
                    enabled: false,
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: [colors.dark]
                    }
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['#fff']
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 0.2,
                        gradientToColors: [colors.primary, colors.success, colors.orange],
                        opacityFrom: 0.9,
                        opacityTo: 0.8,
                        stops: [0, 100]
                    }
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    labels: { style: { colors: colors.dark } }
                },
                yaxis: {
                    title: {
                        text: 'Sales ($1000)'
                    },
                    labels: {
                        formatter: (val) => `$${val}k`,
                        style: { colors: colors.dark }
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    markers: {
                        radius: 12
                    }
                },
                grid: {
                    borderColor: '#e0e6ed',
                    strokeDashArray: 4
                },
                tooltip: {
                    enabled: true,
                    shared: true,
                    intersect: false,
                    marker: {
                        show: true,
                    },
                    y: {
                        formatter: function (val) {
                            return `${val}%`;
                        }
                    }
                }
            }
        },
        {
            id: 'stock-analysis',
            title: 'Candlestick Chart',
            colClass: 'col-xl-6 col-lg-6',
            type: 'candlestick',
            series: [{
                data: generateCandlestickData()
            }],
            options: {
                chart: {
                    type: 'candlestick', height: 350, toolbar: { show: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.dark,
                        opacity: 0.2
                    }
                },
                xaxis: { type: 'datetime' },
                yaxis: {
                    tooltip: { enabled: true },
                    labels: {
                        formatter: (val) => `$${val.toFixed(2)}`,
                        style: { colors: colors.dark }
                    }
                },
                plotOptions: {
                    candlestick: {
                        colors: {
                            upward: colors.primary,
                            downward: colors.danger
                        },
                        wick: {
                            useFillColor: true
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 0.3,
                        gradientToColors: [colors.primary, colors.danger],
                        opacityFrom: 0.8,
                        opacityTo: 0.6
                    }
                },
                grid: { borderColor: '#e0e6ed' }
            }
        },
        {
            id: 'growth-timeline',
            title: 'Range Bar Chart',
            colClass: 'col-xl-6 col-lg-6',
            type: 'rangeBar',
            series: [
                {
                    data: [
                        {
                            x: 'Market Research',
                            y: [new Date('2024-01-01').getTime(), new Date('2024-02-15').getTime()]
                        },
                        {
                            x: 'Product Development',
                            y: [new Date('2024-02-01').getTime(), new Date('2024-05-30').getTime()]
                        },
                        {
                            x: 'Beta Testing',
                            y: [new Date('2024-04-15').getTime(), new Date('2024-06-30').getTime()]
                        },
                        {
                            x: 'Marketing Campaign',
                            y: [new Date('2024-06-01').getTime(), new Date('2024-08-31').getTime()]
                        },
                        {
                            x: 'Product Launch',
                            y: [new Date('2024-07-15').getTime(), new Date('2024-09-15').getTime()]
                        },
                        {
                            x: 'Expansion Phase',
                            y: [new Date('2024-09-01').getTime(), new Date('2024-12-31').getTime()]
                        }
                    ]
                }
            ],
            options: {
                chart: {
                    type: 'rangeBar', height: 350, toolbar: { show: false }, dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 6,
                        color: colors.dark,
                        opacity: 0.2
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        borderRadius: 4
                    }
                },
                xaxis: {
                    type: 'datetime',
                    labels: { style: { colors: colors.dark } }
                },
                yaxis: { labels: { style: { colors: colors.dark } } },
                colors: [colors.purple],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'horizontal',
                        shadeIntensity: 0.5,
                        gradientToColors: [colors.purple],
                        opacityFrom: 0.8,
                        opacityTo: 0.9,
                        stops: [0, 100]
                    }
                }
            }
        }
    ], [colors]); // Only recreate when colors change

    // Generate candlestick data
    function generateCandlestickData() {
        const data = [];
        let basePrice = 150;
        for (let i = 0; i < 30; i++) {
            const open = basePrice + (Math.random() - 0.5) * 10;
            const high = open + Math.random() * 15;
            const low = open - Math.random() * 15;
            const close = low + Math.random() * (high - low);

            data.push({
                x: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
                y: [open, high, low, close]
            });
            basePrice = close;
        }
        return data;
    }

    return (
        <div className='page-wrapper'>
            <div className='page-content'>
                <PageTitle pageTitle="Apexchart" pagePrTitle="Charts" />
                <Container fluid>
                    <Row>
                        {chartConfigs.map((config) => {
                            const chartOptions = {
                                ...config.options,
                                chart: {
                                    ...config.options.chart,
                                    type: config.type,
                                    height: 350,
                                    toolbar: { show: false },
                                    animations: {
                                        enabled: true,
                                        easing: 'easeinout',
                                        speed: 800,
                                        animateGradually: {
                                            enabled: true,
                                            delay: 150
                                        },
                                        dynamicAnimation: {
                                            enabled: true,
                                            speed: 350
                                        }
                                    }
                                },
                                colors: config.options.colors,
                                stroke: config.options.stroke || { width: 2 },
                                markers: config.options.markers || { size: 0 },
                                xaxis: config.options.xaxis || { type: 'category' },
                                yaxis: config.options.yaxis || {},
                                legend: config.options.legend || { position: 'bottom' },
                                tooltip: config.options.tooltip || { enabled: true }
                            };

                            return (
                                <Col key={config.id} className={config.colClass}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title className="mb-4">
                                                {config.title}
                                            </Card.Title>
                                            <div style={{ minHeight: '350px', position: 'relative' }}>
                                                <ReactApexChart options={chartOptions} series={Array.isArray(config.series) ? config.series : [config.series]} type={config.type} height={350} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </div>
            
            <Footer/>
        </div>
    );
};

export default Apexchart;