export const getCharacters = (pageNumber: number) => {
    const url = `https://anapioficeandfire.com/api/characters?page=${pageNumber}`;

    return fetch(url);
};