import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import TextField from '@mui/material/TextField';

const CharacterListSearch = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getOptionsDelayed = useCallback(
        debounce((text) => {
            onSearch(text);
        }, 500),
        [onSearch]
    );

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        getOptionsDelayed(inputValue);
    }, [inputValue, getOptionsDelayed]);

    return <TextField label='Search' size='small' onChange={onChange} />;
};

export default CharacterListSearch;
