import useToken from '../common/hooks/useToken';
import usePosts from './usePosts';

const Posts = () => {
    const { token } = useToken();
    const { state } = usePosts({
        sl_token: token!,
        page: 1,
    });
    return <div>{JSON.stringify(state.data)}</div>;
};

export default Posts;
