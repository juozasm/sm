import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Posts from './posts';
import TokenProvider from './common/contexts/TokenProvider';
import { PropsWithChildren } from 'react';
import useToken from './common/hooks/useToken';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { token } = useToken();
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};

const App = () => {
    return (
        <TokenProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Posts />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </TokenProvider>
    );
};

export default App;
