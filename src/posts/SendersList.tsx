import { useMemo } from 'react';
import { Post } from '../common/types';
import { mapPostsToSenders } from './utils';

type Props = {
    posts: Post[];
};

const SendersList = ({ posts }: Props) => {
    const senders = useMemo(() => mapPostsToSenders(posts), [posts]);
    return (
        <div>
            {senders.map(([from_name, data]) => (
                <div key={from_name}>{from_name}</div>
            ))}
        </div>
    );
};

export default SendersList;
