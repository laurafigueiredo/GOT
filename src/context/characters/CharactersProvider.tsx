import React, { useReducer } from 'react';

// Services
import { getCharacters } from './services/get-characters';
import { getCharactersAge } from './services/get-characters-age';

// Context
import {
    CharactersStateContext,
    CharactersDispatchContext,
    initialState,
    ICharactersState } from './CharactersContext';

// Interfaces
interface ICharactersAge {
    name: string;
    age: null | number;
    count: number;
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'FETCH_CHARACTERS_INIT':
        return {
            ...state,
            loading: true,
            error: false,
        }
        case 'FETCH_CHARACTERS_SUCCESS':
        return {
            ...state,
            loading: false,
            data: {
                ...state.data,
                [action.payload.pageNumber]: [...action.payload.result],
            },
            error: false,
        }
        case 'FETCH_CHARACTERS_FAIL':
        return {
            ...state,
            loading: false,
            error: true,
        }
        case 'SET_MAX_PAGES':
        return {
            ...state,
            maxPages: action.payload.maxPages,
        }
        default:
        throw new Error(`Unkown action: ${action.type}`)
    }
}

// Gets last page from Headers Link
const getMaxPageSizes = ( link: string | null ) => {
    if( link ) {
        const linkParts = link.split(',');
        const filteredParts = linkParts.filter( linkPart => linkPart.indexOf('last') !== -1 );

        if( !!filteredParts.length ) {
            const matches = filteredParts[0].match(/page=([^&]*)/);

            if( matches && matches[1] ) {
                return parseInt(matches[1]);
            }
        }
    }

    return 0;
};

export const CharactersProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    function fetchCharacters(pageNumber: number) {
        dispatch({ type: 'FETCH_CHARACTERS_INIT' });

        getCharacters(pageNumber)
            .then(response => {
                // Only get total number of pages in the first call to the API.
                if (pageNumber === 1) {
                    const link = response.headers.get('Link');
                    const getMaxPageSize = getMaxPageSizes( link );

                    dispatch({type: 'SET_MAX_PAGES', payload: {maxPages: getMaxPageSize}});
                }

                return response.json();
            })
            .then(async (result) => {
                const names = result.map((item: ICharactersState) => item.name);
                const charactersAges = await getCharactersAge(names);

                // Check if the API does not return age values.
                // Otherwise append the age to the character result.
                const newResult = !charactersAges.length ?
                    result :
                    charactersAges.reduce((acc: any[], item: ICharactersAge, idx: number) => {
                        const age = !item.age ? '' : `${item.age}`;
                        const newIter = { ...result[idx], age };

                        return [...acc, newIter];
                    }, []);

                return newResult;
            })
            .then(result =>
                dispatch({ type: 'FETCH_CHARACTERS_SUCCESS', payload: {result, pageNumber} })
            ).catch(() => {
                dispatch({ type: 'FETCH_CHARACTERS_FAIL' });
            });
    };

    return (
        <CharactersDispatchContext.Provider value={dispatch}>
            <CharactersStateContext.Provider value={{...state, fetchCharacters}}>
                {children}
            </CharactersStateContext.Provider>
        </CharactersDispatchContext.Provider>
    );
};