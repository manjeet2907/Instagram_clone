import React, { useEffect, useState, useContext } from "react";
// import { Link } from 'react-router-dom';
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

function Profile() {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );
  // console.log(userid)

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };
  return (
    <>
      {userProfile ? (
        <div className='profile'>
          <div className='user_info'>
            <div className='img'>
              <img src={userProfile.user.pic} alt='profilepic' />
            </div>
            <div className='user_details'>
              <h4>{userProfile.user.name}</h4>
              <div className='stats'>
                <div className='stat post'>
                  <div className='counts'>{userProfile.posts.length}</div>
                  <div className='count_name'> Posts</div>
                </div>
                <div className='stat followers'>
                  <div className='counts'>
                    {userProfile.user.followers.length}
                  </div>
                  <div className='count_name'>Followers</div>
                </div>
                <div className='stat following'>
                  <div className='counts'>
                    {userProfile.user.following.length}
                  </div>
                  <div className='count_name'>Following</div>
                </div>
              </div>
              <div className='user_personal'>
                <h6>
                  {userProfile.user.name} <br /> ({userProfile.user.email})
                </h6>
                <h6>
                  {showfollow ? (
                    <button
                      className='btn waves-effect waves-light'
                      onClick={(e) => {
                        // e.preventDefault();
                        followUser();
                      }}>
                      Follow
                    </button>
                  ) : (
                    <button
                      className='btn waves-effect waves-light'
                      onClick={(e) => {
                        // e.preventDefault();
                        unfollowUser();
                      }}>
                      UnFollow
                    </button>
                  )}
                </h6>
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
            {userProfile.posts.map((item) => {
              return <img key={item._id} src={item.photo} alt='mygallery' />;
            })}
          </div>
        </div>
      ) : (
        <h2>Loading.....</h2>
      )}
    </>
  );
}

export default Profile;
