import React, { useEffect, useState, lazy } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Container,
  UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEyeDropper,
  faClone,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

import Pagination from '../../helper/Pagination';
import useServices from '../../services/api';
import { confirmBox, showSuccess } from '../../helper/toast';

import queryString from 'query-string';
import CornerForm from '../others/corner';
import ColorForm from '../others/color';

const AddLink = lazy(() => import('../Add'));
const LinkViewer = lazy(() => import('./linkViewer'));
const LinkEditor = lazy(() => import('./linkEditor'));

const { fetchLinks, fetchCount, updateLinkClicks, deleteLink } = useServices;

const _limit = 5;

const initialColorInputs = {
  bg: '',
  color: '',
};
// eslint-disable-next-line
const Links = (props) => {
  const {
    history,
    location: { search },
  } = props;

  // eslint-disable-next-line
  const parsedHash = queryString.parse(search);
  const { page } = parsedHash;

  const [linksData, setLinksData] = useState([]);
  const [currentPage, SetCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [linkData, SetLinkData] = useState({});
  const [modalShow, SetModalShow] = useState(false);
  const [cornerModalShow, SetCornerModalShow] = useState(false);
  const [colorModalShow, SetColorModalShow] = useState(false);
  const [colorInputs, setColorInputs] = useState(initialColorInputs);

  useEffect(() => {
    getLinks(_limit, currentPage);
  }, []);

  useEffect(() => {
    if (page) {
      getLinks(_limit, parseInt(page));
      SetCurrentPage(parseInt(page));
    }
  }, [page]);

  /*
--------------------------------------------------
  Function to get the links data with pagination
--------------------------------------------------
*/
  const getLinks = async (_limit, _page) => {
    setIsLoading(true);
    await getPages();
    await fetchLinks(_limit, _page)
      .then((response) => {
        setLinksData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log('error', error));
  };

  /*
----------------------------------
	Function to fetch total pages
----------------------------------
*/
  const getPages = async () => {
    await fetchCount().then((response) => {
      setTotalCount(response);
    });
  };

  /*
------------------------------------
  Function to update the link click
------------------------------------
*/
  const onLinkClick = async (item) => {
    window.open(item.url, '__targetBlank');
    await updateLinkClicks(item.id, { clicks: item.clicks + 1 })
      .then(async (response) => {
        await getLinks(_limit, currentPage);
      })
      .catch((error) => console.log('error', error));
  };

  /*
---------------------------
	Function to delete link 
---------------------------
*/
  const onDelete = async (id) => {
    const { value } = await confirmBox({
      title: 'Are you sure?',
      text: 'Do you want to delete this link record',
    });
    if (!value) {
      return;
    } else {
      await deleteLink(id);
      showSuccess('Link deleted successfully');
      await getLinks(_limit, currentPage);
    }
  };

  /*
--------------------------------
	Function to manage edit popup 
--------------------------------
*/
  const onEdit = (item) => {
    SetLinkData(item);
    SetModalShow(true);
  };

  /*
--------------------------------
	Function to manage add popup 
--------------------------------
*/
  const onAdd = (item) => {
    SetLinkData({});
    SetModalShow(true);
  };

  /*
----------------------------------
	Function to manage pagination
----------------------------------
*/
  // eslint-disable-next-line
  const onPageChanged = (page) => {
    const stringified = queryString.stringify({ page: page.currentPage });
    history.push(`?${stringified}`);
  };

  /*
-------------------------------------------
	Function to manage cart modal open/close
-------------------------------------------
*/
  const onModalHandleChange = async () => {
    SetModalShow(false);
    SetLinkData({});
    await getLinks(_limit, currentPage);
  };

  /*
-----------------------------------------------------
	Function to manage corner design  modal open/close
------------------------------------------------------
*/
  const onCornerModalToggle = () => SetCornerModalShow(!cornerModalShow);

  /*
-----------------------------------------------------
	Function to manage color design  modal open/close
------------------------------------------------------
*/
  const onColorModalToggle = () => SetColorModalShow(!colorModalShow);

  /*
------------------------------------
	Function to update corner design
------------------------------------
*/
  const onCornerUpdate = (shape) => {
    localStorage.setItem('cd', shape);
    onCornerModalToggle();
  };

  /*
-----------------------------------
	Function to update input states
-----------------------------------
*/
  const onInputChange = (e) => {
    const {
      target: { value, name },
    } = e;

    setColorInputs({
      ...colorInputs,
      [name]: value,
    });
  };

  /*
-----------------------------------------------
	Function to update color code input  on edit
-----------------------------------------------
*/
  const onColorUpdate = () => {
    setColorInputs({
      bg: localStorage.getItem('bg') ? localStorage.getItem('bg') : '',
      color: localStorage.getItem('color') ? localStorage.getItem('color') : '',
    });
    onColorModalToggle();
  };

  /*
-----------------------------------------
	Function to save color code  on edit
-----------------------------------------
*/
  const onColorSubmit = () => {
    const { bg = null, color = null } = colorInputs;
    localStorage.setItem('bg', bg);
    localStorage.setItem('color', color);
    onColorModalToggle();
  };

  return (
    <>
      <Container>
        <Card>
          <CardHeader>
            <CardTitle className='text-center mt-1'>
              <h6>Link Builder App</h6>
              <div className='header-wrap'>
                <span className='add-link' onClick={() => onAdd()} id='add'>
                  <FontAwesomeIcon icon={faPlusCircle} />
                  <UncontrolledTooltip placement='top' target='add'>
                    Add new link
                  </UncontrolledTooltip>
                </span>
                <span
                  className='add-link'
                  onClick={() => onCornerModalToggle()}
                  id='corner'
                >
                  <FontAwesomeIcon icon={faClone} />
                  <UncontrolledTooltip placement='top' target='corner'>
                    Update preview link corner design
                  </UncontrolledTooltip>
                </span>
                <span
                  className='add-link'
                  onClick={() => onColorUpdate()}
                  id='color'
                >
                  <FontAwesomeIcon icon={faEyeDropper} />
                  <UncontrolledTooltip placement='top' target='color'>
                    Update Color
                  </UncontrolledTooltip>
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs={12} md={6} lg={6}>
                {/* Editor component */}
                <LinkEditor
                  linksData={linksData}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  isLoading={isLoading}
                />
              </Col>
              <Col xs={12} md={6} lg={6}>
                {/* Viewer component */}
                <LinkViewer
                  linksData={linksData}
                  onLinkClick={onLinkClick}
                  isLoading={isLoading}
                />
              </Col>{' '}
              <Col xs={12} md={12} lg={12}>
                {/* Pagination component */}
                <div className='d-flex flex-row  align-items-center justify-content-center'>
                  {!isLoading && totalCount && totalCount > 0 ? (
                    <Pagination
                      totalRecords={totalCount}
                      pageLimit={_limit}
                      pageNeighbours={currentPage}
                      onPageChanged={onPageChanged}
                      currentPage={currentPage}
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {/* Add/Edit component */}
        <AddLink
          linkData={linkData}
          modalShow={modalShow}
          onModalHandleChange={onModalHandleChange}
        />

        {/* Corner form modal component */}
        <CornerForm
          onCornerUpdate={onCornerUpdate}
          cornerModalShow={cornerModalShow}
          onCornerModalToggle={onCornerModalToggle}
        />

        {/* Color form modal component */}
        <ColorForm
          onInputChange={onInputChange}
          colorInputs={colorInputs}
          colorModalShow={colorModalShow}
          onColorModalToggle={onColorModalToggle}
          onColorSubmit={onColorSubmit}
        />
      </Container>
    </>
  );
};
export default Links;
