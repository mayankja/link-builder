import React, { Fragment } from 'react';
import { Form, FormGroup, Input, Button, Label, Row, Col } from 'reactstrap';

const ModalForm = ({
  onInputChange,
  inputs,
  onSubmit,
  error = {},
  isLoading,
}) => {
  const { id = '', title = '', url = '' } = inputs || {};

  return (
    <Fragment>
      <Form className='mt-3' onSubmit={onSubmit}>
        <Row>
          <Col md={12} xs={12} lg={12}>
            <FormGroup>
              <Input
                type='text'
                placeholder='Link Title'
                name='title'
                value={title}
                onChange={onInputChange}
              />
              <Label>
                <span className='validation-error'>
                  {error.title ? `${error.title} *` : ''}
                </span>
              </Label>
            </FormGroup>
          </Col>

          <Col md={12} xs={12} lg={12}>
            <FormGroup>
              <Input
                type='text'
                placeholder='Link URL'
                name='url'
                value={url}
                onChange={onInputChange}
              />
              <Label>
                <span className='validation-error'>
                  {error.url ? `${error.url} *` : ''}
                </span>
              </Label>
            </FormGroup>
          </Col>

          <Col md={12} xs={12} lg={12}>
            {' '}
            <Button color='primary' className='add-btn'>
              {isLoading ? 'Please wait ' : id ? 'Edit Link' : 'Add New Link'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default ModalForm;
