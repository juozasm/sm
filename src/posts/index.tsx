import useToken from '../common/hooks/useToken';
import PostList from './PostList';
import SendersList from './SendersList';
import usePosts from './usePosts';

const Posts = () => {
    const { token } = useToken();
    const { state } = usePosts({
        sl_token: token!,
        page: 1,
    });

    if (state.isLoading) {
        return 'Loading...';
    }
    if (!state.data) {
        return 'Something went wrong...';
    }
    return (
        <div>
            <SendersList posts={state.data} />
            {/* <PostList posts={state.data} /> */}
        </div>
    );
};

export default Posts;
