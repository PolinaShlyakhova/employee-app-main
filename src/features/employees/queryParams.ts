import type { EmployeesQueryArg } from './types';

export function appendQueryArg(search: URLSearchParams, arg: EmployeesQueryArg): URLSearchParams {
    if (arg.name) search.set('name', arg.name);
    arg.gender?.forEach((g) => search.append('gender', g));
    arg.position?.forEach((p) => search.append('position', p));
    arg.stack?.forEach((s) => search.append('stack', s));

    return search;
}
