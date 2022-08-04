import { Route, Routes } from 'react-router-dom';
import { CharacterDetails, CharacterList } from './components';
import styles from './App.module.css';

const App = () => (
    <div className={styles.content}>
        <Routes>
            <Route path='/' element={<CharacterList />} />
            <Route
                path='character/:characterId'
                element={<CharacterDetails />}
            />
            <Route
                path='*'
                element={
                    <main style={{ padding: '1rem' }}>
                        <p>Oops! Must have taken a wrong turn!</p>
                        <p>Please go back!</p>
                    </main>
                }
            />
        </Routes>
    </div>
);

export default App;
