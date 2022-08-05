import { renderHook, waitFor } from '@testing-library/react';
import useCharacterDetailsState from '../use-character-details-state';
import { getCharacterDetails } from '../../../api/marvel-api';

jest.mock('react-router-dom', () => ({
    useParams: () => ({
        characterId: 'A12345',
    }),
}));

jest.mock('../../../api/marvel-api', () => ({
    getCharacterDetails: jest.fn(),
}));

describe('useCharacterDetailsState hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialise correctly if the data call succeeds', async () => {
        getCharacterDetails.mockResolvedValue({ data: { results: [{ foo: 'bar' }] } });
        const { result } = renderHook(() => useCharacterDetailsState());

        await waitFor(() => {
            expect(result.current.character).toEqual({ foo: 'bar' });
        });

        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBeFalsy();
        expect(getCharacterDetails).toBeCalledWith('A12345');
    });

    it('should initialise correctly if the data call errors', async () => {
        getCharacterDetails.mockRejectedValue(new Error('Oh no!'));
        const { result } = renderHook(() => useCharacterDetailsState());

        await waitFor(() => {
            expect(result.current.error).toEqual('Oh no!');
        });

        expect(result.current.character).toBeNull();
        expect(result.current.isLoading).toBeFalsy();
    });
});
