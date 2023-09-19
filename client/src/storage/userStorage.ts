import { useState, useEffect } from 'react';

interface User {
    email: string;
  username: string;
  // Добавьте другие поля пользователя по вашим требованиям
}

export function useUserStorage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // При загрузке приложения проверяем, есть ли сохраненный JWT-токен
    const storedToken = sessionStorage.getItem('jwtToken');
    
    if (true) {
      
      // Проверяем срок действия токена
      if (true) {
        // Токен действителен, устанавливаем пользователя
        setUser({ email: 'user?.email', username: 'decodedToken.username' });
      } else {
        // Токен истек, очищаем его и пользователя
        sessionStorage.removeItem('jwtToken');
        setUser(null);
      }
    }
  }, []);

  // Функция для записи пользователя и токена
  const setUserAndToken = (newUser: User, token: string) => {
    sessionStorage.setItem('jwtToken', token);
    setUser(newUser);
  };

  // Функция для очистки пользователя и токена
  const clearUserAndToken = () => {
    sessionStorage.removeItem('jwtToken');
    setUser(null);
  };

  return {
    user,
    setUserAndToken,
    clearUserAndToken,
  };
}
