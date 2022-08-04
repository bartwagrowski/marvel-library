import { render, screen } from '@testing-library/react';
import CharacterDetailsContent from '../character-details-content';
import { CharacterImage } from '../../common';
import CharacterDetailsList from '../character-details-list';

jest.mock('../../common', () => ({
    CharacterImage: jest.fn(() => <div data-testid='character-image' />),
}));

jest.mock('../character-details-list', () => jest.fn(({ headline }) => <div data-testid={`character-details-list-${headline}`} />));

describe('CharacterDetailsContent component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        const thumbnail = { thumb: 'nail' };
        const story = { story: 'foobar' };
        const event = { event: 'foobar' };
        const series = { series: 'foobar' };

        const character = {
            name: 'Character Foobar',
            description: 'foobar description',
            thumbnail,
            stories: { items: [story] },
            events: { items: [event] },
            series: { items: [series] },
        };
        render(<CharacterDetailsContent character={character} />);
        expect(screen.getByTestId('character-image')).toBeInTheDocument();
        expect(CharacterImage).toBeCalledWith(
            {
                thumbnail: { thumb: 'nail' },
                imageClass: 'image',
            },
            {}
        );
        expect(screen.getByText('Character Foobar')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('foobar description')).toBeInTheDocument();
        expect(screen.getByTestId('character-details-list-Stories')).toBeInTheDocument();
        expect(CharacterDetailsList).toBeCalledWith(
            {
                headline: 'Stories',
                items: [story],
            },
            {}
        );
        expect(screen.getByTestId('character-details-list-Events')).toBeInTheDocument();
        expect(CharacterDetailsList).toBeCalledWith(
            {
                headline: 'Events',
                items: [event],
            },
            {}
        );
        expect(screen.getByTestId('character-details-list-Series')).toBeInTheDocument();
        expect(CharacterDetailsList).toBeCalledWith(
            {
                headline: 'Series',
                items: [series],
            },
            {}
        );
    });

    it('should render correctly if the description does not exist', () => {
        const thumbnail = { thumb: 'nail' };
        const story = { story: 'foobar' };
        const event = { event: 'foobar' };
        const series = { series: 'foobar' };

        const character = {
            name: 'Character Foobar',
            description: '',
            thumbnail,
            stories: { items: [story] },
            events: { items: [event] },
            series: { items: [series] },
        };
        render(<CharacterDetailsContent character={character} />);
        expect(screen.getByTestId('character-image')).toBeInTheDocument();
        expect(CharacterImage).toBeCalledWith(
            {
                thumbnail: { thumb: 'nail' },
                imageClass: 'image',
            },
            {}
        );
        expect(screen.getByText('Character Foobar')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Not found')).toBeInTheDocument();
        expect(screen.getByTestId('character-details-list-Stories')).toBeInTheDocument();
        expect(CharacterDetailsList).toBeCalledWith(
            {
                headline: 'Stories',
                items: [story],
            },
            {}
        );
        expect(screen.getByTestId('character-details-list-Events')).toBeInTheDocument();
        expect(CharacterDetailsList).toBeCalledWith(
            {
                headline: 'Events',
                items: [event],
            },
            {}
        );
        expect(screen.getByTestId('character-details-list-Series')).toBeInTheDocument();
        expect(CharacterDetailsList).toBeCalledWith(
            {
                headline: 'Series',
                items: [series],
            },
            {}
        );
    });
});
