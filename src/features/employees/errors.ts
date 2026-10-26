import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type QueryError = FetchBaseQueryError | SerializedError | undefined;

export const isNotFoundError = (error: QueryError): boolean =>
    !!error && 'status' in error && error.status === 404;

export const isNetworkError = (error: QueryError): boolean =>
    !!error && 'status' in error && error.status === 'FETCH_ERROR';
