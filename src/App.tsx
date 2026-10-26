import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';
import { EmployeesListPage } from './pages/EmployeesListPage';
import { EmployeeProfilePage } from './pages/EmployeeProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import styles from './App.module.scss';

export default function App() {
    const { pathname } = useLocation();

    return (
        <>
            <Header />
            <main className={styles.main}>
                <ErrorBoundary key={pathname}>
                    <Routes>
                        <Route path="/" element={<EmployeesListPage />} />
                        <Route path="/employee/:id" element={<EmployeeProfilePage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </ErrorBoundary>
            </main>
        </>
    );
}
