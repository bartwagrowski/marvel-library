import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCharacterDetails } from '../../api/marvel-api';

const useCharacterDetailsState = () => {
    const { characterId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let result;
            try {
                result = await getCharacterDetails(characterId);
            } catch (err) {
                setError(err.message);
            }

            const data = result && result.data.results[0];

            if (data) {
                setCharacter(data);
            }

            setIsLoading(false);
        };

        setIsLoading(true);
        fetchData();
    }, [characterId]);

    return { isLoading, character, error };
};

export default useCharacterDetailsState;
