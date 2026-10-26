import { useRef } from 'react';
import { useAppSelector } from '../app/hooks';
import { useEmployeesList } from '../features/employees/useEmployeesList';
import { useFilterHandlers } from '../features/filters/useFilterHandlers';
import {
    selectFilters,
    selectOpenFilter,
    selectSelectedFilters,
} from '../features/filters/selectors';
import { GENDER_OPTIONS, POSITION_OPTIONS, STACK_OPTIONS } from '../features/filters/options';
import { useUrlSync } from '../hooks/useUrlSync';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { SearchInput } from '../components/SearchInput';
import { FilterDropdown } from '../components/FilterDropdown';
import { SelectedFilters } from '../components/SelectedFilters';
import { EmployeeTable } from '../components/EmployeeTable';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ErrorState } from '../components/ErrorState';
import { isNetworkError } from '../features/employees/errors';
import common from '../styles/common.module.scss';
import styles from './EmployeesListPage.module.scss';

const BREADCRUMBS = [{ label: 'Главная', to: '/' }, { label: 'Список сотрудников' }];

export function EmployeesListPage() {
    const handlers = useFilterHandlers();
    const filters = useAppSelector(selectFilters);
    const selectedFilters = useAppSelector(selectSelectedFilters);
    const openedFilter = useAppSelector(selectOpenFilter);
    const { employees, isLoading, isLoadingMore, error, hasMore, loadMore, retry, applyNow } =
        useEmployeesList();

    const sentinelRef = useRef<HTMLDivElement>(null);

    useUrlSync();

    useInfiniteScroll(sentinelRef, loadMore, hasMore, isLoadingMore);

    return (
        <>
            <div className={common.container}>
                <Breadcrumbs items={BREADCRUMBS} />

                <div className={styles.toolbar}>
                    <h1 className={styles.title}>Список сотрудников</h1>

                    <div className={styles.filters}>
                        <FilterDropdown
                            label="Должность"
                            options={POSITION_OPTIONS}
                            selected={filters.position}
                            isOpen={openedFilter === 'position'}
                            onOpenChange={handlers.position.onOpenChange}
                            onToggle={handlers.position.onToggle}
                        />
                        <FilterDropdown
                            label="Пол"
                            options={GENDER_OPTIONS}
                            selected={filters.gender}
                            isOpen={openedFilter === 'gender'}
                            onOpenChange={handlers.gender.onOpenChange}
                            onToggle={handlers.gender.onToggle}
                        />
                        <FilterDropdown
                            label="Стек технологий"
                            options={STACK_OPTIONS}
                            selected={filters.stack}
                            isOpen={openedFilter === 'stack'}
                            onOpenChange={handlers.stack.onOpenChange}
                            onToggle={handlers.stack.onToggle}
                        />
                    </div>

                    <SearchInput
                        className={styles.search}
                        value={filters.search}
                        onChange={handlers.setSearch}
                        onSubmit={applyNow}
                    />
                </div>
            </div>

            <SelectedFilters
                items={selectedFilters}
                onRemove={handlers.removeFilter}
                onSearch={applyNow}
            />

            <div className={styles.content}>
                {isLoading ? (
                    <div className={common.loader}>Загрузка...</div>
                ) : employees.length > 0 ? (
                    <EmployeeTable employees={employees} />
                ) : error ? (
                    <ErrorState
                        title={isNetworkError(error) ? 'Нет соединения' : 'Ошибка загрузки'}
                        description={
                            isNetworkError(error)
                                ? 'Не удалось связаться с сервером. Проверьте подключение к интернету.'
                                : 'Сервер не смог вернуть список сотрудников.'
                        }
                        onRetry={retry}
                        showHomeLink={false}
                    />
                ) : (
                    <div className={common.loader}>
                        Сотрудники не найдены. Попробуйте изменить поиск или фильтры.
                    </div>
                )}

                {error && employees.length > 0 && (
                    <div className={common.error}>
                        Не удалось загрузить следующих сотрудников.{' '}
                        <button type="button" className={common.linkButton} onClick={retry}>
                            Повторить
                        </button>
                    </div>
                )}

                <div ref={sentinelRef} className={styles.sentinel} />

                {isLoadingMore && <div className={common.loader}>Загрузка ещё...</div>}
            </div>
        </>
    );
}
