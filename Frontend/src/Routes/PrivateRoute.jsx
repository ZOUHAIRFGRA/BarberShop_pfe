import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { loading: userLoading, isAuthenticated: isUserAuthenticated } = useSelector(state => state.user);
    const { loading: barberLoading, isAuthenticated: isBarberAuthenticated } = useSelector(state => state.barber);

    // Determine loading status
    const loading = userLoading || barberLoading;

    // Determine authentication status
    const isAuthenticated = isUserAuthenticated || isBarberAuthenticated;

    return (
        <>
            {!loading && (
                isAuthenticated ? children : <Navigate to="/" />
            )}
        </>
    );
};

export default PrivateRoute;
