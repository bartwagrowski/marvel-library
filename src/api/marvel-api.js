import md5 from 'md5';
import { API_PRIVATE_KEY, API_PUBLIC_KEY } from '../constants';

const SERVICE_URL = 'http://gateway.marvel.com/v1/public';

const generateUrl = (pathToResource, listOfParams) => {
    const ts = +new Date();
    const urlParams = [
        ...listOfParams,
        { param: 'ts', value: ts },
        { param: 'apikey', value: API_PUBLIC_KEY },
        { param: 'hash', value: md5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY) },
    ];

    return `${SERVICE_URL}/${pathToResource}?${urlParams.reduce((acc, item) => acc + `&${item.param}=${encodeURIComponent(item.value)}`, '')}`;
};

const getData = async (url) => {
    const data = await fetch(url);
    if (data.ok) {
        return await data.json();
    }
    const err = await data.json();

    throw new Error(err.status);
};

const getMarvelCharacters = async (params) => {
    const url = generateUrl('characters', params);
    return await getData(url);
};

const getCharacterDetails = async (characterId) => {
    const url = generateUrl(`characters/${characterId}`, []);
    return await getData(url);
};

export { getMarvelCharacters, getCharacterDetails };
