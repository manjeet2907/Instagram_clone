import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

function Sidebar() {
  const { state, dispatch } = useContext(UserContext);
  const History = useHistory();
  return (
    <div className='sidebar'>
      <div className='auser_info'>
        <img src={state ? state.pic : "loading"} alt='profilepic' />
        <div className='user_details'>
          <h5>{state ? state.name : "loading"}</h5>
          <h6
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              History.push("/signin");
            }}>
            Logout
          </h6>
        </div>
      </div>
      <hr />
      <div>
        <Link className='options' to='/create'>
          <h6>
            Create Post <i className='material-icons'>add</i>
          </h6>
        </Link>
      </div>
      {/* <div className="user_all">
                <div className="user_info">
                    <img src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="profilepic" />
                    <div className="user_details">
                        <h6>RK Sharma</h6>
                    </div>
                    <h6>Follow</h6>
                </div>
                <div className="user_info">
                    <img src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="profilepic" />
                    <div className="user_details">
                        <h6>RK Sharma</h6>
                    </div>
                    <h6>Follow</h6>
                </div>
                <div className="user_info">
                    <img src="https://images.unsplash.com/photo-1484186304838-0bf1a8cff81c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="profilepic" />
                    <div className="user_details">
                        <h6>RK Sharma</h6>
                    </div>
                    <h6>Follow</h6>
                </div>
            </div> */}
    </div>
  );
}

export default Sidebar;
