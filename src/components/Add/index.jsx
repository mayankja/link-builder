import React, { Fragment, useEffect, useState, lazy } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import { showSuccess } from '../../helper/toast';
import useServices from '../../services/api';

const ModalForm = lazy(() => import('./modelForm'));

const { updateLinkData, addNewLink } = useServices;

const initialInputs = {
  title: '',
  url: '',
  clicks: 0,
  id: '',
};

const AddLink = ({ linkData, modalShow, onModalHandleChange }) => {
  const [inputs, SetInputs] = useState(initialInputs);
  const [error, setError] = useState(initialInputs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { id, title, clicks, url } = linkData || {};
    if (id) {
      SetInputs({
        id,
        title,
        clicks,
        url,
      });
    }
  }, [linkData]);

  /*
-----------------------------------
	Function to update input states
-----------------------------------
*/
  const onInputChange = (e) => {
    const {
      target: { value, name },
    } = e;

    SetInputs({
      ...inputs,
      [name]: value,
    });

    if (name === 'title') {
      validateTitle(value);
    }
    if (name === 'url') {
      validateUrl(value.trim());
    }
  };

  /*
  ------------------------------
    Function to validate title 
 -------------------------------
 */
  const validateTitle = (title) => {
    /* eslint-disable-next-line */
    if (title === '' || title.length === 0) {
      setError({
        ...error,
        title: 'Enter valid title',
      });
      return;
    } else {
      var re = /^(?!\s)[a-zA-Z0-9\s]*$/;
      return !re.test(title)
        ? setError({
            ...error,
            title: 'Enter valid title',
          })
        : setError({
            ...error,
            title: null,
          });
    }
  };

  /*
  ------------------------------
    Function to validate url 
 -------------------------------
 */
  const validateUrl = (url) => {
    /* eslint-disable-next-line */
    var re =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    return !re.test(url)
      ? setError({
          ...error,
          url: 'Enter valid url',
        })
      : setError({
          ...error,
          url: null,
        });
  };

  /*
    ----------------------------------------
    Function to manage add/edit form submit
    ----------------------------------------
    */
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      const { url, id, title } = inputs;
      if (title === '' || url === '') {
        validateTitle(title);
        validateUrl(url);
        setIsLoading(false);
        return;
      }

      if (id) {
        // edit link
        await updateLinkData(id, inputs)
          .then(async (response) => {
            showSuccess('Link updated successfully');
            SetInputs(initialInputs);
            setIsLoading(false);
            await onClose();
          })
          .catch(function (error) {
            setError(initialInputs);
            setIsLoading(false);
          });
      } else {
        // add new link
        const data = {
          clicks: 0,
          title,
          url,
        };

        await addNewLink(data)
          .then(async () => {
            showSuccess('Link added successfully');
            SetInputs(initialInputs);
            setIsLoading(false);
            await onClose();
          })
          .catch(function (error) {
            setError(initialInputs);
            setIsLoading(false);
          });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  /*
----------------------------
	Function to close modal 
----------------------------
*/
  const onClose = async () => {
    SetInputs(initialInputs);
    setError(initialInputs);
    await onModalHandleChange();
  };

  const closeBtn = (
    <button className='close' onClick={onClose}>
      &times;
    </button>
  );

  return (
    <Fragment>
      <Modal isOpen={modalShow} toggle={onClose} size='xs' fade={true}>
        <ModalHeader toggle={onClose} close={closeBtn}>
          {inputs.id ? 'Edit' : 'Add'}
          {' Link '}
        </ModalHeader>
        <ModalBody className='cart-body'>
          <ModalForm
            isLoading={isLoading}
            error={error}
            inputs={inputs}
            onSubmit={onSubmit}
            onInputChange={onInputChange}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AddLink;
