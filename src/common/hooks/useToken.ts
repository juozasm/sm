import { useContext, useCallback } from 'react';
import { TokenContext } from '../contexts/TokenProvider';

const useToken = () => {
    const context = useContext(TokenContext);
    return {
        token: context?.[0],
        setToken: useCallback(
            (token: string) => {
                if (context?.[1]) {
                    context[1](token);
                    localStorage.setItem('token', token);
                }
            },
            [context]
        ),
    };
};

export default useToken;
