import { act, render, screen } from '@testing-library/react';
import CharacterListSearch from '../character-list-search';
import TextField from '@mui/material/TextField';

jest.mock('@mui/material/TextField', () => jest.fn(() => <div data-testid='text-field' />));
jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

describe('CharacterListSearch component', () => {
    const onSearch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        render(<CharacterListSearch onSearch={onSearch} />);
        expect(screen.getByTestId('text-field')).toBeInTheDocument();
        expect(TextField).toBeCalledWith(
            {
                label: 'Search',
                size: 'small',
                onChange: expect.any(Function),
            },
            {}
        );
    });

    it('should call search callback when the text value changes', () => {
        render(<CharacterListSearch onSearch={onSearch} />);
        act(() => {
            TextField.mock.calls[0][0].onChange({ target: { value: 'foobar' } });
        });
        expect(onSearch).toBeCalledWith('foobar');
    });
});
