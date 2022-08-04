import { render, screen } from '@testing-library/react';
import CharacterListTable from '../character-list-table';
import CharacterListItem from '../character-list-item';

jest.mock('@mui/material/Table', () => jest.fn(({ children }) => <div data-testid='table'>{children}</div>));
jest.mock('@mui/material/TableHead', () => jest.fn(({ children }) => <div data-testid='table-head'>{children}</div>));
jest.mock('@mui/material/TableRow', () => jest.fn(({ children }) => <div data-testid='table-row'>{children}</div>));
jest.mock('@mui/material/TableCell', () => jest.fn(({ children }) => <div data-testid='table-cell'>{children}</div>));
jest.mock('@mui/material/TableBody', () => jest.fn(({ children }) => <div data-testid='table-body'>{children}</div>));
jest.mock('@mui/material/TableContainer', () => jest.fn(({ children }) => <div data-testid='table-container'>{children}</div>));
jest.mock('../character-list-item', () => jest.fn(() => <div data-testid='character-list-item' />));

describe('CharacterListTable component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const characters = [{ id: '1', name: 'foo' }];
        render(<CharacterListTable characters={characters} />);
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByTestId('character-list-item')).toBeInTheDocument();
        expect(CharacterListItem).toBeCalledWith(
            {
                character: { id: '1', name: 'foo' },
            },
            {}
        );
    });
});
