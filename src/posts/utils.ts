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

export const filterPosts = (posts: Post[], from_id: string, searchString?: string) =>
    posts.filter((post) => {
        if (from_id === post.from_id) {
            if (searchString) {
                return post.message.toLowerCase().includes(searchString.toLocaleLowerCase());
            }
            return true;
        }
        return false;
    });
export const mapAndFilterPostsToSenders = (posts: Post[], searchString?: string) =>
    Object.entries(groupBy<Post>(posts, 'from_id'))
        .map(
            ([from_id, data]) =>
                [
                    from_id,
                    {
                        count: data.length,
                        from_name: data[0].from_name,
                    },
                ] as [
                    string,
                    {
                        from_name: Post['from_name'];
                        count: number;
                    }
                ]
        )
        .filter((a) => (searchString ? a[1].from_name.toLowerCase().includes(searchString.toLowerCase()) : true))
        .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
