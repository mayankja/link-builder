import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Card, CardBody, CardHeader, UncontrolledTooltip } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

const LinkEditor = ({ linksData = [], onDelete, onEdit, isLoading }) => {
  return (
    <>
      <Card className='mb-2' key={2}>
        <CardHeader className='text-center'>Link Editor</CardHeader>
        <CardBody>
          <ul>
            {isLoading ? (
              /*
              -----------
                Loader 
              ------------
            */
              <Skeleton count={5} />
            ) : linksData && linksData.length > 0 ? (
              linksData.map((item, index) => {
                return (
                  <li key={index}>
                    <div className='editor-item-wrap'>
                      <span className='editor-title'>{item.title}</span>
                      <span className='editor-clicks'>
                        {' '}
                        <FontAwesomeIcon icon={faEye} /> {item.clicks}
                      </span>
                      <span
                        className='editor-edit'
                        id={`edit-${item.id}`}
                        onClick={() => onEdit(item)}
                      >
                        <FontAwesomeIcon icon={faEdit} />{' '}
                        <UncontrolledTooltip
                          placement='top'
                          target={`edit-${item.id}`}
                        >
                          Edit
                        </UncontrolledTooltip>
                      </span>
                      <span
                        className='editor-delete'
                        id={`del-${item.id}`}
                        onClick={() => onDelete(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />{' '}
                        <UncontrolledTooltip
                          placement='top'
                          target={`del-${item.id}`}
                        >
                          Delete
                        </UncontrolledTooltip>
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <li>No links added</li>
            )}
          </ul>
        </CardBody>
      </Card>
    </>
  );
};

export default LinkEditor;
