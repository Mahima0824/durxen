import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from '@tanstack/react-table';
import { Container, Row, Col, Card, Table, Form, InputGroup, Button, FormCheck, Image, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PageTitle from '../layout/PageTitle';
import img1 from "../../images/products/prod-img/img-1.png";
import img2 from "../../images/products/prod-img/img-2.png";
import img3 from "../../images/products/prod-img/img-3.png";
import img4 from "../../images/products/prod-img/img-4.png";
import img5 from "../../images/products/prod-img/img-5.png";
import img6 from "../../images/products/prod-img/img-6.png";
import img7 from "../../images/products/prod-img/img-7.png";
import img8 from "../../images/products/prod-img/img-8.png";
import img9 from "../../images/products/prod-img/img-9.png";
import img10 from "../../images/products/prod-img/img-10.png";
import Footer from '../layout/Footer';
// Sample data - replace with your actual data
import data from '../../data/e-commerce/products.json';
const images = {
  "img1": img1,
  "img2": img2,
  "img3": img3,
  "img4": img4,
  "img5": img5,
  "img6": img6,
  "img7": img7,
  "img8": img8,
  "img9": img9,
  "img10": img10
}
const productData = data.productsData.products;
const Products = () => {
  const navigate = useNavigate();
  const [data] = useState(() => [...productData]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  // Function to handle navigation to product details
  const handleProductClick = (productId, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    navigate(`/ecommerce/product_details?id=${productId}`);
  };

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <FormCheck type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />
        ),
        cell: ({ row }) => (
          <FormCheck type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        header: 'PRODUCT',
        accessorKey: 'product',
        cell: ({ row }) => {
          return (
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-3">
                <div className="">
                  <Image className="avatar-xs avatar-img" src={images[row.original.image]} alt={row.original.product} />
                </div>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 fw-medium">{row.original.product}</p>
                <small className="text-muted">{row.original.category}</small>
              </div>
            </div>
          );
        },
      },
      {
        header: 'CATEGORY',
        accessorKey: 'category',
        cell: ({ row }) => (
          <Badge bg={`soft-${row.original.category === "Smartphones" ? "primary" : row.original.category === "Laptops" ? "warning" : row.original.category === "Televisions" ? "danger" : "info"}`} className="fw-medium">{row.original.category}</Badge>
        ),
      },
      {
        header: 'PRICE',
        accessorKey: 'price',
        cell: info => (
          <div className="fw-semibold ">
            ${info.getValue().toFixed(2)}
          </div>
        ),
      },
      {
        header: 'STOCK',
        accessorKey: 'stock',
        cell: ({ row }) => (
          <div className="fw-medium">
            {row.original.stock} units
          </div>
        ),
      },
      {
        header: 'RATING',
        accessorKey: 'rating',
        cell: ({ row }) => {
          const rating = row.original.rating;
          return (
            <div className="d-flex align-items-center">
              <div className="text-warning me-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`ri-star-fill fs-14 ${i < Math.floor(rating) ? 'text-warning' : 'text-light'}`}/>
                ))}
              </div>
              <span className="text-muted ms-1">{rating}</span>
            </div>
          );
        },
      },
      {
        header: 'DATE ADDED',
        accessorKey: 'dateAdded',
        cell: ({ row }) => (
          <div className="text-muted">
            {new Date(row.original.dateAdded).toLocaleDateString()}
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'ACTIONS',
        cell: () => (
          <div className="d-flex gap-2" onClick={(e) => e.stopPropagation()}>
            <Button variant="light" size="sm" className="btn-icon"><i className="ri-pencil-line" /></Button>
            <Button variant="light" size="sm" className="btn-icon"><i className="ri-delete-bin-line text-danger" /></Button>
            <Button variant="light" size="sm" className="btn-icon"><i className="ri-more-2-fill" /></Button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pageTitle="Products" pagePrTitle="E-commerce" />
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="search-box">
                        <InputGroup className="border rounded-3 overflow-hidden">
                          <InputGroup.Text className="bg-white border-0">
                            <i className="ri-search-line text-muted" />
                          </InputGroup.Text>
                          <Form.Control type="text" className="border-0" placeholder="Search products..." value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} />
                        </InputGroup>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="view-toggle d-flex border rounded overflow-hidden">
                        <OverlayTrigger placement="top" overlay={<Tooltip>Table View</Tooltip>}>
                          <Button variant={viewMode === 'table' ? 'primary' : 'light'} className="btn-icon rounded-0" onClick={() => setViewMode('table')}><i className="ri-table-line" /></Button>
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Card View</Tooltip>}>
                          <Button variant={viewMode === 'card' ? 'primary' : 'light'} className="btn-icon rounded-0" onClick={() => setViewMode('card')}><i className="ri-layout-grid-line" /></Button>
                        </OverlayTrigger>
                      </div>
                      <Button variant="primary" className="d-flex align-items-center"><i className="ri-add-line me-1" /> Add New</Button>
                    </div>
                  </div>

                  {viewMode === 'table' ? (
                    <div className="table-responsive shadow-sm rounded">
                      <Table hover className="align-middle mb-0">
                        <thead className="bg-light">
                          {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                              {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} className="text-uppercase fw-medium py-3">
                                  <div className="d-flex align-items-center text-muted" onClick={header.column.getToggleSortingHandler()} style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getCanSort() && (
                                      <span className="ms-1">
                                        {header.column.getIsSorted() === 'asc' ? (
                                          <i className="ri-arrow-up-s-line text-primary"></i>
                                        ) : header.column.getIsSorted() === 'desc' ? (
                                          <i className="ri-arrow-down-s-line text-primary"></i>
                                        ) : (
                                          <i className="ri-arrow-up-down-line text-muted"></i>
                                        )}
                                      </span>
                                    )}
                                  </div>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                        <tbody>
                          {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-bottom clickable-row" style={{ cursor: 'pointer' }} onClick={() => handleProductClick(row.original.id)} title="Click to view product details">
                              {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="py-3" onClick={cell.column.id === 'select' ? (e) => e.stopPropagation() : undefined}>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <Row className="g-4">
                      {table.getRowModel().rows.map(row => (
                        <Col key={row.id} lg={3} md={6} sm={12}>
                          <Card onClick={() => handleProductClick(row.original.id)} style={{ cursor: 'pointer' }} title="Click to view product details">
                            <div className="position-absolute top-0 end-0 m-2 z-1">
                              <Badge bg={`soft-${row.original.status === 'In Stock' ? 'success' : row.original.status === 'Low Stock' ? 'warning' : 'danger'}`} className="px-2 py-1"> {row.original.status} </Badge>
                            </div>
                            <div className="text-center p-3 bg-light bg-opacity-50 rounded-top">
                              {row.original.image ? (
                                <Image src={images[row.original.image]} alt={row.original.product} className="img-fluid product-img" />
                              ) : (
                                <div className="product-placeholder h-50">
                                  <i className="ri-image-line fs-1 text-muted " />
                                </div>
                              )}
                            </div>

                            <Card.Body>
                              <div className="d-flex align-items-center mb-2">
                                <div className="text-warning me-1">
                                  {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`ri-star-fill fs-14 ${i < Math.floor(row.original.rating) ? 'text-warning' : 'text-light'}`} />
                                  ))}
                                </div>
                                <span className="text-muted ms-1">{row.original.rating}</span>
                                <span className="ms-auto text-muted small">
                                  <i className="ri-heart-line me-1"></i> Add to Wishlist
                                </span>
                              </div>

                              <h6 className="product-title text-truncate">{row.original.product}</h6>
                              <p className="text-muted small mb-3">{row.original.category} • {row.original.brand || 'Unknown Brand'}</p>

                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0 fw-semibold">${row.original.price.toFixed(2)}</h5>
                                {row.original.sales && (
                                  <span className="text-muted small"><i className="ri-shopping-bag-line me-1"></i>{row.original.sales} sold</span>
                                )}
                              </div>

                              <div className="d-grid gap-2" onClick={(e) => e.stopPropagation()}>
                                <div className="d-flex justify-content-between">
                                  <Button variant="light" size="sm" className="btn-icon me-1 flex-grow-1 view-details-btn" onClick={(e) => {
                                    e.stopPropagation();
                                    handleProductClick(row.original.id);
                                  }}
                                    title="View Details"
                                  >
                                    <i className="ri-eye-line" />
                                  </Button>
                                  <Button variant="light" size="sm" className="btn-icon me-1 flex-grow-1"><i className="ri-pencil-line" /></Button>
                                  <Button variant="light" size="sm" className="btn-icon flex-grow-1"><i className="ri-delete-bin-line text-danger" /></Button>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}

                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
                    <div className="text-muted">
                      Showing <strong>{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</strong> to <strong>{Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        data.length
                      )}</strong> of <strong>{data.length}</strong> entries
                    </div>
                    <div className="d-flex align-items-center gap-1 pagination-controls">
                      <Button variant="light" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} size="sm"><i className="ri-arrow-left-double-line"></i></Button>
                      <Button variant="light" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} size="sm"><i className="ri-arrow-left-s-line"></i></Button>

                      {(() => {
                        const currentPage = table.getState().pagination.pageIndex;
                        const pageCount = table.getPageCount();
                        const maxButtons = 5; // Maximum number of page buttons to show

                        let startPage = Math.max(0, currentPage - Math.floor(maxButtons / 2));
                        let endPage = Math.min(pageCount - 1, startPage + maxButtons - 1);

                        // Adjust if we're near the end
                        if (endPage - startPage + 1 < maxButtons) {
                          startPage = Math.max(0, endPage - maxButtons + 1);
                        }

                        const pages = [];

                        // Add first page button if not included in the range
                        if (startPage > 0) {
                          pages.push(
                            <Button key="first" variant={0 === currentPage ? 'primary' : 'light'} className="shadow-sm" size="sm" onClick={() => table.setPageIndex(0)}>1</Button>
                          );

                          // Add ellipsis if there's a gap
                          if (startPage > 1) {
                            pages.push(<span key="ellipsis1" className="px-2 d-flex align-items-center">...</span>);
                          }
                        }

                        // Add page buttons for the current range
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(
                            <Button key={i} variant={i === currentPage ? 'primary' : 'light'} className="shadow-sm" size="sm" onClick={() => table.setPageIndex(i)}>{i + 1}</Button>
                          );
                        }

                        // Add last page button if not included in the range
                        if (endPage < pageCount - 1) {
                          // Add ellipsis if there's a gap
                          if (endPage < pageCount - 2) {
                            pages.push(<span key="ellipsis2" className="px-2 d-flex align-items-center">...</span>);
                          }

                          pages.push(
                            <Button key="last" variant={(pageCount - 1) === currentPage ? 'primary' : 'light'} className="shadow-sm" size="sm" onClick={() => table.setPageIndex(pageCount - 1)}>
                              {pageCount}
                            </Button>
                          );
                        }

                        return pages;
                      })()}

                      <Button variant="light" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} size="sm"><i className="ri-arrow-right-s-line"></i></Button>
                      <Button variant="light" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} size="sm"><i className="ri-arrow-right-double-line"></i></Button>
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
  );
};

export default Products;
