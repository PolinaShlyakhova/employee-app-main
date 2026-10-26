import { Link } from 'react-router-dom';
import styles from './ErrorState.module.scss';

interface Props {
    title: string;
    description?: string;
    onRetry?: () => void;
    showHomeLink?: boolean;
}

export function ErrorState({ title, description, onRetry, showHomeLink = true }: Props) {
    return (
        <div className={styles.errorState} role="alert">
            <h1>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
            <div className={styles.actions}>
                {onRetry && (
                    <button type="button" className={styles.button} onClick={onRetry}>
                        Попробовать снова
                    </button>
                )}
                {showHomeLink && <Link to="/">Вернуться к списку сотрудников</Link>}
            </div>
        </div>
    );
}
