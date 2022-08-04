import { render, screen } from '@testing-library/react';
import useCharacterSearchState from '../use-character-search-state';
import CharacterList from '../character-list';
import { ErrorDisplay } from '../../common';
import CharacterListSearch from '../character-list-search';
import CharacterListSorting from '../character-list-sorting';
import CharacterListTable from '../character-list-table';
import CharacterListPagination from '../character-list-pagination';

jest.mock('../character-list-search', () => jest.fn(() => <div data-testid='character-list-search' />));
jest.mock('../character-list-table', () => jest.fn(() => <div data-testid='character-list-table' />));
jest.mock('../character-list-pagination', () => jest.fn(() => <div data-testid='character-list-pagination' />));
jest.mock('../../common', () => ({
    LoadingBackdrop: jest.fn(() => <div data-testid='loading-backdrop' />),
    ErrorDisplay: jest.fn(() => <div data-testid='error-display' />),
}));
jest.mock('../character-list-sorting', () => jest.fn(() => <div data-testid='character-list-sorting' />));
jest.mock('../use-character-search-state', () => jest.fn());

describe('CharacterList component', () => {
    const onSearch = jest.fn();
    const onSort = jest.fn();
    const onPageChange = jest.fn();
    const onRowsPerPageChange = jest.fn();
    const characters = [{ foo: 'bar' }];
    const charactersPerPage = 10;
    const currentPage = 5;
    const numberOfCharacters = 105;
    const error = 'Oh no!';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly when loading', () => {
        useCharacterSearchState.mockReturnValue({
            isLoading: true,
            onSearch,
            onSort,
            characters,
            charactersPerPage,
            currentPage,
            numberOfCharacters,
            onPageChange,
            onRowsPerPageChange,
            error,
        });

        render(<CharacterList />);
        expect(screen.getByTestId('error-display')).toBeInTheDocument();
        expect(ErrorDisplay).toBeCalledWith(
            {
                error,
            },
            {}
        );
        expect(screen.getByTestId('loading-backdrop')).toBeInTheDocument();
        expect(screen.getByTestId('character-list-search')).toBeInTheDocument();
        expect(CharacterListSearch).toBeCalledWith(
            {
                onSearch,
            },
            {}
        );
        expect(screen.getByTestId('character-list-sorting')).toBeInTheDocument();
        expect(CharacterListSorting).toBeCalledWith(
            {
                onSort,
            },
            {}
        );
        expect(screen.getByTestId('character-list-table')).toBeInTheDocument();
        expect(CharacterListTable).toBeCalledWith(
            {
                characters,
            },
            {}
        );
        expect(screen.getByTestId('character-list-pagination')).toBeInTheDocument();
        expect(CharacterListPagination).toBeCalledWith(
            {
                charactersPerPage,
                currentPage,
                numberOfCharacters,
                onPageChange,
                onRowsPerPageChange,
            },
            {}
        );
    });

    it('should render correctly when loaded', () => {
        useCharacterSearchState.mockReturnValue({
            isLoading: false,
            onSearch,
            onSort,
            characters,
            charactersPerPage,
            currentPage,
            numberOfCharacters,
            onPageChange,
            onRowsPerPageChange,
            error,
        });

        render(<CharacterList />);
        expect(screen.getByTestId('error-display')).toBeInTheDocument();
        expect(ErrorDisplay).toBeCalledWith(
            {
                error,
            },
            {}
        );
        expect(screen.queryByTestId('loading-backdrop')).not.toBeInTheDocument();
        expect(screen.getByTestId('character-list-search')).toBeInTheDocument();
        expect(CharacterListSearch).toBeCalledWith(
            {
                onSearch,
            },
            {}
        );
        expect(screen.getByTestId('character-list-sorting')).toBeInTheDocument();
        expect(CharacterListSorting).toBeCalledWith(
            {
                onSort,
            },
            {}
        );
        expect(screen.getByTestId('character-list-table')).toBeInTheDocument();
        expect(CharacterListTable).toBeCalledWith(
            {
                characters,
            },
            {}
        );
        expect(screen.getByTestId('character-list-pagination')).toBeInTheDocument();
        expect(CharacterListPagination).toBeCalledWith(
            {
                charactersPerPage,
                currentPage,
                numberOfCharacters,
                onPageChange,
                onRowsPerPageChange,
            },
            {}
        );
    });
});
