import { useCallback, useEffect } from 'react';
import { getPosts as getPostsApiRequest, GetPostsParams } from '../services/api';
import { Post } from '../types';
import useAPIDataFlow from './useAPIDataFlow';

const usePosts = ({ page, sl_token }: GetPostsParams) => {
    const { state, request, success, failure } = useAPIDataFlow<Post>();

    const getPosts = useCallback(async (params: GetPostsParams) => {
        try {
            request();
            const response = await getPostsApiRequest(params);
            success(response.data.data);
        } catch (error: any) {
            failure(error?.toString() ?? 'Something went wrong while registering');
        }
    }, []);

    useEffect(() => {
        getPosts({
            page,
            sl_token,
        });
    }, [page, sl_token, getPosts]);

    return {
        state,
        getPosts,
    };
};

export default usePosts;
