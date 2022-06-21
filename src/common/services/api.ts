import axios from 'axios';
import { Post, RegisterClient } from '../types';

const SM_BASE_URL = 'https://api.supermetrics.com/assignment';

const instance = axios.create({
    baseURL: SM_BASE_URL,
});

type ResponseStructure<T> = {
    meta: {
        request_id: string;
    };
    data: T;
};

export type RegisterClientParams = {
    email: string;
    name: string;
    client_id: 'ju16a6m81mhid5ue1z3v2g0uh';
};

export const registerClient = (params: RegisterClientParams) =>
    instance.post<ResponseStructure<RegisterClient>>('/register', params);

export type GetPostsParams = {
    sl_token: string;
    page: number;
};

export type GetPostsResponse = ResponseStructure<{
    page: number;
    posts: Post[];
}>;

export const getPosts = (params: GetPostsParams) => instance.get<GetPostsResponse>('/posts', { params });
