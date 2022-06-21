import { useCallback } from 'react';
import { registerClient, RegisterClientParams } from '../common/services/api';
import { RegisterClient } from '../common/types';
import useAPIDataFlow from '../common/hooks/useAPIDataFlow';
import useToken from '../common/hooks/useToken';

const useRegister = () => {
    const { state, request, success, failure } = useAPIDataFlow<RegisterClient>();
    const { setToken } = useToken();
    const register = useCallback(
        async (params: RegisterClientParams) => {
            try {
                request();
                const response = await registerClient(params);
                success(response.data.data);
                setToken(response.data.data.sl_token);
            } catch (error: any) {
                failure(error?.toString() ?? 'Something went wrong while registering');
            }
        },
        [setToken]
    );

    return {
        state,
        register,
    };
};

export default useRegister;
