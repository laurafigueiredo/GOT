import { createContext } from 'react';

// Interfaces
export interface ICharactersState {
    url: string;
    name: string;
    gender: string;
    culture: string;
    born: string;
    died: string;
    age: string;
}

interface ICharactersStateContext {
    data: { [key: number]: ICharactersState[] };
    loading: boolean;
    error: boolean;
    fetchCharacters: (pageNumber: number) => void;
    maxPages: number;
}

export const initialState:ICharactersStateContext = {
    loading: false,
    data: [],
    error: false,
    fetchCharacters: (pageNumber: number) => {
        throw new Error('fetchCharacters() not implemented');
    },
    maxPages: 0,
};

export const CharactersStateContext = createContext(initialState);
export const CharactersDispatchContext = createContext<any>({});
