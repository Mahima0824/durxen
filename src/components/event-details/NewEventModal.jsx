import React, { useState, useCallback } from 'react';
import { Modal, Button, Form, Row, Col, Image, ProgressBar, Alert } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

const NewEventModal = ({ show, onHide, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    datetime: '',
    price: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const categories = ['Conferences', 'Workshops', 'Seminars', 'Webinars', 'Networking'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.datetime) newErrors.datetime = 'Date and time is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!preview) newErrors.image = 'Please upload an image';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: useCallback((acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setErrors(prev => ({
          ...prev,
          image: 'File must be an image (JPG, PNG) and less than 5MB'
        }));
        return;
      }

      const file = acceptedFiles[0];
      if (file) {
        setErrors(prev => ({ ...prev, image: '' }));
        setPreview(URL.createObjectURL(file));
        // Simulate upload progress
        setIsUploading(true);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
          }
        }, 100);
      }
    }, []),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!validateForm()) {
      return;
    }

    const newEvent = {
      ...formData,
      id: Date.now(),
      image: preview,
      soldPct: 0,
      ticketsLeft: 100,
      datetime: new Date(formData.datetime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    onSave(newEvent);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Event</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Event Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} isInvalid={!!errors.title} placeholder="Enter event title"/>
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Row className="g-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select name="category" value={formData.category} onChange={handleChange} isInvalid={!!errors.category}>
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price ($)</Form.Label>
                    <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" isInvalid={!!errors.price} placeholder="0.00"/>
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} isInvalid={!!errors.location} placeholder="Enter event location"/>
                <Form.Control.Feedback type="invalid">{errors.location}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="datetime" value={formData.datetime} onChange={handleChange} isInvalid={!!errors.datetime} min={new Date().toISOString().slice(0, 16)}/>
                <Form.Control.Feedback type="invalid">{errors.datetime}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Enter event description"/>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Event Image</Form.Label>
                <div className={`border-2 ${preview ? 'border-soft-primary bg-transparent' : 'border-soft-secondary '} d-flex flex-column justify-content-center align-items-center border-dashed rounded p-5 text-center`}
                  {...getRootProps()}
                  style={{
                    cursor: 'pointer',
                    minHeight: '200px',
                  }}
                >
                  <input {...getInputProps()} />
                  {isUploading ? (
                    <div className="w-100">
                      <p className="text-muted">Uploading...</p>
                      <ProgressBar animated now={uploadProgress} label={`${uploadProgress}%`} />
                    </div>
                  ) : preview ? (
                    <div className="text-center">
                      <Image src={preview} alt="Preview" fluid className="mb-2 rounded"
                        style={{
                          maxHeight: '180px',
                          width: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <p className="text-muted mb-0">
                        <i className="ri-refresh-line me-1"></i> Click or drag to change image
                      </p>
                    </div>
                  ) : (
                    <div className="p-3">
                      <i className="ri-upload-cloud-2-line display-4 text-muted mb-3"></i>
                      <p className="mb-2 fw-medium">Drag & drop an image here</p>
                      <p className="small text-muted mb-0">or click to browse files</p>
                      <p className="small text-muted mt-2">Supports JPG, PNG (max 5MB)</p>
                    </div>
                  )}
                  {errors.image && (
                    <div className="invalid-feedback d-block">
                      <i className="ri-error-warning-line me-1"></i>
                      {errors.image}
                    </div>
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button variant="outline-secondary" onClick={onHide} disabled={isUploading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isUploading} className="d-flex align-items-center">
            {isUploading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Saving...
              </>
            ) : (
              <>
                <i className="ri-save-line me-2"></i> Save Event
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
      {submitAttempted && Object.keys(errors).length > 0 && (
        <Alert variant="danger" className="m-3">
          <div className="d-flex align-items-center">
            <i className="ri-error-warning-line me-2 fs-5"></i>
            <span>Please fill in all required fields correctly.</span>
          </div>
        </Alert>
      )}
    </Modal>
  );
};

export default NewEventModal;
