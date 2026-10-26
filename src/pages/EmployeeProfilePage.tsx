import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetEmployeeByIdQuery } from '../features/employees/employeesApi';
import { isNetworkError, isNotFoundError } from '../features/employees/errors';
import { formatDate, formatPhone } from '../features/employees/format';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ErrorState } from '../components/ErrorState';
import common from '../styles/common.module.scss';
import styles from './EmployeeProfilePage.module.scss';

const parseEmployeeId = (id: string | undefined): number | null =>
    id && /^\d+$/.test(id) && Number(id) > 0 ? Number(id) : null;

export function EmployeeProfilePage() {
    const { id } = useParams<{ id: string }>();
    const employeeId = parseEmployeeId(id);
    const {
        data: profile,
        isFetching,
        error,
        refetch,
    } = useGetEmployeeByIdQuery(employeeId ?? skipToken);

    const name = profile?.name;
    const breadcrumbs = useMemo(
        () => [
            { label: 'Главная', to: '/' },
            { label: 'Список сотрудников', to: '/' },
            { label: name ?? '' },
        ],
        [name]
    );

    if (employeeId === null) {
        return (
            <ErrorState
                title="Некорректный ID сотрудника"
                description={`«${id}» — не номер сотрудника. ID должен быть положительным целым числом.`}
            />
        );
    }

    if (isFetching && !profile) return <div className={common.loader}>Загрузка...</div>;

    if (isNotFoundError(error)) {
        return (
            <ErrorState
                title="Сотрудник не найден"
                description={`Сотрудника с ID ${employeeId} нет. Возможно, он был удалён.`}
            />
        );
    }

    if (error || !profile) {
        return (
            <ErrorState
                title={isNetworkError(error) ? 'Нет соединения' : 'Ошибка загрузки'}
                description={
                    isNetworkError(error)
                        ? 'Не удалось связаться с сервером. Проверьте подключение к интернету.'
                        : 'Сервер не смог вернуть данные сотрудника.'
                }
                onRetry={() => void refetch()}
            />
        );
    }

    return (
        <div className={common.container}>
            <Breadcrumbs items={breadcrumbs} />

            <section className={styles.header}>
                <img src={profile.photo} alt={profile.name} className={styles.avatar} />
                <div className={styles.title}>
                    <h1 className={styles.name}>{profile.name}</h1>
                    <p className={styles.position}>{profile.position}</p>
                </div>
                {profile.stack.length > 0 && (
                    <ul className={styles.stack} aria-label="Стек технологий">
                        {profile.stack.map((tech) => (
                            <li key={tech} className={styles.techChip}>
                                {tech}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={styles.info}>
                <h2 className={styles.infoTitle}>Основная информация</h2>
                <dl className={styles.infoList}>
                    <dt>Контактный телефон:</dt>
                    <dd>{formatPhone(profile.phone)}</dd>
                    <dt>Пол:</dt>
                    <dd>{profile.gender}</dd>
                    <dt>Дата рождения:</dt>
                    <dd>{formatDate(profile.birthdate)}</dd>
                    <dt>Дата устройства:</dt>
                    <dd>{formatDate(profile.dateOfEmployment)}</dd>
                </dl>
            </section>
        </div>
    );
}
