import type { GenderQuery, PositionQuery, TechnologyQuery } from '../employees/types';

export interface FilterOption<T extends string> {
    value: T;
    label: string;
}

export const POSITION_OPTIONS: readonly FilterOption<PositionQuery>[] = [
    { value: 'Frontend', label: 'Frontend-разработчик' },
    { value: 'Backend', label: 'Backend-разработчик' },
    { value: 'Analyst', label: 'Аналитик' },
    { value: 'Manager', label: 'Менеджер' },
    { value: 'Designer', label: 'Дизайнер' },
];

export const GENDER_OPTIONS: readonly FilterOption<GenderQuery>[] = [
    { value: 'Male', label: 'Мужчина' },
    { value: 'Female', label: 'Женщина' },
];

export const STACK_OPTIONS: readonly FilterOption<TechnologyQuery>[] = [
    { value: 'CSharp', label: 'C#' },
    { value: 'React', label: 'React' },
    { value: 'Java', label: 'Java' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Figma', label: 'Figma' },
    { value: 'Word', label: 'Word' },
];

export const getOptionLabel = <T extends string>(
    options: readonly FilterOption<T>[],
    value: T
): string => options.find((o) => o.value === value)?.label ?? value;
