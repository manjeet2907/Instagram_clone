import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

function Footer() {
  const { state, dispatch } = useContext(UserContext);
  const History = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li key='1'>
          <div className='img'>
            <img src={state ? state.pic : "loading"} alt='profilepic' />
            <h6>{state ? state.name : "loading"}</h6>
          </div>
        </li>,
        <li key='2'>
          <Link to='/profile'>Profile</Link>
        </li>,
        <li key='3'>
          <Link to='/myfollowingpost'>Posts</Link>
        </li>,
        <li key='4'>
          <Link to='/create'>
            <i className='material-icons'>add</i>
          </Link>
        </li>,
        <li key='5'>
          <button
            className='btn waves-effect waves-light'
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              History.push("/signin");
            }}>
            Log Out
          </button>
        </li>,
      ];
    } else {
      return [
        <li key='6'>
          <Link to='/signin'>Login</Link>
        </li>,
        <li key='7'>
          <Link to='/signup'>Sign Up</Link>
        </li>,
      ];
    }
  };
  return (
    <>
      <div className='footer'>
        <div className='page-footer'>
          <ul className='black-text'>{renderList()}</ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
