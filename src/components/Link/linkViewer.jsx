import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { Card, CardBody, CardHeader } from 'reactstrap';

const LinkViewer = ({ linksData = [], onLinkClick, isLoading }) => {
  return (
    <>
      <Card className='mb-2' key={2}>
        <CardHeader className='text-center'>Link Preview</CardHeader>
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
                    <div
                      className={`view-item-wrap ${
                        localStorage.getItem('cd') === 'circle'
                          ? 'view-item-active'
                          : null
                      }
                      }`}
                      key={index}
                      onClick={() => onLinkClick(item)}
                      style={{
                        backgroundColor: localStorage.getItem('bg')
                          ? localStorage.getItem('bg')
                          : '#fff',
                        color: localStorage.getItem('color')
                          ? localStorage.getItem('c#212529')
                          : '#212529',
                      }}
                    >
                      {item.title}
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

export default LinkViewer;
