import React, { useContext, useEffect, useState } from "react";
// import Post from '../Post';
import Sidebar from "../Sidebar";
import { UserContext } from "../../App";
import M from "materialize-css";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: postId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          M.toast({ html: result.error, classes: "#d32f2f red darken-2" });
        } else {
          M.toast({
            html: "Post Deleted Successfully",
            classes: "#4caf50 green",
          });
          const newData = data.filter((item) => {
            return item._id !== result._id;
          });
          setData(newData);
        }
      });
  };

  return (
    <div className='home'>
      <div id='post'>
        {data.map((item) => {
          return (
            <div className='postcard'>
              <div className='card' key={item._id}>
                <div className='dp'>
                  <h5>
                    <img src={item.postedBy.pic} alt='dp' />
                    <Link
                      to={
                        item.postedBy._id !== state._id
                          ? "/profile/" + item.postedBy._id
                          : "/profile"
                      }>
                      {item.postedBy.name}
                    </Link>{" "}
                  </h5>
                  <h4>
                    {item.postedBy._id === state._id && (
                      <i
                        className='material-icons'
                        style={{
                          float: "right",
                          color: "#f44336",
                        }}
                        onClick={() => deletePost(item._id)}>
                        delete
                      </i>
                    )}
                  </h4>
                </div>
                <img src={item.photo} alt='status' />
              </div>
              <div className='card-content'>
                {/* <i className="material-icons" style={{color:"#e53935"}}>favorite</i> */}
                {item.likes.includes(state._id) ? (
                  <i
                    className='material-icons'
                    onClick={() => unlikePost(item._id)}>
                    thumb_down
                  </i>
                ) : (
                  <i
                    className='material-icons'
                    onClick={() => likePost(item._id)}>
                    thumb_up
                  </i>
                )}
                <h5>{item.likes.length} likes</h5>
                <h5>{item.title}</h5>
                <h6>{item.body}</h6>
                <hr />
                {item.comments.map((record) => {
                  return (
                    <h6>
                      <span style={{ fontSize: "1.6rem", fontWeight: "400" }}>
                        {record.postedBy.name}
                      </span>{" "}
                      {record.text}
                    </h6>
                  );
                })}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}>
                  <input type='text' placeholder='add a Comment' />
                </form>
              </div>
            </div>
          );
        })}
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;

/* <Post
    key={item._id}
    title={item.title}
    body={item.body}
    img={item.photo}
    likes={item.likes.length}
    postedBy={item.postedBy.name}
    like={likePost(item._id)}
    unlike={unlikePost(item._id)}
/> */
