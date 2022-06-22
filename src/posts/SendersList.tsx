import { useMemo, useState } from 'react';
import { Post } from '../common/types';
import { mapAndFilterPostsToSenders } from './utils';
import styles from './SendersList.module.css';
import cx from '../common/utils/classNames';

type Props = {
    posts: Post[];
    from_id: string | null;
    handleSenderClick: (from_id: string) => () => void;
};

const SendersList = ({ posts, from_id, handleSenderClick }: Props) => {
    const [searchString, setSearchString] = useState('');
    const senders = useMemo(() => mapAndFilterPostsToSenders(posts, searchString), [posts, searchString]);

    return (
        <div className={styles.container}>
            <input
                className={styles.search}
                placeholder="Search sender..."
                type="search"
                onChange={(e) => setSearchString(e.target.value)}
            />
            <div className={styles.list}>
                {senders.map(([currentUser_from_id, data]) => (
                    <a
                        href="#"
                        className={cx(styles.listItem, currentUser_from_id === from_id && styles.activeListItem)}
                        onClick={handleSenderClick(currentUser_from_id)}
                        key={currentUser_from_id}
                    >
                        {data.from_name} {data.count}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SendersList;
