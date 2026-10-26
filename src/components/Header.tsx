import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import logo from '../assets/icons/logo.svg';
import logoMobile from '../assets/icons/logo-mobile.svg';
import styles from './Header.module.scss';

function HeaderBase() {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link to="/" className={styles.logo} aria-label="66bit — на главную">
                    <picture>
                        <source media="(max-width: 767px)" srcSet={logoMobile} />
                        <img src={logo} alt="66bit" width={101} height={41} />
                    </picture>
                </Link>
                <div className={styles.contacts}>
                    <a href="tel:+73432908476">+7 343 290 84 76</a>
                    <a href="mailto:info@66bit.ru">info@66bit.ru</a>
                </div>
                <ThemeToggle />
            </div>
        </header>
    );
}

export const Header = memo(HeaderBase);
