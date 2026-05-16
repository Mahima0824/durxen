import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Image, Dropdown, Modal, Form } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import PageTitle from '../layout/PageTitle';
import Footer from '../layout/Footer';
import kanbanData from '../../data/apps/kanban-board.json';
import user1 from '../../images/user/avatar-1.jpg';
import user2 from '../../images/user/avatar-2.jpg';
import user3 from '../../images/user/avatar-3.jpg';
import user4 from '../../images/user/avatar-4.jpg';
import user5 from '../../images/user/avatar-5.jpg';

const columnOrder = kanbanData.columnOrder;

const initialColumns = kanbanData.columns.reduce((acc, col) => {
  acc[col.id] = col;
  return acc;
}, {});

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignee: '',
    tag: '',
    dueDate: ''
  });

  // User avatars mapping
  const userAvatars = {
    'AS': user1,
    'RK': user2,
    'MJ': user3,
    'DK': user4,
    'VL': user5,
    'NP': user1, // Reuse images for additional users
    'SG': user2,
    'LM': user3,
    'AK': user4,
    'RR': user5
  };

  const getUserAvatar = (assignee) => {
    return userAvatars[assignee] || null;
  };

  // Helper function to show success messages
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1500);
  };

  // Handler functions
  const handleAddTask = (columnId) => {
    setSelectedColumn(columnId);
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      assignee: '',
      tag: '',
      dueDate: ''
    });
    setShowAddModal(true);
  };

  const handleEditTask = (task, columnId) => {
    setSelectedTask(task);
    setSelectedColumn(columnId);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      assignee: task.assignee || '',
      tag: task.tag || '',
      dueDate: task.dueDate || ''
    });
    setShowEditModal(true);
  };

  const handleDeleteTask = (taskId, columnId) => {
    setTaskToDelete({ taskId, columnId });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setColumns(prev => ({
        ...prev,
        [taskToDelete.columnId]: {
          ...prev[taskToDelete.columnId],
          tasks: prev[taskToDelete.columnId].tasks.filter(task => task.id !== taskToDelete.taskId)
        }
      }));

      setShowDeleteModal(false);
      setTaskToDelete(null);
      showSuccess('Task has been deleted successfully.');
    }
  };

  const handleSaveTask = () => {
    if (!formData.title.trim()) return;

    if (showEditModal && selectedTask) {
      // Edit existing task
      setColumns(prev => ({
        ...prev,
        [selectedColumn]: {
          ...prev[selectedColumn],
          tasks: prev[selectedColumn].tasks.map(task =>
            task.id === selectedTask.id
              ? { ...task, ...formData }
              : task
          )
        }
      }));

      setShowEditModal(false);
      setSelectedTask(null);
      setSelectedColumn(null);
      showSuccess('Task has been updated successfully.');
    } else if (showAddModal) {
      // Add new task
      const newTask = {
        id: `task-${Date.now()}`,
        ...formData
      };
      setColumns(prev => ({
        ...prev,
        [selectedColumn]: {
          ...prev[selectedColumn],
          tasks: [...prev[selectedColumn].tasks, newTask]
        }
      }));

      setShowAddModal(false);
      setSelectedColumn(null);
      showSuccess('Task has been added successfully.');
    }
  };

  const handleDuplicateTask = (task, columnId) => {
    const duplicatedTask = {
      ...task,
      id: `task-${Date.now()}`,
      title: `${task.title} (Copy)`
    };
    setColumns(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        tasks: [...prev[columnId].tasks, duplicatedTask]
      }
    }));

    showSuccess('Task has been duplicated successfully.');
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceColId = source.droppableId;
    const destColId = destination.droppableId;

    if (sourceColId === destColId && source.index === destination.index) {
      return;
    }

    setColumns((prev) => {
      const sourceCol = prev[sourceColId];
      const destCol = prev[destColId];
      if (!sourceCol || !destCol) return prev;

      const sourceTasks = Array.from(sourceCol.tasks);
      const [moved] = sourceTasks.splice(source.index, 1);
      if (!moved || moved.id !== draggableId) return prev;

      const destTasks = sourceColId === destColId ? sourceTasks : Array.from(destCol.tasks);
      destTasks.splice(destination.index, 0, moved);

      return {
        ...prev,
        [sourceColId]: {
          ...sourceCol,
          tasks: sourceColId === destColId ? destTasks : sourceTasks
        },
        [destColId]: {
          ...destCol,
          tasks: destTasks
        }
      };
    });
  };

  const handleReset = () => {
    setColumns(initialColumns);
  };

  const priorityVariant = (priority) => {
    if (priority === 'High') return 'danger';
    if (priority === 'Medium') return 'warning';
    return 'secondary';
  };

  const getDueDateVariant = (dueDate) => {
    if (!dueDate) return 'secondary';
    const today = new Date();
    const due = new Date(dueDate);
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'danger';
    if (diffDays <= 1) return 'warning';
    if (diffDays <= 3) return 'info';
    return 'success';
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return '';
    const date = new Date(dueDate);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <PageTitle pageTitle="Kanban Board" pagePrTitle="Apps" />
        <Container fluid>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <p className="text-muted mb-0">Drag & drop cards between columns to update status</p>
            </div>
            <Button variant="outline-secondary" size="sm" onClick={handleReset} className="d-flex align-items-center">
              <i className="ri-restart-line me-1" /> Reset Board
            </Button>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Row>
              {columnOrder.map((colId) => {
                const col = columns[colId];
                return (
                  <Col key={col.id} xs={12} md={6} xl={3}>
                    <Droppable droppableId={col.id}>
                      {(provided, snapshot) => (
                        <Card
                          className={`${snapshot.isDraggingOver ? 'border-primary bg-soft-primary border-2' : ''}`}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <Card.Header className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-2">
                              <h6 className="mb-0 text-dark fw-semibold">{col.title}</h6>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <Badge bg={`soft-${col.color}`} className="text-uppercase fs-11">
                                {col.tasks.length}
                              </Badge>
                              <div
                                onClick={() => handleAddTask(col.id)}
                                className="avatar avatar-xs bg-soft-primary rounded-1 text-primary cursor-pointer"
                              >
                                <i className="ri-add-line fs-5"></i>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            {col.tasks.length === 0 && (
                              <div className="text-center text-muted py-5">
                                <i className="ri-drag-move-2-line fs-3 mb-2 d-block opacity-50"></i>
                                <small>Drop a task here</small>
                              </div>
                            )}
                            {col.tasks.map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(dragProvided, dragSnapshot) => (
                                  <Card
                                    className={`cursor-pointer task-card ${dragSnapshot.isDragging ? 'bg-light' : 'hover-shadow'
                                      }`}
                                    ref={dragProvided.innerRef}
                                    {...dragProvided.draggableProps}
                                    style={{ borderRadius: '8px', ...dragProvided.draggableProps.style }}
                                  >
                                    <Card.Body className="p-3">
                                      <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div className="d-flex align-items-center flex-grow-1 me-2" {...dragProvided.dragHandleProps}>
                                          <i className="ri-drag-move-2-line text-muted me-2"></i>
                                          <h6 className="mb-0 text-dark fw-medium text-truncate">
                                            {task.title}
                                          </h6>
                                        </div>
                                        <Dropdown align="end" className="task-dropdown">
                                          <Dropdown.Toggle
                                            variant="link"
                                            className="text-muted p-0 fs-16 no-caret btn-icon"
                                          >
                                            <i className="ri-more-2-fill"></i>
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEditTask(task, col.id)}>
                                              <i className="ri-edit-line me-2"></i> Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteTask(task.id, col.id)} className="text-danger">
                                              <i className="ri-delete-bin-line me-2"></i> Delete
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={() => handleDuplicateTask(task, col.id)}>
                                              <i className="ri-file-copy-line me-2"></i> Duplicate
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>

                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                        <Badge
                                          bg={priorityVariant(task.priority)}
                                          size="sm"
                                          className="fs-10 px-2 py-1"
                                        >
                                          {task.priority}
                                        </Badge>
                                        {task.dueDate && (
                                          <Badge
                                            bg={getDueDateVariant(task.dueDate)}
                                            size="sm"
                                            className="fs-10 px-2 py-1"
                                          >
                                            <i className="ri-calendar-line me-1"></i>
                                            {formatDueDate(task.dueDate)}
                                          </Badge>
                                        )}
                                      </div>

                                      {task.tag && (
                                        <div className="mb-2">
                                          <span className="badge bg-light text-dark fs-10 px-2 py-1">
                                            <i className="ri-price-tag-3-line me-1"></i>
                                            {task.tag}
                                          </span>
                                        </div>
                                      )}

                                      {task.description && (
                                        <p className="text-muted fs-12 mb-2 line-clamp-2">
                                          {task.description}
                                        </p>
                                      )}

                                      <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2">
                                          {task.comments && (
                                            <span className="text-muted fs-11">
                                              <i className="ri-chat-3-line me-1"></i>
                                              {task.comments}
                                            </span>
                                          )}
                                          {task.attachments && (
                                            <span className="text-muted fs-11">
                                              <i className="ri-attachment-line me-1"></i>
                                              {task.attachments}
                                            </span>
                                          )}
                                        </div>

                                        {task.assignee && (
                                          <div className="d-flex align-items-center">
                                            {getUserAvatar(task.assignee) ? (
                                              <Image
                                                src={getUserAvatar(task.assignee)}
                                                className="avatar avatar-xs rounded-circle border border-2 border-white"
                                                alt={task.assignee}
                                                title={task.assignee}
                                              />
                                            ) : (
                                              <div className="avatar avatar-xs rounded-circle bg-soft-primary text-primary d-flex align-items-center justify-content-center border border-2 border-white" style={{ width: '28px', height: '28px' }}>
                                                <span className="fw-semibold fs-10">{task.assignee}</span>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </Card.Body>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </Card.Body>
                        </Card>
                      )}
                    </Droppable>
                  </Col>
                );
              })}
            </Row>
          </DragDropContext>
        </Container>
      </div>
      <Footer />

      {/* Add Task Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Assignee</Form.Label>
                  <Form.Select
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  >
                    <option value="">Select Assignee</option>
                    <option value="AS">AS</option>
                    <option value="RK">RK</option>
                    <option value="MJ">MJ</option>
                    <option value="DK">DK</option>
                    <option value="VL">VL</option>
                    <option value="NP">NP</option>
                    <option value="SG">SG</option>
                    <option value="LM">LM</option>
                    <option value="AK">AK</option>
                    <option value="RR">RR</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Frontend"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Task Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Assignee</Form.Label>
                  <Form.Select
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  >
                    <option value="">Select Assignee</option>
                    <option value="AS">AS</option>
                    <option value="RK">RK</option>
                    <option value="MJ">MJ</option>
                    <option value="DK">DK</option>
                    <option value="VL">VL</option>
                    <option value="NP">NP</option>
                    <option value="SG">SG</option>
                    <option value="LM">LM</option>
                    <option value="AK">AK</option>
                    <option value="RR">RR</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tag</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Frontend"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete Task
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered className="success-modal">
        <Modal.Body className="text-center py-4">
          <div className="mb-3">
            <i className="ri-checkbox-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
          </div>
          <h5 className="text-success">{successMessage}</h5>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default KanbanBoard;

