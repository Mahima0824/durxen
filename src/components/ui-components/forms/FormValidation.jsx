import React, { useState } from 'react';
import { Card, Col, Container, Row, Form, Button, InputGroup } from 'react-bootstrap';
import PageTitle from '../../layout/PageTitle';
import Footer from '../../layout/Footer';
import * as formik from 'formik';
import * as yup from 'yup';
import validationData from '../../../data/form/validation.json';

const { Formik } = formik;

const FormValidation = () => {
  const [validated, setValidated] = useState(false);
  const { formValidation, formValidationTooltips, inputGroupValidation } = validationData;

  // Build Yup validation schema from formValidationTooltips fields
  const buildValidationSchema = () => {
    const schemaFields = {};
    formValidationTooltips.fields.forEach(field => {
      if (field.validation) {
        let validator = yup[field.type === 'checkbox' ? 'boolean' : 'string']();

        if (field.validation.required) {
          validator = validator.required(field.validation.message || 'This field is required');
        }

        if (field.type === 'checkbox' && field.validation.required) {
          validator = validator.oneOf([true], field.validation.message || 'You must accept the terms');
        }

        if (field.type === 'file') {
          validator = yup.mixed().required(field.validation.message || 'File is required');
        }

        schemaFields[field.name] = validator;
      }
    });
    return yup.object().shape(schemaFields);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const renderFormGroup = (field, index, formikProps = null) => {
    const { values, touched, errors, handleChange } = formikProps || {};
    const isFormik = !!formikProps;
    const hasError = isFormik && touched[field.name] && errors[field.name];
    const isValid = isFormik && touched[field.name] && !errors[field.name];
    const controlId = field.controlId || `validation${field.name}${index}`;
    const commonProps = {
      key: controlId,
      as: field.col ? Col : Form.Group,
      md: field.col,
      controlId: controlId,
      className: field.className || (isFormik ? 'position-relative' : '')
    };

    const renderControl = () => {
      const controlProps = {
        type: field.type,
        name: field.name,
        placeholder: field.placeholder,
        defaultValue: field.defaultValue,
        required: field.validation?.required,
        isInvalid: hasError,
        isValid: isValid && !field.validation?.isInvalid,
        onChange: handleChange,
        value: values?.[field.name],
        ...(field.type === 'textarea' && { as: 'textarea' }),
        ...(field.style && { style: field.style })
      };

      if (field.inputGroup) {
        return (
          <InputGroup hasValidation>
            {field.inputGroup.prepend && (
              <InputGroup.Text id={`${controlId}Prepend`}>
                {field.inputGroup.prepend}
              </InputGroup.Text>
            )}
            <Form.Control {...controlProps} aria-describedby={field.inputGroup.prepend ? `${controlId}Prepend` : undefined} />
            {renderFeedback(field, hasError, errors)}
          </InputGroup>
        );
      }

      if (field.type === 'checkbox') {
        return <Form.Check {...controlProps} label={field.label} feedback={field.validation?.message} feedbackType="invalid" feedbackTooltip={isFormik} />
      }

      if (field.type === 'file') {
        return <Form.Control {...controlProps} />;
      }

      return <Form.Control {...controlProps} />;
    };

    return (
      <Form.Group {...commonProps}>
        {field.label && field.type !== 'checkbox' && <Form.Label>{field.label}</Form.Label>}
        {renderControl()}
        {!isFormik && field.validation?.message && (
          <Form.Control.Feedback type="invalid">
            {field.validation.message}
          </Form.Control.Feedback>
        )}
        {isFormik && field.tooltip && (
          <Form.Control.Feedback tooltip>{field.tooltip}</Form.Control.Feedback>
        )}
        {isFormik && hasError && (
          <Form.Control.Feedback type="invalid" tooltip>
            {errors[field.name]}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  };

  const renderFeedback = (field, hasError, errors) => {
    if (hasError) {
      return (
        <Form.Control.Feedback type="invalid">
          {errors[field.name] || field.validation?.message}
        </Form.Control.Feedback>
      );
    }
    return field.validation?.required ? (
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    ) : null;
  };

  const renderForm = (formConfig, { formikProps = null } = {}) => {
    const isFormik = !!formikProps;

    return (
      <Form noValidate validated={!isFormik ? validated : undefined} onSubmit={isFormik ? formikProps.handleSubmit : handleSubmit}>
        <Row className="mb-3">
          {formConfig.fields.map((field, index) => {
            if (field.row) {
              return (
                <Row key={`row-${index}`} className="mb-3">
                  {field.fields.map((nestedField, nestedIndex) =>
                    renderFormGroup(nestedField, nestedIndex, formikProps)
                  )}
                </Row>
              );
            }
            return renderFormGroup(field, index, formikProps);
          })}
        </Row>
        {!isFormik && (
          <Button type="submit">Submit form</Button>
        )}
      </Form>
    );
  };

  const renderFormikForm = () => (
    <Formik
      validationSchema={buildValidationSchema()}
      onSubmit={values => console.log(values)}
      initialValues={formValidationTooltips.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || '';
        if (field.type === 'file') acc[field.name] = null;
        if (field.type === 'checkbox') acc[field.name] = false;
        return acc;
      }, {})}
    >
      {formikProps => (
        <Form noValidate onSubmit={formikProps.handleSubmit}>
          <Row className="mb-3">
            {formValidationTooltips.fields.map((field, index) =>
              renderFormGroup(field, index, formikProps)
            )}
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );

  const renderInputGroupValidation = () => (
    <InputGroup hasValidation>
      <InputGroup.Text>@</InputGroup.Text>
      <Form.Control type="text" required isInvalid={inputGroupValidation.fields[0].validation.isInvalid} />
      <Form.Control.Feedback type="invalid">
        {inputGroupValidation.fields[0].validation.message}
      </Form.Control.Feedback>
    </InputGroup>
  );

  return (
    <div className='page-wrapper'>
      <div className='page-content'>
        <PageTitle pagePrTitle="Forms" pageTitle="Form Validation" />
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Card.Title>{formValidation.title}</Card.Title>
                  {renderForm(formValidation, {})}
                </Card.Body>
              </Card>
            </Col>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Card.Title>{formValidationTooltips.title}</Card.Title>
                  {renderFormikForm()}
                </Card.Body>
              </Card>
            </Col>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Card.Title>{inputGroupValidation.title}</Card.Title>
                  {renderInputGroupValidation()}
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

export default FormValidation;
