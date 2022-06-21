import { useContext, useCallback } from 'react';
import { TokenContext } from '../contexts/TokenProvider';

const useToken = () => {
    const context = useContext(TokenContext);
    return {
        token: context?.[0],
        setToken: useCallback((token: string) => context?.[1](token), [context]),
    };
};

export default useToken;
