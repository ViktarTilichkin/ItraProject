import React, { useState } from "react";
import Filters from "../../components/Filters";
import Header from "../../components/Header";
import style from "./style.module.css";
import Search from "../../components/Search";
import List from "../../components/Content";

function HomePage() {
  const [expression, setExpression] = useState({
    industry: "default",
    ratingFrom: "",
    ratingTo: "",
  });

  const [searchString, setSearchString] = useState("");

  return (
    <div className={style.wrapper}>
         <Header />
      <div className={style.preview}>
        <Filters setExpression={setExpression} />
        <div className={style.content}>
          <Search setSearchString={setSearchString} />
          <List expression={expression} searchString={searchString} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
