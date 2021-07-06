import React, { Fragment } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Row,
  Col,
} from 'reactstrap';

const ColorForm = ({
  colorModalShow,
  onColorModalToggle,
  onColorSubmit,
  colorInputs,
  onInputChange,
}) => {
  const { bg = null, color = null } = colorInputs;

  const closeBtn = (
    <button className='close' onClick={onColorModalToggle}>
      &times;
    </button>
  );

  return (
    <Fragment>
      <Modal
        isOpen={colorModalShow}
        toggle={onColorModalToggle}
        size='xs'
        fade={true}
      >
        <ModalHeader toggle={onColorModalToggle} close={closeBtn}>
          Choose Color
        </ModalHeader>
        <ModalBody className='cart-body'>
          <Form className='' onSubmit={onColorSubmit}>
            <Row>
              <Col md={12} xs={12} lg={12}>
                <FormGroup>
                  <Label>Background color</Label>
                  <Input
                    type='text'
                    placeholder='Enter background Color hex code'
                    name='bg'
                    value={bg}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>

              <Col md={12} xs={12} lg={12}>
                <FormGroup>
                  <Label>Text color</Label>
                  <Input
                    type='text'
                    placeholder='Enter Color text hex code'
                    name='color'
                    value={color}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md={12} xs={12} lg={12}>
                <Button color='primary' className='add-btn mt-3'>
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ColorForm;
