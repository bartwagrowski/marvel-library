import { useCallback, useEffect, useState } from 'react';
import { getMarvelCharacters } from '../../api/marvel-api';

const useCharacterSearchState = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [numberOfCharacters, setNumberOfCharacters] = useState(0);
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [charactersPerPage, setCharactersPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [sortBy, setSortBy] = useState();
    const [error, setError] = useState(null);

    const onSearch = useCallback((text) => {
        setSearchText(text);
    }, []);

    const onSort = useCallback((sortBy) => {
        setSortBy(sortBy);
    }, []);

    const onPageChange = useCallback((_, pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const onRowsPerPageChange = useCallback((event) => {
        setCharactersPerPage(event.target.value);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let params = [
                { param: 'limit', value: charactersPerPage },
                { param: 'offset', value: currentPage * charactersPerPage },
            ];

            if (searchText) {
                params = [...params, { param: 'nameStartsWith', value: searchText }];
            }

            if (sortBy) {
                params = [...params, { param: 'orderBy', value: sortBy }];
            }

            let result;
            try {
                result = await getMarvelCharacters(params);
            } catch (err) {
                setError(err.message);
            }

            const data = result && result.data;
            if (data) {
                setNumberOfCharacters(data.total);
                setCharacters(data.results);
            }

            setIsLoading(false);
        };

        setIsLoading(true);
        fetchData();
    }, [currentPage, charactersPerPage, searchText, sortBy]);

    return {
        isLoading,
        characters,
        charactersPerPage,
        numberOfCharacters,
        currentPage,
        onSearch,
        onSort,
        onPageChange,
        onRowsPerPageChange,
        error,
    };
};

export default useCharacterSearchState;
