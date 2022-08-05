import { act, renderHook, waitFor } from '@testing-library/react';
import useCharacterSearchState from '../use-character-search-state';
import { getMarvelCharacters } from '../../../api/marvel-api';

jest.mock('../../../api/marvel-api', () => ({
    getMarvelCharacters: jest.fn(),
}));

describe('useCharacterSearchState hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialise correctly when the data call is successful', async () => {
        getMarvelCharacters.mockResolvedValue({ data: { total: 102, results: [{ foo: 'bar' }] } });
        const { result } = renderHook(() => useCharacterSearchState());

        await waitFor(() => {
            expect(result.current.characters).toEqual([{ foo: 'bar' }]);
        });
        expect(result.current.error).toBeNull();
        expect(result.current.currentPage).toEqual(0);
        expect(result.current.numberOfCharacters).toEqual(102);
        expect(result.current.charactersPerPage).toEqual(10);
        expect(result.current.isLoading).toBeFalsy();
        expect(getMarvelCharacters).toBeCalledWith([
            {
                param: 'limit',
                value: 10,
            },
            {
                param: 'offset',
                value: 0,
            },
        ]);
    });

    it('should initialise correctly when the data call fails', async () => {
        getMarvelCharacters.mockRejectedValue(new Error('Oh no!'));
        const { result } = renderHook(() => useCharacterSearchState());

        await waitFor(() => {
            expect(result.current.error).toEqual('Oh no!');
        });
        expect(result.current.characters).toEqual([]);
        expect(result.current.currentPage).toEqual(0);
        expect(result.current.numberOfCharacters).toEqual(0);
        expect(result.current.charactersPerPage).toEqual(10);
        expect(result.current.isLoading).toBeFalsy();
        expect(getMarvelCharacters).toBeCalledWith([
            {
                param: 'limit',
                value: 10,
            },
            {
                param: 'offset',
                value: 0,
            },
        ]);
    });

    it('should call the service correctly when the search is triggered', async () => {
        getMarvelCharacters.mockResolvedValue({ data: { total: 102, results: [{ foo: 'bar' }] } });
        const { result } = renderHook(() => useCharacterSearchState());

        await act(() => {
            result.current.onSearch('foobar');
        });

        expect(getMarvelCharacters).toBeCalledWith([
            {
                param: 'limit',
                value: 10,
            },
            {
                param: 'offset',
                value: 0,
            },
            { param: 'nameStartsWith', value: 'foobar' },
        ]);
    });

    it('should call the service correctly when the sorting is applied', async () => {
        getMarvelCharacters.mockResolvedValue({ data: { total: 102, results: [{ foo: 'bar' }] } });
        const { result } = renderHook(() => useCharacterSearchState());

        await act(() => {
            result.current.onSort('-name');
        });

        expect(getMarvelCharacters).toBeCalledWith([
            {
                param: 'limit',
                value: 10,
            },
            {
                param: 'offset',
                value: 0,
            },
            { param: 'orderBy', value: '-name' },
        ]);
    });

    it('should call the service correctly when the result page is changed', async () => {
        getMarvelCharacters.mockResolvedValue({ data: { total: 102, results: [{ foo: 'bar' }] } });
        const { result } = renderHook(() => useCharacterSearchState());

        await act(() => {
            result.current.onPageChange(null, 3);
        });

        expect(getMarvelCharacters).toBeCalledWith([
            {
                param: 'limit',
                value: 10,
            },
            {
                param: 'offset',
                value: 30,
            },
        ]);
    });

    it('should call the service correctly when the rows per page are changed', async () => {
        getMarvelCharacters.mockResolvedValue({ data: { total: 102, results: [{ foo: 'bar' }] } });
        const { result } = renderHook(() => useCharacterSearchState());

        await act(() => {
            result.current.onRowsPerPageChange({ target: { value: 100 } });
        });

        expect(getMarvelCharacters).toBeCalledWith([
            {
                param: 'limit',
                value: 100,
            },
            {
                param: 'offset',
                value: 0,
            },
        ]);
    });
});
