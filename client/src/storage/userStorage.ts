import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
    name: string;
    email: string;
    accessToken: string,
    expirationTime: string,
    refreshToken: string
}

export function useUserStorage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [expirationTime, setExpirationTime] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
        // При монтировании компонента, попробуйте загрузить данные из куков
        const savedName = Cookies.get('name');
        const savedEmail = Cookies.get('email');
        const savedAccessToken = Cookies.get('accessToken');
        const savedExpirationTime = Cookies.get('expirationTime');
        const savedRefreshToken = Cookies.get('refreshToken');
        if (savedName && savedEmail && savedAccessToken && savedExpirationTime && savedRefreshToken) {
            setName(savedName);
            setEmail(savedEmail);
            setAccessToken(savedAccessToken);
            setExpirationTime(savedExpirationTime);
            setRefreshToken(savedRefreshToken);
        }

    }, []);

    const handleLogin = (newUser: User) => {

        setName(newUser.name);
        setEmail(newUser.email);
        setAccessToken(newUser.accessToken);
        setExpirationTime(newUser.expirationTime);
        setRefreshToken(newUser.refreshToken);

        console.log(name, email, accessToken, expirationTime, refreshToken);

        Cookies.set('name', newUser.name);
        Cookies.set('email', newUser.email);
        Cookies.set('accessToken', newUser.accessToken);
        Cookies.set('expirationTime', newUser.expirationTime);
        Cookies.set('refreshToken', newUser.refreshToken);
    };

    const handleLogout = () => {
        setName('');
        setEmail('');
        setAccessToken('');
        setExpirationTime('');
        setRefreshToken('');
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('accessToken');
        Cookies.remove('expirationTime');
        Cookies.remove('refreshToken');
    };

    return {
        name,
        email,
        accessToken,
        expirationTime,
        refreshToken,
        handleLogin,
        handleLogout
    };
}