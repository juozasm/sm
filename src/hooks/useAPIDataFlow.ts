import { Reducer, useReducer, useCallback } from 'react';

type State<T> = {
    data?: T;
    isLoading: boolean;
    error?: string;
};

type Action<T> =
    | { type: 'request' }
    | { type: 'success'; payload: T }
    | { type: 'failure'; error: string }
    | { type: 'notAsked' };

const initialState = {
    notAsked: true,
    isLoading: false,
    error: undefined,
};

const reducer = <T = any>(_state: State<T> = initialState, action: Action<T>): State<T> => {
    switch (action.type) {
        case 'request':
            return {
                isLoading: true,
            };
        case 'success':
            return {
                isLoading: false,
                data: action.payload,
            };
        case 'failure':
            return {
                isLoading: false,
                error: action.error,
            };
        case 'notAsked':
            return initialState;
        default:
            throw new Error('no such case');
    }
};

const useAPIDataFlow = <T>() => {
    const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(reducer, initialState);
    const notAsked = useCallback(() => {
        dispatch({
            type: 'notAsked',
        });
    }, [dispatch]);
    const request = useCallback(() => {
        dispatch({
            type: 'request',
        });
    }, [dispatch]);
    const success = useCallback(
        (data: T) => {
            dispatch({
                type: 'success',
                payload: data,
            });
        },
        [dispatch]
    );
    const failure = useCallback(
        (error: string) => {
            dispatch({
                type: 'failure',
                error,
            });
        },
        [dispatch]
    );

    return {
        state,
        notAsked,
        request,
        success,
        failure,
    };
};

export default useAPIDataFlow;
