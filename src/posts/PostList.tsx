import { useState, useMemo } from 'react';
import { Post } from '../common/types';
import { orderPostsByCreationDate, Order, filterPosts } from './utils';
import styles from './PostsList.module.css';

type Props = {
    posts: Post[];
    from_id: string;
};

const PostList = ({ posts, from_id }: Props) => {
    const [searchString, setSearchString] = useState('');
    const [activeOrder, setActiveOrder] = useState<Order>('desc');

    const filteredAndSortedPosts = useMemo(() => {
        const filterP = filterPosts(posts, from_id, searchString);
        const sortedP = orderPostsByCreationDate(filterP, activeOrder);
        return sortedP;
    }, [posts, searchString, activeOrder, from_id]);

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <div className={styles.sortOrder} onClick={() => setActiveOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}>
                    {activeOrder === 'desc' ? <>&#9660;</> : <>&#9650;</>}
                </div>
                <input
                    className={styles.search}
                    placeholder="Search posts..."
                    type="search"
                    onChange={(e) => setSearchString(e.target.value)}
                />
            </div>
            {filteredAndSortedPosts.map(({ created_time, message }) => (
                <div className={styles.listItem}>
                    <div className={styles.date}>{new Date(created_time).toLocaleString()}</div>
                    <div className={styles.message}>{message}</div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
