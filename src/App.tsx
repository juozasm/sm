import useRegister from './hooks/useRegister';
import usePosts from './hooks/usePosts';

import logo from './logo.svg';
import { GetPostsParams } from './services/api';
import { useEffect } from 'react';

const Posts = ({ params }: { params: GetPostsParams }) => {
    const { state } = usePosts(params);
    return <>{JSON.stringify(state.data)}</>;
};

function App() {
    const { register, state } = useRegister();

    useEffect(() => {
        register({
            client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
            email: 'abc@gmail.com',
            name: 'Juozas',
        });
    }, []);
    return (
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            {state.data && !state.isLoading && (
                <Posts
                    params={{
                        sl_token: state.data.sl_token,
                        page: 1,
                    }}
                />
            )}
        </div>
    );
}

export default App;
