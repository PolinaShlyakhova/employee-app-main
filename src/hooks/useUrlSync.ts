import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { appendQueryArg } from '../features/employees/queryParams';
import { selectEmployeesQueryArg } from '../features/filters/selectors';

export function useUrlSync() {
    const queryArg = useAppSelector(selectEmployeesQueryArg);
    const { search } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = appendQueryArg(new URLSearchParams(), queryArg).toString();
        const next = params ? `?${params}` : '';

        if (next !== search) navigate({ search: next }, { replace: true });
    }, [queryArg, search, navigate]);
}
