import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import CharacterListItem from './character-list-item';

const CharacterListTable = ({ characters }) => (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {characters.map((character) => (
                    <CharacterListItem key={character.id} character={character} />
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default CharacterListTable;
