import React from 'react';

const authContext = React.createContext({
    isAuthenticated: false,
    login: () => {}
});

export default authContext;