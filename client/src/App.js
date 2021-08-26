import React, { createContext, useReducer, useEffect, useContext } from "react";
import "./Styles/app.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./Components/Screens/Home";
import Signin from "./Components/Screens/Signin";
import Signup from "./Components/Screens/Signup";
import Profile from "./Components/Screens/Profile";
import CreatePost from "./Components/Screens/CreatePost";
import UserProfile from "./Components/Screens/UserProfile";
import SubscribedUserPosts from "./Components/Screens/SubscribedUserPosts";
import { reducer, initialState } from "./reducers/userReducer";
import Footer from "./Components/Footer";

export const UserContext = createContext();

const Routing = () => {
  const History = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({
        type: "USER",
        payload: user,
      });
      // History.push('/')
    } else {
      History.push("/signIn");
    }
  }, []);
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/signIn'>
        <Signin />
      </Route>
      <Route path='/signUp'>
        <Signup />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route path='/create'>
        <CreatePost />
      </Route>
      <Route path='/profile/:userid'>
        <UserProfile />
      </Route>
      <Route path='/myfollowingpost'>
        <SubscribedUserPosts />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
