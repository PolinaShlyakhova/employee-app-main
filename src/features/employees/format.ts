const MONTHS = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

export function formatDate(value: string): string {
    const [day, month, year, ...rest] = value.trim().split(/\s+/);
    const monthIndex = MONTHS.indexOf(month?.toLowerCase() ?? '');
    if (!day || !year || rest.length || monthIndex === -1) return value;

    return `${day.padStart(2, '0')}.${String(monthIndex + 1).padStart(2, '0')}.${year}`;
}

export const formatPhone = (value: string): string => value.replace(/[()]/g, '');
