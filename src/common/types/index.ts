export type RegisterClient = {
    client_id: string;
    email: string;
    sl_token: string;
};

export type Post = {
    id: string;
    from_name: string;
    from_id: string;
    message: string;
    type: string;
    status: string;
    created_time: string;
};

export type SendersObject = {
    [from_name: string]: {
        from_id: Post['from_id'];
        count: number;
    };
};
