import { render, screen } from '@testing-library/react';
import CharacterDetails from '../character-details';
import useCharacterDetailsState from '../use-character-details-state';
import { ErrorDisplay } from '../../common';
import CharacterDetailsContent from '../character-details-content';

jest.mock('../character-details-content', () => jest.fn(() => <div data-testid='character-details-content' />));
jest.mock('../../common', () => ({
    LoadingBackdrop: jest.fn(() => <div data-testid='loading-backdrop' />),
    ErrorDisplay: jest.fn(() => <div data-testid='error-display' />),
}));
jest.mock('../use-character-details-state', () => jest.fn());

describe('CharacterDetails component', () => {
    it('should render correctly when the screen is loading', () => {
        useCharacterDetailsState.mockReturnValue({ isLoading: true });
        render(<CharacterDetails />);
        expect(screen.getByTestId('loading-backdrop')).toBeInTheDocument();
        expect(screen.getByTestId('error-display')).toBeInTheDocument();
        expect(ErrorDisplay).toBeCalledWith(
            {
                error: undefined,
            },
            {}
        );
        expect(screen.queryByTestId('character-details-content')).not.toBeInTheDocument();
    });

    it('should render correctly when there was an error while loading', () => {
        useCharacterDetailsState.mockReturnValue({ error: 'Something wrong!' });
        render(<CharacterDetails />);
        expect(screen.queryByTestId('loading-backdrop')).not.toBeInTheDocument();
        expect(screen.getByTestId('error-display')).toBeInTheDocument();
        expect(ErrorDisplay).toBeCalledWith(
            {
                error: 'Something wrong!',
            },
            {}
        );
        expect(screen.queryByTestId('character-details-content')).not.toBeInTheDocument();
    });

    it('should render correctly when no errors and is loaded', () => {
        useCharacterDetailsState.mockReturnValue({ character: { foo: 'bar' } });
        render(<CharacterDetails />);
        expect(screen.queryByTestId('loading-backdrop')).not.toBeInTheDocument();
        expect(screen.getByTestId('error-display')).toBeInTheDocument();
        expect(ErrorDisplay).toBeCalledWith(
            {
                error: undefined,
            },
            {}
        );
        expect(screen.getByTestId('character-details-content')).toBeInTheDocument();
        expect(CharacterDetailsContent).toBeCalledWith(
            {
                character: { foo: 'bar' },
            },
            {}
        );
    });
});
