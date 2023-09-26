import React from "react";
import style from "./style.module.css";
import Cookies from "js-cookie";

interface IReview {
  id: number;
  title: string;
  name: string;
  category: string;
  description: string;
  grade: number;
  genre: string;
  imageLink: string;
  ownerId: number;
}

function Review({ review }: { review: IReview }) {
  const isOwner = () => {
    const userId = Cookies.get('id');
    if (userId && review.ownerId == +userId) {
      return true;
    }
    return false;
  };
  const owner = isOwner();
  return (
    <>
      <div className={style["summary"]}>


        <div className={style["header-flex"]}>
          <div>
            <img src={review.imageLink} alt={review.title} />
            <h1>{review.title}</h1>
            <div>
              {owner ?
                (<><span
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
                  </span></>) : (<></>)}

            </div>
          </div>
          <div className={style["flex"]}>
            <p>{review.category}</p>
            <p>{review.name}</p>
          </div>
        </div>
      </div>

      <div className={style["content"]}>
        <p>{review.description}</p>
      </div>
    </>
  );
}

export default Review;
