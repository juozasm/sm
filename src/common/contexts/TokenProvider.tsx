import { createContext, ReactNode, useState } from 'react';

export const TokenContext = createContext<ReturnType<typeof useState<string | undefined>> | undefined>(undefined);

type TokenProviderProps = {
    children: ReactNode;
};
const TokenProvider = ({ children }: TokenProviderProps) => {
    const [token, setToken] = useState<string | undefined>(localStorage.getItem('token') ?? undefined);
    return <TokenContext.Provider value={[token, setToken]}>{children}</TokenContext.Provider>;
};

export default TokenProvider