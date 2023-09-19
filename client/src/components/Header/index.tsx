import React, { useEffect } from 'react';
import style from "./style.module.css";
import { Link } from "react-router-dom";
import { Text, Button } from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useUserStorage } from '../../storage/userStorage';

function Header() {
  const { isDark, setIsDark } = useTheme();
  const { user, setUserAndToken, clearUserAndToken } = useUserStorage();

  useEffect(() => {
    // Выводим информацию о пользователе
    console.log(user);
  }, [user]);

  return (
    <div className={style.wrapper}>
      <div className='btn-link' onClick={() => setIsDark(!isDark)}>
        {isDark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
      </div>
      <Text size="lg" weight={500}>
        WHAT SHOULD U WATCH/READ/PLAY
      </Text>
      <div className={style.containerBtns}>
        { user ? <Text size="lg" weight={500}>
        asdasdlasdk
      </Text> : <div> nasdl </div>}
        <Link to="/login">
          <Button>Sign in</Button>
        </Link>
        <Link to="/reg">
          <Button variant="outline">Sign up</Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
