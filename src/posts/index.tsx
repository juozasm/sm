import useToken from '../common/hooks/useToken';
import PostList from './PostList';
import SendersList from './SendersList';
import usePosts from './usePosts';
import styles from './styles.module.css';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

const Posts = () => {
    const { token, removeToken } = useToken();
    const { state } = usePosts({
        sl_token: token!,
        page: 1,
    });

    useEffect(() => {
        if (state.error) {
            removeToken();
        }
    }, [state.error]);

    const [searchParams, setSearchParams] = useSearchParams();
    const fromIdParam = searchParams.get('from_id');

    const handleSenderClick = useCallback(
        (from_id: string) => () =>
            setSearchParams({
                from_id,
            }),
        []
    );

    if (state.isLoading) {
        return 'Loading...';
    }
    if (!state.data) {
        return 'Something went wrong...';
    }
    return (
        <div className={styles.container}>
            <SendersList handleSenderClick={handleSenderClick} from_id={fromIdParam} posts={state.data} />
            {!!fromIdParam && <PostList posts={state.data} from_id={fromIdParam} />}
            <button className={styles.logout} onClick={removeToken}>
                Logout
            </button>
        </div>
    );
};

export default Posts;
