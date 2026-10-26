import { ErrorState } from '../components/ErrorState';

export function NotFoundPage() {
    return (
        <ErrorState
            title="404 — Страница не найдена"
            description="Такой страницы нет. Возможно, ссылка устарела или в адресе опечатка."
        />
    );
}
