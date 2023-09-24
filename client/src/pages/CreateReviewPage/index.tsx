import React, { useState } from "react";
import Header from "../../components/Header";
import style from "./style.module.css";
import CreateOperation from "../../components/CreateOperation";

function CreateReview() {
  return (
    <>
      <Header />
      <CreateOperation/>
    </>
  );
}

export default CreateReview;
