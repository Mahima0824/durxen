import React, { useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { Table, Form, Pagination, Badge, Button, Dropdown } from 'react-bootstrap';
import data from '../../../data/data-table/data.json';
import Save from '../../modal/Save';
import Delete from '../../modal/Delete';

const CustomeTable = ({ title = '', editable = false, sortable = false, filterable = false, enableRowSelection = false }) => {

    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [tableData, setTableData] = useState([...data]);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSave = (note) => {
        if (editingId) {
            const updatedData = [...tableData];
            const index = updatedData.findIndex(item => item.id === editingId);
            if (index !== -1) {
                updatedData[index] = {
                    ...updatedData[index],
                    ...editData,
                    lastUpdated: new Date().toISOString(),
                    updateNote: note
                };
                setTableData(updatedData);
            }
            setEditingId(null);
            setShowSaveModal(false);
        }
    };

    const handleDelete = () => {
        if (editingId) {
            setTableData(prevData =>
                prevData.filter(item => item.id !== editingId)
            );
            setEditingId(null);
            setShowDeleteModal(false);
        }
    };
    const columns = useMemo(() => {
        const baseColumns = [
            // Checkbox column for row selection
            ...(enableRowSelection ? [{
                id: 'select',
                header: ({ table }) => (
                    <Form.Check type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} aria-label="Select all" />
                ),
                cell: ({ row }) => (
                    <Form.Check type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} aria-label="Select row" />
                ),
                size: 50,
            }] : []),
            {
                accessorKey: 'name',
                header: 'Name',
                cell: props => {
                    if (editable && editingId === props.row.id) {
                        return (
                            <Form.Control size="sm" value={editData.name || ''} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                        );
                    }
                    return <span className="text-uppercase text-truncate fs-13 ">{props.getValue()}</span>;
                }
            },
            {
                accessorKey: 'category',
                header: 'Category',
                cell: props => {
                    if (editable && editingId === props.row.id) {
                        return (
                            <Form.Select size="sm" value={editData.category || ''} onChange={(e) => setEditData({ ...editData, category: e.target.value })}>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Non-Vegetarian">Non-Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                            </Form.Select>
                        );
                    }
                    return <Badge bg='soft-primary'>{props.getValue()}</Badge>;
                }
            },
            {
                accessorKey: 'price',
                header: 'Price',
                cell: props => {
                    if (editable && editingId === props.row.id) {
                        return (
                            <Form.Control type="number" size="sm" value={editData.price || ''} onChange={(e) => setEditData({ ...editData, price: e.target.value })} />
                        );
                    }
                    return <span className={` fs-13 text-truncate ${props.getValue() > 0 ? 'fw-bold text-dark' : 'fw-normal text-danger'}`}>₹{props.getValue()}</span>;
                }
            },
            {
                accessorKey: 'available',
                header: 'Available',
                cell: props => {
                    if (editable && editingId === props.row.id) {
                        return (
                            <Form.Check type="switch" id={`available-${props.row.id}`} checked={editData.available || false} className='py-2 ' onChange={(e) => setEditData({ ...editData, available: e.target.checked })} />
                        );
                    }
                    return (
                        <Button variant={props.getValue() ? 'soft-success' : 'soft-danger'} size="xs">{props.getValue() ? 'Yes' : 'No'}</Button>
                    );
                }
            },
            {
                accessorKey: 'calories',
                header: 'Calories',
                cell: props => {
                    if (editable && editingId === props.row.id) {
                        return (
                            <Form.Control type="number" size="sm" value={editData.calories || ''} onChange={(e) => setEditData({ ...editData, calories: e.target.value })} />
                        );
                    }
                    return <span className="fs-13 text-truncate">{props.getValue()}</span>;
                }
            },
            {
                accessorKey: 'protein',
                header: 'Protein (g)',
                cell: props => {
                    if (editable && editingId === props.row.id) {
                        return (
                            <Form.Control type="number" size="sm" value={editData.protein || ''} onChange={(e) => setEditData({ ...editData, protein: e.target.value })} className="text-success text-truncate fw-bold" />
                        );
                    }
                    return <span className="fs-13 text-truncate text-success fw-bold">{props.getValue()}</span>;
                }
            },
            {
                accessorKey: 'fat',
                header: 'Fat (g)',
                cell: props => {
                    if (editable && editingId === props.row.id) {
                        return (
                            <Form.Control type="number" size="sm" value={editData.fat || ''} onChange={(e) => setEditData({ ...editData, fat: e.target.value })} className="text-danger fw-bold" />
                        );
                    }
                    return <span className="fs-13 text-truncate text-danger fw-bold">{props.getValue()}</span>;
                }
            },
            {
                accessorKey: 'ingredients',
                header: 'Ingredients',
                cell: props => {
                    if (editable && editingId === props.row.id) {
                        return (
                            <Form.Control as="textarea" rows={2} size="sm" value={editData.ingredients || ''} onChange={(e) => setEditData({ ...editData, ingredients: e.target.value })} />
                        );
                    }
                    return <span className="fs-14 text-truncate">{props.getValue()}</span>;
                }
            },
            {
                accessorKey: 'origin',
                header: 'Origin',
                cell: props => <Badge bg='soft-success' >{props.getValue()}</Badge>
            },
        ];

        // Add action column if editable
        if (editable) {
            baseColumns.push({
                id: 'actions',
                header: 'Actions',
                cell: (props) => {
                    const isEditing = editingId === props.row.id;
                    return (
                        <div className="d-flex gap-2">
                            {isEditing ? (
                                <>
                                    <Button variant="success" size="sm"
                                        onClick={() => {
                                            // Update the data with edited values
                                            const updatedData = [...tableData];
                                            const index = updatedData.findIndex(item => item.id === editingId);
                                            if (index !== -1) {
                                                updatedData[index] = { ...updatedData[index], ...editData };
                                                setTableData(updatedData);
                                            }
                                            // setShowSaveModal(true);
                                            setEditingId(null);
                                            setShowSaveModal(true);
                                        }}
                                    >
                                        <i className="bi bi-check"></i>
                                    </Button>
                                    <Button variant="secondary" size="sm"
                                        onClick={() => setEditingId(null)}
                                    >
                                        <i className="bi bi-x"></i>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="primary" size="sm"
                                        onClick={() => {
                                            setEditingId(props.row.id);
                                            setEditData({ ...props.row.original });
                                        }}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button variant="danger" size="sm"
                                        onClick={() => {
                                            setEditingId(props.row.id);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </>
                            )}
                        </div>
                    );
                },
            });
        }

        return baseColumns;
    }, [editable, editingId, editData, enableRowSelection, tableData]);
    const foodData = tableData;

    const table = useReactTable({
        data: foodData,
        columns,
        state: {
            globalFilter,
            sorting: sortable ? sorting : [],
            rowSelection,
        },
        onSortingChange: sortable ? setSorting : undefined,
        onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: filterable ? getFilteredRowModel() : undefined,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: sortable ? getSortedRowModel() : undefined,
        onGlobalFilterChange: filterable ? setGlobalFilter : undefined,
        debugTable: true,
        enableSorting: sortable,
        enableFilters: filterable,
        enableRowSelection: enableRowSelection,
        autoResetSorting: false,
        getRowId: (originalRow, index) => originalRow.id || index,
    });

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h5 className="mb-0">{title}</h5>
                </div>
                {filterable && (
                    <div className="d-flex align-items-center">
                        <div className="input-group" >
                            <span className="input-group-text bg-white border-end-0">
                                <i className="bi bi-search"></i>
                            </span>
                            <Form.Control type="text" placeholder="Search food..." className="border-start-0" value={globalFilter ?? ''} onChange={(e) => setGlobalFilter(e.target.value)}/>
                        </div>
                    </div>
                )}
            </div>
            <div className="table-responsive border border-soft-primary rounded">
                <Table hover className="mb-0">
                    <thead className="bg-soft-primary">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className={`${header.column.columnDef.headerClassName || ''} position-relative py-3`}
                                        style={{
                                            cursor: sortable && header.column.getCanSort() ? 'pointer' : 'default'
                                        }}
                                        onClick={sortable ? header.column.getToggleSortingHandler() : undefined}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {sortable && header.column.getCanSort() && header.column.columnDef.enableSorting !== false && (
                                                <span className="d-flex flex-column align-items-center justify-content-center ms-1">
                                                    <i className={`bi bi-caret-up-fill ${header.column.getIsSorted() === 'asc' ? 'text-primary' : 'text-muted'}`} style={{ fontSize: '0.65rem', marginBottom: '-2px' }}></i>
                                                    <i className={`bi bi-caret-down-fill ${header.column.getIsSorted() === 'desc' ? 'text-primary' : 'text-muted'}`} style={{ fontSize: '0.65rem', marginTop: '-2px' }}></i>
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
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
                <div className="d-flex align-items-center gap-2">

                    <div className="text-muted small">
                        Showing <strong className="text-primary">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</strong> to{' '}
                        <strong className="text-primary">
                            {Math.min(
                                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                table.getFilteredRowModel().rows.length
                            )}
                        </strong>{' '}
                        of <strong>{table.getFilteredRowModel().rows.length}</strong> entries
                    </div>
                    <Dropdown size="sm">
                        <Dropdown.Toggle size="xs" variant="soft-primary" id="dropdown-basic">
                            Show {table.getState().pagination.pageSize} <i className="bi bi-chevron-down drop-caret"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {
                                [5, 10, 20].map(pageSize => (
                                    <Dropdown.Item key={pageSize} href="#" onClick={() => table.setPageSize(pageSize)}>Show {pageSize}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="d-flex align-items-center gap-2">
                    <Pagination className="mb-0">
                        <Pagination.First onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="border-0" />
                        <Pagination.Prev onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="border-0" />
                        {Array.from({ length: Math.min(5, table.getPageCount()) }).map((_, i) => {
                            const pageNum = Math.max(0, Math.min(
                                table.getPageCount() - 5,
                                table.getState().pagination.pageIndex - 2
                            )) + i;

                            if (pageNum >= 0 && pageNum < table.getPageCount()) {
                                return (
                                    <Pagination.Item key={pageNum} active={table.getState().pagination.pageIndex === pageNum} onClick={() => table.setPageIndex(pageNum)} className="border-0">{pageNum + 1}</Pagination.Item>
                                );
                            }
                            return null;
                        })}
                        <Pagination.Next onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="border-0" />
                        <Pagination.Last onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} className="border-0" />
                    </Pagination>
                </div>
            </div>

            <Save show={showSaveModal} handleClose={() => setShowSaveModal(false)} handleSave={handleSave} />
            <Delete show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} handleDelete={handleDelete} />
        </div>
    )
}

export default CustomeTable;
