import { useCallback } from 'react';
import { registerClient, RegisterClientParams } from '../services/api';
import { RegisterClient } from '../types';
import useAPIDataFlow from './useAPIDataFlow';

const useRegister = () => {
    const { state, request, success, failure } = useAPIDataFlow<RegisterClient>();
    const register = useCallback(async (params: RegisterClientParams) => {
        try {
            request();
            const response = await registerClient(params);
            success(response.data.data);
        } catch (error: any) {
            failure(error?.toString() ?? 'Something went wrong while registering');
        }
    }, []);

    return {
        state,
        register,
    };
};

export default useRegister;
