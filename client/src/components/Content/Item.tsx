import style from "./style.module.css";
import { Link } from "react-router-dom";

import { useUserStorage } from '../../storage/userStorage';

function Item({ filmItem }:any) {
  
  const {name,email, accessToken, handleLogin, handleLogout } = useUserStorage();
  console.log(name,email, accessToken);
  return (
    <div className={style["wrapper"]}>
      <div className={style["item"]}>
        <Link to={`/review/${filmItem.id}`}>
          <div className={style["content"]}>
            <div className={style["content-wrapp"]}>
              <h2 className={style["film-h"]}>{filmItem.title}</h2>
              <div className={style["rating"]}>
                <div className={style["star"]}></div>
                <p>{filmItem.grade}</p>
              </div>
            </div >

            <div className={style["flex"]}>
              <p className={style["category"]}>{filmItem.category}</p>
              <p>{filmItem.name}</p>
            </div>

            <div className={style["location"]}>
              <p>жанр: {filmItem.genre}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Item;
