import { Post } from '../common/types';
import groupBy from '../common/utils/groupBy';

export type Order = 'asc' | 'desc';

export const orderPostsByCreationDate = (posts: Post[], order: Order) =>
    [...posts].sort((a, b) => {
        const dateA = new Date(b.created_time).getTime();
        const dateB = new Date(a.created_time).getTime();

        if (order === 'asc') {
            return dateA > dateB ? -1 : 1;
        }
        return dateA > dateB ? 1 : -1;
    });

export const mapPostsToSenders = (posts: Post[]) =>
    Object.entries(groupBy<Post>(posts, 'from_name'))
        .map(
            ([from_name, data]) =>
                [
                    from_name,
                    {
                        count: data.length,
                        from_id: data[0].from_id,
                    },
                ] as [
                    string,
                    {
                        from_id: Post['from_id'];
                        count: number;
                    }
                ]
        )
        .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
