import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const History = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li key='1'>
          <Link to='/profile'>Profile</Link>
        </li>,
        <li key='2'>
          <Link to='/myfollowingpost'>Posts</Link>
        </li>,
        <li key='3'>
          <Link to='/create'>
            <i className='material-icons'>add</i>
          </Link>
        </li>,
        <li key='4'>
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
        <li key='5'>
          <Link to='/signin'>Login</Link>
        </li>,
        <li key='6'>
          <Link to='/signup'>Sign Up</Link>
        </li>,
      ];
    }
  };
  return (
    <>
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper'>
            <Link exact to={state ? "/" : "/signin"} className='brand-logo'>
              Instagram
            </Link>
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
              {renderList()}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
