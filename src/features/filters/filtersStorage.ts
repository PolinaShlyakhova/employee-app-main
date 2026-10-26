import type { FilterOption } from './options';
import { GENDER_OPTIONS, POSITION_OPTIONS, STACK_OPTIONS } from './options';
import type { FiltersState } from './filtersSlice';

const STORAGE_KEY = 'filters';
const URL_KEYS = ['name', 'gender', 'position', 'stack'];

export const EMPTY_FILTERS: FiltersState = { search: '', gender: [], position: [], stack: [] };

function pickAllowed<T extends string>(values: unknown, options: readonly FilterOption<T>[]): T[] {
    if (!Array.isArray(values)) return [];
    const allowed = options.map((o) => o.value);
    return allowed.filter((value) => values.includes(value));
}

function fromUrl(params: URLSearchParams): FiltersState {
    return {
        search: params.get('name')?.trim() ?? '',
        gender: pickAllowed(params.getAll('gender'), GENDER_OPTIONS),
        position: pickAllowed(params.getAll('position'), POSITION_OPTIONS),
        stack: pickAllowed(params.getAll('stack'), STACK_OPTIONS),
    };
}

function fromStorage(): FiltersState {
    try {
        const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
        if (!raw || typeof raw !== 'object') return EMPTY_FILTERS;

        const saved = raw as Record<string, unknown>;
        return {
            search: typeof saved.search === 'string' ? saved.search : '',
            gender: pickAllowed(saved.gender, GENDER_OPTIONS),
            position: pickAllowed(saved.position, POSITION_OPTIONS),
            stack: pickAllowed(saved.stack, STACK_OPTIONS),
        };
    } catch {
        return EMPTY_FILTERS;
    }
}

export function loadInitialFilters(): FiltersState {
    const params = new URLSearchParams(window.location.search);
    return URL_KEYS.some((key) => params.has(key)) ? fromUrl(params) : fromStorage();
}

export function saveFilters(filters: FiltersState): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch {
    }
}
