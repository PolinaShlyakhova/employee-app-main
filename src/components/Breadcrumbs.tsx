import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Props {
    items: { label: string; to?: string }[];
}

function BreadcrumbsBase({ items }: Props) {
    return (
        <nav aria-label="Хлебные крошки" className={styles.breadcrumbs}>
            <ol className={styles.list}>
                {items.map((item, idx) => (
                    <li key={idx} className={styles.item}>
                        {item.to ? (
                            <Link to={item.to}>{item.label}</Link>
                        ) : (
                            <span aria-current="page">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export const Breadcrumbs = memo(BreadcrumbsBase);
