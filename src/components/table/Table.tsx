import React, { useState, useEffect, useRef } from "react";

// Components
import { Button } from '../button';
import { Input } from '../input';

// Styled Components
import { STable, STableTd, STableHeadTh, STableBodyTr, STableHeadThInput, SWrapper } from './styled';

// interfaces
import { ICharactersState } from '../../context/characters';

interface IKeys {
  value: string;
  name: string;
}

interface ITable {
  charactersJSON: ICharactersState[];
  keys: IKeys[];
};

// Types
type TInputValues = {
  [key: string ]: string;
};

export const Table = ({
  charactersJSON,
  keys,
}: ITable) => {
  const [characters, setCharacters] = useState(charactersJSON);
  const [descending, setDescending] = useState(false);
  const [inputValues, setInputValues] = useState<TInputValues>({});
  const searchFormRef = useRef<HTMLFormElement>(null);

  // When inputValues changes, apply filter or resets the table to initial configuration
  useEffect(() => {
    if( Object.keys( inputValues ).length > 0 ) {
      applyFilters();
    } else {
      setCharacters( charactersJSON );
    }

  }, [inputValues]);

  useEffect(() => {
    // Check if any filters are selected and resets them
    if( Object.keys( inputValues ).length > 0 ) {
      setInputValues({});
      searchFormRef && searchFormRef.current && searchFormRef.current.reset();
    }

    // Needed for caching -> forces re-render
    setCharacters( charactersJSON );
  }, [charactersJSON])

  // Filters table by input values for each column
  function applyFilters() {
    const charactersCopy = [...charactersJSON];
    const filteredCharacters = charactersCopy.filter(( characterObj ) => {
      let valid = true;

      Object.keys( inputValues ).forEach(( inputKey ) => {
        const characterInfo = characterObj[inputKey as keyof ICharactersState].toLowerCase()
        const inputValue = inputValues[inputKey].toLowerCase();

        valid = valid && characterInfo.includes(inputValue);
      });

      return valid;
    });

    setCharacters(filteredCharacters);

  }

  // Sorts table in the page by descendent or ascendent
  function sortByString(name: string, desc: boolean) {
    const charactersCopy = [...characters];
    const filteredCharacters = charactersCopy.sort((a, b) => {
      const entryNameA = a[name as keyof ICharactersState].toUpperCase();
      const entryNameB = b[name as keyof ICharactersState].toUpperCase();
      let comparison = 0;

      if (entryNameA < entryNameB) comparison = -1;
      if (entryNameA > entryNameB) comparison = 1;

      return desc ? comparison * -1 : comparison;
    });

    setCharacters(filteredCharacters);
    setDescending(prev => !prev);
  }

  // Manage input values object
  function handleInputValues( target: HTMLInputElement, key: string ) {
    setInputValues(prevState => {
      // If input is empty cleans the key from inputValues
      // Otherwise, adds the new input value to the inputValues
      if (!target.value && prevState[key]) {
        delete prevState[key];
      } else {
        prevState[key] = target.value;
      }

      return {...prevState};
    });
  }

  return (
    <form ref={searchFormRef}>
      <SWrapper>
        <STable>
          <thead>
            <tr key="inputs">
                {
                  keys.map((item)=> (
                    <STableHeadThInput key={item.value}>
                      <Input
                        name={ item.name }
                        placeholder={`Filter by: ${ item.name }`}
                        handleOnChange={ (target: HTMLInputElement) => handleInputValues(target, item.value) }/>
                    </STableHeadThInput>
                  ))
                }
            </tr>
            <tr key="buttons">
              {
                keys.map((item)=> (
                  <STableHeadTh key={item.value}>
                    <Button
                      name={item.name}
                      handleOnClick={() => sortByString(item.value, descending)} />
                  </STableHeadTh>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {characters &&
              characters.map((character) => (
                <STableBodyTr key={character.url}>
                  { keys.map((item)=> (
                    <STableTd key={item.value}>{character[item.value as keyof ICharactersState]}</STableTd>
                  ))}
                </STableBodyTr>
              ))}
          </tbody>
        </STable>
      </SWrapper>
    </form>
  );
};
