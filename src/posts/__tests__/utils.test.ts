import { Post } from '../../common/types';
import { filterPosts, mapAndFilterPostsToSenders, orderPostsByCreationDate } from '../utils';

const postsFixture: Post[] = [
    {
        id: '345',
        from_name: 'yyy',
        from_id: 'user_345',
        message: 'desc 1010 lorem ipsum',
        type: 'status',
        created_time: '2022-06-20T14:30:21+00:00',
    },
    {
        id: '123',
        from_name: 'zzz',
        from_id: 'user_123',
        message: 'desc 981 xyz',
        type: 'status',
        created_time: '2022-06-20T14:39:21+00:00',
    },
    {
        id: '222',
        from_name: 'xxx',
        from_id: 'user_222',
        message: 'desc 123 345',
        type: 'status',
        created_time: '2022-06-20T14:38:21+00:00',
    },
    {
        id: '111',
        from_name: 'abc',
        from_id: 'user_111',
        message: 'desc 777 666',
        type: 'status',
        created_time: '2022-06-20T14:40:21+00:00',
    },
    {
        id: '777',
        from_name: 'abc',
        from_id: 'user_111',
        message: 'desc 777 888',
        type: 'status',
        created_time: '2022-06-20T14:37:21+00:00',
    },
    {
        id: '999',
        from_name: 'abc',
        from_id: 'user_999',
        message: 'desc 777 888',
        type: 'status',
        created_time: '2022-06-20T14:37:21+00:00',
    },
];

describe('filterPosts', () => {
    it('should filter posts by from_id', () => {
        const from_id_1 = 'user_111';
        const posts1 = filterPosts(postsFixture, from_id_1);
        expect(posts1.length).toBe(2);
        expect(posts1[0].message).toEqual(postsFixture.at(-3)?.message);
        expect(posts1[1].message).toEqual(postsFixture.at(-1)?.message);

        const from_id_2 = 'user_123';
        const posts2 = filterPosts(postsFixture, from_id_2);
        expect(posts2.length).toBe(1);
        expect(posts2[0].message).toEqual(postsFixture[1]?.message);
    });
    it('should filter posts by from_id and search query', () => {
        const from_id = 'user_111';
        const searchQuery1 = 'desc';
        const posts1 = filterPosts(postsFixture, from_id, searchQuery1);
        expect(posts1.length).toBe(2);
        expect(posts1[0].message).toEqual(postsFixture.at(-3)?.message);
        expect(posts1[1].message).toEqual(postsFixture.at(-2)?.message);

        const searchQuery2 = '888';
        const posts2 = filterPosts(postsFixture, from_id, searchQuery2);
        expect(posts2.length).toBe(1);
        expect(posts2[0].message).toEqual(postsFixture.at(-1)?.message);

        const searchQuery3 = 'zzz';
        const posts3 = filterPosts(postsFixture, from_id, searchQuery3);
        expect(posts3.length).toBe(0);
    });
});

describe('mapAndFilterPostsToSenders', () => {
    it('should map and sort senders alphabetically', () => {
        const senders = mapAndFilterPostsToSenders(postsFixture);
        // One duplicate from_id only: *user_111*
        expect(senders.length).toBe(postsFixture.length - 1);
        expect(senders[0][0]).toBe('user_111');
        // count should be 2, because there is same name users but with different id
        expect(senders[0][1].from_name).toBe('abc');
        expect(senders[0][1].count).toBe(2);
    });
    it('should filter senders, by search query', () => {
        const senders = mapAndFilterPostsToSenders(postsFixture, 'ab');
        expect(senders.length).toBe(2);
        expect(senders[0][0]).toBe('user_111');
    });
});

describe('orderPostsByCreationDate', () => {
    it('should shorts posts asc', () => {
        const posts = orderPostsByCreationDate(postsFixture, 'asc');

        expect(posts[0]).toEqual(postsFixture[0]);
        expect(posts[1]).toEqual(postsFixture.at(-2));
        expect(posts[2]).toEqual(postsFixture.at(-1));
        // ...
    });
    it('should shorts posts desc', () => {
        const posts = orderPostsByCreationDate(postsFixture, 'desc');

        expect(posts[0]).toEqual(postsFixture.at(-3));
        expect(posts[1]).toEqual(postsFixture[1]);
        expect(posts[2]).toEqual(postsFixture[2]);
        // ...
    });
});
