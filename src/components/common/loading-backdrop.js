import ReactDOM from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './loading-backdrop.module.css';

const LoadingBackdrop = () =>
    ReactDOM.createPortal(
        <div className={styles.backdrop}>
            <div>
                <CircularProgress />
            </div>
        </div>,
        document.getElementById('loading-root')
    );

export default LoadingBackdrop;
