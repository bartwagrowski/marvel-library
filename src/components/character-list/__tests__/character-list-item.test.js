import { BrowserRouter, Router } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import CharacterListItem from '../character-list-item';
import { CharacterImage } from '../../common';

jest.mock('@mui/material/TableCell', () => jest.fn(({ children }) => <div data-testid='table-cell'>{children}</div>));
jest.mock('@mui/material/TableRow', () => jest.fn(({ children }) => <div data-testid='table-row'>{children}</div>));
jest.mock('../../common', () => ({
    CharacterImage: jest.fn(() => <div data-testid='character-image' />),
}));

describe('CharacterListItem component', () => {
    const character = {
        id: '12345',
        name: 'Character Foobar',
        description: 'Character description',
        thumbnail: { thumb: 'nail' },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        render(<CharacterListItem character={character} />, { wrapper: BrowserRouter });
        expect(screen.getByTestId('character-image')).toBeInTheDocument();
        expect(CharacterImage).toBeCalledWith(
            {
                thumbnail: { thumb: 'nail' },
                imageClass: 'image',
            },
            {}
        );
        expect(screen.getByText('Character Foobar')).toBeInTheDocument();
        expect(screen.getByText('Character description')).toBeInTheDocument();
    });

    it('should take you to the right location when the link is clicked', () => {
        const history = createMemoryHistory();
        history.push = jest.fn();

        render(
            <Router location={history.location} navigator={history}>
                <CharacterListItem character={character} />
            </Router>
        );

        userEvent.click(screen.getByText('Character Foobar'));
        expect(history.push).toHaveBeenCalledWith(
            {
                hash: '',
                pathname: '/character/12345',
                search: '',
            },
            undefined
        );
    });
});
