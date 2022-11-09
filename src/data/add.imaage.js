import React, { useEffect, useState } from "react";
import { database } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Spinner from "react-bootstrap/Spinner";
// import uniqid from "uniqid";

/**
 * @author
 * @function
 **/

export const Product = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState([]);
  const [description, setDescription] = useState();
  const [description_page, setDescription_page] = useState("");
  const [URL, setURL] = useState([]);
  const [image, setImage] = useState({});
  const [spiner, setSpiner] = useState(100);

  const [category, setCategory] = useState("");

  const collectionRefProduct = collection(
    database,
    `product/by_catagory/country`
  );

  // ============================================= image database ============================================

  const handelim = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `productImage/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
        setSpiner(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setURL([...URL, downloadURL]);
          console.log(URL);
        });
      }
    );
  };

  //=========================================== add data =====================================
  const handel = (e) => {
    e.preventDefault();

    // dispatch(addCategory(name));
    addDoc(collectionRefProduct, {
      //   _id: uniqid(),
      price: price,
      name: name,
      img: URL,
      description: description,
      description_page: description_page,
    })
      .then(() => {
        alert("data add");
        setURL([]);
      })
      .catch((err) => {
        alert("noo add");
      });
  };

  return (
    <div>
      <h1>הוספת מוצר </h1>

      <Form onSubmit={handelim}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="file"
            placeholder="שם "
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="text-center">
          העלה תמונה
        </Button>
      </Form>

      {/* <p>{url}</p> */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Form onSubmit={handel}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="שם מוצר"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="מחיר"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="תיאור המוצר"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="תיאור מפורט של המוצר"
            value={description_page}
            onChange={(e) => setDescription_page(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control
            type="text"
            placeholder="בחירת קטגוריה"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="text-center">
          הוסף
        </Button>
      </Form>
    </div>
  );
};
