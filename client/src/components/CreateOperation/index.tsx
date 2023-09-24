import { Input, Button, Image, Group, Textarea } from "@mantine/core";
import style from "./style.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useCreateReviewMutation } from "../../services/review";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/index";
import { IconChevronDown } from "@tabler/icons-react";
import category from "../../storage/category.json";
import { Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

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

  const [img, setImg] = useState<File | null>(null);

  function changeInputValue(event: { target: { name: any; value: any } }) {
    setValue({ ...value, [event.target.name]: event.target.value });
  }

  async function handleClick() {
    if (img !== null) {
      const storageref = ref(storage, "images/" + img.name);
      uploadBytes(storageref, img)
        .then((snapshot: any) => {
          console.log("succesful");
        })
        .catch((error: any) => {
          console.error(error);
        });
    }

    createReview(value);
  }
  const openRef = useRef<() => void>(null);

  useEffect(() => {
    // Обновляем текст в зависимости от значения img
    if (img) {
      openRef.current?.();
    }
  }, [img]);

  return (
    <div className={style.wrapper}>
      <div className={style.left}>
        <h2>Image</h2>

        <Dropzone
          onDrop={(files) => setImg(files[0])}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group style={{ pointerEvents: "none" }}>
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            {img ? (
              <div>
                <Image
                  src={URL.createObjectURL(img)}
                  alt="Selected Image"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
                <Text size="xl" inline>
                  Selected: {img.name}
                </Text>
              </div>
            ) : (
              <div>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: "var(--mantine-color-dimmed)",
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            )}
          </Group>
        </Dropzone>

        <h2>Category</h2>
        <Input
          size="lg"
          name="category"
          component="select"
          placeholder="review category"
          rightSection={<IconChevronDown />}
        >
          <option value="default">category</option>
          {category.map((el, index) => (
            <option key={index} value={el.category}>
              {el.category}
            </option>
          ))}
        </Input>
        <h2>Grade</h2>
        <Input
          size="lg"
          name="grade"
          onChange={changeInputValue}
          placeholder="review grade"
        />

        <h2>Genre</h2>
        <Input
          size="lg"
          name="genre"
          onChange={changeInputValue}
          placeholder="review genre"
        />
      </div>

      <div className={style.right}>
        <h2>Review title</h2>
        <Input
          size="lg"
          name="title"
          onChange={changeInputValue}
          placeholder="review title"
        />

        <h2>Name of film/book/game</h2>
        <Input
          size="lg"
          name="name"
          onChange={changeInputValue}
          placeholder="review name"
        />

        <h2>Description</h2>
        <Textarea
          size="lg"
          name="description"
          onChange={changeInputValue}
          placeholder="review description"
          autosize={true}
          minRows={7}
        />
        <Button className={style.button} onClick={handleClick}>
          create
        </Button>
      </div>
    </div>
  );
}

export default CreateOperation;
