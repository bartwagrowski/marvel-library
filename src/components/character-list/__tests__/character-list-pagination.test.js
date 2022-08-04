import { screen, render } from '@testing-library/react';
import CharacterListPagination from '../character-list-pagination';
import TablePagination from '@mui/material/TablePagination';

jest.mock('@mui/material/TablePagination', () => jest.fn(() => <div data-testid='table-pagination' />));

describe('CharacterListPagination component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const onRowsPerPageChange = jest.fn();
        const onPageChange = jest.fn();
        render(
            <CharacterListPagination
                onRowsPerPageChange={onRowsPerPageChange}
                onPageChange={onPageChange}
                numberOfCharacters={105}
                currentPage={5}
                charactersPerPage={10}
            />
        );
        expect(screen.getByTestId('table-pagination')).toBeInTheDocument();
        expect(TablePagination).toBeCalledWith(
            {
                component: 'div',
                count: 105,
                page: 5,
                onPageChange,
                rowsPerPage: 10,
                onRowsPerPageChange,
            },
            {}
        );
    });
});
