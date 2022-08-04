import { screen, render } from '@testing-library/react';
import CharacterImage from '../character-image';

describe('CharacterImage component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const thumbnail = { path: 'bar', extension: 'foo' };
        render(<CharacterImage thumbnail={thumbnail} imageClass='image' />);
        expect(screen.getByAltText('character portrait')).toHaveAttribute('src', 'bar.foo');
    });
});
