import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { loading, isAuthenticated } = useSelector(state => state.auth);

    return (
        <>
            {loading === false && (
                isAuthenticated === false ? <Navigate to="/" /> : children
            )}
        </>
    );
};

export default PrivateRoute;