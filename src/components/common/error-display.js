import Alert from '@mui/material/Alert';
import styles from './error-display.module.css';

const ErrorDisplay = ({ error }) =>
    error && (
        <div className={styles.container}>
            <Alert severity='error'>{error}. Please try again.</Alert>
        </div>
    );

export default ErrorDisplay;
