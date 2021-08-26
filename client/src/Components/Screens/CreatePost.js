import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

function CreatePost() {
  const History = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
          } else {
            M.toast({ html: "Posted Successfully", classes: "#4caf50 green" });
            History.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dtcqgxgzc");

    fetch("https://api.cloudinary.com/v1_1/dtcqgxgzc/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='createpost'>
      <div className='card input-filed'>
        <h4>Create Post</h4>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className='file-field input-field'>
          <div className='btn'>
            <span>Upload Pic</span>
            <input
              type='file'
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <button
          className='btn waves-effect waves-light'
          onClick={() => postDetails()}>
          Submit Post
          <i className='material-icons right'>send</i>
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
