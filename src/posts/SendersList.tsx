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
            {senders.map(([from_name, data]) => (
                <a
                    href="#"
                    className={cx(styles.listItem, data.from_id === from_id && styles.activeListItem)}
                    onClick={handleSenderClick(data.from_id)}
                    key={from_name}
                >
                    {from_name} {data.count}
                </a>
            ))}
        </div>
    );
};

export default SendersList;
