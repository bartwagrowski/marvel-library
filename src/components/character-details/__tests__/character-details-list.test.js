import { render, screen } from '@testing-library/react';
import CharacterDetailsList from '../character-details-list';

describe('CharacterDetailsList component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        render(<CharacterDetailsList headline='Foobar' items={[]} />);
        expect(screen.getByText('Foobar')).toBeInTheDocument();
        expect(screen.getByText('Not found')).toBeInTheDocument();
    });

    it('foo', () => {
        const items = [{ name: 'foobar 1' }, { name: 'foobar 2' }];
        render(<CharacterDetailsList headline='Foobar' items={items} />);
        expect(screen.getByText('Foobar')).toBeInTheDocument();
        expect(screen.getByText('foobar 1')).toBeInTheDocument();
        expect(screen.getByText('foobar 2')).toBeInTheDocument();
    });
});
