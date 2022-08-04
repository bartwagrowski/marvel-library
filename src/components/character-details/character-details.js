import { LoadingBackdrop, ErrorDisplay } from '../common';
import styles from './character-details.module.css';
import useCharacterDetailsState from './use-character-details-state';
import CharacterDetailsContent from './character-details-content';

const CharacterDetails = () => {
    const { character, isLoading, error } = useCharacterDetailsState();
    return (
        <div className={styles.container}>
            {isLoading && <LoadingBackdrop />}
            <ErrorDisplay error={error} />
            {!isLoading && !error && <CharacterDetailsContent character={character} />}
        </div>
    );
};

export default CharacterDetails;
