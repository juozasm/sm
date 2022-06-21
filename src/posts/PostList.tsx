import { useState, useMemo } from 'react';
import useToken from '../common/hooks/useToken';
import { Post } from '../common/types';
import { orderPostsByCreationDate, Order } from './utils';
import usePosts from './usePosts';

type Props = {
    posts: Post[];
    from_id?: string;
};

const PostList = ({ posts }: Props) => {
    console.log(posts);
    const [search, searchString] = useState('');
    const [activeOrder, setActiveOrder] = useState<Order>('desc');

    const sortedPosts = useMemo(() => orderPostsByCreationDate(posts, activeOrder), [posts]);

    return <div></div>;
};

export default PostList;
