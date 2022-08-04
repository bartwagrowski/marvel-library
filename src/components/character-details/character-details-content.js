import { CharacterImage } from '../common';
import styles from './character-details.module.css';
import CharacterDetailsList from './character-details-list';

const CharacterDetailsContent = ({ character }) => (
    <section>
        <CharacterImage thumbnail={character.thumbnail} imageClass={styles.image} />
        <h1>{character.name}</h1>
        <h3>Description</h3>
        <section>{character.description || 'Not found'}</section>
        <CharacterDetailsList headline='Stories' items={character.stories.items} />
        <CharacterDetailsList headline='Events' items={character.events.items} />
        <CharacterDetailsList headline='Series' items={character.series.items} />
    </section>
);

export default CharacterDetailsContent;
