import { renderHook, waitFor } from '@testing-library/react';
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
});
