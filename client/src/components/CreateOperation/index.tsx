import { Input, Button } from "@mantine/core";
//import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import style from "./style.module.css";
import React, { useState, useRef } from "react";
import { useCreateReviewMutation } from "../../services/review";
// import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/index";
import { ref } from "firebase/storage";


function CreateOperation() {
  const [createReview] = useCreateReviewMutation();
  const [value, setValue] = useState({
    title: "",
    name: "",
    category: "",
    description: "",
    grade: "",
    genre: "",
    imageLink: "",
  });
  // const storage = getStorage();

  // async function uploadFile(file: Blob | ArrayBuffer | null, fileName: string) {
  //   if (file instanceof Blob) {
  //     const storageRef = ref(storage, `images/${fileName}`);
  //     try {
  //       await uploadBytes(storageRef, file);
  //       const downloadURL = await getDownloadURL(storageRef);
  //       setValue({ ...value, imageLink: downloadURL });
  //     } catch (error) {
  //       console.error("Ошибка при загрузке файла:", error);
  //     }
  //   }
  // }

  function changeInputValue(event: { target: { name: any; value: any } }) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  function sendRequest() {
    createReview(value);
  }
  function handleClick() {
ref(storage, )
  }

  // const openRef = useRef<() => void>(null);

  const [img, setImg] = useState("");

  return (
    <div className={style.wrapper}>
      <h2>Review title</h2>
      <Input
        name="title"
        onChange={changeInputValue}
        placeholder="review title"
      />

      <h2>Name of film/book/game</h2>
      <Input
        name="name"
        onChange={changeInputValue}
        placeholder="review name"
      />

      <h2>Category</h2>
      <Input
        name="category"
        onChange={changeInputValue}
        placeholder="review category"
      />

      <h2>Description</h2>
      <Input
        name="description"
        onChange={changeInputValue}
        placeholder="review description"
      />

      <h2>Grade</h2>
      <Input
        name="grade"
        onChange={changeInputValue}
        placeholder="review grade"
      />

      <h2>Genre</h2>
      <Input
        name="genre"
        onChange={changeInputValue}
        placeholder="review genre"
      />

      <h2>Image</h2>
      {/* <Dropzone
        openRef={openRef}
        onDrop={(files) => uploadFile(files[0], files[0].name)}
      >
        Перетащите файл сюда или нажмите для выбора
      </Dropzone> */}
      {/* <input type="file" onChange={(e) => setImg(e.target.files[0])} /> */}

      {/* <Button onClick={handleClick}>img</Button> */}
      <Button onClick={sendRequest}>GO</Button>
    </div>
  );
}

export default CreateOperation;
