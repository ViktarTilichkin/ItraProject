import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
    id: number | null;
    name: string;
    email: string;
    accessToken: string,
    expirationTime: string,
    refreshToken: string
}

export function useUserStorage() {
    const [id, setId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [expirationTime, setExpirationTime] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
        const savedId = Cookies.get('id');
        const savedName = Cookies.get('name');
        const savedEmail = Cookies.get('email');
        const savedAccessToken = Cookies.get('accessToken');
        const savedExpirationTime = Cookies.get('expirationTime');
        const savedRefreshToken = Cookies.get('refreshToken');
        if (savedName && savedId && savedEmail && savedAccessToken && savedExpirationTime && savedRefreshToken) {
            setId(+savedId);
            setName(savedName);
            setEmail(savedEmail);
            setAccessToken(savedAccessToken);
            setExpirationTime(savedExpirationTime);
            setRefreshToken(savedRefreshToken);
        }

    }, []);

    const handleLogin = (newUser: User) => {
        setId(newUser.id);
        setName(newUser.name);
        setEmail(newUser.email);
        setAccessToken(newUser.accessToken);
        setExpirationTime(newUser.expirationTime);
        setRefreshToken(newUser.refreshToken);

        Cookies.set('id', '' + newUser.id);
        Cookies.set('name', newUser.name);
        Cookies.set('email', newUser.email);
        Cookies.set('accessToken', newUser.accessToken);
        Cookies.set('expirationTime', newUser.expirationTime);
        Cookies.set('refreshToken', newUser.refreshToken);
    };

    const handleLogout = () => {
        setId(null);
        setName('');
        setEmail('');
        setAccessToken('');
        setExpirationTime('');
        setRefreshToken('');
        Cookies.remove('id');
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('accessToken');
        Cookies.remove('expirationTime');
        Cookies.remove('refreshToken');
    };

    return {
        id,
        name,
        email,
        accessToken,
        expirationTime,
        refreshToken,
        handleLogin,
        handleLogout
    };
}