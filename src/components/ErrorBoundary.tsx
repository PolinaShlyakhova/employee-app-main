import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { ErrorState } from './ErrorState';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, info: ErrorInfo) {
        console.error('Ошибка рендера:', error, info.componentStack);
    }

    private handleRetry = () => this.setState({ hasError: false });

    render() {
        if (this.state.hasError) {
            return (
                <ErrorState
                    title="Что-то пошло не так"
                    description="При отображении страницы произошла ошибка. Попробуйте ещё раз или вернитесь к списку."
                    onRetry={this.handleRetry}
                />
            );
        }
        return this.props.children;
    }
}
