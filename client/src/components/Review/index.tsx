import React from "react";
import style from "./style.module.css";

function Review({ review }: any) {
  return (
    <>
      <div className={style["summary"]}>
        <div className={style["header-flex"]}>
          <h1>{review.title}</h1>
          <div>


            <span
              style={{ cursor: "pointer" }}
              className="material-symbols-outlined"
            >
              delete
            </span>
            <span
              style={{ cursor: "pointer" }}
              className="material-symbols-outlined"
            >
              edit
            </span>
          </div>
        </div>
        <div className={style["flex"]}>
          <p>{review.category}</p>
          <p>{review.name}</p>
        </div>
      </div>

      <div className={style["content"]}>
        <p>{review.description}</p>
      </div>
    </>
  );
}

export default Review;
