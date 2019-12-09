import React from 'react';

// Styled Components
import { SPagination, SPaginationButton, SPaginationButtonPrevNext, SPaginationItem, SCurrentPage } from './styled';

// Interfaces
interface IPagination {
    handleOnClick: (page: number) => void;
    currentPage: number;
    maxPages: number;
}

// Constants
const PAGES_TO_SHOW = 5;

export const Pagination = ({
  handleOnClick,
  currentPage,
  maxPages,
}: IPagination) => {
  const pages: number[] = getPages(PAGES_TO_SHOW, currentPage, maxPages);

  // Returns array of pages to appear in the layout
  function getPages( pagesToShow: number, currentPage: number, totalPages: number ) {
    const pages = [];
    let startFromNumber = 1;
    
    if (totalPages <= pagesToShow) {
      startFromNumber = 1;
      pagesToShow = totalPages;
    } else {
      if (currentPage <= Math.ceil(pagesToShow / 2)) {
        startFromNumber = 1;
      } else if (currentPage + Math.floor((pagesToShow - 1) / 2) >= totalPages) {
        startFromNumber = totalPages - (pagesToShow - 1);
      } else {
        startFromNumber = currentPage - Math.floor(pagesToShow / 2);
      }
    }
    
    for (let i = 1; i <= pagesToShow; i++) {
      pages.push(startFromNumber++);
    }
    
    return pages;
  }

  return (
    <nav>
      <SPagination>
        { currentPage !== 1 &&
          <>
            <SPaginationItem key={'page-first'}>
              <SPaginationButton onClick={() => handleOnClick( 1 )}>
                First
              </SPaginationButton>
            </SPaginationItem>
            <SPaginationItem key={'page-prev'}>
              <SPaginationButtonPrevNext onClick={() => handleOnClick( currentPage - 1 )}>
                &#60;
              </SPaginationButtonPrevNext>
            </SPaginationItem>
          </>
        }
        {!!pages.length && pages.map(number => (
          <SPaginationItem key={`page-${number}`}>
            { number === currentPage ?
              <SCurrentPage>{number}</SCurrentPage>
              :
              <SPaginationButton onClick={() => handleOnClick( number )}>
                {number}
              </SPaginationButton>
            }
          </SPaginationItem>
        ))}
        { currentPage !== maxPages &&
            <>
              <SPaginationItem key={'page-next'}>
                <SPaginationButtonPrevNext onClick={() => handleOnClick( currentPage + 1 )}>
                  &#62;
                </SPaginationButtonPrevNext>
              </SPaginationItem>
              <SPaginationItem key={'page-last'}>
                <SPaginationButton onClick={() => handleOnClick( maxPages )}>
                  Last
                </SPaginationButton>
              </SPaginationItem>
            </>
        }
      </SPagination>
    </nav>
  );
};