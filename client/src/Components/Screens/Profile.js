import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function Profile() {
  const [mypics, setmyPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  // const [url, setUrl] = useState(undefined);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setmyPics(result.mypost);
      });
  }, []);
  useEffect(() => {
    if (image) {
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
          // setUrl(data.url)
          // localStorage.setItem('user',JSON.stringify({...state,pic:data.url}))
          // dispatch({type:'UPDATEPIC',payload:data.url})
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: data.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              // window.location.reload()
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePic = (file) => {
    setImage(file);
  };

  return (
    <div className='profile'>
      <div className='user_info'>
        <div className='img'>
          <img src={state ? state.pic : "loading"} alt='profilepic' />
        </div>
        <div className='user_details'>
          <h4>{state ? state.name : "loading"}</h4>
          <div className='stats'>
            <div className='stat post'>
              <div className='counts'>{mypics.length}</div>
              <div className='count_name'>Posts</div>
            </div>
            <div className='stat followers'>
              <div className='counts'>{state ? state.followers.length : 0}</div>
              <div className='count_name'>Followers</div>
            </div>
            <div className='stat following'>
              <div className='counts'>{state ? state.following.length : 0}</div>
              <div className='count_name'>Following</div>
            </div>
          </div>
          <div className='user_personal'>
            <h6>
              {state ? state.name : "loading"} <br /> (
              {state ? state.email : "loading"})
            </h6>
          </div>
          <div className='createpost'>
            <div>
              <Link to='/create'>
                <h6>
                  Create Post <i className='material-icons'>add</i>
                </h6>
              </Link>
            </div>
            <div className='file-field input-field'>
              <div className='btn'>
                <span>Update Pic</span>
                <input
                  type='file'
                  onChange={(e) => {
                    updatePic(e.target.files[0]);
                  }}
                />
              </div>
              <div className='file-path-wrapper'>
                <input className='file-path validate' type='text' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="statuses">
                <div className="status">
                    <img src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="statusImage" />
                    <h6>status</h6>
                </div>
                <div className="status">
                    <img src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="statusImage" />
                    <h6>status</h6>
                </div>
            </div> */}
      <hr />
      <div className='posts'>
        {mypics.map((item) => {
          return <img key={item._id} src={item.photo} alt='mygallery' />;
        })}
      </div>
    </div>
  );
}

export default Profile;
