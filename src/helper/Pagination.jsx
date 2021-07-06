import React, { Component, Fragment } from 'react';

//Icons
import arrowLeftIcon from './../assets/arrow-left.svg';
import arrowRightIcon from './../assets/arrow-right.svg';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

// eslint-disable-next-line
class Pagination extends Component {
  constructor(props) {
    super(props);
    const {
      totalRecords = null,
      pageLimit = 5,
      pageNeighbours = 0,
      currentPage = 1,
    } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 5;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: currentPage };
  }
  // eslint-disable-next-line
  componentDidMount() {
    this.gotoPage(this.state.currentPage);
  }

  // eslint-disable-next-line
  gotoPage = (page) => {
    // eslint-disable-next-line
    const { onPageChanged = (f) => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  // eslint-disable-next-line
  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };
  // eslint-disable-next-line
  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  // eslint-disable-next-line
  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };

  // eslint-disable-next-line
  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  // eslint-disable-next-line
  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label='Countries Pagination'>
          <ul className='pagination'>
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className='page-item'>
                    <a
                      className='page-link'
                      href='!#'
                      aria-label='Previous'
                      onClick={(e) => this.handleMoveLeft(e)}
                    >
                      <span>
                        {' '}
                        <img src={arrowLeftIcon} alt='' />
                      </span>
                      <span className='sr-only'></span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className='page-item'>
                    <a
                      className='page-link'
                      href='!#'
                      aria-label='Next'
                      onClick={(e) => this.handleMoveRight(e)}
                    >
                      <span>
                        {' '}
                        <img src={arrowRightIcon} alt='' />
                      </span>
                      <span className='sr-only'></span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? ' active' : ''
                  }`}
                >
                  <a
                    className='page-link'
                    href='!#'
                    onClick={(e) => this.handleClick(page, e)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default Pagination;
