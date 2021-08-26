import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function Signup() {
  const History = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
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
  const uploadFields = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid Email ", classes: "#d32f2f red darken-2" });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          M.toast({ html: data.message, classes: "#4caf50 green" });
          History.push("/signIn");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };

  return (
    <div>
      <div className='card'>
        <div className='card-content white-text'>
          <span className='card-title'>Instagram</span>
          <form className='col s12'>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  placeholder='Enter Your full Name'
                  id='full_name'
                  type='text'
                  className='validate'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='email'
                  type='email'
                  className='validate'
                  placeholder='Enter Your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

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
            <div className='row'>
              <div className='input-field col s12'>
                <input
                  id='password'
                  type='password'
                  placeholder='Enter Your password'
                  className='validate'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='input-field col s12'>
              <button
                className='btn waves-effect waves-light'
                onClick={(e) => {
                  e.preventDefault();
                  PostData();
                }}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className='card-action'>
          <h6>
            Already have an Account ?{" "}
            <span>
              <Link to='/signIn'>Login instead</Link>{" "}
            </span>{" "}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Signup;
