import "./App.css";
import { Switch } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// routes
import Public from "./routes/Public";
import Private from "./routes/Private";

// pages
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Acount from "./pages/Acount/Acount";
import Article from "./pages/Article/Article";

// components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [userId, setUserId] = useState(null);
  const [blogs, setBlogs] = useState([]);

  return (
    <>
      <Header setUserId={setUserId} />

      <Switch>
        <Public path="/" exact>
          <Home setUserId={setUserId} blogs={blogs} setBlogs={setBlogs} />
        </Public>
        <Private path="/article">
          <Article blogs={blogs} setBlogs={setBlogs} />
        </Private>
        <Private path="/acount">
          <Acount userId={userId} />
        </Private>

        <Public path="/register" component={Register} />
        <Public path="/login" component={Login} />
      </Switch>

      <Footer />

      <ToastContainer />
    </>
  );
}

export default App;
