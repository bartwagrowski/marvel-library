import { Fragment } from 'react';
import CharacterListSearch from './character-list-search';
import CharacterListTable from './character-list-table';
import CharacterListPagination from './character-list-pagination';
import { LoadingBackdrop, ErrorDisplay } from '../common';
import useCharacterSearchState from './use-character-search-state';
import CharacterListSorting from './character-list-sorting';

const CharacterList = () => {
    const { isLoading, onSearch, onSort, characters, charactersPerPage, currentPage, numberOfCharacters, onPageChange, onRowsPerPageChange, error } =
        useCharacterSearchState();
    return (
        <Fragment>
            <ErrorDisplay error={error} />
            {isLoading && <LoadingBackdrop />}
            <CharacterListSearch onSearch={onSearch} />
            <CharacterListSorting onSort={onSort} />
            <CharacterListTable characters={characters} />
            <CharacterListPagination
                charactersPerPage={charactersPerPage}
                currentPage={currentPage}
                numberOfCharacters={numberOfCharacters}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Fragment>
    );
};

export default CharacterList;
