import { act, render, screen } from '@testing-library/react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CharacterListSorting from '../character-list-sorting';

jest.mock('@mui/material/FormControl', () => jest.fn(({ children }) => <div data-testid='form-control'>{children}</div>));
jest.mock('@mui/material/InputLabel', () => jest.fn(({ children }) => <div data-testid='input-label'>{children}</div>));
jest.mock('@mui/material/MenuItem', () => jest.fn(({ children }) => <div data-testid='menu-item'>{children}</div>));
jest.mock('@mui/material/Select', () => jest.fn(({ children }) => <div data-testid='select'>{children}</div>));

describe('CharacterListSorting component', () => {
    const onSort = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        render(<CharacterListSorting onSort={onSort} />);
        expect(screen.getByTestId('form-control')).toBeInTheDocument();
        expect(screen.getByTestId('input-label')).toBeInTheDocument();
        expect(screen.getByText('Sort By')).toBeInTheDocument();
        expect(screen.getByTestId('select')).toBeInTheDocument();
        expect(Select).toBeCalledWith(
            {
                value: '',
                labelId: 'character-list-sorting-label',
                onChange: expect.any(Function),
                size: 'small',
                label: 'Sort By',
                children: expect.any(Array),
            },
            {}
        );
        expect(screen.getAllByTestId('menu-item')[0]).toBeInTheDocument();
        expect(MenuItem).toBeCalledWith(
            {
                value: '',
                children: "Don't sort",
            },
            {}
        );
        expect(screen.getAllByTestId('menu-item')[1]).toBeInTheDocument();
        expect(MenuItem).toBeCalledWith(
            {
                value: 'name',
                children: 'Name Asc',
            },
            {}
        );
        expect(screen.getAllByTestId('menu-item')[2]).toBeInTheDocument();
        expect(MenuItem).toBeCalledWith(
            {
                value: '-name',
                children: 'Name Desc',
            },
            {}
        );
        expect(screen.getAllByTestId('menu-item')[3]).toBeInTheDocument();
        expect(MenuItem).toBeCalledWith(
            {
                value: 'modified',
                children: 'Modified Date Asc',
            },
            {}
        );
        expect(screen.getAllByTestId('menu-item')[4]).toBeInTheDocument();
        expect(MenuItem).toBeCalledWith(
            {
                value: '-modified',
                children: 'Modified Date Desc',
            },
            {}
        );
    });

    it('should call sort callback when the value changes', () => {
        render(<CharacterListSorting onSort={onSort} />);
        act(() => {
            Select.mock.calls[0][0].onChange({ target: { value: 'foobar' } });
        });
        expect(onSort).toBeCalledWith('foobar');
    });
});
