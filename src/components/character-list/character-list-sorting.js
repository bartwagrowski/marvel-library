import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const CharacterListSorting = ({ onSort }) => {
    const [sortBy, setSortBy] = useState('');

    const handleChange = (event) => {
        setSortBy(event.target.value);
        onSort(event.target.value);
    };

    return (
        <FormControl sx={{ minWidth: 120, marginLeft: 1 }}>
            <InputLabel id='character-list-sorting-label' size='small'>
                Sort By
            </InputLabel>
            <Select value={sortBy} labelId='character-list-sorting-label' onChange={handleChange} size='small' label='Sort By'>
                <MenuItem value=''>Don't sort</MenuItem>
                <MenuItem value='name'>Name Asc</MenuItem>
                <MenuItem value='-name'>Name Desc</MenuItem>
                <MenuItem value='modified'>Modified Date Asc</MenuItem>
                <MenuItem value='-modified'>Modified Date Desc</MenuItem>
            </Select>
        </FormControl>
    );
};

export default CharacterListSorting;
