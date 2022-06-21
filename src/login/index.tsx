import { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import useToken from '../common/hooks/useToken';
import useRegister from './useRegister';

const CLIENT_ID = 'ju16a6m81mhid5ue1z3v2g0uh';

const Login = () => {
    const { register } = useRegister();
    const { token } = useToken();

    const onSubmit = useCallback((e: any) => {
        e.preventDefault();
        const name = e.target['name'].value;
        const email = e.target['email'].value;
        register({
            client_id: CLIENT_ID,
            name,
            email,
        });
    }, []);

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <button type="submit">GO</button>
        </form>
    );
};

export default Login;
