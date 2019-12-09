import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

// Context
import { CharactersStateContext } from '../src/context/characters';

// Components
import { Table, Pagination } from '../src/components';

// Styles
import GlobalStyles from '../src/styles/globalStyles';
const SPageWrapper = styled.div`
  margin-top: 3rem;
`;

const keys = [
  {
    value: 'name',
    name: 'Name',
  },
  {
    value: 'gender',
    name: 'Gender',
  },
  {
    value: 'culture',
    name: 'Culture',
  },
  {
    value: 'born',
    name: 'Born',
  },
  {
    value: 'died',
    name: 'Died',
  },
  {
    value: 'age',
    name: 'Age',
  }
];

const IndexPage = () => {
  const { loading, error, data, fetchCharacters, maxPages } = useContext(CharactersStateContext);
  const [currentPage, setCurrentPage] = useState(1);
  const hasCharactersStore = !!data && !!data[currentPage] && data[currentPage].length !== 0;

  // When page is changed, checks if the store already has the data in cache
  // Otherwise fetches it
  useEffect(() => {

		if( !hasCharactersStore ) fetchCharacters(currentPage);

  }, [currentPage]);

  return (
    <SPageWrapper >
      <GlobalStyles />
      <Table
        charactersJSON={data[currentPage]}
        keys={keys} />
      { loading && <div>Loading</div> }
      { error && <div>Error</div> }
      <Pagination
        handleOnClick={(currentPage) => setCurrentPage(currentPage)}
        currentPage={currentPage}
        maxPages={maxPages} />
    </SPageWrapper >
  )
}

export default IndexPage
