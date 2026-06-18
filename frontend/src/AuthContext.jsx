import React, { createContext, useState, useEffect } from 'react';
import api from './api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUserId) {
            setUserId(storedUserId);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/api/auth/login', { email, password });
            const { token, userId } = response.data;
            localStorage.setItem('token', token);
            if (userId) localStorage.setItem('userId', userId);
            setToken(token);
            if (userId) setUserId(userId);
            return true;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    };

    const register = async (username, email, password) => {
        try {
            await api.post('/api/auth/register', { username, email, password });
            return true;
        } catch (error) {
            console.error('Register failed', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, login, register, logout, isAuthenticated: !!token, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
