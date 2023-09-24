import style from "./style.module.css";
import { Link } from "react-router-dom";
import { Text, Button } from "@mantine/core";
import useTheme from "../../hooks/useTheme";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useUserStorage } from "../../storage/userStorage";

function Header() {
  const { isDark, setIsDark } = useTheme();
  const { name, handleLogout } = useUserStorage();

  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <Link to="/" style={{ cursor: "pointer" }}>
          <Button className={style.button} variant="light" color="indigo">
            WHAT SHOULD U WATCH/READ/PLAY
          </Button>
        </Link>
        <div className="btn-link" onClick={() => setIsDark(!isDark)}>
          {isDark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
        </div>
      </div>
      <div className={style.containerBtns}>
        {name ? (
          <>
            <Link to="/review" style={{ cursor: "pointer", display:"flex", alignItems:"center" }}>
              <span className="material-symbols-outlined">add</span>
              <p className={style.button}>add review</p>
            </Link>
    
              <Button className={style.button} variant="outline">
                Hello {name}
              </Button>
              <Button onClick={handleLogout}>LogOut</Button>
          
          </>
        ) : (
          <>
            <Link to="/login">
              <Button className={style.button}>Sign in</Button>
            </Link>
            <Link to="/reg">
              <Button className={style.button} variant="outline">Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
