import TablePagination from '@mui/material/TablePagination';

const CharacterListPagination = ({
    numberOfCharacters,
    currentPage,
    charactersPerPage,
    onPageChange,
    onRowsPerPageChange,
}) => (
    <TablePagination
        component='div'
        count={numberOfCharacters}
        page={currentPage}
        onPageChange={onPageChange}
        rowsPerPage={charactersPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
    />
);

export default CharacterListPagination;
