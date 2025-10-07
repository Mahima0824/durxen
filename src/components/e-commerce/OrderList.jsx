import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { Container, Card, Table, Button, Badge, Form, InputGroup, Pagination, Col, Row } from 'react-bootstrap';
import PageTitle from '../layout/PageTitle';
import Footer from '../layout/Footer';
// Import order data from JSON file
import orderDataJson from '../../data/e-commerce/orderlist.json';
const orderData = orderDataJson.orderdata.orderData;

// Helper function to render payment status badge
const renderPaymentStatusBadge = (status) => {
  let badgeClass = '';
  let icon = '';

  switch (status) {
    case 'Paid':
      badgeClass = 'success';
      icon = 'ri-checkbox-circle-line';
      break;
    case 'Awaiting Authorization':
      badgeClass = 'warning';
      icon = 'ri-time-line';
      break;
    case 'Payment Failed':
      badgeClass = 'danger';
      icon = 'ri-close-circle-line';
      break;
    case 'Unpaid':
      badgeClass = 'info';
      icon = 'ri-information-line';
      break;
    default:
      badgeClass = 'secondary';
      icon = 'ri-question-line';
  }

  return (
    <Badge bg={`soft-${badgeClass}`}><i className={icon + " me-1"}></i> {status}</Badge>
  );
};

// Helper function to render order status badge
const renderOrderStatusBadge = (status) => {
  let badgeClass = '';
  switch (status) {
    case 'Shipped':
      badgeClass = 'info';
      break;
    case 'Processing':
      badgeClass = 'warning';
      break;
    case 'Delivered':
      badgeClass = 'success';
      break;
    case 'Cancelled':
      badgeClass = 'danger';
      break;
    default:
      badgeClass = 'secondary';
  }

  return <Badge bg={badgeClass}>{status}</Badge>;
};

const OrderList = () => {
  const [filterInput, setFilterInput] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Order ID',
        cell: (info) => <span className="fw-medium">{info.getValue()}</span>
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: (info) => (
          <div>
            <div>{info.row.original.date}</div>
            <small className="text-muted">{info.row.original.time}</small>
          </div>
        )
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
        cell: (info) => renderPaymentStatusBadge(info.getValue())
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: (info) => <span>${info.getValue().toFixed(2)}</span>
      },
      {
        accessorKey: 'paymentMethod',
        header: 'Payment Method'
      },
      {
        accessorKey: 'orderStatus',
        header: 'Order Status',
        cell: (info) => renderOrderStatusBadge(info.getValue())
      },
      {
        id: 'actions',
        header: 'Action',
        cell: () => (
          <div className="d-flex gap-2">
            <Button variant="link" className="p-0" title="View"><i className="ri-eye-line fs-5"></i></Button>
            <Button variant="link" className="p-0" title="Edit"><i className="ri-pencil-line fs-5"></i></Button>
            <Button variant="link" className="p-0" title="Delete"><i className="ri-delete-bin-line fs-5 text-danger"></i></Button>
          </div>
        )
      }
    ],
    []
  );

  const data = useMemo(() => orderData, []);

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter: filterInput,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setFilterInput,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Handle global filter change
  const handleFilterChange = (e) => {
    setFilterInput(e.target.value || '');
  };

  // Generate pagination items
  const paginationItems = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationItems.push(
      <Pagination.Item key={i}
        active={i === table.getState().pagination.pageIndex}
        onClick={() => table.setPageIndex(i)}
      >
        {i + 1}
      </Pagination.Item>
    );
  }

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pageTitle="Order List" pagePrTitle="E-commerce" />

        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div>
                      <h5 className="mb-0">All Orders</h5>
                      <p className="text-muted mb-0">Manage your customer orders</p>
                    </div>

                    <div className="d-flex gap-2">
                      <Form.Group>
                        <InputGroup>
                          <InputGroup.Text id="search-addon"><i className="ri-search-line"></i></InputGroup.Text>
                          <Form.Control value={filterInput} onChange={handleFilterChange} placeholder="Search orders..." aria-label="Search" aria-describedby="search-addon"/>
                        </InputGroup>
                      </Form.Group>

                      <Button variant="primary"><i className="ri-filter-3-line me-1"></i> Filter</Button>
                      <Button variant="success"><i className="ri-download-2-line me-1"></i> Export</Button>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <Table hover className="align-middle">
                      <thead className="table-light">
                        {table.getHeaderGroups().map(headerGroup => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                              <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="text-nowrap">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                <span className="ms-1">
                                  {header.column.getIsSorted() ? (
                                    header.column.getIsSorted() === 'desc' ? (
                                      <i className="ri-sort-desc"></i>
                                    ) : (
                                      <i className="ri-sort-asc"></i>
                                    )
                                  ) : (
                                    header.column.id !== 'actions' && <i className="ri-sort-line text-muted"></i>
                                  )}
                                </span>
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.map(row => (
                          <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-3">
                    <div className='d-flex align-items-center gap-3'>
                      <Form.Select className='w-auto' value={table.getState().pagination.pageSize} onChange={e => table.setPageSize(Number(e.target.value))}>
                        {[5, 10, 20, 30, 40, 50].map(size => (
                          <option key={size} value={size}>Show {size}</option>
                        ))}
                      </Form.Select>
                      <p className='text-muted mb-0'>Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} of {data.length} entries</p>
                    </div>

                    <div>
                      <Pagination className="mb-0">
                        <Pagination.First onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}/>
                        <Pagination.Prev onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}/>
                        {paginationItems}
                        <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}/>
                        <Pagination.Last onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}/>
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
    </div>
  )
}

export default OrderList;
