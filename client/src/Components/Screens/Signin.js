import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function Signin() {
  const { state, dispatch } = useContext(UserContext);
  const History = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid Email ", classes: "#d32f2f red darken-2" });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#d32f2f red darken-2" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({
            type: "USER",
            payload: data.user,
          });
          M.toast({ html: "Signed In", classes: "#4caf50 green" });
          History.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                  id='email'
                  type='email'
                  className='validate'
                  placeholder='Enter Your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                Log in
              </button>
            </div>
          </form>
        </div>
        <div className='card-action'>
          <h6>
            Don't have an Account ?{" "}
            <span>
              <Link to='/signUp'>Sign up instead</Link>{" "}
            </span>{" "}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Signin;
