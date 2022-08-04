import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

jest.mock('../components', () => ({
    CharacterDetails: jest.fn(() => <div data-testid='character-details' />),
    CharacterList: jest.fn(() => <div data-testid='character-list' />),
}));

describe('App component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the character list', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByTestId('character-list')).toBeInTheDocument();
        expect(screen.queryByTestId('character-details')).not.toBeInTheDocument();
    });

    test('renders the details list', () => {
        render(
            <MemoryRouter initialEntries={['/character/1234']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.queryByTestId('character-list')).not.toBeInTheDocument();
        expect(screen.getByTestId('character-details')).toBeInTheDocument();
    });

    test('renders the correct text for the incorrect route', () => {
        render(
            <MemoryRouter initialEntries={['/foobar']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.queryByTestId('character-list')).not.toBeInTheDocument();
        expect(screen.queryByTestId('character-details')).not.toBeInTheDocument();
        expect(screen.getByText('Oops! Must have taken a wrong turn!')).toBeInTheDocument();
        expect(screen.getByText('Please go back!')).toBeInTheDocument();
    });
});
