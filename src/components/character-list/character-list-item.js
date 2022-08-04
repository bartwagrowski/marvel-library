import { Link } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { CharacterImage } from '../common';
import styles from './character-list-item.module.css';

const CharacterListItem = ({ character }) => (
    <TableRow>
        <TableCell>
            <CharacterImage
                thumbnail={character.thumbnail}
                imageClass={styles.image}
            />
        </TableCell>
        <TableCell>
            <Link to={`/character/${character.id}`} key={character.id}>
                {character.name}
            </Link>
        </TableCell>
        <TableCell>{character.description}</TableCell>
    </TableRow>
);

export default CharacterListItem;
