export const getCharactersAge = ( names: Array<string> ) => {
    const constructedNames = names.map(( name, index ) => index === 0 ? `name[]=${ name }` : `&name[]=${name}`);

    return fetch(`https://api.agify.io/?${ constructedNames.join('') }`)
        .then(response => {
            // Checks if response is ok, because the API has a rate limit.
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch(() => []);
};