import React, { Fragment } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const CornerForm = ({
  cornerModalShow,
  onCornerModalToggle,
  onCornerUpdate,
}) => {
  const closeBtn = (
    <button className='close' onClick={onCornerModalToggle}>
      &times;
    </button>
  );

  const activeTile = localStorage.getItem('cd')
    ? localStorage.getItem('cd')
    : 'square';

  return (
    <Fragment>
      <Modal
        isOpen={cornerModalShow}
        toggle={onCornerModalToggle}
        size='xs'
        fade={true}
      >
        <ModalHeader toggle={onCornerModalToggle} close={closeBtn}>
          Choose Preview Corner Design
        </ModalHeader>
        <ModalBody className='cart-body'>
          <div className='corner-wrap'>
            <span
              className={`corner-circular ${
                activeTile === 'circle' ? 'active-corner' : null
              }`}
              onClick={() => onCornerUpdate('circle')}
            >
              Circular
            </span>
            <span
              className={`corner-square ${
                activeTile === 'square' ? 'active-corner' : null
              }`}
              onClick={() => onCornerUpdate('square')}
            >
              Square
            </span>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CornerForm;
